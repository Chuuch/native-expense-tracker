package handlers

import (
	"money-mate/internal/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AnalyticsHandler struct {
	db *gorm.DB
}

func NewAnalyticsHandler(db *gorm.DB) *AnalyticsHandler {
	return &AnalyticsHandler{db: db}
}

type AnalyticsSummary struct {
	TotalIncome      float64 `json:"total_income"`
	TotalExpenses    float64 `json:"total_expenses"`
	NetAmount        float64 `json:"net_amount"`
	TransactionCount int64   `json:"transaction_count"`
}

type CategoryBreakdown struct {
	Category string  `json:"category"`
	Amount   float64 `json:"amount"`
	Count    int64   `json:"count"`
}

func (h *AnalyticsHandler) GetAnalyticsSummary(c *gin.Context) {
	userID := c.GetUint("user_id")

	startDate := c.DefaultQuery("start_date", time.Now().AddDate(0, 0, -30).Format("2006-01-02"))
	endDate := c.DefaultQuery("end_date", time.Now().Format("2006-01-02"))

	var summary AnalyticsSummary

	h.db.Model(&models.Transaction{}).
		Where("user_id = ? AND type = ? AND date BETWEEN ? AND ?", userID, "income", startDate, endDate).
		Select("COALESCE(SUM(amount), 0)").
		Scan(&summary.TotalIncome)

	h.db.Model(&models.Transaction{}).
		Where("user_id = ? AND type = ? AND date BETWEEN ? AND ?", userID, "expense", startDate, endDate).
		Select("COALESCE(SUM(amount), 0)").
		Scan(&summary.TotalExpenses)

	summary.NetAmount = summary.TotalIncome - summary.TotalExpenses

	h.db.Model(&models.Transaction{}).
		Where("user_id = ? AND date BETWEEN ? AND ?", userID, startDate, endDate).
		Count(&summary.TransactionCount)

	c.JSON(http.StatusOK, gin.H{"data": summary})
}

func (h *AnalyticsHandler) GetCategoryBreakDown(c *gin.Context) {
	userID := c.GetUint("user_id")
	transactionType := c.DefaultQuery("type", "expense")

	startDate := c.DefaultQuery("start_date", time.Now().AddDate(0, 0, -30).Format("2006-01-02"))
	endDate := c.DefaultQuery("end_date", time.Now().Format("2006-01-02"))

	var breakdown []CategoryBreakdown

	h.db.Model(&models.Transaction{}).
		Select("category, SUM(amount) as amount, COUNT(*) as count").
		Where("user_id = ? AND type = ? AND date BETWEEN ? AND ?", userID, transactionType, startDate, endDate).
		Group("category").
		Order("amount DESC").
		Scan(&breakdown)

	c.JSON(http.StatusOK, gin.H{"data": breakdown})
}

func (h *AnalyticsHandler) GetMonthlyTrends(c *gin.Context) {
	userID := c.GetUint("user_id")
	year := c.DefaultQuery("year", time.Now().Format("2006"))

	type MonthlyData struct {
		Month     string  `json:"month"`
		Income    float64 `json:"income"`
		Expenses  float64 `json:"expenses"`
		NetAmount float64 `json:"net_amount"`
	}

	var monthlyData []MonthlyData

	h.db.Raw(`
		SELECT
			DATE_FORMAT(date, '%Y-%m') as month,
			COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as income,
			COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as expenses,
			COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) as net_amount
		FROM transactions
		WHERE user_id = ? AND YEAR(date) = ?
		GROUP BY DATE_FORMAT(date, '%Y-%m')
		ORDER BY month
	`, userID, year).Scan(&monthlyData)

	c.JSON(http.StatusOK, gin.H{"data": monthlyData})
}
