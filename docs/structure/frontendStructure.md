# Complete Project Structure - Service Platform (Frontend-First)

## 📁 Root Directory Structure

```
service-platform/
├── .github/                      # GitHub specific files
│   ├── workflows/                # CI/CD workflows
│   │   ├── ci.yml               # Continuous Integration
│   │   ├── deploy-staging.yml   # Deploy to staging
│   │   └── deploy-production.yml # Deploy to production
│   ├── ISSUE_TEMPLATE/          # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md # PR template
│
├── public/                       # Public static files
│   ├── images/                  # Static images
│   │   ├── logo.svg
│   │   ├── logo-dark.svg
│   │   ├── illustrations/
│   │   └── placeholders/
│   ├── icons/                   # App icons
│   │   ├── favicon.ico
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── fonts/                   # Local fonts (if any)
│   ├── mockServiceWorker.js     # MSW service worker
│   └── robots.txt
│
├── src/                         # Source code
│   ├── app/                     # Next.js 14 App Router
│   │   ├── (auth)/             # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   ├── verify-email/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx      # Auth layout (centered, no header)
│   │   │
│   │   ├── (main)/             # Main app route group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── edit/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── security/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx      # Main layout (header + sidebar)
│   │   │
│   │   ├── (client)/           # Client-specific routes
│   │   │   ├── requests/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── edit/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── offers/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── my-requests/
│   │   │   │       └── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (supplier)/         # Supplier-specific routes
│   │   │   ├── profile/
│   │   │   │   ├── setup/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── portfolio/
│   │   │   │   └── page.tsx
│   │   │   ├── offers/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── projects/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── stats/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (public)/           # Public pages
│   │   │   ├── page.tsx        # Home/Landing
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── how-it-works/
│   │   │   │   └── page.tsx
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── suppliers/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── terms/
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx
│   │   │   ├── faq/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (admin)/            # Admin routes
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── users/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── verification/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── categories/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── disputes/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── reports/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── analytics/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/                # API routes (for webhooks, etc.)
│   │   │   └── webhooks/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx          # Root layout
│   │   ├── error.tsx           # Error boundary
│   │   ├── loading.tsx         # Global loading
│   │   ├── not-found.tsx       # 404 page
│   │   └── globals.css         # Global styles
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── shared/             # Shared/reusable components
│   │   │   ├── layouts/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── MobileNav.tsx
│   │   │   │   ├── PageLayout.tsx
│   │   │   │   └── Container.tsx
│   │   │   │
│   │   │   ├── navigation/
│   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   ├── Pagination.tsx
│   │   │   │   ├── Tabs.tsx
│   │   │   │   └── MobileBottomNav.tsx
│   │   │   │
│   │   │   ├── forms/
│   │   │   │   ├── FormField.tsx
│   │   │   │   ├── TextInput.tsx
│   │   │   │   ├── PhoneInput.tsx
│   │   │   │   ├── DatePicker.tsx
│   │   │   │   ├── FileUpload.tsx
│   │   │   │   ├── ImageCropper.tsx
│   │   │   │   ├── RichTextEditor.tsx
│   │   │   │   ├── SearchableSelect.tsx
│   │   │   │   ├── MultiSelect.tsx
│   │   │   │   ├── OTPInput.tsx
│   │   │   │   └── PasswordStrengthIndicator.tsx
│   │   │   │
│   │   │   ├── data-display/
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── StatCard.tsx
│   │   │   │   ├── Timeline.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   ├── SkeletonCard.tsx
│   │   │   │   └── ErrorMessage.tsx
│   │   │   │
│   │   │   ├── feedback/
│   │   │   │   ├── Toast.tsx
│   │   │   │   ├── Alert.tsx
│   │   │   │   ├── ConfirmationDialog.tsx
│   │   │   │   └── Tooltip.tsx
│   │   │   │
│   │   │   ├── media/
│   │   │   │   ├── Avatar.tsx
│   │   │   │   ├── AvatarGroup.tsx
│   │   │   │   ├── ImageGallery.tsx
│   │   │   │   ├── Lightbox.tsx
│   │   │   │   ├── Carousel.tsx
│   │   │   │   └── VideoPlayer.tsx
│   │   │   │
│   │   │   ├── badges/
│   │   │   │   ├── StatusBadge.tsx
│   │   │   │   ├── VerifiedBadge.tsx
│   │   │   │   ├── RatingDisplay.tsx
│   │   │   │   └── Tag.tsx
│   │   │   │
│   │   │   ├── cards/
│   │   │   │   ├── RequestCard.tsx
│   │   │   │   ├── OfferCard.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── SupplierCard.tsx
│   │   │   │   └── UserCard.tsx
│   │   │   │
│   │   │   └── misc/
│   │   │       ├── Logo.tsx
│   │   │       ├── LanguageSwitcher.tsx
│   │   │       ├── ThemeToggle.tsx
│   │   │       ├── SearchBar.tsx
│   │   │       ├── NotificationBell.tsx
│   │   │       └── MessagesIcon.tsx
│   │   │
│   │   └── features/           # Feature-specific components
│   │       ├── auth/
│   │       │   ├── LoginForm.tsx
│   │       │   ├── RegisterForm.tsx
│   │       │   ├── UserTypeSelector.tsx
│   │       │   ├── ForgotPasswordForm.tsx
│   │       │   ├── ResetPasswordForm.tsx
│   │       │   ├── VerifyEmailForm.tsx
│   │       │   ├── TwoFactorSetup.tsx
│   │       │   └── SessionsList.tsx
│   │       │
│   │       ├── profile/
│   │       │   ├── ProfileHeader.tsx
│   │       │   ├── ProfileEditForm.tsx
│   │       │   ├── AvatarUpload.tsx
│   │       │   ├── ChangeEmailModal.tsx
│   │       │   ├── ChangePhoneModal.tsx
│   │       │   ├── ChangePasswordForm.tsx
│   │       │   ├── NotificationPreferences.tsx
│   │       │   ├── AccountDeactivation.tsx
│   │       │   └── AccountDeletion.tsx
│   │       │
│   │       ├── supplier/
│   │       │   ├── ProfileSetupWizard.tsx
│   │       │   ├── ServiceDescriptionEditor.tsx
│   │       │   ├── CategorySelector.tsx
│   │       │   ├── PortfolioManager.tsx
│   │       │   ├── PortfolioItemForm.tsx
│   │       │   ├── CertificateManager.tsx
│   │       │   ├── WorkingHoursEditor.tsx
│   │       │   ├── ProfileCompletion.tsx
│   │       │   ├── VerificationRequest.tsx
│   │       │   ├── SupplierStats.tsx
│   │       │   └── PublicProfileView.tsx
│   │       │
│   │       ├── requests/
│   │       │   ├── RequestForm.tsx
│   │       │   ├── RequestCard.tsx
│   │       │   ├── RequestDetail.tsx
│   │       │   ├── RequestFilters.tsx
│   │       │   ├── RequestSearch.tsx
│   │       │   ├── RequestsList.tsx
│   │       │   ├── CloseRequestModal.tsx
│   │       │   ├── CancelRequestModal.tsx
│   │       │   ├── ExtendDeadlineModal.tsx
│   │       │   └── RequestTimeline.tsx
│   │       │
│   │       ├── offers/
│   │       │   ├── OfferForm.tsx
│   │       │   ├── OfferCard.tsx
│   │       │   ├── OfferDetail.tsx
│   │       │   ├── OffersList.tsx
│   │       │   ├── OffersComparison.tsx
│   │       │   ├── AcceptOfferModal.tsx
│   │       │   ├── RejectOfferModal.tsx
│   │       │   ├── WithdrawOfferModal.tsx
│   │       │   └── OfferNotes.tsx
│   │       │
│   │       ├── projects/
│   │       │   ├── ProjectCard.tsx
│   │       │   ├── ProjectDetail.tsx
│   │       │   ├── ProjectTimeline.tsx
│   │       │   ├── ProjectFiles.tsx
│   │       │   ├── MilestonesList.tsx
│   │       │   ├── MilestoneForm.tsx
│   │       │   ├── MilestoneSubmission.tsx
│   │       │   ├── MilestoneReview.tsx
│   │       │   ├── ProgressUpdate.tsx
│   │       │   ├── ChangeRequestForm.tsx
│   │       │   ├── PauseProjectModal.tsx
│   │       │   ├── CancelProjectModal.tsx
│   │       │   └── ProjectStats.tsx
│   │       │
│   │       ├── contracts/
│   │       │   ├── ContractViewer.tsx
│   │       │   ├── SignatureModal.tsx
│   │       │   ├── AddClauseModal.tsx
│   │       │   ├── ContractVersionHistory.tsx
│   │       │   └── DownloadContractButton.tsx
│   │       │
│   │       ├── payments/
│   │       │   ├── PaymentModal.tsx
│   │       │   ├── WalletBalance.tsx
│   │       │   ├── TransactionsList.tsx
│   │       │   ├── AddFundsModal.tsx
│   │       │   ├── WithdrawFundsModal.tsx
│   │       │   ├── BankAccountForm.tsx
│   │       │   ├── InvoiceDownload.tsx
│   │       │   └── PaymentMethodSelector.tsx
│   │       │
│   │       ├── reviews/
│   │       │   ├── ReviewForm.tsx
│   │       │   ├── ReviewCard.tsx
│   │       │   ├── ReviewsList.tsx
│   │       │   ├── ReviewResponse.tsx
│   │       │   ├── RatingInput.tsx
│   │       │   └── ReviewFilters.tsx
│   │       │
│   │       ├── messages/
│   │       │   ├── ConversationsList.tsx
│   │       │   ├── MessageThread.tsx
│   │       │   ├── MessageInput.tsx
│   │       │   ├── MessageBubble.tsx
│   │       │   ├── FileAttachment.tsx
│   │       │   └── TypingIndicator.tsx
│   │       │
│   │       ├── notifications/
│   │       │   ├── NotificationsList.tsx
│   │       │   ├── NotificationItem.tsx
│   │       │   └── NotificationSettings.tsx
│   │       │
│   │       ├── disputes/
│   │       │   ├── DisputeForm.tsx
│   │       │   ├── DisputeDetail.tsx
│   │       │   ├── DisputeMessages.tsx
│   │       │   ├── DisputeEvidence.tsx
│   │       │   └── DisputeResolution.tsx
│   │       │
│   │       ├── admin/
│   │       │   ├── UserManagement.tsx
│   │       │   ├── VerificationQueue.tsx
│   │       │   ├── CategoryManager.tsx
│   │       │   ├── DisputeReview.tsx
│   │       │   ├── ReportsQueue.tsx
│   │       │   ├── SystemSettings.tsx
│   │       │   ├── AnalyticsDashboard.tsx
│   │       │   └── AuditLogViewer.tsx
│   │       │
│   │       └── common/
│   │           ├── SearchWithFilters.tsx
│   │           ├── SavedSearches.tsx
│   │           ├── FavoriteButton.tsx
│   │           ├── ShareButton.tsx
│   │           ├── ReportButton.tsx
│   │           └── CategoryBreadcrumb.tsx
│   │
│   ├── lib/                    # Library code
│   │   ├── api/               # API client
│   │   │   ├── client.ts      # Axios instance
│   │   │   ├── auth.ts        # Auth endpoints
│   │   │   ├── users.ts       # User endpoints
│   │   │   ├── suppliers.ts   # Supplier endpoints
│   │   │   ├── categories.ts  # Categories endpoints
│   │   │   ├── requests.ts    # Requests endpoints
│   │   │   ├── offers.ts      # Offers endpoints
│   │   │   ├── projects.ts    # Projects endpoints
│   │   │   ├── contracts.ts   # Contracts endpoints
│   │   │   ├── payments.ts    # Payments endpoints
│   │   │   ├── reviews.ts     # Reviews endpoints
│   │   │   ├── messages.ts    # Messages endpoints
│   │   │   ├── notifications.ts # Notifications endpoints
│   │   │   ├── disputes.ts    # Disputes endpoints
│   │   │   └── admin.ts       # Admin endpoints
│   │   │
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useUser.ts
│   │   │   ├── useRequests.ts
│   │   │   ├── useOffers.ts
│   │   │   ├── useProjects.ts
│   │   │   ├── useMessages.ts
│   │   │   ├── useNotifications.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useClickOutside.ts
│   │   │   └── useInfiniteScroll.ts
│   │   │
│   │   ├── utils/             # Utility functions
│   │   │   ├── cn.ts          # classnames utility
│   │   │   ├── formatters.ts  # Date, currency formatters
│   │   │   ├── validators.ts  # Validation helpers
│   │   │   ├── constants.ts   # App constants
│   │   │   ├── helpers.ts     # General helpers
│   │   │   └── storage.ts     # localStorage/sessionStorage helpers
│   │   │
│   │   ├── schemas/           # Zod validation schemas
│   │   │   ├── auth.schema.ts
│   │   │   ├── user.schema.ts
│   │   │   ├── supplier.schema.ts
│   │   │   ├── request.schema.ts
│   │   │   ├── offer.schema.ts
│   │   │   ├── project.schema.ts
│   │   │   ├── review.schema.ts
│   │   │   └── common.schema.ts
│   │   │
│   │   ├── types/             # TypeScript types
│   │   │   ├── index.ts       # Main exports
│   │   │   ├── auth.types.ts
│   │   │   ├── user.types.ts
│   │   │   ├── supplier.types.ts
│   │   │   ├── request.types.ts
│   │   │   ├── offer.types.ts
│   │   │   ├── project.types.ts
│   │   │   ├── payment.types.ts
│   │   │   ├── review.types.ts
│   │   │   ├── message.types.ts
│   │   │   ├── notification.types.ts
│   │   │   └── common.types.ts
│   │   │
│   │   └── constants/         # App-wide constants
│   │       ├── routes.ts
│   │       ├── config.ts
│   │       ├── status.ts
│   │       └── permissions.ts
│   │
│   ├── store/                 # Zustand stores
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   ├── messagesStore.ts
│   │   └── notificationsStore.ts
│   │
│   ├── contexts/              # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── LocaleContext.tsx
│   │   └── SocketContext.tsx
│   │
│   ├── styles/                # Styles
│   │   ├── globals.css
│   │   ├── tokens.ts          # Design tokens
│   │   └── themes.css         # Theme variables
│   │
│   ├── mocks/                 # MSW mocks
│   │   ├── browser.ts
│   │   ├── handlers.ts
│   │   ├── data/
│   │   │   ├── users.ts
│   │   │   ├── suppliers.ts
│   │   │   ├── requests.ts
│   │   │   ├── offers.ts
│   │   │   ├── projects.ts
│   │   │   └── messages.ts
│   │   └── utils/
│   │       └── factories.ts   # Data factories
│   │
│   └── i18n/                  # Internationalization
│       ├── config.ts
│       ├── locales/
│       │   ├── ar/
│       │   │   ├── common.json
│       │   │   ├── auth.json
│       │   │   ├── requests.json
│       │   │   ├── offers.json
│       │   │   ├── projects.json
│       │   │   └── validation.json
│       │   └── en/
│       │       ├── common.json
│       │       ├── auth.json
│       │       ├── requests.json
│       │       ├── offers.json
│       │       ├── projects.json
│       │       └── validation.json
│       └── index.ts
│
├── docs/                      # Documentation
│   ├── setup.md
│   ├── architecture.md
│   ├── components.md
│   ├── api-integration.md
│   ├── deployment.md
│   └── testing.md
│
├── tests/                     # Tests
│   ├── unit/
│   │   ├── components/
│   │   └── utils/
│   ├── integration/
│   │   └── api/
│   └── e2e/
│       └── flows/
│
├── .env.example               # Environment variables template
├── .env.local                 # Local environment (gitignored)
├── .eslintrc.json            # ESLint config
├── .prettierrc               # Prettier config
├── .gitignore
├── components.json           # shadcn/ui config
├── next.config.js            # Next.js config
├── package.json
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
├── postcss.config.js         # PostCSS config
└── README.md
```

