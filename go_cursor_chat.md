**User**

I have decided to build a dedicated backend server & a mysql database. Can you show me what a backend server written in Golang would look like for our application?

---

**Cursor**

Great choice! A Go backend with MySQL will give you excellent performance and type safety. Here's a comprehensive Go backend structure for your expense tracker app:

## Project Structure
```
backend/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── auth/
│   │   ├── handler.go
│   │   ├── middleware.go
│   │   └── service.go
│   ├── database/
│   │   ├── connection.go
│   │   └── migrations/
│   ├── models/
│   │   ├── user.go
│   │   ├── transaction.go
│   │   └── savings_goal.go
│   ├── handlers/
│   │   ├── transaction.go
│   │   ├── savings_goal.go
│   │   └── analytics.go
│   ├── services/
│   │   ├── transaction_service.go
│   │   ├── savings_service.go
│   │   └── analytics_service.go
│   └── utils/
│       ├── jwt.go
│       └── response.go
├── pkg/
│   └── config/
│       └── config.go
├── go.mod
└── .env
```

## 1. Main Application Entry Point

```go:cmd/server/main.go
package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"your-app/internal/auth"
	"your-app/internal/database"
	"your-app/internal/handlers"
	"your-app/internal/middleware"
	"your-app/pkg/config"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize config
	cfg := config.Load()

	// Initialize database
	db, err := gorm.Open(mysql.Open(cfg.DatabaseURL), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Run migrations
	if err := database.RunMigrations(db); err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	// Initialize Gin router
	router := gin.Default()

	// Middleware
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.CORS())

	// Public routes
	router.POST("/auth/register", auth.RegisterHandler)
	router.POST("/auth/login", auth.LoginHandler)
	router.POST("/auth/refresh", auth.RefreshTokenHandler)

	// Protected routes
	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		// User routes
		protected.GET("/user/profile", handlers.GetUserProfile)
		protected.PUT("/user/profile", handlers.UpdateUserProfile)

		// Transaction routes
		protected.GET("/transactions", handlers.GetTransactions)
		protected.POST("/transactions", handlers.CreateTransaction)
		protected.PUT("/transactions/:id", handlers.UpdateTransaction)
		protected.DELETE("/transactions/:id", handlers.DeleteTransaction)

		// Savings goals routes
		protected.GET("/savings-goals", handlers.GetSavingsGoals)
		protected.POST("/savings-goals", handlers.CreateSavingsGoal)
		protected.PUT("/savings-goals/:id", handlers.UpdateSavingsGoal)
		protected.DELETE("/savings-goals/:id", handlers.DeleteSavingsGoal)
		protected.POST("/savings-goals/:id/contribute", handlers.ContributeToGoal)

		// Analytics routes
		protected.GET("/analytics/summary", handlers.GetAnalyticsSummary)
		protected.GET("/analytics/category-breakdown", handlers.GetCategoryBreakdown)
		protected.GET("/analytics/monthly-trends", handlers.GetMonthlyTrends)
	}

	// Start server
	log.Printf("Server starting on port %s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, router); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
```

## 2. Configuration

```go:pkg/config/config.go
package config

import (
	"os"
)

type Config struct {
	Port        string
	DatabaseURL string
	JWTSecret   string
	Environment string
}

func Load() *Config {
	return &Config{
		Port:        getEnv("PORT", "8080"),
		DatabaseURL: getEnv("DATABASE_URL", "user:password@tcp(localhost:3306)/expense_tracker?charset=utf8mb4&parseTime=True&loc=Local"),
		JWTSecret:   getEnv("JWT_SECRET", "your-secret-key"),
		Environment: getEnv("ENVIRONMENT", "development"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
```

## 3. Database Models

```go:internal/models/user.go
package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Email     string         `json:"email" gorm:"uniqueIndex;not null"`
	Password  string         `json:"-" gorm:"not null"`
	FullName  string         `json:"full_name" gorm:"not null"`
	Currency  string         `json:"currency" gorm:"default:'USD'"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	// Relationships
	Transactions  []Transaction   `json:"transactions,omitempty"`
	SavingsGoals []SavingsGoal   `json:"savings_goals,omitempty"`
}
```

```go:internal/models/transaction.go
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

	// Relationships
	User User `json:"user,omitempty"`
}
```

```go:internal/models/savings_goal.go
package models

import (
	"time"

	"gorm.io/gorm"
)

