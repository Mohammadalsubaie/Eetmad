# Technical Tasks - Service Platform (Complete)

## Document Information

-   **Project:** Freelance Services Platform
-   **Version:** 1.0
-   **Last Updated:** 2025-10-29
-   **Total Estimated Hours:** ~2,400 hours
-   **Format:** GitHub Issues Ready

---

## Table of Contents

1. [Stage 1: Foundation & Core Infrastructure](#stage-1-foundation--core-infrastructure)
2. [Stage 2: User Management & Profiles](#stage-2-user-management--profiles)
3. [Stage 3: Supplier Profile & Portfolio](#stage-3-supplier-profile--portfolio)
4. [Stage 4: Categories Management](#stage-4-categories-management)
5. [Stage 5: Requests Management](#stage-5-requests-management)
6. [Stage 6: Offers Management](#stage-6-offers-management)
7. [Stage 7: Projects & Contracts](#stage-7-projects--contracts)
8. [Stage 8: Payments & Wallet](#stage-8-payments--wallet)
9. [Stage 9: Reviews & Ratings](#stage-9-reviews--ratings)
10. [Stage 10: Messaging System](#stage-10-messaging-system)
11. [Stage 11: Notifications](#stage-11-notifications)
12. [Stage 12: Disputes](#stage-12-disputes)
13. [Stage 13: Reports & Moderation](#stage-13-reports--moderation)
14. [Stage 14: Admin Dashboard](#stage-14-admin-dashboard)
15. [Stage 15: Advanced Features](#stage-15-advanced-features)

# Technical Tasks - Service Platform

Based on the User Stories provided, I'll refactor them into detailed technical tasks organized by development stages and roles (Frontend, Backend, DevOps, QA).

## Stage 1: Foundation & Core Infrastructure

### 1.1 Project Setup & Configuration

#### TASK-001: Initialize Project Repository Structure

**Role:** DevOps Engineer
**Priority:** Critical
**Estimated Time:** 8 hours

**Description:**
Set up the monorepo structure with separate packages for frontend, backend, and shared utilities.

**Acceptance Criteria:**

-   Create Git repository with branching strategy (main, staging, develop, feature/_, bugfix/_)
-   Initialize folder structure:
    ```
    /frontend (Next.js/React)
    /backend (Node.js/NestJS or Laravel)
    /mobile (React Native - future)
    /docs
    /docker
    /.github (CI/CD workflows)
    ```
-   Configure `.gitignore` for all environments
-   Set up commit message conventions (Conventional Commits)
-   Create PR templates and code review guidelines
-   Document Git workflow in `/docs/git-workflow.md`

**Dependencies:** None

**Related US:** US-001 to US-187 (Foundation)

---

#### TASK-002: Configure Development Environment

**Role:** DevOps Engineer
**Priority:** Critical
**Estimated Time:** 12 hours

**Description:**
Set up local development environment with Docker containers for all services.

**Acceptance Criteria:**

-   Create `docker-compose.yml` for local development with:
    -   PostgreSQL 15
    -   Redis 7
    -   Node.js application container
    -   Nginx reverse proxy
-   Configure environment variables template (`.env.example`)
-   Document setup process in `/docs/setup.md`
-   Create startup scripts (`npm run dev`, `docker-compose up`)
-   Ensure hot-reload works for development
-   Configure database migrations folder structure

**Dependencies:** TASK-001

**Related US:** All development-related stories

---

#### TASK-003: Setup CI/CD Pipeline

**Role:** DevOps Engineer
**Priority:** High
**Estimated Time:** 16 hours

**Description:**
Implement automated testing and deployment pipeline using GitHub Actions.

**Acceptance Criteria:**

-   Create GitHub Actions workflows:
    -   `test.yml`: Run tests on every PR
    -   `deploy-staging.yml`: Deploy to staging on merge to `staging` branch
    -   `deploy-production.yml`: Deploy to production on merge to `main` (with approval)
-   Configure automated testing:
    -   Linting (ESLint, Prettier)
    -   Unit tests
    -   Integration tests
    -   Code coverage reports (minimum 80%)
-   Set up staging and production environments on cloud provider
-   Configure environment secrets in GitHub
-   Implement rollback mechanism
-   Create deployment documentation in `/docs/deployment.md`

**Dependencies:** TASK-001, TASK-002

**Related US:** US-088 onwards (Admin features requiring deployment)

---

### 1.2 Database Design & Setup

#### TASK-004: Design Complete Database Schema

**Role:** Backend Developer (Lead)
**Priority:** Critical
**Estimated Time:** 24 hours

**Description:**
Create comprehensive database schema based on all User Stories with proper relationships, indexes, and constraints.

**Acceptance Criteria:**

-   Design ERD (Entity Relationship Diagram) using dbdiagram.io or similar tool
-   Create tables for:

    -   **Users & Authentication:**

        -   `users` (id, email, phone, password_hash, user_type ENUM, status, created_at, updated_at)
        -   `user_profiles` (user_id FK, first_name, last_name, date_of_birth, national_id, address_json)
        -   `company_profiles` (user_id FK, company_name, commercial_register, tax_number)
        -   `sessions` (session_token, user_id FK, ip_address, user_agent, expires_at)
        -   `otp_codes` (code, user_id FK, type ENUM, expires_at, attempts)
        -   `verification_documents` (user_id FK, document_type, file_path, status, reviewed_by, reviewed_at)

    -   **Supplier Profiles:**

        -   `supplier_profiles` (user_id FK, service_description, average_rating, total_reviews, total_projects, is_verified, subscription_tier)
        -   `supplier_categories` (supplier_id FK, category_id FK, is_primary BOOLEAN)
        -   `supplier_portfolio` (supplier_id FK, title, description, image_paths JSON, category_id FK, order)
        -   `supplier_certificates` (supplier_id FK, name, issuer, issue_date, expiry_date, file_path)
        -   `supplier_working_hours` (supplier_id FK, day_of_week, start_time, end_time)

    -   **Categories:**

        -   `categories` (id, parent_id FK NULL, name_ar, name_en, description, icon_path, order, is_active)

    -   **Requests:**

        -   `requests` (id UUID, client_id FK, category_id FK, title, description, budget_min, budget_max, duration, deadline, start_date, requires_visit, location_json, status ENUM, published_at, closed_at)
        -   `request_attachments` (request_id FK, file_path, file_type, file_size)

    -   **Offers:**

        -   `offers` (id UUID, request_id FK, supplier_id FK, proposed_price, duration_days, start_date, proposal_text, deliverables_text, payment_terms, warranty_text, status ENUM, submitted_at)
        -   `offer_attachments` (offer_id FK, file_path, file_type)

    -   **Projects:**

        -   `projects` (id UUID, request_id FK, offer_id FK, client_id FK, supplier_id FK, status ENUM, total_amount, paid_amount, start_date, deadline, completion_date, progress_percentage)
        -   `project_milestones` (project_id FK, milestone_number, title, description, percentage, amount, deadline, status ENUM, submitted_at, approved_at)
        -   `project_files` (project_id FK, uploaded_by FK, file_path, file_type, description, uploaded_at)
        -   `project_timeline` (project_id FK, event_type, description, created_by FK, created_at)

    -   **Contracts:**

        -   `contracts` (id UUID, project_id FK, contract_number, content_html, version, status ENUM, client_signed_at, supplier_signed_at)
        -   `contract_signatures` (contract_id FK, user_id FK, signature_hash, ip_address, signed_at)

    -   **Payments:**

        -   `payments` (id UUID, project_id FK, payer_id FK, payee_id FK, amount, type ENUM, status ENUM, payment_method, gateway_transaction_id, gateway_response JSON, processed_at)
        -   `wallets` (user_id FK PRIMARY, balance, frozen_balance, pending_balance)
        -   `wallet_transactions` (id UUID, wallet_id FK, type ENUM, amount, description, reference_type, reference_id, balance_before, balance_after, created_at)
        -   `bank_accounts` (user_id FK, bank_name, iban, account_holder_name, is_default, verified)
        -   `commission_rules` (category_id FK NULL, user_type ENUM, amount_min, amount_max, commission_type ENUM, commission_value, start_date, end_date, is_active)

    -   **Reviews:**

        -   `reviews` (id UUID, project_id FK, reviewer_id FK, reviewee_id FK, overall_rating, quality_rating, communication_rating, timeliness_rating, professionalism_rating, title, comment, created_at)
        -   `review_responses` (review_id FK, response_text, created_at)
        -   `review_helpfulness` (review_id FK, user_id FK, is_helpful BOOLEAN)

    -   **Messages:**

        -   `conversations` (id UUID, request_id FK NULL, offer_id FK NULL, project_id FK NULL, created_at)
        -   `conversation_participants` (conversation_id FK, user_id FK, joined_at, last_read_at)
        -   `messages` (id UUID, conversation_id FK, sender_id FK, content_text, attachments JSON, status ENUM, sent_at, delivered_at, read_at)

    -   **Notifications:**

        -   `notifications` (id UUID, user_id FK, type, title, content, data JSON, is_read, created_at)
        -   `notification_preferences` (user_id FK, notification_type, in_app, email, sms, push, created_at)

    -   **Disputes:**

        -   `disputes` (id UUID, project_id FK, raised_by FK, category, title, description, priority ENUM, status ENUM, resolution, resolved_by FK, created_at, resolved_at)
        -   `dispute_messages` (dispute_id FK, sender_id FK, message_text, attachments JSON, created_at)
        -   `dispute_evidence` (dispute_id FK, uploaded_by FK, file_path, description, uploaded_at)

    -   **Reports:**

        -   `reports` (id UUID, reported_by FK, reported_entity_type, reported_entity_id, category, description, evidence JSON, status ENUM, reviewed_by FK, action_taken, created_at)

    -   **Subscriptions:**

        -   `subscription_plans` (id, name_ar, name_en, description, price_monthly, price_yearly, features JSON, is_active)
        -   `subscriptions` (id UUID, supplier_id FK, plan_id FK, billing_cycle ENUM, status ENUM, start_date, end_date, auto_renew, payment_method_id FK)
        -   `subscription_invoices` (subscription_id FK, amount, billing_date, paid_at, invoice_pdf_path)

    -   **Promotions:**

        -   `promo_codes` (code UNIQUE, name, description, discount_type ENUM, discount_value, min_amount, max_discount, usage_limit, usage_count, user_type ENUM, category_id FK NULL, start_date, end_date, is_active)
        -   `promo_code_usage` (promo_code_id FK, user_id FK, order_id FK, discount_amount, used_at)

    -   **Content Pages:**

        -   `content_pages` (slug UNIQUE, title_ar, title_en, content_ar, content_en, page_type, is_published, updated_at)
        -   `faqs` (category, question_ar, question_en, answer_ar, answer_en, order, views, helpful_count, not_helpful_count, is_published)

    -   **Audit Log:**

        -   `audit_logs` (id UUID, user_id FK NULL, action, entity_type, entity_id, changes JSON, ip_address, user_agent, created_at)

    -   **Saved Searches & Favorites:**
        -   `saved_searches` (user_id FK, name, filters JSON, notify_on_new, created_at)
        -   `favorites` (user_id FK, entity_type, entity_id, notes, created_at)

-   Define proper indexes for performance:

    -   Primary keys (UUID v4)
    -   Foreign keys
    -   Search fields (email, phone, title, etc.)
    -   Status and date fields for filtering
    -   Composite indexes for common queries

-   Define constraints:

    -   UNIQUE constraints (email, phone, promo_codes.code)
    -   CHECK constraints (budget_min < budget_max, ratings 1-5)
    -   NOT NULL for required fields
    -   ON DELETE and ON UPDATE actions for foreign keys

-   Use ENUM types for status fields:

    -   user_type: 'client', 'supplier', 'admin'
    -   user_status: 'active', 'suspended', 'banned'
    -   request_status: 'draft', 'published', 'closed', 'cancelled'
    -   offer_status: 'pending', 'accepted', 'rejected', 'withdrawn'
    -   project_status: 'new', 'awaiting_payment', 'in_progress', 'paused', 'under_review', 'completed', 'cancelled', 'disputed'
    -   payment_status: 'pending', 'processing', 'completed', 'failed', 'refunded'
    -   dispute_status: 'open', 'under_review', 'resolved', 'closed'

-   Create migration files using framework's migration system
-   Document schema in `/docs/database-schema.md` with ERD diagram
-   Include sample data seeds for development

**Dependencies:** TASK-002

**Related US:** All User Stories (data foundation)

---

#### TASK-005: Implement Database Migrations System

**Role:** Backend Developer
**Priority:** Critical
**Estimated Time:** 8 hours

**Description:**
Set up database migration system with version control and rollback capability.

**Acceptance Criteria:**

-   Configure migration tool (e.g., Knex.js, TypeORM migrations, or Laravel migrations)
-   Create initial migration files for all tables designed in TASK-004
-   Implement migration commands:
    -   `migrate:up` - Apply pending migrations
    -   `migrate:down` - Rollback last migration
    -   `migrate:fresh` - Drop all tables and re-run migrations
    -   `migrate:seed` - Run seeders for development data
-   Create seeders for:
    -   Admin user
    -   Sample categories
    -   Sample users (clients & suppliers)
    -   Sample requests and offers
-   Document migration workflow in `/docs/migrations.md`
-   Test migrations on clean database
-   Test rollback functionality

**Dependencies:** TASK-004

**Related US:** All data-dependent User Stories

---

### 1.3 Backend Core Setup

#### TASK-006: Initialize Backend Framework

**Role:** Backend Developer (Lead)
**Priority:** Critical
**Estimated Time:** 12 hours

**Description:**
Set up backend framework (Node.js with NestJS/Express or PHP with Laravel) with project structure and core configurations.

**Acceptance Criteria:**

-   Initialize backend project with chosen framework
-   Configure project structure:
    ```
    /src
      /modules (feature modules)
      /common (shared utilities)
      /config (configuration files)
      /database (models, migrations)
      /middleware
      /guards
      /decorators
      /pipes
    ```
-   Set up environment configuration system (.env files)
-   Configure database connection with connection pooling
-   Set up logging system (Winston, Pino, or similar)
-   Configure error handling middleware
-   Set up request validation framework
-   Configure CORS for frontend origins
-   Set up rate limiting middleware
-   Create health check endpoint `/health`
-   Document backend architecture in `/docs/backend-architecture.md`

**Dependencies:** TASK-002, TASK-004

**Related US:** All backend functionality

---

#### TASK-007: Implement Authentication System

**Role:** Backend Developer
**Priority:** Critical
**Estimated Time:** 24 hours

**Description:**
Build complete authentication and authorization system with JWT tokens, session management, and role-based access control.

**Acceptance Criteria:**

-   Implement JWT-based authentication:
    -   Access token (15 minutes expiry)
    -   Refresh token (7 days expiry)
    -   Token refresh endpoint
-   Hash passwords using bcrypt (cost factor 12)
-   Create authentication middleware/guard
-   Implement role-based access control (RBAC):
    -   Roles: 'client', 'supplier', 'admin'
    -   Permission decorator for routes
-   Create endpoints:
    -   `POST /auth/register` - User registration
    -   `POST /auth/login` - User login
    -   `POST /auth/logout` - User logout
    -   `POST /auth/refresh` - Refresh access token
    -   `POST /auth/forgot-password` - Request password reset
    -   `POST /auth/reset-password` - Reset password with token
    -   `POST /auth/verify-email` - Verify email with OTP
    -   `POST /auth/verify-phone` - Verify phone with OTP
    -   `POST /auth/resend-otp` - Resend OTP code
-   Implement OTP generation and validation:
    -   6-digit random code
    -   15 minutes expiry
    -   Maximum 5 attempts
    -   Rate limiting (max 3 OTPs per hour)
-   Session management:
    -   Store active sessions in database
    -   Track device info (user agent, IP)
    -   Allow viewing active sessions
    -   Allow logout from all devices
-   Password policies:
    -   Minimum 8 characters
    -   At least one uppercase, lowercase, number
    -   Check against common passwords list
-   Security features:
    -   Account lockout after 5 failed attempts (15 minutes)
    -   Log all authentication events
    -   Detect suspicious login attempts (new device, location)
    -   Send email notifications for important auth events
-   Write unit tests for all authentication logic
-   Document API endpoints in Swagger

**Dependencies:** TASK-004, TASK-006

**Related US:** US-001 to US-023

---

#### TASK-008: Setup Email Service Integration

**Role:** Backend Developer
**Priority:** High
**Estimated Time:** 12 hours

**Description:**
Integrate email service provider (SendGrid, AWS SES, or Mailgun) for transactional emails.

**Acceptance Criteria:**

-   Configure email service provider SDK
-   Create email service module/class
-   Implement email queue system (using Bull, BullMQ, or similar) for async sending
-   Create email templates (HTML):
    -   Welcome email
    -   Email verification OTP
    -   Password reset
    -   Offer received notification
    -   Project started
    -   Payment received
    -   Dispute opened
    -   (Base template with platform branding)
-   Implement template variables system (e.g., {{userName}}, {{projectNumber}})
-   Configure email sending methods:
    -   `sendWelcomeEmail(user)`
    -   `sendVerificationOTP(email, code)`
    -   `sendPasswordReset(email, resetLink)`
    -   `sendNotification(user, template, data)`
-   Handle email failures:
    -   Retry logic (3 attempts with exponential backoff)
    -   Log failures
    -   Dead letter queue for failed emails
-   Configure SPF, DKIM for domain
-   Test email sending in development (use Mailtrap or similar)
-   Document email templates and usage in `/docs/email-system.md`

**Dependencies:** TASK-006

**Related US:** US-003, US-004, US-016, US-017, and all notification-related US

---

#### TASK-009: Setup SMS Service Integration

**Role:** Backend Developer
**Priority:** High
**Estimated Time:** 10 hours

**Description:**
Integrate SMS service provider (Twilio, Unifonic) for phone verification and critical notifications.

**Acceptance Criteria:**

-   Configure SMS service provider SDK
-   Create SMS service module/class
-   Implement SMS queue for async sending
-   Create SMS templates:
    -   Phone verification OTP
    -   Password reset OTP
    -   Payment confirmation (critical)
    -   Dispute alert (critical)
-   Implement methods:
    -   `sendOTP(phone, code)`
    -   `sendNotification(phone, message)`
-   Support international phone format (E.164)
-   Validate phone numbers before sending
-   Handle SMS failures:
    -   Retry logic (2 attempts)
    -   Log failures
    -   Fallback to email if SMS fails
-   Implement cost tracking:
    -   Log every SMS sent with cost
    -   Monthly SMS budget alerts
-   Test SMS in development (use Twilio test numbers)
-   Document SMS service in `/docs/sms-system.md`

**Dependencies:** TASK-006

**Related US:** US-005, US-010, US-017, and critical notifications

---

#### TASK-010: Implement File Upload System

**Role:** Backend Developer
**Priority:** High
**Estimated Time:** 16 hours

**Description:**
Build secure file upload, storage, and retrieval system using cloud storage (AWS S3, Cloudflare R2, or similar).

**Acceptance Criteria:**

-   Configure cloud storage service (AWS S3 or equivalent)
-   Create file upload module
-   Implement endpoints:
    -   `POST /files/upload` - Upload single file
    -   `POST /files/upload-multiple` - Upload multiple files
    -   `GET /files/:id` - Download file
    -   `DELETE /files/:id` - Delete file (with authorization)
-   File validation:
    -   Allowed types: images (JPG, PNG, WebP), documents (PDF, DOC, DOCX), archives (ZIP)
    -   Block executable files (.exe, .bat, .sh)
    -   Maximum file size: 20MB per file
    -   Scan for viruses (using ClamAV or cloud service)
-   Image processing:
    -   Generate thumbnails (150x150, 300x300)
    -   Optimize images (compress, convert to WebP)
    -   Extract EXIF data and remove sensitive info
-   File storage:
    -   Organize in folders by type and date (`/uploads/2025/10/requests/...`)
    -   Generate unique filenames (UUID + extension)
    -   Store metadata in database (filename, size, type, uploader_id, uploaded_at)
    -   Set appropriate permissions (private by default)
-   Generate signed URLs for private file access (expiry 1 hour)
-   Implement file cleanup job (delete orphaned files older than 30 days)
-   Handle file upload progress (for large files)
-   Error handling:
    -   Virus detection → reject and notify
    -   Upload failures → cleanup partial uploads
-   Write tests for upload, validation, and retrieval
-   Document file upload API and limits in Swagger

**Dependencies:** TASK-006

**Related US:** US-008, US-011, US-018, US-019, US-032, US-044, US-069, US-098

---

## Stage 2: User Management & Profiles

### 2.1 User Registration & Authentication (Frontend)

#### TASK-011: Build Registration Page UI

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 16 hours

**Description:**
Create responsive registration page with multi-step form for both clients and suppliers.

**Acceptance Criteria:**

-   Create route `/register`
-   Design multi-step form with progress indicator:
    -   **Step 1:** User type selection (Client Individual, Client Company, Supplier)
    -   **Step 2:** Basic info (email, phone, password)
    -   **Step 3:** Personal/Company details
    -   **Step 4:** Verification (OTP for email and phone)
-   Form fields:
    -   Email (with validation)
    -   Phone (with country code selector, validate format)
    -   Password (with strength indicator, show/hide toggle)
    -   Confirm password
    -   **For Individuals:**
        -   Full name (first + last)
        -   Date of birth (date picker)
        -   National ID number
    -   **For Companies:**
        -   Company name
        -   Commercial register number
        -   Tax number
-   Checkbox for Terms & Conditions (with link to modal/page)
-   Real-time validation:
    -   Email format
    -   Phone format
    -   Password strength (minimum 8 chars, uppercase, lowercase, number)
    -   Required fields
-   Show validation errors inline
-   Implement OTP input component (6 digits):
    -   Auto-focus next input
    -   Paste support
    -   Resend button (disabled for 60 seconds after send)
    -   Timer countdown
-   Navigation:
    -   Previous/Next buttons
    -   Disable Next until step is valid
    -   Allow going back to edit previous steps
-   Form state management (React Context or Zustand)
-   Submit registration:
    -   Show loading state
    -   Handle success → redirect to dashboard with welcome message
    -   Handle errors → show error messages per field or general error
-   Responsive design:
    -   Mobile: single column, full width
    -   Desktop: centered form with max-width
-   Accessibility:
    -   Proper labels and ARIA attributes
    -   Keyboard navigation
    -   Focus management
-   Already have account? Link to login
-   Document component usage in Storybook (optional)

**Dependencies:** TASK-007 (API), Design mockups

**Related US:** US-001, US-002

---

#### TASK-012: Build Login Page UI

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 8 hours

**Description:**
Create responsive login page with email/phone support and "remember me" functionality.

**Acceptance Criteria:**

-   Create route `/login`
-   Form fields:
    -   Email or Phone (single input with automatic detection)
    -   Password (show/hide toggle)
    -   "Remember Me" checkbox
-   Forgot password link → opens modal or navigates to `/forgot-password`
-   Submit login:
    -   Validate inputs
    -   Call login API
    -   Store tokens (access + refresh) securely:
        -   Access token in memory
        -   Refresh token in httpOnly cookie or secure localStorage
    -   Redirect to intended page or dashboard
    -   Show error messages for invalid credentials
-   Loading state during login
-   Responsive design
-   Accessibility features
-   Link to register page
-   Support for URL parameter `?redirect=/path` to return after login

**Dependencies:** TASK-007 (API), Design mockups

**Related US:** US-003

---

#### TASK-013: Implement Authentication Context & Protected Routes

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 12 hours

**Description:**
Create global authentication state management and route protection.

**Acceptance Criteria:**

-   Create AuthContext (React Context) or auth store (Zustand):
    -   State: `user`, `isAuthenticated`, `isLoading`
    -   Methods: `login()`, `logout()`, `refreshToken()`, `updateUser()`
-   Implement token management:
    -   Store access token in memory
    -   Store refresh token securely
    -   Implement automatic token refresh before expiry
    -   Axios interceptor for adding Authorization header
    -   Axios interceptor for handling 401 responses (retry with refresh)
-   Create `ProtectedRoute` component:
    -   Check if user is authenticated
    -   If not → redirect to `/login?redirect={current}`
    -   Show loading spinner while checking auth
-   Create `PublicOnlyRoute` component (for login/register):
    -   If authenticated → redirect to dashboard
-   Implement `logout()` functionality:
    -   Clear tokens
    -   Reset auth state
    -   Call logout API (optional, to invalidate refresh token)
    -   Redirect to login
-   Fetch user profile on app init:
    -   Call `/users/me` endpoint
    -   Populate auth context
    -   Handle cases where token is invalid/expired
-   Handle session expiry:
    -   Show modal "Your session has expired. Please log in again."
    -   Redirect to login
-   Persist auth state across page refresh (validate token on load)
-   Write tests for auth flow

**Dependencies:** TASK-007, TASK-012

**Related US:** US-003, US-005

---

#### TASK-014: Build Password Reset Flow UI

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 10 hours

**Description:**
Create password reset request and reset password pages.

**Acceptance Criteria:**

-   **Forgot Password Page** (`/forgot-password`):
    -   Input: Email or Phone
    -   Submit button
    -   Send OTP to provided email/phone
    -   Show success message: "OTP sent to your email/phone"
    -   Navigate to reset password page
-   **Reset Password Page** (`/reset-password`):
    -   OTP input (6 digits)
    -   New password input (with strength indicator)
    -   Confirm password input
    -   Submit button
    -   Validate OTP and passwords match
    -   Call reset password API
    -   Success → redirect to login with success message
    -   Error → show error (invalid OTP, expired, etc.)
-   Resend OTP functionality (60 second cooldown)
-   Loading states
-   Form validation
-   Responsive design

**Dependencies:** TASK-007 (API), Design mockups

**Related US:** US-004

---

#### TASK-015: Build Email & Phone Verification UI

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 8 hours

**Description:**
Create verification pages/modals for email and phone OTP verification.

**Acceptance Criteria:**

-   After registration or when changing email/phone:
    -   Show verification modal or redirect to `/verify-email` or `/verify-phone`
-   Display:
    -   Message: "We sent a verification code to [email/phone]"
    -   OTP input (6 digits)
    -   Verify button
    -   Resend code link (60 second cooldown)
    -   Change email/phone link (go back to edit)
-   Submit OTP:
    -   Call verification API
    -   Success → update user state, show success message, redirect
    -   Error → show error (invalid, expired, max attempts)
-   Handle max attempts exceeded → lock verification for period, show message
-   Timer showing OTP expiry countdown (15 minutes)
-   Option to verify later (for non-mandatory verification)

**Dependencies:** TASK-007 (API), TASK-013

**Related US:** US-016, US-017

---

### 2.2 User Profile Management (Backend)

#### TASK-016: Implement User Profile API

**Role:** Backend Developer
**Priority:** High
**Estimated Time:** 16 hours

**Description:**
Build RESTful API endpoints for user profile management (view, update, delete).

**Acceptance Criteria:**

-   Create endpoints:

    -   `GET /users/me` - Get current user profile
    -   `PUT /users/me` - Update profile information
    -   `PATCH /users/me/avatar` - Update profile picture
    -   `PATCH /users/me/email` - Change email (requires verification)
    -   `PATCH /users/me/phone` - Change phone (requires verification)
    -   `PUT /users/me/password` - Change password
    -   `GET /users/me/sessions` - List active sessions
    -   `DELETE /users/me/sessions/:id` - Logout from specific session
    -   `DELETE /users/me/sessions` - Logout from all sessions
    -   `POST /users/me/deactivate` - Deactivate account
    -   `DELETE /users/me` - Delete account permanently
    -   `GET /users/:id` - View public profile (for other users)

-   **Profile Information Update:**

    -   Validate input data
    -   Allowed fields: name, date_of_birth, address (for individuals); company_name (for companies)
    -   Disallow changing: email, phone directly (separate endpoints), user_type, verification status
    -   Log changes in audit_logs
    -   Return updated user object

-   **Avatar Upload:**

    -   Accept image file (JPG, PNG, max 2MB)
    -   Crop to square (or accept cropped image from frontend)
    -   Generate thumbnails
    -   Update user.avatar_url
    -   Delete old avatar from storage

-   **Email/Phone Change:**

    -   Generate OTP and send to new email/phone
    -   Store pending change in temporary table
    -   Endpoint to confirm change with OTP
    -   Upon confirmation:
        -   Update email/phone
        -   Set verified status to false for new value
        -   Send notification to old email/phone
        -   Log in audit_logs

-   **Password Change:**

    -   Require current password for verification
    -   Validate new password strength
    -   Hash new password
    -   Invalidate all sessions except current
    -   Send email notification

-   **Session Management:**

    -   List active sessions with device info, location (based on IP), last activity
    -   Allow deletion of individual session (logout)
    -   Allow deletion of all sessions (logout everywhere)

-   **Account Deactivation:**

    -   Check no active projects or pending payments
    -   Set user.status = 'suspended'
    -   Hide user from searches
    -   Allow reactivation by logging in

-   **Account Deletion:**

    -   Check no active projects, disputes, or wallet balance
    -   Soft delete: anonymize personal data, keep transaction records
    -   Add email/phone to blacklist
    -   Send confirmation email

-   Authorization:

    -   All endpoints require authentication
    -   Users can only access/modify their own profile
    -   Admins can view any profile

-   Write comprehensive unit and integration tests
-   Document all endpoints in Swagger with examples

**Dependencies:** TASK-006, TASK-007, TASK-010

**Related US:** US-007 to US-015

---

#### TASK-017: Implement Notification Preferences API

**Role:** Backend Developer
**Priority:** Medium
**Estimated Time:** 8 hours

**Description:**
Create API for users to manage their notification preferences.

**Acceptance Criteria:**

-   Endpoints:

    -   `GET /users/me/notification-preferences` - Get current preferences
    -   `PUT /users/me/notification-preferences` - Update preferences

-   Preferences structure:

    ```json
    {
      "new_offer": {
        "in_app": true,
        "email": true,
        "sms": false,
        "push": true
      },
      "new_message": { ... },
      "payment_received": { ... },
      "project_update": { ... },
      // ... for all notification types
    }
    ```

-   Default preferences (all channels enabled except SMS)
-   Validate input (must include all notification types)
-   Store in `notification_preferences` table
-   When sending notification, check preferences before sending via each channel
-   Return updated preferences

**Dependencies:** TASK-016

**Related US:** US-013

---

### 2.3 User Profile Management (Frontend)

#### TASK-018: Build Profile View Page

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 12 hours

**Description:**
Create user profile page displaying all user information.

**Acceptance Criteria:**

-   Create route `/profile` (for own profile) and `/users/:id` (for public profiles)
-   Display:
    -   Avatar (with placeholder if not set)
    -   Name
    -   Email (verified badge ✓ if verified)
    -   Phone (verified badge if verified)
    -   User type (Client/Supplier)
    -   Registration date
    -   **For Suppliers:**
        -   Rating (stars)
        -   Number of completed projects
        -   Acceptance rate %
        -   Response time average
    -   **For Clients:**
        -   Number of requests posted
        -   Number of projects
-   Tabs (for own profile):
    -   Overview (default)
    -   Edit Profile
    -   Security (password, 2FA, sessions)
    -   Notification Preferences
    -   Verification Documents (if not verified)
    -   **For Suppliers:** Portfolio, Certificates, Working Hours
-   Edit button (navigates to edit mode or tab)
-   Responsive design
-   Loading and error states

**Dependencies:** TASK-016 (API), Design mockups

**Related US:** US-007

---

#### TASK-019: Build Profile Edit Form

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 14 hours

**Description:**
Create editable profile form with avatar upload.

**Acceptance Criteria:**

-   Edit Profile tab/page:
    -   Avatar upload:
        -   Click to upload or drag & drop
        -   Image cropper modal (1:1 aspect ratio)
        -   Preview cropped image
        -   Upload button
        -   Remove avatar button
    -   Form fields:
        -   Full Name (for individuals)
        -   Company Name (for companies)
        -   Date of Birth (date picker, for individuals)
        -   Address fields (Country, City, District, Street, Building Number)
    -   Save button
    -   Cancel button (discard changes)
-   Real-time validation
-   Submit form:
    -   Show loading state
    -   Call update API
    -   Success → update user context, show success toast
    -   Error → show error messages
-   Unsaved changes warning (if navigating away)

**Dependencies:** TASK-016 (API), TASK-018

**Related US:** US-008, US-011

---

#### TASK-020: Build Email/Phone Change Modals

**Role:** Frontend Developer
**Priority:** Medium
**Estimated Time:** 10 hours

**Description:**
Create modals for changing email and phone with OTP verification.

**Acceptance Criteria:**

-   **Change Email Modal:**
    -   Input: New email
    -   Submit button
    -   Call API to send OTP
    -   Show OTP input modal
    -   Verify OTP
    -   Success → update user, show notification "Email changed successfully. Please verify your new email."
-   **Change Phone Modal:**

    -   Similar to email
    -   Country code selector

-   OTP verification:
    -   6-digit input
    -   Resend OTP button
    -   Timer countdown
    -   Error handling

**Dependencies:** TASK-016 (API)

**Related US:** US-009, US-010

---

#### TASK-021: Build Password Change Form

**Role:** Frontend Developer
**Priority:** Medium
**Estimated Time:** 6 hours

**Description:**
Create password change form in profile security tab.

**Acceptance Criteria:**

-   Security tab:
    -   Form fields:
        -   Current Password (show/hide)
        -   New Password (with strength indicator)
        -   Confirm New Password
    -   Save button
-   Validation:
    -   Current password required
    -   New password strength (same rules as registration)
    -   Passwords match
-   Submit:
    -   Call change password API
    -   Success → show success message, logout from other sessions notification
    -   Error → show error (e.g., "Current password is incorrect")

**Dependencies:** TASK-016 (API)

**Related US:** US-012

---

#### TASK-022: Build Notification Preferences Page

**Role:** Frontend Developer
**Priority:** Medium
**Estimated Time:** 10 hours

**Description:**
Create page for managing notification preferences with channel toggles.

**Acceptance Criteria:**

-   Notification Preferences tab:
    -   Group notifications by category:
        -   Offers & Projects
        -   Messages
        -   Payments
        -   System & Updates
    -   For each notification type, toggle switches for:
        -   In-App
        -   Email
        -   SMS
        -   Push (if mobile app)
    -   Visual design: grid or table layout
-   Save button (or auto-save on toggle)
-   Fetch current preferences on load
-   Update preferences:
    -   Optimistic update (reflect change immediately)
    -   Call API
    -   Handle errors (revert if API fails)

**Dependencies:** TASK-017 (API)

**Related US:** US-013

---

#### TASK-023: Build Sessions Management Page

**Role:** Frontend Developer
**Priority:** Medium
**Estimated Time:** 8 hours

**Description:**
Create page showing active sessions with logout options.

**Acceptance Criteria:**

-   Security tab → Active Sessions section:
    -   List all active sessions:
        -   Device name/type (from user agent)
        -   Browser
        -   Location (city, country based on IP)
        -   IP address
        -   Last active timestamp
        -   Current session indicator
    -   For each session:
        -   "Logout" button (except current session)
    -   "Logout from all other devices" button
-   Confirm before logout (modal)
-   Call logout API
-   Success → remove session from list, show toast
-   Refresh list after logout

**Dependencies:** TASK-016 (API)

**Related US:** US-006

---

#### TASK-024: Build Account Deactivation & Deletion Pages

**Role:** Frontend Developer
**Priority:** Low
**Estimated Time:** 8 hours

**Description:**
Create pages/modals for account deactivation and deletion.

**Acceptance Criteria:**

-   **Deactivate Account:**

    -   In profile settings → Account tab
    -   "Deactivate Account" button (styled as warning)
    -   Click → open confirmation modal:
        -   Warning message explaining consequences
        -   Password confirmation input
        -   "Deactivate" and "Cancel" buttons
    -   Submit → call API
    -   Success → logout and redirect to homepage with message

-   **Delete Account:**
    -   "Delete Account Permanently" button (styled as danger)
    -   Click → open multi-step confirmation modal:
        -   Step 1: Warning about permanent deletion, list of checks (no active projects, disputes, balance)
        -   Step 2: Reason for deletion (dropdown + textarea)
        -   Step 3: Password confirmation
        -   Final confirmation checkbox: "I understand this action cannot be undone"
    -   Submit → call API
    -   Success → logout, redirect to homepage with farewell message

**Dependencies:** TASK-016 (API)

**Related US:** US-014, US-015

---

## Stage 3: Supplier Profile & Portfolio

### 3.1 Supplier Profile (Backend)

#### TASK-025: Implement Supplier Profile API

**Role:** Backend Developer
**Priority:** High
**Estimated Time:** 20 hours

**Description:**
Build API endpoints for supplier profile creation, management, and public viewing.

**Acceptance Criteria:**

-   Endpoints:

    -   `GET /suppliers/me/profile` - Get own supplier profile
    -   `POST /suppliers/me/profile` - Create supplier profile (after registration)
    -   `PUT /suppliers/me/profile` - Update supplier profile
    -   `GET /suppliers/:id/profile` - Get public supplier profile (for clients)
    -   `GET /suppliers/:id/portfolio` - Get supplier's portfolio items
    -   `POST /suppliers/me/portfolio` - Add portfolio item
    -   `PUT /suppliers/me/portfolio/:itemId` - Update portfolio item
    -   `DELETE /suppliers/me/portfolio/:itemId` - Delete portfolio item
    -   `PUT /suppliers/me/portfolio/reorder` - Reorder portfolio items
    -   `POST /suppliers/me/certificates` - Add certificate
    -   `PUT /suppliers/me/certificates/:certId` - Update certificate
    -   `DELETE /suppliers/me/certificates/:certId` - Delete certificate
    -   `PUT /suppliers/me/working-hours` - Update working hours
    -   `POST /suppliers/me/request-verification` - Request verified badge
    -   `GET /suppliers/me/stats` - Get performance statistics
    -   `GET /suppliers/search` - Search suppliers (for clients)

-   **Create/Update Supplier Profile:**

    -   Fields:
        -   `service_description` (200-1000 chars)
        -   `categories` (array of category IDs, 1-3, mark one as primary)
    -   Validate categories exist and are active
    -   Calculate profile completion percentage
    -   Return profile with completion status

-   **Portfolio Management:**

    -   Add item:
        -   Upload images (3-15 per item)
        -   Title, description
        -   Category
        -   Order number (auto-increment)
    -   Update item (same validations)
    -   Delete item → delete images from storage
    -   Reorder → accept array of {id, order} and update

-   **Certificates:**

    -   Add certificate:
        -   Name, issuer, issue_date, expiry_date (optional)
        -   Upload certificate image/PDF
    -   Update/delete similar to portfolio

-   **Working Hours:**

    -   Accept array of {day_of_week, start_time, end_time} for each day
    -   Allow multiple time ranges per day (for breaks)
    -   Validate time ranges don't overlap

-   **Request Verification:**

    -   Check:
        -   Profile 100% complete
        -   Identity documents uploaded
        -   At least 1 completed project
    -   Create verification request record
    -   Notify admin
    -   Return status

-   **Performance Statistics:**

    -   Calculate and return:
        -   Total projects completed
        -   Acceptance rate (accepted offers / total offers)
        -   On-time delivery rate
        -   Average response time
        -   Average rating
    -   Cache results for performance

-   **Public Profile:**

    -   Return sanitized profile data (hide sensitive info like email for non-connected users)
    -   Include:
        -   Basic info, avatar, rating, reviews count
        -   Service description
        -   Categories
        -   Portfolio items
        -   Certificates
        -   Working hours
        -   Performance stats
        -   Recent reviews (5-10)

-   **Search Suppliers:**

    -   Filters:
        -   Category
        -   Rating (min)
        -   Location (city)
        -   Verification status
        -   Price range (if available)
        -   Completed projects count
    -   Sorting:
        -   Top rated
        -   Most experienced
        -   Fastest response
        -   Newest
    -   Pagination (20 per page)
    -   Return list with basic info + stats

-   Authorization:

    -   Own profile endpoints require supplier role
    -   Public endpoints accessible by all authenticated users
    -   Search accessible by clients

-   Write tests for all endpoints
-   Document in Swagger

**Dependencies:** TASK-006, TASK-007, TASK-010, TASK-016

**Related US:** US-024 to US-029

---

### 3.2 Supplier Profile (Frontend)

#### TASK-026: Build Supplier Profile Completion Flow

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 20 hours

**Description:**
Create multi-step supplier profile setup wizard for new suppliers.

**Acceptance Criteria:**

-   After supplier registration, redirect to `/supplier/setup` if profile incomplete
-   Multi-step wizard with progress bar:

    -   **Step 1: Service Categories**

        -   Select 1-3 categories
        -   Mark one as primary
        -   Category cards with icons
        -   Next button (disabled until at least 1 selected)

    -   **Step 2: Service Description**

        -   Rich text editor or textarea
        -   Character counter (200-1000)
        -   Tips/examples for writing good description
        -   Preview

    -   **Step 3: Portfolio**

        -   Upload work samples
        -   For each item:
            -   Upload images (drag & drop, multiple)
            -   Title input
            -   Description textarea
            -   Category selector
        -   Add more items button
        -   Minimum 3 items recommended (optional warning if less)

    -   **Step 4: Certificates** (Optional)

        -   Upload certificate images/PDFs
        -   Form: name, issuer, dates
        -   Add more button
        -   Skip option

    -   **Step 5: Working Hours**

        -   For each day of week:
            -   Available toggle
            -   Time range picker (from - to)
            -   Add break/second shift button
        -   Template buttons: "9-5 Weekdays", "24/7", "Flexible"

    -   **Step 6: Review & Submit**
        -   Display all entered information
        -   Profile completion percentage (visual indicator)
        -   Edit buttons for each section (go back to step)
        -   "Complete Profile" button

-   Form state management (persist in localStorage)
-   Validation at each step
-   Allow saving as draft and continuing later
-   Allow skipping non-required steps
-   On submit:
    -   Call create/update profile APIs
    -   Success → redirect to dashboard with welcome message
    -   Show achievement badge "Profile Complete!"
-   Responsive design for all steps

**Dependencies:** TASK-025 (API), Design mockups

**Related US:** US-024

---

#### TASK-027: Build Supplier Profile Edit Page

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 16 hours

**Description:**
Create editable supplier profile page with inline editing.

**Acceptance Criteria:**

-   Route: `/supplier/profile/edit`
-   Sections:

    -   **Service Description:**

        -   Rich text editor
        -   Save button

    -   **Categories:**

        -   Display selected categories
        -   Edit button → modal to change categories

    -   **Portfolio:**

        -   Grid of portfolio items
        -   Each item card:
            -   Image gallery (thumbnails)
            -   Title & description
            -   Edit & Delete buttons
        -   Add new item button → modal/page with upload form
        -   Drag & drop to reorder

    -   **Certificates:**

        -   List of certificates
        -   Each certificate card with edit/delete
        -   Add certificate button

    -   **Working Hours:**
        -   Weekly schedule view
        -   Edit button → modal with time pickers

-   For each section:

    -   Inline editing or modal editing
    -   Save button (per section or global)
    -   Cancel option
    -   Loading states
    -   Success/error notifications

-   Profile completion indicator (percentage, progress bar)
-   Tips to improve profile (if < 100%)

**Dependencies:** TASK-025 (API), TASK-026

**Related US:** US-025

---

#### TASK-028: Build Public Supplier Profile Page

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 16 hours

**Description:**
Create public-facing supplier profile page for clients to view.

**Acceptance Criteria:**

-   Route: `/suppliers/:id`
-   Layout:

    -   **Header:**

        -   Avatar
        -   Name
        -   Rating (stars) + reviews count
        -   Verified badge (if verified)
        -   "Add to Favorites" button (heart icon)
        -   "Send Message" button
        -   "Report" link

    -   **Stats Cards:**

        -   Completed Projects
        -   Acceptance Rate %
        -   On-Time Delivery %
        -   Avg Response Time

    -   **Service Description:**

        -   Formatted text
        -   Categories badges

    -   **Portfolio:**

        -   Image gallery (grid or carousel)
        -   Click to open lightbox with full image + description

    -   **Certificates:**

        -   Certificate cards
        -   Click to view image/PDF

    -   **Working Hours:**

        -   Weekly schedule visualization

    -   **Reviews:**

        -   List of recent reviews (5-10)
        -   Each review:
            -   Reviewer name (client), avatar
            -   Rating (stars)
            -   Date
            -   Comment
            -   Supplier's response (if any)
        -   "See all reviews" button → modal or page with pagination

    -   **Similar Suppliers:**
        -   Carousel of 3-5 suppliers in same category

-   Loading skeleton while fetching data
-   Error state if supplier not found
-   Responsive design
-   SEO optimized (meta tags for preview)

**Dependencies:** TASK-025 (API), Design mockups

**Related US:** US-026

---

#### TASK-029: Build Supplier Search & Filter Page

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 16 hours

**Description:**
Create advanced supplier search page with filters and sorting.

**Acceptance Criteria:**

-   Route: `/suppliers/search` or `/suppliers`
-   Layout:

    -   **Sidebar (left):**

        -   Filters:
            -   Category (multi-select tree)
            -   Rating (stars, select min)
            -   Location (city dropdown)
            -   Verified Only (toggle)
            -   Completed Projects (range slider)
        -   Clear all filters button
        -   Apply button (or auto-apply on change)

    -   **Main Area:**
        -   Search bar (search by name/description)
        -   Sorting dropdown (Top Rated, Most Experienced, Fastest Response, Newest)
        -   Results count
        -   Supplier cards grid/list:
            -   Avatar, name
            -   Rating + reviews
            -   Categories
            -   Short bio (truncated)
            -   Stats (projects, response time)
            -   "View Profile" button
        -   Pagination or infinite scroll
        -   Empty state if no results

-   Real-time search (debounced)
-   URL params for filters/sort (shareable links, browser back/forward support)
-   Loading states (skeleton cards)
-   Responsive: filters in collapsible drawer on mobile

**Dependencies:** TASK-025 (API), TASK-028

**Related US:** US-028

---

#### TASK-030: Build Supplier Stats Dashboard

**Role:** Frontend Developer
**Priority:** Medium
**Estimated Time:** 12 hours

**Description:**
Create statistics dashboard for suppliers to track their performance.

**Acceptance Criteria:**

-   Route: `/supplier/stats` or tab in profile
-   Display:

    -   **Profile Views:**

        -   Line chart (daily, weekly, monthly)
        -   Total views count

    -   **Offers:**

        -   Total offers submitted
        -   Acceptance rate (donut chart)
        -   Average offer value

    -   **Projects:**

        -   Total projects
        -   On-time delivery rate
        -   Average project duration

    -   **Ratings:**

        -   Average rating (stars, large display)
        -   Rating distribution bar chart (5★: X%, 4★: Y%, ...)

    -   **Top Categories:**

        -   Categories by number of projects (bar chart)

    -   **Comparison:**
        -   "You vs. Average Supplier in Your Category" metrics

-   Date range selector (Last 7 days, Last 30 days, Last 3 months, All time)
-   Export button (PDF report)
-   Tooltips on charts
-   Responsive charts

**Dependencies:** TASK-025 (API), Chart library (Recharts or similar)

**Related US:** US-029

---

## Stage 4: Categories Management

### 4.1 Categories (Backend)

#### TASK-031: Implement Categories API

**Role:** Backend Developer
**Priority:** High
**Estimated Time:** 12 hours

**Description:**
Build API endpoints for managing and displaying categories (for admin and users).

**Acceptance Criteria:**

-   Endpoints:

    -   `GET /categories` - List all active categories (tree structure)
    -   `GET /categories/:id` - Get category details
    -   `GET /categories/:id/subcategories` - Get subcategories
    -   `POST /categories` - Create category (Admin only)
    -   `PUT /categories/:id` - Update category (Admin only)
    -   `DELETE /categories/:id` - Delete category (Admin only)
    -   `PUT /categories/reorder` - Reorder categories (Admin only)

-   **List Categories:**

    -   Return hierarchical tree structure:
        ```json
        [
          {
            "id": "uuid",
            "name_ar": "تصميم",
            "name_en": "Design",
            "icon_url": "...",
            "order": 1,
            "subcategories": [
              {
                "id": "uuid",
                "name_ar": "تصميم شعارات",
                "name_en": "Logo Design",
                ...
              }
            ]
          }
        ]
        ```
    -   Include supplier/request counts per category
    -   Support `flat=true` query param for flat list

-   **Create Category:**

    -   Fields: name_ar, name_en, description, parent_id (optional), icon (file upload), order
    -   Validate names are unique within same level
    -   If parent_id provided, verify parent exists
    -   Save icon to storage
    -   Set is_active = true by default

-   **Update Category:**

    -   Allow updating all fields except id
    -   If changing parent_id, validate new parent
    -   If updating icon, delete old icon

-   **Delete Category:**

    -   Check category has no suppliers or active requests
    -   If has subcategories, prevent deletion or cascade (based on business rule)
    -   Soft delete (set is_active = false) instead of hard delete
    -   Return error if cannot delete with reason

-   **Reorder:**

    -   Accept array of {id, order, parent_id}
    -   Update order for all provided categories
    -   Validate all IDs exist

-   Authorization:

    -   GET endpoints: public or authenticated
    -   POST/PUT/DELETE: Admin only

-   Caching:

    -   Cache category tree for 1 hour (invalidate on create/update/delete)

-   Write tests
-   Document in Swagger

**Dependencies:** TASK-006, TASK-007

**Related US:** US-030, US-031

---

### 4.2 Categories (Frontend)

#### TASK-032: Build Categories Browse Page

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 12 hours

**Description:**
Create categories browsing page with tree navigation.

**Acceptance Criteria:**

-   Route: `/categories`
-   Display:

    -   **Main Categories:**

        -   Grid of category cards
        -   Each card:
            -   Icon
            -   Name
            -   Supplier/Request count
            -   Click → navigate to subcategories or category page

    -   **Breadcrumb navigation:**

        -   "Categories > Design > Logo Design"
        -   Clickable to go back

    -   **Subcategories:**

        -   When a category is clicked, show its subcategories
        -   Back button to parent level

    -   **Category Page:**
        -   Category name & description
        -   Tabs: "Suppliers" and "Requests"
        -   List of suppliers/requests in this category
        -   Filters specific to this category

-   Responsive: grid on desktop, list on mobile
-   Loading state
-   Empty state if no categories

**Dependencies:** TASK-031 (API), Design mockups

**Related US:** US-030

---

#### TASK-033: Build Admin Categories Management Page

**Role:** Frontend Developer
**Priority:** Medium
**Estimated Time:** 16 hours

**Description:**
Create admin panel for managing categories with CRUD operations.

**Acceptance Criteria:**

-   Route: `/admin/categories`
-   Require admin role
-   Display:

    -   **Categories Tree:**

        -   Expandable tree view (parent → children)
        -   Each category node:
            -   Name (AR & EN)
            -   Icon thumbnail
            -   Active status toggle
            -   Edit & Delete buttons
        -   Drag & drop to reorder (update order on drop)

    -   **Add Category Button:**

        -   Opens modal/form:
            -   Name (AR)
            -   Name (EN)
            -   Description
            -   Parent category (dropdown, optional)
            -   Icon upload
            -   Order number
            -   Active toggle
        -   Validation
        -   Submit → create category, refresh tree

    -   **Edit Category:**

        -   Similar form with current values pre-filled
        -   Submit → update category

    -   **Delete Category:**
        -   Confirm modal
        -   Show warning if has subcategories/suppliers/requests
        -   Call delete API
        -   Success → remove from tree

-   Real-time updates after actions
-   Loading states
-   Error handling (e.g., "Cannot delete category with active requests")

**Dependencies:** TASK-031 (API), Admin auth

**Related US:** US-031

---

Due to length limitations, I'll continue with the remaining stages in a structured markdown file. Let me create a comprehensive MD file covering all stages.

```markdown
# Technical Tasks - Complete Breakdown

## Document Information

-   **Project:** Freelance Services Platform
-   **Version:** 1.0
-   **Last Updated:** 2025-10-29
-   **Format:** GitHub Issues Ready

---

## How to Use This Document

Each task follows this structure:
```

---

## Stage 5: Requests Management

### 5.1 Requests Backend

#### TASK-034: Implement Requests API - Core CRUD

**Role:** Backend Developer
**Priority:** Critical
**Estimated Time:** 24 hours
**Sprint:** 3

**Description:**
Build comprehensive API for request creation, management, and discovery.

**Acceptance Criteria:**

-   Create endpoints:

    -   `POST /requests` - Create new request
    -   `GET /requests` - List requests (with filters)
    -   `GET /requests/:id` - Get request details
    -   `PUT /requests/:id` - Update request
    -   `DELETE /requests/:id` - Delete request (drafts only)
    -   `POST /requests/:id/publish` - Publish draft request
    -   `POST /requests/:id/close` - Close request
    -   `POST /requests/:id/cancel` - Cancel request
    -   `POST /requests/:id/extend` - Extend deadline
    -   `GET /requests/my-requests` - Get user's requests

-   **Create Request:**

    -   Validate required fields: title (10-100 chars), description (50-2000 chars), category_id
    -   Optional fields: budget_min, budget_max, duration, deadline, start_date, requires_visit, location
    -   Validate budget_max >= budget_min
    -   Handle file attachments (max 10 files, 20MB each)
    -   Store files using file upload service
    -   Default status: 'draft'
    -   Generate unique request number (e.g., REQ-2025-00001)
    -   Create audit log entry
    -   Return created request with ID

-   **List Requests:**

    -   For suppliers: show published requests in their categories
    -   For clients: show only their requests
    -   Filters:
        -   `category_id` - filter by category
        -   `status` - draft, published, closed, cancelled
        -   `budget_min`, `budget_max` - budget range
        -   `requires_visit` - boolean
        -   `location` - city/region
        -   `posted_after` - date filter
    -   Sorting:
        -   newest (default)
        -   oldest
        -   deadline_soon
        -   highest_budget
        -   most_offers
    -   Pagination: 20 per page
    -   Include counts: views, offers
    -   For suppliers: mark requests they've offered on

-   **Get Request Details:**

    -   Return full request data including attachments
    -   Include client info (name, avatar, rating, projects_count)
    -   Increment view counter (once per user per request)
    -   Include offer_count
    -   For request owner: include offer_count with link
    -   For suppliers: include "has_offered" boolean

-   **Update Request:**

    -   Only owner can update
    -   Cannot update if status = 'closed' or 'cancelled'
    -   Allow updating: title, description, budget, duration, deadline, attachments
    -   Cannot change category if offers exist (business rule)
    -   Track major changes (budget >20%, deadline >3 days)
    -   If major changes and offers exist: notify suppliers who submitted offers
    -   Create audit log
    -   Return updated request

-   **Publish Draft:**

    -   Validate all required fields complete
    -   Change status to 'published'
    -   Set published_at timestamp
    -   Notify relevant suppliers (in selected category, matching criteria)
    -   Return success

-   **Close Request:**

    -   Only owner can close
    -   Options:
        -   Close with selected offer (create project, reject other offers)
        -   Close without selection (with optional reason)
    -   Change status to 'closed'
    -   Set closed_at timestamp
    -   Notify all suppliers who submitted offers
    -   If offer selected: trigger project creation (call project service)
    -   Create audit log

-   **Cancel Request:**

    -   Only owner can cancel
    -   Cannot cancel if project already started
    -   Change status to 'cancelled'
    -   Optional cancellation reason
    -   Notify all suppliers
    -   Create audit log

-   **Extend Deadline:**

    -   Only owner can extend
    -   New deadline must be in future
    -   Update deadline
    -   Notify suppliers who viewed/offered
    -   Create audit log

-   Authorization:

    -   Create: authenticated clients only
    -   View published: authenticated users
    -   View specific: owner or authenticated users (suppliers)
    -   Update/Delete/Publish/Close: owner only

-   Validation:

    -   Title: 10-100 characters
    -   Description: 50-2000 characters
    -   Budget: positive numbers, max < min
    -   Deadline: future date
    -   Category: valid and active

-   Performance:

    -   Index on: client_id, category_id, status, published_at, deadline
    -   Cache category data
    -   Optimize query for list endpoint (avoid N+1)

-   Write comprehensive tests
-   Document all endpoints in Swagger with examples

**Dependencies:** TASK-006, TASK-007, TASK-010, TASK-031

**Related US:** US-032 to US-039

**Technical Notes:**

-   Use transactions for close request with offer selection
-   Consider using job queue for notifications to suppliers
-   Implement soft delete for cancelled requests (keep for analytics)

---

#### TASK-035: Implement Request Search & Discovery

**Role:** Backend Developer
**Priority:** High
**Estimated Time:** 16 hours
**Sprint:** 3

**Description:**
Build advanced search functionality with full-text search and relevance ranking.

**Acceptance Criteria:**

-   Create endpoint:

    -   `GET /requests/search` - Advanced search with filters

-   **Search Features:**

    -   Full-text search on title and description
    -   Support Arabic and English
    -   Search operators: exact phrase ("design logo"), exclude (-wordpress)
    -   Fuzzy matching for typos
    -   Stemming/lemmatization for better matches

-   **Filters** (all combinable):

    -   `q` - search query
    -   `category_id` - exact or array
    -   `budget_min`, `budget_max` - range
    -   `duration_min`, `duration_max` - days
    -   `location` - city/region
    -   `requires_visit` - boolean
    -   `posted_within` - days (e.g., 7 for last week)
    -   `deadline_within` - days until deadline
    -   `has_budget` - boolean (filter out "open for offers")

-   **Sorting:**

    -   `relevance` - best match score (default for search)
    -   `newest` - most recently published
    -   `deadline` - closest deadline first
    -   `budget_desc` - highest budget first
    -   `offers_asc` - fewest offers (less competition)

-   **Response:**

    -   Paginated results (20 per page)
    -   Each result includes:
        -   Request summary (id, title, description_excerpt, budget, deadline)
        -   Client info (name, avatar, rating)
        -   Match score (if search query used)
        -   Highlighted snippets (matching text)
        -   Metadata (offers_count, views_count, posted_at)
    -   Facets (aggregations):
        -   Count by category
        -   Budget ranges distribution
        -   Location distribution

-   **Performance:**

    -   Use Elasticsearch or PostgreSQL full-text search
    -   Index requests on publish
    -   Update index on request modification
    -   Cache common searches (1-5 minutes)
    -   Limit max results per query (1000)

-   **Saved Searches:**

    -   Allow suppliers to save search criteria
    -   Store in `saved_searches` table
    -   Include notification preference

-   Write tests for search accuracy
-   Document search API with examples

**Dependencies:** TASK-034

**Related US:** US-040, US-041

**Technical Notes:**

-   If using PostgreSQL: use tsvector and tsquery with GIN index
-   If using Elasticsearch: set up sync from PostgreSQL
-   Consider search analytics (track popular queries)

---

### 5.2 Requests Frontend

#### TASK-036: Build Create Request Flow (Multi-Step Form)

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 24 hours
**Sprint:** 3

**Description:**
Create intuitive multi-step request creation form with validation and draft saving.

**Acceptance Criteria:**

-   Route: `/requests/new`
-   Require client role (redirect suppliers with message)

-   **Multi-Step Form:**

    -   Progress indicator (Step 1 of 5)
    -   Previous/Next navigation
    -   Save as draft at any step

    -   **Step 1: Category Selection**

        -   Display category tree (collapsible)
        -   Category cards with icons
        -   Search categories
        -   Select category → auto-proceed or Next button
        -   Show selected category (breadcrumb)
        -   Edit category button

    -   **Step 2: Basic Info**

        -   Title input (10-100 chars, counter)
        -   Description textarea (50-2000 chars, counter, rich text optional)
        -   Budget section:
            -   Radio: Fixed Budget / Budget Range / Open for Offers
            -   If range: Min and Max inputs (currency formatted)
            -   If open: hide budget inputs
        -   Duration input (number + unit: days/weeks/months)
        -   Deadline date picker (must be future)
        -   Preferred start date (optional)
        -   Validation on blur and submit

    -   **Step 3: Details & Requirements**

        -   Requires site visit? (Yes/No toggle)
        -   If Yes: Location section
            -   Country, City, District dropdowns
            -   Street, Building number (optional)
            -   Map picker (optional, future enhancement)
        -   Additional notes textarea (optional)

    -   **Step 4: Attachments**

        -   File upload dropzone (drag & drop or click)
        -   Allowed: images (JPG, PNG), documents (PDF, DOC, DOCX)
        -   Max 10 files, 20MB each
        -   File list with preview:
            -   Thumbnail for images
            -   Icon for documents
            -   Filename, size
            -   Remove button
        -   Progress bar during upload
        -   Validation messages

    -   **Step 5: Review & Publish**
        -   Display all entered information in readable format
        -   Category, Title, Description (formatted)
        -   Budget, Duration, Deadline
        -   Location (if applicable)
        -   Attachments thumbnails
        -   Edit buttons for each section (go back to step)
        -   Checkboxes:
            -   [ ] I have read and agree to the terms
            -   [ ] I confirm all information is accurate
        -   Action buttons:
            -   Save as Draft (secondary)
            -   Publish Request (primary, disabled until checkboxes checked)

-   **Form State Management:**

    -   Use React Context or Zustand for form state
    -   Auto-save to localStorage every 30 seconds
    -   Restore from localStorage if interrupted
    -   Clear localStorage on successful publish

-   **Validation:**

    -   Real-time validation (on blur)
    -   Show errors inline (below field)
    -   Prevent Next if step invalid
    -   Summary of errors at top (if trying to proceed)

-   **Draft Saving:**

    -   "Save as Draft" button on all steps
    -   Call API to save draft
    -   Show success toast: "Draft saved. You can continue editing later."
    -   Redirect to "My Requests" or stay on form

-   **Publishing:**

    -   Call publish API
    -   Show loading overlay
    -   On success:
        -   Show success modal: "Your request has been published! Suppliers will start submitting offers soon."
        -   Redirect to request detail page
        -   Confetti animation (optional)
    -   On error:
        -   Show error message
        -   Allow retry

-   **Responsive Design:**

    -   Mobile: single column, larger inputs
    -   Tablet/Desktop: optimal width (600-800px centered)

-   **Accessibility:**

    -   Keyboard navigation
    -   ARIA labels
    -   Focus management between steps
    -   Screen reader announcements

-   **Unsaved Changes Warning:**
    -   If user tries to navigate away with unsaved changes
    -   Show confirmation dialog

**Dependencies:** TASK-034 (API), TASK-031 (Categories API), Design mockups

**Related US:** US-032

**Technical Notes:**

-   Use React Hook Form or Formik for form management
-   Use Zod or Yup for validation schema
-   Consider using a wizard library (react-step-wizard)
-   Optimize file uploads (compress images client-side)

---

#### TASK-037: Build My Requests Dashboard

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 16 hours
**Sprint:** 3

**Description:**
Create dashboard for clients to manage their requests with filtering and actions.

**Acceptance Criteria:**

-   Route: `/requests/my-requests`
-   Require client role

-   **Layout:**

    -   Header:

        -   Page title: "My Requests"
        -   "Create New Request" button (primary CTA)
        -   Quick stats cards:
            -   Active Requests (published)
            -   Drafts
            -   Total Offers Received
            -   Closed Requests

    -   Tabs:

        -   All
        -   Drafts
        -   Published
        -   Closed
        -   Cancelled

    -   Filters (collapsible sidebar or top bar):

        -   Category dropdown
        -   Date range picker (posted between)
        -   Sort by: Newest, Oldest, Most Offers, Deadline Soon

    -   Request Cards:

        -   Card layout (responsive: grid on desktop, list on mobile)
        -   Each card displays:
            -   Request number (e.g., REQ-2025-00001)
            -   Title
            -   Status badge (Draft, Published, Closed, Cancelled)
            -   Category
            -   Budget (if set)
            -   Posted date (relative: "2 days ago")
            -   Deadline (if published, with urgency color: red if <3 days)
            -   Offers count (if published): "5 offers" with badge
            -   Views count
            -   Action buttons:
                -   View Details
                -   If draft: Edit, Delete, Publish
                -   If published: View Offers, Extend Deadline, Close, Cancel
                -   If closed: View Project (if offer accepted)
            -   Quick actions menu (three dots):
                -   Duplicate
                -   Share link
                -   Archive (future)

    -   Pagination or infinite scroll
    -   Empty state: "You haven't created any requests yet" with CTA

-   **Interactions:**

    -   Click on card → navigate to request detail page
    -   Click on "View Offers" → navigate to offers page for that request
    -   Click on action button → execute action (with confirmation if needed)
    -   Filters update URL params (shareable, back button works)

-   **Real-time Updates:**

    -   Badge notification on tab if new offers received
    -   Update offer count when new offer submitted (via WebSocket or polling)

-   **Loading & Error States:**
    -   Skeleton cards while loading
    -   Error message if fetch fails with retry button

**Dependencies:** TASK-034 (API), Design mockups

**Related US:** US-033

---

#### TASK-038: Build Request Detail Page

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 20 hours
**Sprint:** 3

**Description:**
Create comprehensive request detail view for both request owners and suppliers.

**Acceptance Criteria:**

-   Route: `/requests/:id`

-   **Layout:**

    -   **Header Section:**

        -   Request number
        -   Status badge
        -   Breadcrumb: Home > Requests > [Category] > [Request Title]
        -   For owner:
            -   Edit button (if draft)
            -   More actions dropdown: Extend, Close, Cancel
        -   For suppliers:
            -   "Submit Offer" button (primary CTA, if not already submitted)
            -   "View My Offer" button (if already submitted)
            -   Add to favorites (heart icon)
            -   Share button
            -   Report button

    -   **Main Content (Two Columns on Desktop):**

        **Left Column (Main Info):**

        -   Title (large, bold)
        -   Description (formatted text, preserve line breaks)
        -   Requirements section (if additional details)
        -   Attachments:
            -   Image gallery (thumbnails, click to open lightbox)
            -   Document list (with download buttons)
        -   Location (if requires visit):
            -   Address text
            -   Map (embedded, optional)

        **Right Column (Sidebar):**

        -   Client Card:
            -   Avatar, name
            -   Rating (if has previous projects)
            -   Projects completed
            -   "Send Message" button
            -   View profile link
        -   Request Details Card:
            -   Category (with icon)
            -   Budget (formatted, or "Open for Offers")
            -   Duration
            -   Posted date
            -   Deadline (with countdown if urgent)
            -   Preferred start date
        -   Stats Card (for owner):
            -   Views count
            -   Offers received (clickable → offers page)
            -   Average offer price (if offers exist)
        -   Similar Requests (3-5 cards):
            -   Same category
            -   Thumbnails + titles

    -   **For Request Owner:**

        -   "Offers Received" section below main content:
            -   Count: "You have received 8 offers"
            -   Preview of latest 3 offers (cards):
                -   Supplier avatar, name, rating
                -   Proposed price
                -   Duration
                -   "View Offer" button
            -   "View All Offers" button → navigate to offers page

    -   **Timeline (for owner):**
        -   Activity log:
            -   Request published
            -   Offers received (count)
            -   Views milestones (e.g., "Reached 50 views")
            -   Request updated
            -   Deadline extended

-   **Actions:**

    -   For suppliers:

        -   Submit Offer → open offer submission modal/page
        -   Add to favorites → toggle favorite status, show toast
        -   Share → share modal with link copy, social media buttons
        -   Report → report modal

    -   For owner:
        -   Edit → navigate to edit page (if draft)
        -   Extend Deadline → modal with new date picker
        -   Close → confirmation modal:
            -   Option 1: Close with selecting offer (dropdown of offers)
            -   Option 2: Close without selecting (with reason)
        -   Cancel → confirmation modal with reason

-   **Responsive Design:**

    -   Mobile: single column, sidebar content below main
    -   Image gallery: horizontal scroll on mobile

-   **SEO & Sharing:**

    -   Meta tags for social sharing (title, description, image)
    -   Open Graph tags
    -   Structured data (JSON-LD) for search engines

-   **Loading & Error States:**
    -   Skeleton loader for main content
    -   404 page if request not found
    -   Permission error if trying to view draft of another user

**Dependencies:** TASK-034 (API), Design mockups

**Related US:** US-034, US-042

---

#### TASK-039: Build Request Edit Page

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 16 hours
**Sprint:** 3

**Description:**
Create edit interface for published requests with change tracking.

**Acceptance Criteria:**

-   Route: `/requests/:id/edit`
-   Only owner can access
-   Cannot edit if closed or cancelled

-   Reuse form components from create flow
-   Pre-fill form with current request data
-   Restrictions:

    -   If offers exist: disable category change (show info message)
    -   Highlight fields that trigger notifications if changed significantly

-   Change Detection:

    -   Track which fields changed
    -   If major changes (budget >20%, deadline >3 days):
        -   Show warning modal before save:
            -   "These changes will notify suppliers who submitted offers"
            -   List of changed fields
            -   Confirm/Cancel

-   Save button:

    -   "Update Request"
    -   Call update API
    -   Success → redirect to detail page with toast
    -   Error → show errors inline

-   Cancel button → navigate back (with unsaved changes warning)

**Dependencies:** TASK-034 (API), TASK-036

**Related US:** US-035

---

#### TASK-040: Build Requests Browse & Search Page

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 24 hours
**Sprint:** 4

**Description:**
Create advanced search and browse interface for suppliers to find requests.

**Acceptance Criteria:**

-   Route: `/requests` or `/requests/browse`
-   For suppliers (clients see their own requests)

-   **Layout:**

    -   **Top Bar:**

        -   Search input (prominent, with icon)
        -   "Advanced Filters" toggle button
        -   Sort dropdown (Newest, Deadline Soon, Highest Budget, Fewest Offers)

    -   **Filters Sidebar** (collapsible on mobile):

        -   Category selector (tree, multi-select)
        -   Budget range (dual slider: min-max)
        -   Duration range (dual slider: days)
        -   Deadline (dropdown: Anytime, This Week, This Month, Custom)
        -   Location (city dropdown or autocomplete)
        -   Requires Visit (checkbox)
        -   Posted (dropdown: Today, Last 7 days, Last 30 days, Custom)
        -   Has Budget (checkbox - exclude "open for offers")
        -   Clear all filters button
        -   Save search button (for logged-in suppliers)

    -   **Results Area:**

        -   Results count: "Showing 42 requests"
        -   Request cards (grid or list view toggle):
            -   Card design:
                -   "New" badge (if <24 hours)
                -   Title (truncated if long)
                -   Category badge
                -   Description excerpt (2 lines, truncated)
                -   Budget (formatted or "Open for Offers")
                -   Duration & Deadline
                -   Client info (avatar, name, rating)
                -   Footer: Views count, Offers count
                -   "View Details" button
                -   "Already Offered" badge (if user submitted offer)
                -   Quick actions: Favorite, Share
            -   Highlight if matching saved search
        -   Pagination (or infinite scroll with "Load More")
        -   Empty state: "No requests match your criteria. Try adjusting your filters."

    -   **Saved Searches Panel** (collapsible):
        -   List of user's saved searches
        -   Each item:
            -   Search name
            -   Criteria summary
            -   "New results" badge (if new matching requests)
            -   Run button (apply search)
            -   Edit/Delete buttons

-   **Search Functionality:**

    -   Real-time search (debounced 300ms)
    -   Search in title and description
    -   Highlight matching keywords in results
    -   Auto-suggest (optional: show popular searches)

-   **URL State Management:**

    -   All filters and search in URL params
    -   Shareable links
    -   Browser back/forward support
    -   Bookmark support

-   **Real-time Updates:**

    -   Show toast when new requests matching criteria are published
    -   "Refresh to see X new requests" bar at top

-   **Loading & Performance:**

    -   Skeleton cards while loading
    -   Lazy load images
    -   Virtual scrolling for very long lists (optional)

-   **Responsive:**
    -   Mobile: filters in drawer/modal
    -   Cards in list view on small screens

**Dependencies:** TASK-034, TASK-035 (APIs), Design mockups

**Related US:** US-040, US-041

**Technical Notes:**

-   Use URL state library (e.g., nuqs, use-query-params)
-   Debounce search input
-   Optimize re-renders with React.memo
-   Consider using TanStack Query for data fetching and caching

---

#### TASK-041: Build Request Close/Cancel Flows

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 12 hours
**Sprint:** 4

**Description:**
Create modals and flows for closing or cancelling requests.

**Acceptance Criteria:**

-   **Close Request Modal:**

    -   Triggered from request detail page (owner only)
    -   Title: "Close This Request"
    -   Options (radio buttons):
        -   "Accept an offer and start project"
            -   Dropdown to select offer (if multiple)
            -   Show selected offer details (supplier, price)
            -   Info: "Other offers will be automatically rejected"
        -   "Close without selecting an offer"
            -   Optional reason textarea
            -   Reasons dropdown: Found supplier elsewhere, Requirements changed, Budget issues, Other
    -   Warning: "This action cannot be undone"
    -   Buttons: Cancel, Close Request
    -   On submit:
        -   Call close API
        -   If accepting offer: show "Creating project..." loader
        -   Success → redirect to project page (if offer accepted) or requests list with toast
        -   Error → show error message

-   **Cancel Request Modal:**

    -   Triggered from request detail (owner only)
    -   Cannot cancel if project already started
    -   Title: "Cancel This Request"
    -   Warning: "Are you sure? All submitted offers will be withdrawn."
    -   Reason (optional):
        -   Dropdown or textarea
    -   Checkbox: "I understand offers will be notified"
    -   Buttons: Go Back, Cancel Request
    -   On submit:
        -   Call cancel API
        -   Success → redirect to requests list with toast: "Request cancelled"
        -   Error → show error

-   **Extend Deadline Modal:**
    -   Title: "Extend Deadline"
    -   Current deadline display
    -   New deadline date picker (must be future, after current)
    -   Info: "Suppliers who viewed or submitted offers will be notified"
    -   Buttons: Cancel, Extend
    -   On submit:
        -   Call extend API
        -   Success → update detail page, show toast
        -   Error → show error

**Dependencies:** TASK-034 (API), TASK-038

**Related US:** US-036, US-037, US-038

---

## Stage 6: Offers Management

### 6.1 Offers Backend

#### TASK-042: Implement Offers API - Core CRUD

**Role:** Backend Developer
**Priority:** Critical
**Estimated Time:** 24 hours
**Sprint:** 4

**Description:**
Build comprehensive API for offer submission, management, and evaluation.

**Acceptance Criteria:**

-   Create endpoints:

    -   `POST /offers` - Submit offer
    -   `GET /offers` - List offers (supplier's offers)
    -   `GET /offers/:id` - Get offer details
    -   `PUT /offers/:id` - Update offer
    -   `DELETE /offers/:id` - Withdraw offer
    -   `GET /requests/:id/offers` - Get offers for a request (client)
    -   `POST /offers/:id/accept` - Accept offer (client)
    -   `POST /offers/:id/reject` - Reject offer (client)

-   **Submit Offer:**

    -   Validate:
        -   User is supplier with verified email/phone
        -   Profile at least 70% complete
        -   Request is published and not closed
        -   Supplier hasn't already submitted offer for this request
        -   Proposed price is reasonable (within 10x of budget if set)
    -   Required fields: request_id, proposed_price, duration_days, proposal_text (200-2000 chars)
    -   Optional fields: start_date, deliverables_text, payment_terms, warranty_text
    -   Handle attachments (max 5 files, portfolio samples)
    -   Generate unique offer number (e.g., OFF-2025-00001)
    -   Set status: 'pending'
    -   Set submitted_at timestamp
    -   Create notification for request owner
    -   Return created offer

-   **List Offers (Supplier):**

    -   Return supplier's submitted offers
    -   Filters:
        -   `status` - pending, accepted, rejected, withdrawn
        -   `request_status` - filter by associated request status
        -   `date_from`, `date_to` - submission date range
    -   Sorting: newest, oldest, highest_value, closest_deadline
    -   Include request summary for each offer
    -   Pagination: 20 per page
    -   Include stats: total_offers, acceptance_rate, average_value

-   **Get Offer Details:**

    -   Return full offer data
    -   Include request details
    -   Include client info (for supplier) or supplier info (for client)
    -   Authorization:
        -   Supplier can view own offers
        -   Client can view offers on their requests
        -   Otherwise 403

-   **Update Offer:**

    -   Only supplier can update own offer
    -   Only if status = 'pending'
    -   Cannot update after acceptance
    -   Limit updates to 3 per offer (prevent spam)
    -   Allow updating: price, duration, proposal, deliverables, payment_terms, warranty, attachments
    -   Create audit log of changes
    -   If offer already viewed by client, send update notification
    -   Increment edit_count
    -   Return updated offer

-   **Withdraw Offer:**

    -   Only supplier can withdraw
    -   Only if status = 'pending' (cannot withdraw accepted offer)
    -   Optional reason
    -   Set status: 'withdrawn'
    -   Set withdrawn_at timestamp
    -   Notify client
    -   Create audit log
    -   Return success

-   **Get Offers for Request (Client):**

    -   Only request owner can access
    -   Return all offers for the request
    -   Include supplier details for each:
        -   Name, avatar, rating, completed_projects, acceptance_rate
        -   Is verified
    -   Sorting:
        -   lowest_price (default)
        -   highest_rating
        -   fastest_delivery
        -   newest
    -   Mark new/unread offers
    -   Include statistics:
        -   total_offers, average_price, price_range (min-max)

-   **Accept Offer (Client):**

    -   Only request owner can accept
    -   Validate:
        -   Offer status is 'pending'
        -   Request is still published (not closed/cancelled)
        -   No other offer already accepted
    -   Set offer status: 'accepted'
    -   Set accepted_at timestamp
    -   Automatically:
        -   Close request
        -   Reject all other offers (set status: 'rejected')
        -   Create project (call project creation service)
        -   Create contract
    -   Use database transaction (all or nothing)
    -   Notify:
        -   Accepted supplier (offer accepted, project started)
        -   Rejected suppliers (offer rejected)
    -   Create audit logs
    -   Return project details

-   **Reject Offer (Client):**

    -   Only request owner
    -   Optional rejection reason
    -   Set status: 'rejected'
    -   Set rejected_at timestamp
    -   Notify supplier with reason (if provided)
    -   Request remains open
    -   Create audit log
    -   Return success

-   Authorization:

    -   Submit: authenticated suppliers only
    -   View own offers: supplier owner
    -   View offers on request: request owner
    -   Update/Withdraw: offer owner
    -   Accept/Reject: request owner

-   Validation:

    -   Proposed price: positive number, max 1,000,000
    -   Duration: positive, max 365 days
    -   Proposal text: 200-2000 characters
    -   Start date: future date (if provided)

-   Business Rules:

    -   Max 3 edits per offer
    -   Cannot submit if profile incomplete
    -   Cannot submit if already submitted
    -   Cannot accept if request closed
    -   Accepting offer auto-closes request

-   Performance:

    -   Index on: supplier_id, request_id, status, submitted_at
    -   Eager load supplier/request data to avoid N+1
    -   Cache supplier profile data

-   Write comprehensive tests including transaction rollback scenarios
-   Document all endpoints in Swagger

**Dependencies:** TASK-006, TASK-007, TASK-034

**Related US:** US-044 to US-053

**Technical Notes:**

-   Use database transactions for accept offer (multiple updates)
-   Consider rate limiting offer submissions (max 10 per day per supplier)
-   Queue notifications asynchronously

---

### 6.2 Offers Frontend

#### TASK-043: Build Submit Offer Flow

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 20 hours
**Sprint:** 4

**Description:**
Create comprehensive offer submission form with proposal editor and attachments.

**Acceptance Criteria:**

-   Triggered from request detail page ("Submit Offer" button)
-   Route: `/offers/new?request=:id` or modal overlay

-   **Pre-submission Checks:**

    -   Check profile completion (must be ≥70%)
    -   If incomplete: show modal:
        -   "Complete your profile to submit offers"
        -   List missing items (with checkmarks)
        -   "Complete Profile" button
        -   Prevent submission
    -   Check verification status
    -   If not verified: show warning (allow submission but recommend verification)

-   **Form Layout:**

    -   Request summary at top (title, budget, deadline)
    -   Form sections:

        **1. Pricing & Timeline:**

        -   Proposed Price input (currency formatted, with reference to budget if set)
        -   Duration input (number + unit: days/weeks)
        -   Start Date picker (optional, future dates only)
        -   Calculator/estimator helper (optional: show daily rate)

        **2. Proposal:**

        -   Rich text editor or advanced textarea
        -   Character counter (200-2000)
        -   Suggested structure (collapsible tips):
            -   Understanding of requirements
            -   Your approach/methodology
            -   Why you're the best fit
            -   Expected outcomes
        -   AI writing assistant suggestions (optional, future)

        **3. Deliverables:**

        -   Textarea: "What will you deliver?"
        -   Checklist builder (optional):
            -   Add deliverable items
            -   Description for each
        -   Preview formatted list

        **4. Payment Terms:**

        -   Radio options:
            -   Full payment upfront
            -   Milestone-based (default)
                -   If selected: Add milestones button
                -   Milestone form: Title, %, Amount (auto-calculated)
                -   Total must equal 100%
            -   Payment on completion
        -   Custom terms textarea (optional)

        **5. Warranty/Guarantee:**

        -   Warranty period input (optional): number + unit (days/months)
        -   Warranty description textarea
        -   Examples: "Free revisions within 30 days"

        **6. Attachments (Portfolio):**

        -   File upload (drag & drop)
        -   Max 5 files (images, PDFs)
        -   Showcase similar work
        -   Each file: preview thumbnail, filename, size, remove button

    -   **Offer Summary Preview:**

        -   Collapsible section showing formatted offer as client will see it
        -   All sections formatted nicely
        -   Supplier info (your profile)

    -   **Actions:**
        -   Save as Draft button (secondary)
        -   Submit Offer button (primary)
        -   Cancel/Close button

-   **Validation:**

    -   Real-time validation (on blur)
    -   Required: price, duration, proposal
    -   Price: positive, not absurdly high (warn if >10x budget)
    -   Duration: positive, reasonable (warn if >12 months)
    -   Proposal: min 200, max 2000 chars
    -   Milestones: total must be 100%
    -   Show errors inline

-   **Draft Saving:**

    -   Auto-save to localStorage every 30s
    -   Restore draft if returning
    -   "Save Draft" button calls API
    -   Success → show toast, stay on form or close

-   **Submission:**

    -   Validate all fields
    -   Show loading overlay
    -   Call submit API
    -   Success:
        -   Show success modal:
            -   "Your offer has been submitted!"
            -   "The client will review your offer and may contact you."
            -   "Track status in My Offers"
        -   Confetti animation (optional)
        -   Redirect to offer detail or my offers list
    -   Error:
        -   Show error message
        -   Allow correction and retry

-   **Responsive Design:**

    -   Mobile: full-screen modal or dedicated page
    -   Desktop: centered modal (800px width) or page

-   **Accessibility:**
    -   Keyboard navigation
    -   ARIA labels
    -   Focus management

**Dependencies:** TASK-042 (API), TASK-038 (Request detail), Design mockups

**Related US:** US-044

**Technical Notes:**

-   Use React Hook Form or similar
-   Rich text editor: Draft.js, Slate, or TipTap
-   Auto-save drafts to prevent data loss
-   Validate before submission (client-side + server-side)

---

#### TASK-044: Build My Offers Dashboard

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 16 hours
**Sprint:** 4

**Description:**
Create dashboard for suppliers to manage and track their submitted offers.

**Acceptance Criteria:**

-   Route: `/offers/my-offers`
-   Require supplier role

-   **Header:**

    -   Page title: "My Offers"
    -   Quick stats cards:
        -   Total Offers Submitted
        -   Pending Offers
        -   Acceptance Rate %
        -   Average Offer Value

-   **Tabs:**

    -   All Offers
    -   Pending
    -   Accepted
    -   Rejected
    -   Withdrawn

-   **Filters:**

    -   Date range (submitted between)
    -   Request category
    -   Price range
    -   Sort: Newest, Oldest, Highest Value, Status

-   **Offer Cards:**

    -   Grid/List view
    -   Each card:
        -   Offer number
        -   Request title (linked)
        -   Status badge (color-coded)
        -   Proposed price
        -   Duration
        -   Submitted date
        -   Request deadline (if still open)
        -   Client info (avatar, name)
        -   Actions dropdown:
            -   View Details
            -   If pending: Edit, Withdraw
            -   If accepted: View Project
            -   Share offer link (if allowed)
        -   "New" badge if client hasn't viewed yet

-   **Pagination**

-   **Empty States:**

    -   "No offers yet. Start browsing requests!"
    -   CTA button: "Browse Requests"

-   **Interactions:**
    -   Click card → navigate to offer detail
    -   Status filter updates URL params
    -   Real-time update when offer status changes (accepted/rejected)

**Dependencies:** TASK-042 (API), Design mockups

**Related US:** US-045

---

#### TASK-045: Build Offer Detail Page

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 16 hours
**Sprint:** 4

**Description:**
Create detailed view of a submitted offer for supplier and offer review for client.

**Acceptance Criteria:**

-   Route: `/offers/:id`

-   **For Supplier (Own Offer):**

    -   Header:

        -   Offer number, status badge
        -   Request title (linked)
        -   Actions:
            -   If pending: Edit, Withdraw buttons
            -   If accepted: View Project button

    -   Offer Details Section:

        -   All submitted information:
            -   Proposed price, duration, start date
            -   Proposal text (formatted)
            -   Deliverables list
            -   Payment terms
            -   Warranty
            -   Attachments (downloadable)
        -   Submission timestamp
        -   Last edited timestamp (if edited)
        -   View count (how many times client viewed)

    -   Request Details (sidebar or section):

        -   Request summary (link to full request)
        -   Client info with rating
        -   Deadline

    -   Status Updates:

        -   Timeline of status changes
        -   Submitted, Viewed by client, Accepted/Rejected

    -   If Rejected:
        -   Show rejection reason (if provided)
        -   Feedback section (optional)

-   **For Client (Viewing Offer on Their Request):**

    -   Header:

        -   Offer number
        -   Status badge
        -   If pending: Accept & Reject buttons (prominent)

    -   Supplier Profile Card (sidebar):

        -   Avatar, name, verified badge
        -   Rating & reviews
        -   Completed projects
        -   Acceptance rate
        -   Average response time
        -   View Full Profile link
        -   Send Message button

    -   Offer Details Section:

        -   All offer information (same as above)
        -   Professional formatting

    -   Comparison Section:

        -   "Compare with other offers" button
        -   Quick stats: This offer vs. Average

    -   Notes Section (private):

        -   Client can add private notes about this offer
        -   Not visible to supplier
        -   Auto-save

    -   Actions:
        -   Accept Offer (primary button)
        -   Reject Offer (secondary)
        -   Send Message to Supplier
        -   Add to Comparison (checkbox)

-   **Accept Offer Flow:**

    -   Click Accept → Confirmation modal:
        -   "Accept this offer and start project?"
        -   Show offer summary
        -   Info: "This will close your request and reject other offers"
        -   Checkbox: "I confirm I want to proceed"
        -   Buttons: Cancel, Accept & Start Project
    -   On accept:
        -   Show loading: "Creating project..."
        -   Success → redirect to new project page
        -   Error → show error, allow retry

-   **Reject Offer Flow:**

    -   Click Reject → Modal:
        -   "Reject this offer?"
        -   Optional reason (dropdown):
            -   Price too high
            -   Timeline too long
            -   Proposal not suitable
            -   Other (textarea)
        -   Info: "Supplier will be notified"
        -   Buttons: Cancel, Reject Offer
    -   On reject:
        -   Success → update status, show toast
        -   Offer card grayed out

-   **Loading & Error States**
-   **Responsive Design**

**Dependencies:** TASK-042 (API), Design mockups

**Related US:** US-049, US-050, US-051

---

#### TASK-046: Build Offers List for Request (Client View)

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 20 hours
**Sprint:** 4

**Description:**
Create comprehensive offers review page for clients to compare and select offers.

**Acceptance Criteria:**

-   Route: `/requests/:id/offers`
-   Only request owner can access

-   **Header:**

    -   Request title
    -   "You have received X offers"
    -   Stats summary:
        -   Average offer price
        -   Price range (lowest - highest)
        -   Average duration

-   **View Options:**

    -   List view (default)
    -   Comparison view (side-by-side)
    -   Toggle button

-   **Sorting & Filtering:**

    -   Sort by:
        -   Lowest Price (default)
        -   Highest Rating
        -   Fastest Delivery
        -   Newest First
    -   Filters:
        -   Price range slider
        -   Duration range
        -   Rating (min stars)
        -   Verified suppliers only
    -   Show unread offers first (badge)

-   **List View:**

    -   Offer cards in list
    -   Each card:
        -   Supplier section:
            -   Avatar, name, verified badge
            -   Rating (stars + count)
            -   Stats: Projects, Acceptance rate
            -   Quick view profile button (hover/click → popover)
        -   Offer summary:
            -   Proposed price (large, prominent)
            -   Duration
            -   Start date
            -   Key deliverables (first 3, expandable)
            -   Proposal excerpt (2-3 lines, "Read More")
        -   Status: New/Viewed/Shortlisted
        -   Actions:
            -   View Full Offer (primary button)
            -   Accept (if ready)
            -   Reject
            -   Send Message
            -   Add to Comparison (checkbox)
        -   Private notes icon (click to add/edit notes)
        -   "New" badge if not viewed yet

-   **Comparison View:**

    -   Select 2-5 offers using checkboxes
    -   Click "Compare Selected"
    -   Show side-by-side table:
        -   Rows: Price, Duration, Rating, Experience, Deliverables, Payment Terms, Warranty
        -   Columns: Each selected offer
        -   Highlight best value in each row (green)
    -   Actions at bottom of each column

-   **Bulk Actions:**

    -   Select multiple offers (checkboxes)
    -   Bulk Reject button

-   **Empty State:**

    -   If no offers yet: "No offers received yet. Suppliers will start submitting soon."

-   **Real-time Updates:**

    -   Show toast when new offer received
    -   Auto-refresh list (or show "X new offers" banner with refresh button)

-   **Interactions:**
    -   Click on offer card → navigate to offer detail
    -   Mark as viewed when client opens offer detail
    -   Private notes auto-save

**Dependencies:** TASK-042 (API), TASK-045, Design mockups

**Related US:** US-048, US-053

**Technical Notes:**

-   Use virtualization for large lists (react-window)
-   Optimize rendering with React.memo
-   Real-time updates via WebSocket or polling

---

#### TASK-047: Build Offer Edit Page

**Role:** Frontend Developer
**Priority:** Medium
**Estimated Time:** 12 hours
**Sprint:** 5

**Description:**
Create edit interface for submitted offers (if pending).

**Acceptance Criteria:**

-   Route: `/offers/:id/edit`
-   Only supplier can edit own offer
-   Only if status = 'pending'
-   Max 3 edits allowed (show remaining edits)

-   Reuse form from submit offer (TASK-043)
-   Pre-fill with current offer data
-   Show warning if offer already viewed by client:

    -   "The client has viewed your offer. They will be notified of changes."

-   Track changes:

    -   Highlight changed fields

-   Submit:

    -   "Update Offer" button
    -   Call update API
    -   Success → redirect to offer detail, show toast
    -   Error → show errors

-   Cancel → navigate back (unsaved changes warning)

**Dependencies:** TASK-042 (API), TASK-043

**Related US:** US-046

---

#### TASK-048: Build Offer Withdrawal Flow

**Role:** Frontend Developer
**Priority:** Low
**Estimated Time:** 6 hours
**Sprint:** 5

**Description:**
Create withdrawal confirmation modal for offers.

**Acceptance Criteria:**

-   Triggered from offer detail or offers list
-   Only if status = 'pending'

-   Modal:

    -   Title: "Withdraw This Offer?"
    -   Warning: "Are you sure? You won't be able to re-submit."
    -   Optional reason (dropdown or textarea)
    -   Buttons: Cancel, Withdraw Offer

-   On submit:
    -   Call withdraw API
    -   Success → update UI, show toast: "Offer withdrawn"
    -   Error → show error

**Dependencies:** TASK-042 (API)

**Related US:** US-047

---

## Stage 7: Projects & Contracts

### 7.1 Projects Backend

#### TASK-049: Implement Projects API - Creation & Core

**Role:** Backend Developer
**Priority:** Critical
**Estimated Time:** 28 hours
**Sprint:** 5

**Description:**
Build project creation (automatic on offer acceptance) and core management APIs.

**Acceptance Criteria:**

-   Create endpoints:

    -   `POST /projects` - Create project (internal, called from accept offer)
    -   `GET /projects` - List user's projects
    -   `GET /projects/:id` - Get project details
    -   `PATCH /projects/:id/status` - Update project status
    -   `POST /projects/:id/milestones` - Add milestones
    -   `PATCH /projects/:id/milestones/:milestoneId/complete` - Complete milestone
    -   `POST /projects/:id/pause` - Pause project
    -   `POST /projects/:id/resume` - Resume project
    -   `POST /projects/:id/request-change` - Request change (client)
    -   `POST /projects/:id/changes/:changeId/respond` - Respond to change (supplier)
    -   `POST /projects/:id/submit` - Submit project (supplier)
    -   `POST /projects/:id/approve` - Approve project (client)
    -   `POST /projects/:id/cancel` - Cancel project

-   **Create Project (Automatic):**

    -   Triggered when offer is accepted
    -   Input: request_id, offer_id, client_id, supplier_id
    -   Generate unique project number (e.g., PRJ-2025-00001)
    -   Copy data from offer:
        -   total_amount (proposed_price)
        -   duration (duration_days)
        -   deliverables, payment_terms, warranty
    -   Calculate:
        -   start_date (today or offer.start_date)
        -   deadline (start_date + duration)
        -   initial payment amount (30% or based on payment_terms)
    -   Set status: 'new' (awaiting payment)
    -   Create contract automatically (call contract service)
    -   Create project conversation/chat
    -   Add timeline entry: "Project created"
    -   Return project object

-   **List Projects:**

    -   For clients: return projects where client_id = user
    -   For suppliers: return projects where supplier_id = user
    -   Filters:
        -   `status` - new, awaiting_payment, in_progress, paused, under_review, completed, cancelled, disputed
        -   `role` - as_client or as_supplier (if user is both)
        -   `date_from`, `date_to` - start date range
    -   Sorting: newest, deadline_soon, highest_value
    -   Include:
        -   Basic project info
        -   Other party info (client or supplier)
        -   Progress percentage
        -   Status
        -   Milestones summary (if any)
    -   Pagination: 20 per page
    -   Include stats: total_projects, active_projects, total_spent/earned

-   **Get Project Details:**

    -   Authorization: only project participants (client or supplier)
    -   Return full project data:
        -   Project info (number, status, dates, amounts, progress)
        -   Request summary (original request)
        -   Offer summary (accepted offer)
        -   Contract (id, status, signed by whom)
        -   Milestones (if defined)
        -   Timeline/activity log
        -   Files uploaded (deliverables from supplier, requirements from client)
        -   Payment history
    -   Calculate and include:
        -   Days remaining until deadline
        -   Amount paid vs. remaining
        -   Next action required (e.g., "Awaiting payment", "Approve milestone 2")

-   **Update Status:**

    -   Internal use primarily
    -   Validate status transitions:
        -   new → awaiting_payment → in_progress → under_review → completed
        -   Any → paused (with resume)
        -   Any → cancelled (with conditions)
        -   Any → disputed
    -   Log status change in timeline
    -   Trigger notifications based on new status
    -   Return updated project

-   **Add Milestones:**

    -   Can be added at project creation or later (with mutual agreement)
    -   Input: array of milestones [{title, description, percentage, deadline}]
    -   Validate:
        -   Total percentage = 100%
        -   All deadlines before project deadline
        -   Logical sequence (milestone 1 before milestone 2)
    -   Calculate amount for each milestone (percentage \* total_amount)
    -   Create milestone records
    -   Require approval from both parties (if added after start)
    -   Update contract with milestones
    -   Return milestones

-   **Complete Milestone:**

    -   Only supplier can mark complete
    -   Upload deliverables (files, links)
    -   Add completion notes
    -   Set milestone status: 'submitted'
    -   Notify client for review
    -   Add timeline entry
    -   Return updated milestone

-   **Approve/Reject Milestone:**

    -   Only client can approve
    -   If approved:
        -   Set milestone status: 'approved'
        -   Trigger payment release (transfer from escrow to supplier wallet)
        -   Update project progress percentage
        -   Add timeline entry
        -   Notify supplier
    -   If rejected/revision requested:
        -   Set milestone status: 'revision_requested'
        -   Add revision notes
        -   Notify supplier
    -   Client has X days to review (auto-approve after period)

-   **Pause Project:**

    -   Either party can request pause
    -   Input: reason, expected duration (optional)
    -   If requested by one party:
        -   Create pause request
        -   Notify other party for approval
        -   Status: 'pause_requested'
    -   If approved by other party:
        -   Set status: 'paused'
        -   Set paused_at timestamp
        -   Stop deadline countdown
        -   Add timeline entry
    -   If rejected:
        -   Notify requester
        -   Remain in current status

-   **Resume Project:**

    -   Either party can request resume
    -   Require approval from other party
    -   On approve:
        -   Set status back to 'in_progress'
        -   Calculate new deadline (old deadline + paused duration)
        -   Set resumed_at timestamp
        -   Add timeline entry

-   **Request Change (Client):**

    -   Client can request changes/modifications
    -   Input: description, scope (minor/major), additional budget (optional)
    -   Create change request record
    -   Notify supplier
    -   Status: 'pending_supplier_response'
    -   Return change request object

-   **Respond to Change Request (Supplier):**

    -   Supplier can:
        -   Accept (if minor/within scope)
        -   Accept with new quote (if additional work)
        -   Reject (with reason)
    -   Input: response_type, new_price (optional), new_deadline (optional), notes
    -   Update change request
    -   Notify client
    -   If accepted and no additional cost: implement change
    -   If additional cost: client must approve new quote (then adjust project budget)

-   **Submit Project (Final Delivery):**

    -   Only supplier can submit
    -   Input: deliverables (files, links), completion notes
    -   Validate all milestones completed (if milestones exist)
    -   Set status: 'under_review'
    -   Set submitted_at timestamp
    -   Notify client for final approval
    -   Add timeline entry
    -   Return success

-   **Approve Project (Final):**

    -   Only client can approve
    -   If approved:
        -   Set status: 'completed'
        -   Set completion_date timestamp
        -   Release final payment (if any remaining)
        -   Update supplier stats (projects_completed++)
        -   Update client stats
        -   Request reviews from both parties
        -   Add timeline entry
    -   If revision requested:
        -   Set status back to 'in_progress'
        -   Add revision notes
        -   Notify supplier
        -   Max 2-3 revision rounds (business rule)

-   **Cancel Project:**

    -   Conditions:
        -   Before work started (before payment): either party
        -   After started: requires mutual agreement OR dispute resolution
    -   Input: cancellation_reason, initiated_by
    -   If before payment:
        -   Refund client (if paid)
        -   Set status: 'cancelled'
    -   If after started:
        -   Calculate completed work percentage
        -   Determine payment distribution
        -   Set status: 'cancelled'
    -   Notify both parties
    -   Create audit log

-   Authorization:

    -   Only project participants can access
    -   Specific actions limited by role (client vs supplier)

-   Business Rules:

    -   Initial payment (escrow) required before status → 'in_progress'
    -   Cannot modify budget without mutual agreement
    -   Auto-approve milestones after 7 days of no response
    -   Auto-complete project after 30 days of submission if no response

-   Performance:

    -   Index on: client_id, supplier_id, status, start_date, deadline
    -   Eager load related data (request, offer, contract)
    -   Cache project stats

-   Write comprehensive tests including edge cases
-   Document all endpoints in Swagger

**Dependencies:** TASK-006, TASK-007, TASK-042 (Offers API)

**Related US:** US-055 to US-071

**Technical Notes:**

-   Use database transactions for complex operations (create project, accept milestone with payment)
-   Consider using state machine library for status transitions
-   Queue heavy operations (payments, notifications)

---

#### TASK-050: Implement Milestones Management API

**Role:** Backend Developer
**Priority:** High
**Estimated Time:** 16 hours
**Sprint:** 5

**Description:**
Expand milestones functionality with detailed management.

**Acceptance Criteria:**

-   Endpoints covered in TASK-049, with additional detail:

-   **Milestones Structure:**

    ```
    {
      id: uuid,
      project_id: uuid,
      milestone_number: integer (1, 2, 3...),
      title: string,
      description: text,
      percentage: integer (sum must = 100),
      amount: decimal (calculated),
      deadline: date,
      status: enum (pending, in_progress, submitted, revision_requested, approved),
      deliverables: json,
      submitted_at: timestamp,
      approved_at: timestamp,
      created_at: timestamp
    }
    ```

-   **Submit Milestone Deliverables:**

    -   Upload files (images, documents, code, etc.)
    -   Provide links (if applicable)
    -   Add notes/description
    -   Photos/videos as proof of work
    -   Set status: 'submitted'
    -   Trigger notification to client

-   **Review Milestone:**

    -   Client reviews submitted work
    -   Options:
        -   Approve: release payment, proceed
        -   Request minor revisions: supplier fixes, resubmit
        -   Reject: major issues, discuss or escalate
    -   Deadline for client review: 7 days (auto-approve after)

-   **Revision Workflow:**

    -   Client specifies what needs fixing
    -   Supplier resubmits
    -   Max revision rounds: 2-3
    -   After max revisions: escalate to dispute

-   **Payment Release on Approval:**

    -   Automatically transfer funds from escrow to supplier wallet
    -   Deduct platform commission
    -   Generate invoice/receipt
    -   Update project paid_amount
    -   Notify supplier of payment

-   **Milestone Timeline:**
    -   Track all events: created, started, submitted, approved
    -   Display in project detail

**Dependencies:** TASK-049

**Related US:** US-065 to US-068

---

### 7.2 Contracts Backend

#### TASK-051: Implement Contracts API

**Role:** Backend Developer
**Priority:** High
**Estimated Time:** 20 hours
**Sprint:** 5

**Description:**
Build contract generation, viewing, and digital signature system.

**Acceptance Criteria:**

-   Create endpoints:

    -   `GET /contracts/:id` - View contract
    -   `POST /contracts/:id/sign` - Sign contract digitally
    -   `POST /contracts/:id/add-clause` - Add custom clause
    -   `POST /contracts/:id/new-version` - Create updated version

-   **Contract Structure:**

    ```
    {
      id: uuid,
      project_id: uuid,
      contract_number: string (unique, e.g., CNT-2025-00001),
      version: integer,
      content_html: text (generated contract content),
      status: enum (draft, pending_signatures, signed, superseded),
      custom_clauses: json,
      client_signed_at: timestamp,
      client_signature_hash: string,
      supplier_signed_at: timestamp,
      supplier_signature_hash: string,
      created_at: timestamp
    }
    ```

-   **Auto-Generate Contract:**

    -   Triggered when project is created
    -   Use predefined template with variables:
        -   Party names, addresses
        -   Project scope (from request description)
        -   Deliverables (from offer)
        -   Price and payment terms
        -   Timeline and deadlines
        -   Milestones (if defined)
        -   Warranty terms
        -   Dispute resolution process
        -   Platform terms and conditions
        -   Governing law (Saudi law)
    -   Generate as HTML for web display
    -   Generate as PDF for download
    -   Set status: 'pending_signatures'
    -   Return contract object

-   **View Contract:**

    -   Only project participants can view
    -   Return contract HTML content
    -   Include signature status for both parties
    -   Include PDF download link
    -   Display version history (if multiple versions)

-   **Sign Contract:**

    -   Input: user_id (authenticated), password or OTP for confirmation
    -   Validate user is party to the contract
    -   Generate digital signature:
        -   Hash contract content + timestamp + user_id
        -   Store signature hash
    -   Record IP address and user agent
    -   Set signed_at timestamp
    -   Check if both parties signed:
        -   If yes: set status = 'signed', mark project as ready to proceed
    -   Send confirmation email to signer
    -   Notify other party
    -   Return updated contract

-   **Add Custom Clause:**

    -   Either party can propose custom clause before signing
    -   Input: clause_text
    -   Add to contract custom_clauses array
    -   Require approval from other party
    -   If approved:
        -   Regenerate contract content with new clause
        -   Create new version (increment version number)
        -   Reset signatures (both need to re-sign new version)
    -   If rejected: discard clause proposal
    -   Return updated contract

-   **Create New Version:**

    -   When project terms change (e.g., milestones added, budget increased)
    -   Copy current contract
    -   Increment version
    -   Update content with new terms
    -   Set status: 'pending_signatures'
    -   Mark old version as 'superseded'
    -   Require both parties to sign new version
    -   Return new contract version

-   **PDF Generation:**

    -   Use library like Puppeteer, PDFKit, or cloud service
    -   Generate from HTML template
    -   Include:
        -   Contract header with logo
        -   All terms and clauses
        -   Signature section with digital signature info
        -   Footer with contract number, version, date
    -   Store PDF in cloud storage
    -   Generate signed URL for download (expires in 1 hour)

-   Authorization:

    -   Only project participants can view/sign
    -   Either party can propose custom clause
    -   Both parties must sign for contract to be active

-   Business Rules:

    -   Both signatures required to proceed with project
    -   Cannot modify signed contract (must create new version)
    -   All versions retained for audit trail

-   Write tests including signature verification
-   Document endpoints in Swagger

**Dependencies:** TASK-049

**Related US:** US-072 to US-076

**Technical Notes:**

-   Use crypto library for signature hashing
-   Store contracts in database + PDF in cloud storage
-   Consider using DocuSign API for advanced e-signatures (future)

---

### 7.3 Projects Frontend

#### TASK-052: Build Projects Dashboard

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 20 hours
**Sprint:** 5

**Description:**
Create comprehensive projects dashboard for both clients and suppliers.

**Acceptance Criteria:**

-   Route: `/projects`
-   Detect user role (client/supplier/both)

-   **Header:**

    -   Page title: "My Projects"
    -   Role switcher (if user is both): "As Client" / "As Supplier" tabs
    -   Quick stats cards:
        -   Active Projects
        -   Completed Projects
        -   Total Spent (client) or Earned (supplier)
        -   Avg Project Duration

-   **Tabs:**

    -   All Projects
    -   Active (awaiting_payment, in_progress, under_review)
    -   Completed
    -   Paused/Cancelled

-   **Filters:**

    -   Date range (start date)
    -   Category
    -   Status
    -   Budget/Value range
    -   Sort: Newest, Deadline Soon, Highest Value, Progress

-   **Project Cards:**

    -   Each card displays:
        -   Project number
        -   Title (from original request)
        -   Status badge with color coding
        -   Progress bar (0-100%)
        -   Other party info:
            -   Avatar, name, rating
            -   Role label (Client/Supplier)
        -   Key info:
            -   Total amount
            -   Start date & deadline
            -   Days remaining (if active, with urgency color)
        -   Quick stats:
            -   Milestones: "2/5 completed"
            -   Paid: "$1,500 / $3,000"
        -   Action button: "View Project" or next action ("Pay Now", "Review Milestone", etc.)
        -   Alert badges (if action required):
            -   "Payment Due"
            -   "Milestone Needs Review"
            -   "Deliverables Submitted"

-   **Action Required Section:**

    -   Separate section at top showing projects needing immediate action
    -   E.g., "3 projects need your attention"
    -   Cards with prominent CTA buttons

-   **Pagination or Infinite Scroll**

-   **Empty States:**

    -   "No projects yet"
    -   CTA: "Browse Requests" (suppliers) or "Post a Request" (clients)

-   **Real-time Updates:**
    -   Show toast when project status changes
    -   Update card without full page refresh

**Dependencies:** TASK-049 (API), Design mockups

**Related US:** US-056

---

#### TASK-053: Build Project Detail Page

**Role:** Frontend Developer
**Priority:** Critical
**Estimated Time:** 32 hours
**Sprint:** 6

**Description:**
Create comprehensive project detail view with all information and actions.

**Acceptance Criteria:**

-   Route: `/projects/:id`

-   **Layout:**

    **Header:**

    -   Project number, status badge
    -   Breadcrumb: Projects > [Project Title]
    -   Actions menu:
        -   Message [Other Party]
        -   View Contract
        -   Download Invoice/Receipt
        -   Report Issue
        -   More: Pause, Cancel (if allowed)

    **Main Content (Tabs):**

    **Tab 1: Overview (Default)**

    -   **Project Info Card:**

        -   Title, description
        -   Category
        -   Start date, deadline, duration
        -   Progress bar with percentage
        -   Status with explanation
        -   Days remaining countdown (if active)

    -   **Parties Card:**

        -   Two columns: Client & Supplier
        -   Each shows: avatar, name, rating, contact button
        -   View full profile link

    -   **Financial Summary:**

        -   Total project value
        -   Amount paid (with progress bar)
        -   Amount remaining
        -   Payment breakdown (if milestones):
            -   Table or list: Milestone | Amount | Status
        -   Next payment due (if applicable)

    -   **Timeline (Activity Feed):**
        -   Chronological list of all events:
            -   Project created
            -   Contract signed by [party]
            -   Payment received
            -   Milestone X submitted
            -   Milestone X approved
            -   Project paused/resumed
            -   Files uploaded
            -   Messages sent (count, not content)
        -   Each entry: icon, description, timestamp, actor
        -   Load more (pagination)

    **Tab 2: Milestones** (if project has milestones)

    -   List of milestones in sequence
    -   Each milestone card:

        -   Number, title, description
        -   Status badge
        -   Amount (percentage & value)
        -   Deadline
        -   Progress indicator
        -   If submitted: deliverables (files, links)
        -   Actions:
            -   For supplier: "Submit Deliverables" (if pending)
            -   For client: "Review & Approve" (if submitted)

    -   Overall progress: "Milestone 2 of 5 completed"

    **Tab 3: Files & Deliverables**

    -   Two sections: Client Files & Supplier Files
    -   Each file:
        -   Icon/thumbnail
        -   Filename
        -   Uploaded by, upload date
        -   Download button
    -   Upload new file button (with description/note)
    -   File categories: Requirements, Deliverables, References, Other

    **Tab 4: Messages**

    -   Embedded chat/conversation component
    -   Direct messages between client and supplier
    -   File sharing within chat
    -   Mark as read
    -   (Full implementation in messaging stage)

    **Tab 5: Contract**

    -   Embedded contract viewer (iframe or rendered HTML)
    -   Contract number, version
    -   Signature status:
        -   Client signed: ✓ (date)
        -   Supplier signed: ✓ (date)
    -   Download PDF button
    -   If not signed: "Sign Contract" button

    **Sidebar (Desktop) / Section (Mobile):**

    -   **Next Action Card:**

        -   Clear CTA based on status
        -   E.g., "Pay initial deposit ($900)" with button
        -   "Review Milestone 2" with button
        -   "Awaiting supplier to submit"

    -   **Need Help?** Card:
        -   FAQ link
        -   Contact support
        -   Report a problem

-   **Actions & Modals:**

    **For Client:**

    -   **Pay Initial Deposit:**

        -   Triggered if status = 'awaiting_payment'
        -   Open payment modal (details in payment stage)
        -   Show amount breakdown: project fee + commission

    -   **Review Milestone:**

        -   Modal showing milestone deliverables
        -   Download/view files
        -   Actions: Approve, Request Revision
        -   If Request Revision: textarea for notes

    -   **Approve Final Delivery:**

        -   Confirm approval
        -   Release final payment
        -   Prompt to leave review

    -   **Request Changes:**

        -   Modal: describe changes needed
        -   Indicate if minor (no cost) or major (may incur cost)
        -   Submit request

    -   **Pause Project:**
        -   Modal: reason, expected duration
        -   Submit pause request
        -   Await supplier approval

    **For Supplier:**

    -   **Confirm Start:**

        -   After payment received
        -   "Start Working" button
        -   Confirmation modal
        -   Changes status to 'in_progress'

    -   **Submit Milestone:**

        -   Upload deliverables (files)
        -   Add links (if applicable)
        -   Add completion notes
        -   Submit for review

    -   **Submit Final Delivery:**

        -   Upload all final files
        -   Add completion summary
        -   Mark project as complete
        -   Submit for client approval

    -   **Update Progress:**

        -   Update progress percentage
        -   Add progress note (optional)
        -   Upload WIP files

    -   **Respond to Change Request:**
        -   View change details
        -   Accept (if within scope)
        -   Propose new quote (if extra work)
        -   Reject (with reason)

    **For Both:**

    -   **Message:**

        -   Open chat/messages tab or modal

    -   **View Contract:**

        -   Open contract in modal or new tab

    -   **Pause/Resume:**

        -   Request or approve pause/resume

    -   **Cancel Project:**
        -   Conditions apply
        -   Confirm cancellation
        -   Provide reason

-   **Real-time Updates:**

    -   Project status changes reflect immediately
    -   New messages show badge notification
    -   New file uploads appear in list
    -   Milestone status updates

-   **Responsive Design:**

    -   Mobile: tabs as accordion or separate pages
    -   Collapsible sections
    -   Bottom action bar for primary CTA

-   **Loading & Error States:**
    -   Skeleton for main content
    -   Error message if project not found or unauthorized

**Dependencies:** TASK-049 (Projects API), TASK-051 (Contracts API), Design mockups

**Related US:** US-057, US-059 to US-063

**Technical Notes:**

-   Consider lazy loading tabs
-   Use React Query for data fetching and real-time updates
-   Optimize file uploads with progress indicators

---

#### TASK-054: Build Milestones Management UI

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 16 hours
**Sprint:** 6

**Description:**
Create interface for defining, submitting, and approving milestones.

**Acceptance Criteria:**

-   **Define Milestones Modal** (during project setup or early stage):

    -   Title: "Set Up Project Milestones"
    -   Add milestone form:
        -   Milestone number (auto-increment)
        -   Title input
        -   Description textarea
        -   Percentage input (with slider)
        -   Amount (auto-calculated, read-only)
        -   Deadline date picker
    -   Add another milestone button
    -   Visual: list of added milestones with edit/delete
    -   Validation:
        -   Total percentage must equal 100%
        -   Deadlines in sequence
    -   Preview: show payment schedule
    -   Require approval from both parties
    -   Submit button

-   **Submit Milestone Deliverables Modal** (supplier):

    -   Milestone title & description display
    -   Upload deliverables:
        -   Drag & drop or file picker
        -   Multiple files
        -   Progress bars
    -   Add links (optional): URLs to live demos, repositories, etc.
    -   Completion notes textarea
    -   Preview uploaded files
    -   Submit button: "Submit for Review"

-   **Review Milestone Modal** (client):

    -   Milestone info display
    -   Deliverables section:
        -   List of files with preview/download
        -   List of links (clickable)
        -   Supplier's notes
    -   Review form:
        -   Approve button (green, prominent)
        -   Request Revision button (yellow)
        -   If Request Revision: textarea for revision notes
    -   Info: "Payment will be released upon approval"
    -   Confirm approval modal (nested):
        -   "Approve this milestone and release $X?"
        -   Checkbox: confirm
        -   Approve button

-   **Milestone Cards in Project Detail:**
    -   Each milestone shows current status:
        -   Pending: "Start Working" button (supplier)
        -   In Progress: progress updates
        -   Submitted: "Review Now" button (client)
        -   Revision Requested: revision notes, "Resubmit" (supplier)
        -   Approved: checkmark, approval date, payment released

**Dependencies:** TASK-050 (API), TASK-053

**Related US:** US-065 to US-068

---

#### TASK-055: Build Contract Viewer & Signature Flow

**Role:** Frontend Developer
**Priority:** High
**Estimated Time:** 16 hours
**Sprint:** 6

**Description:**
Create contract viewing interface with digital signature functionality.

**Acceptance Criteria:**

-   **Contract Viewer Modal/Page:**

    -   Route: `/projects/:id/contract` or modal in project detail
    -   Display contract HTML content
    -   Sections clearly formatted:
        -   Header with contract number, date
        -   Parties information
        -   Scope of work
        -   Payment terms
        -   Milestones (if applicable)
        -   Warranty
        -   Dispute resolution
        -   Terms & conditions
        -   Signature section
    -   Sticky sidebar (desktop):
        -   Signature status:
            -   Client: Signed ✓ / Pending
            -   Supplier: Signed ✓ / Pending
        -   Sign button (if user hasn't signed)
        -   Download PDF button
    -   Version history (if multiple versions):
        -   List versions
        -   View previous versions

-   **Digital Signature Flow:**

    -   Click "Sign Contract" button
    -   Confirmation modal:
        -   "You are about to digitally sign this contract"
        -   Checkbox: "I have read and agree to all terms"
        -   Security verification:
            -   Option 1: Enter password
            -   Option 2: OTP to email/phone
        -   Sign button (disabled until checkbox + verification)
    -   On sign:
        -   Call sign API
        -   Show loading: "Signing..."
        -   Success:
            -   Update signature status
            -   Show success message: "Contract signed successfully"
            -   Confetti animation
            -   If both signed: "Contract is now active. Project can proceed."
            -   Send confirmation email
        -   Error: show error message

-   **Add Custom Clause Flow:**

    -   Button: "Propose Custom Clause"
    -   Modal:
        -   Textarea: clause text
        -   Info: "Other party must approve before contract is updated"
        -   Submit
    -   Upon submission:
        -   Notify other party
        -   Show pending status
    -   When other party responds:
        -   If approved: contract updated, both must re-sign
        -   If rejected: notification to proposer

-   **Download PDF:**

    -   Generate PDF on backend
    -   Download to device
    -   Filename: `Contract_PRJ-2025-00001_v1.pdf`

-   **Responsive Design:**
    -   Mobile: full-screen contract view, bottom action bar

**Dependencies:** TASK-051 (Contracts API), Design mockups

**Related US:** US-073, US-074, US-075

---

Due to the extensive length of the remaining tasks, I'll provide a structured summary of the remaining stages and can expand any specific stage on request:

## Remaining Stages Summary

### Stage 8: Payments & Wallet (Tasks 056-070)

-   Payment gateway integration (Stripe, PayTabs, HyperPay)
-   Escrow system implementation
-   Wallet management (balance, transactions, deposits, withdrawals)
-   Invoice generation
-   Refund processing
-   Commission calculation and deduction
-   Payment history and receipts
-   Bank account linking for suppliers

### Stage 9: Reviews & Ratings (Tasks 071-078)

-   Review submission after project completion
-   Multi-criteria rating system
-   Review responses
-   Review moderation and reporting
-   Helpfulness voting
-   Average rating calculations
-   Review display and filtering

### Stage 10: Messaging System (Tasks 079-088)

-   Real-time chat implementation (WebSocket or Socket.io)
-   Conversation management
-   File attachments in messages
-   Message read receipts
-   Typing indicators
-   Message search
-   Conversation archiving and muting
-   System messages

### Stage 11: Notifications (Tasks 089-096)

-   Multi-channel notifications (in-app, email, SMS, push)
-   Notification preferences management
-   Notification center/inbox
-   Real-time notification delivery
-   Email templates
-   SMS integration
-   Push notification setup (FCM)
-   Notification batching and digests

### Stage 12: Disputes (Tasks 097-104)

-   Dispute creation and filing
-   Evidence upload
-   Dispute messaging between parties
-   Admin dispute review and resolution
-   Escalation workflow
-   Dispute status tracking
-   Resolution enforcement (payment adjustments)
-   Dispute analytics

### Stage 13: Reports & Moderation (Tasks 105-112)

-   Report submission for various entities
-   Report review queue for admins
-   Content moderation (hide/delete)
-   User warnings and sanctions
-   Suspension and banning system
-   Blacklist management
-   Violation tracking
-   Automated moderation (optional)

### Stage 14: Admin Dashboard (Tasks 113-130)

-   Admin authentication and roles
-   Overview dashboard with KPIs
-   User management (list, view, edit, ban)
-   Verification document review
-   Category management CRUD
-   Content pages management
-   FAQ management
-   Commission rules configuration
-   Platform settings
-   Analytics and reports (users, revenue, projects, disputes)
-   Audit log viewer
-   Export functionality

### Stage 15: Advanced Features (Tasks 131-150)

-   Saved searches with notifications
-   Favorites management
-   Subscription plans for suppliers
-   Subscription management (upgrade, cancel, billing)
-   Promo codes and campaigns
-   Referral program
-   Supplier statistics dashboard
-   Advanced search with Elasticsearch
-   Multi-language support (AR/EN switching)
-   Dark/Light mode
-   2FA implementation
-   Password policies
-   Session management
-   Data export (GDPR compliance)
-   Performance optimization
-   SEO optimization
-   Accessibility improvements (WCAG)
-   Progressive Web App (PWA) features
-   Mobile app preparation (API optimization)

---

## Total Estimation Summary

### By Role:

-   **Backend Development:** ~950 hours
-   **Frontend Development:** ~850 hours
-   **DevOps/Infrastructure:** ~200 hours
-   **QA/Testing:** ~300 hours
-   **UI/UX Design:** ~100 hours (if in-house)
-   **Project Management:** ~100 hours

**Total:** ~2,500 hours

### By Priority:

-   **Critical (MVP):** ~1,400 hours (8-9 months with team of 4-5)
-   **High:** ~600 hours
-   **Medium:** ~350 hours
-   **Low:** ~150 hours

### Recommended Team Composition for MVP:

-   2 Backend Developers
-   2 Frontend Developers
-   1 Full-Stack Developer / DevOps
-   1 QA Engineer
-   1 UI/UX Designer (part-time or contractor)
-   1 Project Manager / Scrum Master

### Sprint Plan (2-week sprints):

-   **Sprints 1-2:** Foundation, Auth, User Management (Tasks 1-23)
-   **Sprints 3-4:** Supplier Profiles, Categories, Requests (Tasks 24-41)
-   **Sprints 5-6:** Offers, Projects, Contracts (Tasks 42-55)
-   **Sprints 7-8:** Payments, Wallet, Reviews (Tasks 56-78)
-   **Sprints 9-10:** Messaging, Notifications (Tasks 79-96)
-   **Sprints 11-12:** Disputes, Moderation, Admin (Tasks 97-120)
-   **Sprints 13-14:** Advanced Features, Polish (Tasks 121-140)
-   **Sprints 15-16:** Testing, Bug Fixes, Deployment (Tasks 141-150)

**Total MVP Timeline:** ~8 months with recommended team

---
