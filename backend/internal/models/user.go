package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	Email         string         `json:"email" gorm:"uniqueIndex;not null"`
	Password      string         `json:"-" gorm:"not null"`
	Fullname      string         `json:"full_name" gorm:"not null"`
	Currency      string         `json:"currency" gorm:"default:'USD'"`
	EmailVerified bool           `json:"email_verified" gorm:"default:false"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`

	Transactions      []Transaction      `json:"transactions,omitempty"`
	SavingsGoals      []SavingsGoal      `json:"savings_goals,omitempty"`
	VerificationCodes []VerificationCode `json:"verification_codes,omitempty"`
	RefreshTokens     []RefreshToken     `json:"refresh_tokens,omitempty"`
}