type SavingsGoal struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	UserID        uint           `json:"user_id" gorm:"not null"`
	Name          string         `json:"name" gorm:"not null"`
	TargetAmount  float64        `json:"target_amount" gorm:"not null"`
	CurrentAmount float64        `json:"current_amount" gorm:"default:0"`
	TargetDate    *time.Time     `json:"target_date"`
	Category      string         `json:"category" gorm:"not null"`
	Icon          string         `json:"icon"`
	Color         string         `json:"color" gorm:"default:'#CBFD03'"`
	IsActive      bool           `json:"is_active" gorm:"default:true"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`

	// Relationships
	User User `json:"user,omitempty"`
}
```

## 4. Authentication Middleware

```go:internal/auth/middleware.go
package auth

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte("your-secret-key"), nil // Use config
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			c.Abort()
			return
		}

		userID, ok := claims["user_id"].(float64)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID in token"})
			c.Abort()
			return
		}

		c.Set("user_id", uint(userID))
		c.Next()
	}
}
```

## 5. Transaction Handler

```go:internal/handlers/transaction.go
package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"your-app/internal/models"
)

type TransactionHandler struct {
	db *gorm.DB
}

func NewTransactionHandler(db *gorm.DB) *TransactionHandler {
	return &TransactionHandler{db: db}
}

func (h *TransactionHandler) GetTransactions(c *gin.Context) {
	userID := c.GetUint("user_id")
	
	var transactions []models.Transaction
	if err := h.db.Where("user_id = ?", userID).Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch transactions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": transactions})
}

func (h *TransactionHandler) CreateTransaction(c *gin.Context) {
	userID := c.GetUint("user_id")
	
	var transaction models.Transaction
	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	transaction.UserID = userID
	
	if err := h.db.Create(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": transaction})
}

func (h *TransactionHandler) UpdateTransaction(c *gin.Context) {
	userID := c.GetUint("user_id")
	transactionID, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	
	var transaction models.Transaction
	if err := h.db.Where("id = ? AND user_id = ?", transactionID, userID).First(&transaction).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}

	var updateData models.Transaction
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.db.Model(&transaction).Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": transaction})
}

