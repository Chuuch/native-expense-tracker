package services

import (
	"crypto/rand"
	"encoding/hex"
	"money-mate/internal/models"
	"time"

	"gorm.io/gorm"
)

type RefreshTokenService struct {
	db *gorm.DB
}

func NewRefreshTokenService(db *gorm.DB) *RefreshTokenService {
	return &RefreshTokenService{db: db}
}

func (s *RefreshTokenService) GenerateRefreshToken() string {
	bytes := make([]byte, 32)
	rand.Read(bytes)
	return hex.EncodeToString(bytes)
}

func (s *RefreshTokenService) CreateRefreshToken(userID uint) (*models.RefreshToken, error) {
	s.db.Model(&models.RefreshToken{}).
		Where("user_id = ? AND revoked = ?", userID, false).
		Update("revoked", true)

	refreshToken := &models.RefreshToken{
		UserID:    userID,
		Token:     s.GenerateRefreshToken(),
		ExpiresAt: time.Now().AddDate(0, 1, 0),
		Revoked:   false,
	}

	err := s.db.Create(refreshToken).Error
	return refreshToken, err
}

func (s *RefreshTokenService) ValidateRefreshToken(token string) (*models.RefreshToken, error) {
	var refreshToken models.RefreshToken

	err := s.db.Where("token = ? AND revoked = ? AND expires_at > ?", token, false, time.Now()).
		First(&refreshToken).Error

	return &refreshToken, err
}

func (s *RefreshTokenService) RevokeRefreshToken(token string) error {
	return s.db.Model(&models.RefreshToken{}).
		Where("token = ?", token).
		Update("revoked", true).Error
}

func (s *RefreshTokenService) RevokeAllUserTokens(userID uint) error {
	return s.db.Model(&models.RefreshToken{}).
		Where("user_id = ?", userID).
		Update("revoked", true).Error
}
