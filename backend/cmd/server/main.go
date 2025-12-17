package main

import (
	"log"
	"money-mate/pkg/config"
	"net/http"

	"money-mate/internal/auth"
	migrations "money-mate/internal/database"
	"money-mate/internal/handlers"
	"money-mate/internal/middleware"
	"money-mate/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	cfg := config.Load()

	db, err := gorm.Open(mysql.Open(cfg.DatabaseURL), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	if err := migrations.RunMigrations(db); err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	// Initialize email service
	emailService := services.NewEmailService(cfg)

	// Initialize Gin router
	router := gin.Default()

	// Middleware
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.CORS())

	// Initialize handlers
	authHandler := auth.NewAuthHandler(db, emailService, cfg.JWTSecret)
	transactionHandler := handlers.NewTransactionHandler(db)
	savingsHandler := handlers.NewSavingsGoalHandler(db)
	analyticsHandler := handlers.NewAnalyticsHandler(db)

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "Expense Tracker API is running",
			"version": "1.0.0",
		})
	})

	// Public routes (no authentication required)
	router.POST("/auth/register", authHandler.Register)
	router.POST("/auth/login", authHandler.Login)
	router.POST("/auth/verify-email", authHandler.VerifyEmail)
	router.POST("/auth/resend-verification", authHandler.ResendVerification)
	router.POST("/auth/refresh", authHandler.RefreshToken)
	// router.POST("/auth/forgot-password", authHandler.ForgotPassword)
	// router.POST("/auth/reset-password", authHandler.ResetPassword)

	// Protected routes (authentication required)
	protected := router.Group("/api")
	protected.Use(auth.AuthMiddleware(cfg.JWTSecret))
	{
		// Authentication routes
		protected.POST("/auth/logout", authHandler.Logout)
		protected.GET("/auth/profile", authHandler.GetProfile)
		// protected.PUT("/auth/profile", authHandler.UpdateProfile)
		// protected.PUT("/auth/change-password", authHandler.ChangePassword)

		// Transaction routes
		// protected.GET("/transactions", transactionHandler.GetTransactions)
		protected.POST("/transactions", transactionHandler.CreateTransaction)
		protected.PUT("/transactions/:id", transactionHandler.UpdateTransaction)
		protected.DELETE("/transactions/:id", transactionHandler.DeleteTransaction)
		// protected.GET("/transactions/summary", transactionHandler.GetTransactionSummary)

		// Savings goals routes
		protected.GET("/savings-goals", savingsHandler.GetSavingsGoals)
		protected.POST("/savings-goals", savingsHandler.CreateSavingsGoal)
		protected.PUT("/savings-goals/:id", savingsHandler.UpdateSavingsGoal)
		protected.DELETE("/savings-goals/:id", savingsHandler.DeleteSavingsGoal)
		protected.POST("/savings-goals/:id/contribute", savingsHandler.ContributeToGoal)
		// protected.GET("/savings-goals/summary", savingsHandler.GetSavingsSummary)

		// Analytics routes
		protected.GET("/analytics/summary", analyticsHandler.GetAnalyticsSummary)
		// protected.GET("/analytics/category-breakdown", analyticsHandler.GetCategoryBreakdown)
		// protected.GET("/analytics/monthly-trends", analyticsHandler.GetMonthlyTrends)
		// protected.GET("/analytics/expense-trends", analyticsHandler.GetExpenseTrends)
		// protected.GET("/analytics/income-trends", analyticsHandler.GetIncomeTrends)
		// protected.GET("/analytics/budget-analysis", analyticsHandler.GetBudgetAnalysis)

		// Export routes
		// protected.GET("/export/transactions", transactionHandler.ExportTransactions)
		// protected.GET("/export/analytics", analyticsHandler.ExportAnalytics)
	}

	// Admin routes (if needed)
	// admin := router.Group("/admin")
	// admin.Use(auth.AdminMiddleware()) // You'll need to implement this
	{
		// admin.GET("/users", authHandler.GetAllUsers)
		// admin.GET("/users/:id", authHandler.GetUserByID)
		// admin.PUT("/users/:id/status", authHandler.UpdateUserStatus)
		// admin.GET("/system/stats", authHandler.GetSystemStats)
	}

	// Error handling middleware
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Not Found",
			"message": "The requested endpoint does not exist",
			"path":    c.Request.URL.Path,
		})
	})

	// Start server
	log.Printf("Server starting on port %s", cfg.Port)
	log.Printf("📊 Environment: %s", cfg.Environment)
	log.Printf("🗄️  Database: Connected successfully")

	if err := http.ListenAndServe(":"+cfg.Port, router); err != nil {
		log.Fatal("❌ Failed to start server:", err)
	}

}