---

## 📋 Key Configuration Files

### `package.json`

```json
{
	"name": "service-platform",
	"version": "0.1.0",
	"private": true,
	"scripts": {
		"dev": "next dev",
		"build": "next build",
		"start": "next start",
		"lint": "next lint",
		"format": "prettier --write .",
		"test": "jest",
		"test:watch": "jest --watch",
		"test:e2e": "playwright test",
		"type-check": "tsc --noEmit",
		"prepare": "husky install"
	},
	"dependencies": {
		"next": "^14.2.0",
		"react": "^18.3.0",
		"react-dom": "^18.3.0",
		"@tanstack/react-query": "^5.0.0",
		"@tanstack/react-table": "^8.0.0",
		"axios": "^1.6.0",
		"zustand": "^4.5.0",
		"react-hook-form": "^7.51.0",
		"@hookform/resolvers": "^3.3.0",
		"zod": "^3.22.0",
		"date-fns": "^3.0.0",
		"lucide-react": "^0.344.0",
		"class-variance-authority": "^0.7.0",
		"clsx": "^2.1.0",
		"tailwind-merge": "^2.2.0",
		"sonner": "^1.4.0",
		"recharts": "^2.12.0",
		"framer-motion": "^11.0.0",
		"next-themes": "^0.2.1",
		"next-intl": "^3.9.0"
	},
	"devDependencies": {
		"typescript": "^5.4.0",
		"@types/node": "^20.11.0",
		"@types/react": "^18.2.0",
		"@types/react-dom": "^18.2.0",
		"tailwindcss": "^3.4.0",
		"postcss": "^8.4.0",
		"autoprefixer": "^10.4.0",
		"eslint": "^8.57.0",
		"eslint-config-next": "^14.2.0",
		"prettier": "^3.2.0",
		"prettier-plugin-tailwindcss": "^0.5.0",
		"husky": "^9.0.0",
		"lint-staged": "^15.2.0",
		"msw": "^2.2.0",
		"@faker-js/faker": "^8.4.0"
	}
}
```

