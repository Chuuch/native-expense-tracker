package services

import (
	"fmt"
	"math/rand"
	"money-mate/internal/models"
	"time"

	"gorm.io/gorm"
)

type VerificationService struct {
	db *gorm.DB
}

func NewVerificationService(db *gorm.DB) *VerificationService {
	return &VerificationService{db: db}
}

func (s *VerificationService) GenerateOTP() string {
	code := fmt.Sprintf("%06d", rand.Intn(1000000))
	return code
}

func (s *VerificationService) CreateVerificationCode(userID uint, codeType string) (*models.VerificationCode, error) {
	s.db.Model(&models.VerificationCode{}).
		Where("user_id = ? AND type = ? AND used = ?", userID, codeType, false).
		Update("used", true)

	verificationCode := &models.VerificationCode{
		UserID:    userID,
		Code:      s.GenerateOTP(),
		Type:      codeType,
		ExpiresAt: time.Now().Add(10 * time.Minute),
		Used:      false,
	}

	err := s.db.Create(verificationCode).Error
	return verificationCode, err
}

func (s *VerificationService) VerifyCode(userID uint, code, codeType string) (bool, error) {
	var verificationCode models.VerificationCode

	err := s.db.Where("user_id = ? AND code = ? AND type = ? AND user = ? AND expires_at > ?", userID, code, codeType, false, time.Now()).
		First(&verificationCode).Error

	if err != nil {
		return false, err
	}

	s.db.Model(&verificationCode).Update("used", true)
	return true, nil
}

func (s *VerificationService) SendVerificationCode(user *models.User, code string, codeType string) error {
	switch codeType {
	case "email_verification":
		return s.sendEmailVerification(user.Email, code)
	case "password_reset":
		return s.sendPasswordResetEmail(user.Email, code)
	default:
		return fmt.Errorf("unknown code type: %s", codeType)
	}
}

func (s *VerificationService) sendEmailVerification(email, code string) error {
	fmt.Printf("Sending email verification code %s to %s\n", code, email)
	return nil
}

func (s *VerificationService) sendPasswordResetEmail(email, code string) error {
	fmt.Printf("Sending password reset code %s to %s\n", code, email)
	return nil
}
