# Eetmad Backend (Go + Gin + GORM + PostgreSQL)

منصة ربط العملاء بالموردين - الباك إند مكتوب بـ Go

## المميزات الحالية
- تسجيل مستخدم (Register) شغال 100%
- اتصال بقاعدة بيانات PostgreSQL حقيقية
- هيكلة نظيفة وجاهزة لإضافة باقي الـ APIs

## كيف تشغّل المشروع
```bash
cp .env.example .env
# عدّل الـ DATABASE_URL في .env
go run main.go
API جاهز على: http://localhost:8080