### `tsconfig.json`

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"jsx": "preserve",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"resolveJsonModule": true,
		"allowJs": true,
		"strict": true,
		"noEmit": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true,
		"incremental": true,
		"plugins": [
			{
				"name": "next"
			}
		],
		"paths": {
			"@/*": ["./src/*"],
			"@/components/*": ["./src/components/*"],
			"@/lib/*": ["./src/lib/*"],
			"@/hooks/*": ["./src/lib/hooks/*"],
			"@/utils/*": ["./src/lib/utils/*"],
			"@/types/*": ["./src/lib/types/*"],
			"@/styles/*": ["./src/styles/*"],
			"@/api/*": ["./src/lib/api/*"]
		}
	},
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
	"exclude": ["node_modules"]
}
```

### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				// ... more colors
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				sans: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
				mono: ['var(--font-geist-mono)', 'monospace'],
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;
```

### `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['localhost', 'i.pravatar.cc'], // Add your image domains
		formats: ['image/avif', 'image/webp'],
	},
	experimental: {
		optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
	},
	// Enable RTL support
	i18n: {
		locales: ['en', 'ar'],
		defaultLocale: 'en',
	},
};

module.exports = nextConfig;
```

### `.env.example`

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Service Platform"

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Mock Data (for development)
NEXT_PUBLIC_USE_MOCKS=true

# Features Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_2FA=true

# External Services (add when backend ready)
# NEXT_PUBLIC_STRIPE_KEY=
# NEXT_PUBLIC_GOOGLE_MAPS_KEY=
```

