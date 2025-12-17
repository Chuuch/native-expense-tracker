package handlers

import (
	"money-mate/internal/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type TransactionHandler struct {
	db *gorm.DB
}

func NewTransactionHandler(db *gorm.DB) *TransactionHandler {
	return &TransactionHandler{db: db}
}

type CreateTransactionRequest struct {
	Amount      float64   `json:"amount" binding:"required"`
	Type        string    `json:"type" binding:"required,oneof=income expense"`
	Category    string    `json:"category" binding:"required"`
	Description string    `json:"description"`
	Date        time.Time `json:"date"`
}

type UpdateTransactionRequest struct {
	Amount      *float64   `json:"amount"`
	Type        *string    `json:"type" binding:"omitempty,oneof=income expense"`
	Category    *string    `json:"category"`
	Description *string    `json:"description"`
	Date        *time.Time `json:"date"`
}

func (h *TransactionHandler) GetTransaction(c *gin.Context) {
	userID := c.GetUint("userID")

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset := (page - 1) * limit

	var transactions []models.Transaction
	var total int64

	h.db.Model(&models.Transaction{}).Where("user_id = ?", userID).Count(&total)

	if err := h.db.Where("user_id = ?", userID).
		Order("date DESC").
		Offset(offset).
		Limit(limit).
		Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve transactions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": transactions,
		"pagination": gin.H{
			"page":  page,
			"limit": limit,
			"total": total,
			"pages": (total + int64(limit) - 1) / int64(limit),
		},
	})
}

func (h *TransactionHandler) CreateTransaction(c *gin.Context) {
	userID := c.GetUint("user_id")

	var req CreateTransactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.Date.IsZero() {
		req.Date = time.Now()
	}

	transaction := models.Transaction{
		UserID:      userID,
		Amount:      req.Amount,
		Type:        req.Type,
		Category:    req.Category,
		Description: req.Description,
		Date:        req.Date,
	}

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

	var req UpdateTransactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updates := make(map[string]any)

	if req.Amount != nil {
		updates["amount"] = *req.Amount
	}
	if req.Type != nil {
		updates["type"] = *req.Type
	}
	if req.Category != nil {
		updates["category"] = *req.Category
	}
	if req.Description != nil {
		updates["description"] = *req.Description
	}
	if req.Date != nil {
		updates["date"] = *req.Date
	}

	if err := h.db.Model(&transaction).Updates(updates).Error; err != nil {
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