func (h *TransactionHandler) DeleteTransaction(c *gin.Context) {
	userID := c.GetUint("user_id")
	transactionID, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	
	if err := h.db.Where("id = ? AND user_id = ?", transactionID, userID).Delete(&models.Transaction{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transaction deleted successfully"})
}
```

## 6. Savings Goal Service

```go:internal/services/savings_service.go
package services

import (
	"your-app/internal/models"
	"gorm.io/gorm"
)

type SavingsGoalService struct {
	db *gorm.DB
}

func NewSavingsGoalService(db *gorm.DB) *SavingsGoalService {
	return &SavingsGoalService{db: db}
}

func (s *SavingsGoalService) CreateGoal(userID uint, goal *models.SavingsGoal) error {
	goal.UserID = userID
	return s.db.Create(goal).Error
}

func (s *SavingsGoalService) GetUserGoals(userID uint) ([]models.SavingsGoal, error) {
	var goals []models.SavingsGoal
	err := s.db.Where("user_id = ? AND is_active = ?", userID, true).Find(&goals).Error
	return goals, err
}

func (s *SavingsGoalService) ContributeToGoal(goalID, userID uint, amount float64) error {
	return s.db.Transaction(func(tx *gorm.DB) error {
		var goal models.SavingsGoal
		if err := tx.Where("id = ? AND user_id = ?", goalID, userID).First(&goal).Error; err != nil {
			return err
		}

		goal.CurrentAmount += amount
		if err := tx.Save(&goal).Error; err != nil {
			return err
		}

		// Create contribution record
		contribution := models.SavingsContribution{
			GoalID: goalID,
			UserID: userID,
			Amount: amount,
		}
		return tx.Create(&contribution).Error
	})
}
```

## 7. Database Migrations

```go:internal/database/migrations.go
package database

import (
	"your-app/internal/models"
	"gorm.io/gorm"
)

func RunMigrations(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
		&models.Transaction{},
		&models.SavingsGoal{},
		&models.SavingsContribution{},
	)
}
```

## 8. Go Module File

```go:go.mod
module your-app

go 1.21

require (
	github.com/gin-gonic/gin v1.9.1
	github.com/golang-jwt/jwt/v5 v5.0.0
	github.com/joho/godotenv v1.4.0
	gorm.io/driver/mysql v1.5.1
	gorm.io/gorm v1.25.4
)
```

## 9. Environment Variables

```bash:.env
PORT=8080
DATABASE_URL=user:password@tcp(localhost:3306)/expense_tracker?charset=utf8mb4&parseTime=True&loc=Local
JWT_SECRET=your-super-secret-jwt-key-here
ENVIRONMENT=development
```

## Key Features of This Backend:

1. **Gin Framework**: Fast HTTP router with middleware support
2. **GORM**: ORM for database operations with auto-migrations
3. **JWT Authentication**: Secure token-based auth
4. **Middleware**: CORS, authentication, logging
5. **Service Layer**: Business logic separation
6. **Error Handling**: Proper HTTP status codes and error messages
7. **Database Transactions**: For complex operations like goal contributions
8. **Environment Configuration**: Flexible config management

## To Run:

```bash
cd backend
go mod tidy
go run cmd/server/main.go
```

This gives you a solid foundation for your expense tracker backend. You can extend it with additional features like real-time notifications, file uploads, or integration with financial APIs.

```plaintext
backend/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── auth/
│   │   ├── handler.go
│   │   ├── middleware.go
│   │   └── service.go
│   ├── database/
│   │   ├── connection.go
│   │   └── migrations/
│   ├── models/
│   │   ├── user.go
│   │   ├── transaction.go
│   │   └── savings_goal.go
│   ├── handlers/
│   │   ├── transaction.go
│   │   ├── savings_goal.go
│   │   └── analytics.go
│   ├── services/
│   │   ├── transaction_service.go
│   │   ├── savings_service.go
│   │   └── analytics_service.go
│   └── utils/
│       ├── jwt.go
│       └── response.go
├── pkg/
│   └── config/
│       └── config.go
├── go.mod
└── .env
```

```go
package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"your-app/internal/auth"
	"your-app/internal/database"
	"your-app/internal/handlers"
	"your-app/internal/middleware"
	"your-app/pkg/config"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize config
	cfg := config.Load()

	// Initialize database
	db, err := gorm.Open(mysql.Open(cfg.DatabaseURL), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Run migrations
	if err := database.RunMigrations(db); err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	// Initialize Gin router
	router := gin.Default()

	// Middleware
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.CORS())

	// Public routes
	router.POST("/auth/register", auth.RegisterHandler)
	router.POST("/auth/login", auth.LoginHandler)
	router.POST("/auth/refresh", auth.RefreshTokenHandler)

	// Protected routes
	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		// User routes
		protected.GET("/user/profile", handlers.GetUserProfile)
		protected.PUT("/user/profile", handlers.UpdateUserProfile)

		// Transaction routes
		protected.GET("/transactions", handlers.GetTransactions)
		protected.POST("/transactions", handlers.CreateTransaction)
		protected.PUT("/transactions/:id", handlers.UpdateTransaction)
		protected.DELETE("/transactions/:id", handlers.DeleteTransaction)

		// Savings goals routes
		protected.GET("/savings-goals", handlers.GetSavingsGoals)
		protected.POST("/savings-goals", handlers.CreateSavingsGoal)
		protected.PUT("/savings-goals/:id", handlers.UpdateSavingsGoal)
		protected.DELETE("/savings-goals/:id", handlers.DeleteSavingsGoal)
		protected.POST("/savings-goals/:id/contribute", handlers.ContributeToGoal)

		// Analytics routes
		protected.GET("/analytics/summary", handlers.GetAnalyticsSummary)
		protected.GET("/analytics/category-breakdown", handlers.GetCategoryBreakdown)
		protected.GET("/analytics/monthly-trends", handlers.GetMonthlyTrends)
	}

	// Start server
	log.Printf("Server starting on port %s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, router); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
```

```go
package config

import (
	"os"
)

type Config struct {
	Port        string
	DatabaseURL string
	JWTSecret   string
	Environment string
}

func Load() *Config {
	return &Config{
		Port:        getEnv("PORT", "8080"),
		DatabaseURL: getEnv("DATABASE_URL", "user:password@tcp(localhost:3306)/expense_tracker?charset=utf8mb4&parseTime=True&loc=Local"),
		JWTSecret:   getEnv("JWT_SECRET", "your-secret-key"),
		Environment: getEnv("ENVIRONMENT", "development"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
```

```go
package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Email     string         `json:"email" gorm:"uniqueIndex;not null"`
	Password  string         `json:"-" gorm:"not null"`
	FullName  string         `json:"full_name" gorm:"not null"`
	Currency  string         `json:"currency" gorm:"default:'USD'"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	// Relationships
	Transactions  []Transaction   `json:"transactions,omitempty"`
	SavingsGoals []SavingsGoal   `json:"savings_goals,omitempty"`
}
```

```go
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

	// Relationships
	User User `json:"user,omitempty"`
}
```

```go
package models

import (
	"time"

	"gorm.io/gorm"
)

type SavingsGoal struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	UserID        uint           `json:"user_id" gorm:"not null"`
	Name          string         `json:"name" gorm:"not null"`
	TargetAmount  float64        `json:"target_amount" gorm:"not null"`
	CurrentAmount float64        `json:"current_amount" gorm:"default:0"`
	TargetDate    *time.Time     `json:"target_date"`
	Category      string         `json:"category" gorm:"not null"`
	Icon          string         `json:"icon"`
	Color         string         `json:"color" gorm:"default:'#CBFD03'"`
	IsActive      bool           `json:"is_active" gorm:"default:true"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`

	// Relationships
	User User `json:"user,omitempty"`
}
```

```go
package auth

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte("your-secret-key"), nil // Use config
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			c.Abort()
			return
		}

		userID, ok := claims["user_id"].(float64)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID in token"})
			c.Abort()
			return
		}

		c.Set("user_id", uint(userID))
		c.Next()
	}
}
```

```go
package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"your-app/internal/models"
)

type TransactionHandler struct {
	db *gorm.DB
}

func NewTransactionHandler(db *gorm.DB) *TransactionHandler {
	return &TransactionHandler{db: db}
}

func (h *TransactionHandler) GetTransactions(c *gin.Context) {
	userID := c.GetUint("user_id")
	
	var transactions []models.Transaction
	if err := h.db.Where("user_id = ?", userID).Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch transactions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": transactions})
}

func (h *TransactionHandler) CreateTransaction(c *gin.Context) {
	userID := c.GetUint("user_id")
	
	var transaction models.Transaction
	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	transaction.UserID = userID
	
	if err := h.db.Create(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": transaction})
}

func (h *TransactionHandler) UpdateTransaction(c *gin.Context) {
	userID := c.GetUint("user_id")
	transactionID, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	
	var transaction models.Transaction
	if err := h.db.Where("id = ? AND user_id = ?", transactionID, userID).First(&transaction).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}

	var updateData models.Transaction
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.db.Model(&transaction).Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": transaction})
}

func (h *TransactionHandler) DeleteTransaction(c *gin.Context) {
	userID := c.GetUint("user_id")
	transactionID, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	
	if err := h.db.Where("id = ? AND user_id = ?", transactionID, userID).Delete(&models.Transaction{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transaction deleted successfully"})
}
```

```go
package services

import (
	"your-app/internal/models"
	"gorm.io/gorm"
)

type SavingsGoalService struct {
	db *gorm.DB
}

func NewSavingsGoalService(db *gorm.DB) *SavingsGoalService {
	return &SavingsGoalService{db: db}
}

func (s *SavingsGoalService) CreateGoal(userID uint, goal *models.SavingsGoal) error {
	goal.UserID = userID
	return s.db.Create(goal).Error
}

func (s *SavingsGoalService) GetUserGoals(userID uint) ([]models.SavingsGoal, error) {
	var goals []models.SavingsGoal
	err := s.db.Where("user_id = ? AND is_active = ?", userID, true).Find(&goals).Error
	return goals, err
}

func (s *SavingsGoalService) ContributeToGoal(goalID, userID uint, amount float64) error {
	return s.db.Transaction(func(tx *gorm.DB) error {
		var goal models.SavingsGoal
		if err := tx.Where("id = ? AND user_id = ?", goalID, userID).First(&goal).Error; err != nil {
			return err
		}

		goal.CurrentAmount += amount
		if err := tx.Save(&goal).Error; err != nil {
			return err
		}

		// Create contribution record
		contribution := models.SavingsContribution{
			GoalID: goalID,
			UserID: userID,
			Amount: amount,
		}
		return tx.Create(&contribution).Error
	})
}
```

```go
package database

import (
	"your-app/internal/models"
	"gorm.io/gorm"
)

func RunMigrations(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
		&models.Transaction{},
		&models.SavingsGoal{},
		&models.SavingsContribution{},
	)
}
```

```go
module your-app

go 1.21

require (
	github.com/gin-gonic/gin v1.9.1
	github.com/golang-jwt/jwt/v5 v5.0.0
	github.com/joho/godotenv v1.4.0
	gorm.io/driver/mysql v1.5.1
	gorm.io/gorm v1.25.4
)
```

```shellscript
PORT=8080
DATABASE_URL=user:password@tcp(localhost:3306)/expense_tracker?charset=utf8mb4&parseTime=True&loc=Local
JWT_SECRET=your-super-secret-jwt-key-here
ENVIRONMENT=development
```

```shellscript
cd backend
go mod tidy
go run cmd/server/main.go
```

