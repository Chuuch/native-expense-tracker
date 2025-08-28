package migrations

import (
	"money-mate/internal/models"

	"gorm.io/gorm"
)

func RunMigrations(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
		&models.Transaction{},
		&models.SavingsGoal{},
		&models.SavingsContribution{},
		&models.VerificationCode{},
		&models.RefreshToken{},
	)
}
