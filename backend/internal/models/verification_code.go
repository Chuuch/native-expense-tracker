package models

import (
	"time"

	"gorm.io/gorm"
)

type VerificationCode struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	UserID    uint           `json:"user_id" gorm:"not null"`
	Code      string         `json:"code" gorm:"size:10;not null"`
	Type      string         `json:"type" gorm:"size:255;not null;check:type IN ('email_verification', 'password_reset', 'phone_verification')"`
	ExpiresAt time.Time      `json:"expires_at" gorm:"not null"`
	Used      bool           `json:"used" gorm:"not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	User User `json:"user,omitempty"`
}
