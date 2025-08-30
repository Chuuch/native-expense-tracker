package auth

import (
	"log"
	"money-mate/internal/models"
	"money-mate/internal/services"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthHandler struct {
	db              *gorm.DB
	verificationSvc *services.VerificationService
	refreshTokenSvc *services.RefreshTokenService
	emailSvc        *services.EmailService
	jwtSecret       string
}

func NewAuthHandler(db *gorm.DB, emailSvc *services.EmailService, jwtSecret string) *AuthHandler {
	return &AuthHandler{
		db:              db,
		verificationSvc: services.NewVerificationService(db),
		refreshTokenSvc: services.NewRefreshTokenService(db),
		emailSvc:        emailSvc,
		jwtSecret:       jwtSecret,
	}
}

type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
	FullName string `json:"fullName" binding:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type VerifyEmailRequest struct {
	Code string `json:"code" binding:"required"`
}

type ResendVerificationRequest struct {
	Email string `json:"email" binding:"required,email"`
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

type AuthResponse struct {
	AccessToken  string      `json:"access_token"`
	RefreshToken string      `json:"refresh_token"`
	User         models.User `json:"user"`
	ExpiresAt    time.Time   `json:"expires_at"`
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var existingUser models.User
	if err := h.db.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User already exists"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user := models.User{
		Email:         req.Email,
		Password:      string(hashedPassword),
		Fullname:      req.FullName,
		Currency:      "USD",
		EmailVerified: false,
	}

	if err := h.db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user: " + err.Error()})
		return
	}

	verificationCode, err := h.verificationSvc.CreateVerificationCode(user.ID, "email_verification")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create verification code: " + err.Error()})
		return
	}

	if err := h.emailSvc.SendVerificationEmail(&user, verificationCode.Code); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send verification email: " + err.Error()})
		return
	}

	user.Password = ""

	c.JSON(http.StatusOK, gin.H{
		"message": "User registered successfully. Please check your email for the verification code.",
		"user":    user,
	})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := h.db.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if !user.EmailVerified {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email not verified"})
		return
	}

	accessToken, expiresAt, err := h.generateAccessToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate access token"})
		return
	}

	refreshToken, err := h.refreshTokenSvc.CreateRefreshToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create refresh token"})
		return
	}

	user.Password = ""

	c.JSON(http.StatusOK, AuthResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken.Token,
		User:         user,
		ExpiresAt:    expiresAt,
	})
}

func (h *AuthHandler) VerifyEmail(c *gin.Context) {
	var req VerifyEmailRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("❌ VerifyEmail - Validation error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Printf("✅ VerifyEmail - Request validated successfully: %+v", req)

	// Find verification code first
	var verificationCode models.VerificationCode
	if err := h.db.Where("code = ? AND type = ? AND expires_at > ?", req.Code, "email_verification", time.Now()).First(&verificationCode).Error; err != nil {
		log.Printf("❌ VerifyEmail - Invalid or expired code: %s", req.Code)
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid or expired verification code"})
		return
	}

	// Find user by the verification code's user_id
	var user models.User
	if err := h.db.Where("id = ?", verificationCode.UserID).First(&user).Error; err != nil {
		log.Printf("❌ VerifyEmail - User not found for code: %s", req.Code)
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Mark the verification code as used
	h.db.Model(&verificationCode).Update("used", true)

	h.db.Model(&user).Update("email_verified", true)

	// Send welcome email following the same pattern as other functions
	if err := h.emailSvc.SendWelcomeEmail(&user); err != nil {
		log.Printf("❌ VerifyEmail - Failed to send welcome email: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send welcome email"})
		return
	}

	log.Printf("✅ VerifyEmail - Email verified successfully for user: %s", user.Email)
	c.JSON(http.StatusOK, gin.H{"message": "Email verified successfully"})
}

func (h *AuthHandler) ResendVerification(c *gin.Context) {
	var req ResendVerificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := h.db.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	verificationCode, err := h.verificationSvc.CreateVerificationCode(user.ID, "email_verification")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create verification code"})
		return
	}

	if err := h.emailSvc.SendVerificationEmail(&user, verificationCode.Code); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send verification email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Verification code sent successfully"})
}

func (h *AuthHandler) RefreshToken(c *gin.Context) {
	var req RefreshTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	refreshToken, err := h.refreshTokenSvc.ValidateRefreshToken(req.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired refresh token"})
		return
	}

	accessToken, expiresAt, err := h.generateAccessToken(refreshToken.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate access"})
		return
	}

	newRefreshToken, err := h.refreshTokenSvc.CreateRefreshToken(refreshToken.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
		return
	}

	h.refreshTokenSvc.RevokeRefreshToken(req.RefreshToken)

	c.JSON(http.StatusOK, gin.H{
		"access_token":  accessToken,
		"refresh_token": newRefreshToken.Token,
		"expires_at":    expiresAt,
	})
}

func (h *AuthHandler) Logout(c *gin.Context) {
	userID := c.GetUint("user_id")

	h.refreshTokenSvc.RevokeAllUserTokens(userID)

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}

func (h *AuthHandler) GetProfile(c *gin.Context) {
	userID := c.GetUint("user_id")

	var user models.User
	if err := h.db.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Don't send password in response
	user.Password = ""

	c.JSON(http.StatusOK, user)
}

func (h *AuthHandler) generateAccessToken(userID uint) (string, time.Time, error) {
	expiresAt := time.Now().Add(15 * time.Minute)

	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     expiresAt.Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(h.jwtSecret))
	if err != nil {
		return "", time.Time{}, err
	}
	return tokenString, expiresAt, nil
}
