package controllers

import (
	"net/http"
	"regexp"

	"github.com/eetmad/backend/database"
	"github.com/eetmad/backend/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type RegisterRequest struct {
	Name     string `json:"name" binding:"required,min=3"`
	Email    string `json:"email" binding:"required,email"`
	Phone    string `json:"phone,omitempty"`
	Password string `json:"password" binding:"required,min=8"`
	UserType string `json:"user_type,omitempty"`
}

// @Summary      تسجيل مستخدم جديد
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body  body  RegisterRequest  true  "بيانات التسجيل"
// @Success      201  {object}  map[string]interface{}
// @Router       /auth/register [post]
func Register(c *gin.Context) {
	var input RegisterRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if matched, _ := regexp.MatchString(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`, input.Email); !matched {
		c.JSON(http.StatusBadRequest, gin.H{"error": "البريد الإلكتروني غير صالح"})
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)

	user := models.User{
		Name:      input.Name,
		Email:     input.Email,
		Phone:     input.Phone,
		Password:  string(hashedPassword),
		UserType:  "client",
	}

	if input.UserType == "supplier" {
		user.UserType = "supplier"
	}

	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "البريد مستخدم مسبقًا"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "تم التسجيل بنجاح",
		"user": map[string]interface{}{
			"id":        user.ID,
			"name":      user.Name,
			"email":     user.Email,
			"user_type": user.UserType,
		},
	})
}
