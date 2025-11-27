package main

import (
	"log"
	"os"

	"github.com/eetmad/backend/database"
	"github.com/eetmad/backend/models"
	"github.com/eetmad/backend/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	database.Connect()
	database.DB.AutoMigrate(&models.User{})

	r := gin.Default()
	routes.RegisterRoutes(r)   // ← الاسم الصحيح الآن

	port := os.Getenv("PORT")
	if port == "" { port = "8080" }

	log.Printf("API شغال 100% على http://localhost:%s", port)
	log.Fatal(r.Run(":" + port))
}
