package models

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	UserID      uint           `json:"user_id" gorm:"not null"`
	Amount      float64        `json:"amount" gorm:"not null"`
	Type        string         `json:"type" gorm:"not null;check:type IN ('income','expense')"`
	Category    string         `json:"category" gorm:"not null"`
	Description string         `json:"description"`
	Date        time.Time      `json:"date" gorm:"not null"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}
