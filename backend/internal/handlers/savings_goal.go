package handlers

import (
	"money-mate/internal/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type SavingsGoalHandler struct {
	db *gorm.DB
}

func NewSavingsGoalHandler(db *gorm.DB) *SavingsGoalHandler {
	return &SavingsGoalHandler{db: db}
}

type CreateSavingsGoalRequest struct {
	Name         string     `json:"name" binding:"required"`
	TargetAmount float64    `json:"target_amount" binding:"required,gt=0"`
	TargetDate   *time.Time `json:"target_date"`
	Category     string     `json:"category" binding:"required"`
}

type UpdateSavingsGoalRequest struct {
	Name         *string    `json:"name"`
	TargetAmount *float64   `json:"target_amount" binding:"omitempty,gt=0"`
	TargetDate   *time.Time `json:"target_date"`
	Category     *string    `json:"category"`
	IsActive     *bool      `json:"is_active"`
}

type ContributeRequest struct {
	Amount float64 `json:"amount" binding:"required,gt=0"`
}

func (h *SavingsGoalHandler) GetSavingsGoals(c *gin.Context) {
	userID := c.GetUint("user_id")

	var goals []models.SavingsGoal
	if err := h.db.Where("user_id = ? AND is_active = ?", userID, true).
		Order("created_at DESC").
		Find(&goals).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve savings goals"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": goals})
}

func (h *SavingsGoalHandler) CreateSavingsGoal(c *gin.Context) {
	userID := c.GetUint("user_id")

	var req CreateSavingsGoalRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	goal := models.SavingsGoal{
		UserID:        userID,
		Name:          req.Name,
		TargetAmount:  req.TargetAmount,
		CurrentAmount: 0,
		TargetDate:    req.TargetDate,
		Category:      req.Category,
		IsActive:      true,
	}

	if err := h.db.Create(&goal).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create savings goal"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": goal})
}

func (h *SavingsGoalHandler) UpdateSavingsGoal(c *gin.Context) {
	userID := c.GetUint("user_id")
	goalID, _ := strconv.ParseUint(c.Param("id"), 10, 32)

	var goal models.SavingsGoal
	if err := h.db.Where("id = ? AND user_id = ?", goalID, userID).First(&goal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Savings goal not found"})
		return
	}

	var req UpdateSavingsGoalRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updates := make(map[string]interface{})
	if req.Name != nil {
		updates["name"] = *req.Name
	}
	if req.TargetAmount != nil {
		updates["target_amount"] = *req.TargetAmount
	}
	if req.TargetDate != nil {
		updates["target_date"] = *req.TargetDate
	}
	if req.Category != nil {
		updates["category"] = *req.Category
	}
	if req.IsActive != nil {
		updates["is_active"] = *req.IsActive
	}

	if err := h.db.Model(&goal).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update savings goal"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": goal})
}

func (h *SavingsGoalHandler) DeleteSavingsGoal(c *gin.Context) {
	userID := c.GetUint("user_id")
	goalID, _ := strconv.ParseUint(c.Param("id"), 10, 32)

	if err := h.db.Where("id = ? AND user_id = ?", goalID, userID).Delete(&models.SavingsGoal{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete savings goal"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Savings goal deleted successfully"})
}

func (h *SavingsGoalHandler) ContributeToGoal(c *gin.Context) {
	userID := c.GetUint("user_id")
	goalID, _ := strconv.ParseUint(c.Param("id"), 10, 32)

	var req ContributeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.db.Transaction(func(tx *gorm.DB) error {
		var goal models.SavingsGoal
		if err := tx.Where("id = ? AND user_id = ?", goalID, userID).First(&goal).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Savings goal not found"})
			return err
		}

		goal.CurrentAmount += req.Amount
		if err := tx.Save(&goal).Error; err != nil {
			return err
		}

		contribution := models.SavingsContribution{
			GoalID: uint(goalID),
			UserID: userID,
			Amount: req.Amount,
		}
		return tx.Create(&contribution).Error
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to contribute to savings goal"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Contribution added successfully"})
}
