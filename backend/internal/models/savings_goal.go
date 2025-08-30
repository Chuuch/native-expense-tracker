package models

import (
	"time"

	"gorm.io/gorm"
)

type SavingsGoal struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	UserID        uint           `json:"user_id" gorm:"not null"`
	Name          string         `json:"name" gorm:"size:255;not null"`
	TargetAmount  float64        `json:"target_amount" gorm:"not null"`
	CurrentAmount float64        `json:"current_amount" gorm:"default:0"`
	TargetDate    *time.Time     `json:"target_date"`
	Category      string         `json:"category" gorm:"size:100;not null"`
	IsActive      bool           `json:"is_active" gorm:"default:true"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`

	User User `json:"user,omitempty"`
}

type SavingsContribution struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	GoalID    uint           `json:"goal_id" gorm:"not null"`
	UserID    uint           `json:"user_id" gorm:"not null"`
	Amount    float64        `json:"amount" gorm:"not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAd time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}