---

## 🎨 Component Organization Strategy

### 1. **UI Components** (`/components/ui`)

-   Base components from shadcn/ui
-   Minimal customization
-   Reusable across entire app
-   No business logic

### 2. **Shared Components** (`/components/shared`)

-   Generic components with light business logic
-   Used across multiple features
-   Examples: Header, Sidebar, DataTable, etc.

### 3. **Feature Components** (`/components/features`)

-   Feature-specific components
-   Contains business logic
-   Examples: RequestForm, OfferCard, etc.

---

## 📂 File Naming Conventions

### Components

-   **React Components**: PascalCase with `.tsx` extension
    -   `Button.tsx`, `UserCard.tsx`, `RequestForm.tsx`
-   **Utilities**: camelCase with `.ts` extension
    -   `formatDate.ts`, `validators.ts`, `apiClient.ts`
-   **Hooks**: camelCase starting with `use`
    -   `useAuth.ts`, `useDebounce.ts`
-   **Types**: PascalCase with `.types.ts` extension
    -   `User.types.ts`, `Request.types.ts`
-   **Constants**: UPPER_SNAKE_CASE or camelCase
    -   `API_ROUTES.ts`, `statusColors.ts`

### Pages (Next.js App Router)

-   **Route files**: lowercase with `page.tsx`
    -   `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
-   **Dynamic routes**: `[param]` folders
    -   `[id]/page.tsx`
-   **Route groups**: `(group)` folders (not in URL)
    -   `(auth)/login/page.tsx` → `/login`

---

## 🔄 State Management Strategy

### 1. **Server State** (TanStack Query)

```typescript
// For data fetching and caching
useQuery(['users', userId], () => fetchUser(userId));
useMutation(updateUser);
```

### 2. **Global UI State** (Zustand)

```typescript
// For theme, sidebar, modals, etc.
const useUIStore = create((set) => ({
	theme: 'light',
	sidebarOpen: true,
	toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
```

### 3. **Auth State** (React Context)

```typescript
// For user authentication
const { user, isAuthenticated, login, logout } = useAuth();
```

### 4. **Form State** (React Hook Form)

```typescript
// For form handling
const form = useForm({ resolver: zodResolver(schema) });
```

---

## 🧪 Testing Strategy

### Unit Tests

```
tests/unit/
  components/
    Button.test.tsx
    FormField.test.tsx
  utils/
    formatters.test.ts
    validators.test.ts
```

### Integration Tests

```
tests/integration/
  auth/
    login.test.tsx
    register.test.tsx
  requests/
    create-request.test.tsx
```

### E2E Tests

```
tests/e2e/
  flows/
    complete-project.spec.ts
    submit-offer.spec.ts
```

---

## 📚 Documentation Structure

### Component Documentation

```markdown
# ComponentName

## Description

Brief description of what the component does.

## Props

| Prop     | Type      | Default | Required | Description |
| -------- | --------- | ------- | -------- | ----------- |
| variant  | string    | default | No       | ...         |
| children | ReactNode | -       | Yes      | ...         |

## Usage

`tsx
<ComponentName variant="primary">
  Content
</ComponentName>
`

## Examples

...
```

---

## 🚀 Development Workflow

1. **Feature Branch**: `git checkout -b feature/request-form`
2. **Mock API First**: Create handlers in `/mocks/handlers.ts`
3. **Build Components**: Start with UI, then compose features
4. **Add Types**: Define types in `/lib/types`
5. **Integrate API**: Use TanStack Query hooks
6. **Test**: Write tests for critical paths
7. **PR & Review**: Create PR with detailed description

---

## 📦 Build & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Type Check

```bash
npm run type-check
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

---

This structure provides:

✅ **Clear separation of concerns**
✅ **Scalable architecture**
✅ **Easy to navigate**
✅ **Type-safe**
✅ **Testable**
✅ **Mock-first development**
✅ **RTL & i18n ready**
✅ **Modern best practices**

Would you like me to:

1. Create detailed file contents for any specific directory?
2. Provide example implementations for key components?
3. Detail the API mocking setup?
4. Show the authentication flow in detail?
