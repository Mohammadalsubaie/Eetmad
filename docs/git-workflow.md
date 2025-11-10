# Git Workflow - Frontend Branches

This document outlines the branches created for the frontend folder based on the updates.

## 📋 Branches Created

All branches are based on the `develop` branch and contain logical groupings of frontend updates:

### 1. `feat/frontend-setup`

**Commit:** `feat(frontend): setup project configuration and dependencies`

-   Project configuration files (package.json, tsconfig.json, next.config.ts)
-   Build tools configuration (Tailwind, PostCSS, ESLint, Prettier)
-   Testing setup (Jest configuration)
-   Git hooks (Husky)
-   shadcn/ui configuration

**Files:** 15 files (package.json, tsconfig.json, next.config.ts, tailwind.config.ts, eslint.config.mjs, etc.)

### 2. `feat/frontend-infrastructure`

**Commit:** `feat(frontend): add core infrastructure (API, types, schemas, constants, utils, hooks)`

-   API client with Axios interceptors
-   API endpoints for all features (auth, users, suppliers, requests, offers, projects, contracts, payments, reviews, messages, notifications, disputes, admin, categories)
-   TypeScript types for all entities
-   Zod validation schemas
-   App constants (routes, config, status, permissions)
-   Utility functions (formatters, validators, helpers, storage)
-   Custom React hooks (useAuth, useRequests, useOffers, useProjects, useMessages, useNotifications, useDebounce, useLocalStorage, useMediaQuery, useClickOutside, useInfiniteScroll)

**Files:** 77 files

### 3. `feat/frontend-state`

**Commit:** `feat(frontend): add state management (stores and contexts)`

-   Zustand stores (authStore, uiStore, messagesStore, notificationsStore)
-   React contexts (AuthContext, ThemeContext, LocaleContext, SocketContext)

**Files:** 8 files

### 4. `feat/frontend-styling`

**Commit:** `feat(frontend): add styling and theming system`

-   Global CSS styles
-   Theme variables with CSS custom properties
-   Design tokens (TypeScript)
-   Light/dark theme support

**Files:** 3 files

### 5. `feat/frontend-i18n`

**Commit:** `feat(frontend): add internationalization (i18n) support`

-   next-intl configuration
-   i18n routing and locale detection
-   English and Arabic translation files
-   Locale context and provider

**Files:** 6 files

### 6. `feat/frontend-mocking`

**Commit:** `feat(frontend): add mocking setup with MSW`

-   Mock Service Worker (MSW) setup
-   Mock data for users, suppliers, requests, offers, projects, messages
-   Data factories for generating mock data
-   Proxy configuration

**Files:** 11 files

### 7. `feat/frontend-ui-components`

**Commit:** `feat(frontend): add UI components (base UI and shared components)`

-   shadcn/ui base components (button, input, card, badge, avatar, dialog, etc.)
-   Shared layout components (Header, Footer, Sidebar, Navbar, MobileNav, Container, PageLayout)
-   Shared form components (FormField, TextInput, PhoneInput, DatePicker, FileUpload, RichTextEditor, etc.)
-   Data display components (DataTable, EmptyState, Timeline, ProgressBar, LoadingSpinner, etc.)
-   Feedback components (Alert, Toast, ConfirmationDialog, Tooltip)
-   Media components (Avatar, AvatarGroup, ImageGallery, Carousel)
-   Badge components (StatusBadge, VerifiedBadge, RatingDisplay, Tag)
-   Card components (RequestCard, OfferCard, ProjectCard, SupplierCard, UserCard, StatCard)
-   Navigation components (Breadcrumbs, Pagination, Tabs)
-   Misc components (LanguageSwitcher, ThemeToggle, SearchBar, NotificationBell)

**Files:** 100 files

### 8. `feat/frontend-pages`

**Commit:** `feat(frontend): add pages and routing structure with feature components`

-   Next.js 14 App Router with route groups
-   Authentication pages (login, register, forgot-password, reset-password, verify-email)
-   Main app pages (dashboard, profile, profile/edit, profile/security)
-   Client pages (requests, requests/new, requests/[id], requests/[id]/edit, requests/[id]/offers, requests/my-requests, projects, projects/[id])
-   Supplier pages (profile/setup, profile/edit, portfolio, offers, offers/new, offers/[id], offers/[id]/edit, projects/[id], stats)
-   Public pages (home, about, how-it-works, categories, categories/[slug], suppliers, suppliers/[id], terms, privacy, faq, contact)
-   Admin pages (dashboard, users, users/[id], verification, categories, disputes, disputes/[id], reports, settings, analytics)
-   Feature components for all modules (auth, admin, client, supplier, requests, offers, projects, contracts, payments, reviews, messages, notifications, disputes, home, common, templates)
-   API routes and webhook handlers
-   Root layout, error boundaries, loading states, and 404 page

**Files:** 254 files

### 9. `feat/frontend-testing`

**Commit:** `feat(frontend): add testing infrastructure and validation scripts`

-   Jest configuration for unit testing
-   Test directories for unit, integration, and e2e tests
-   Validation scripts (validate-naming, validate-types, validate-structure)
-   Import checking script

**Files:** 7 files

### 10. `feat/frontend-docs-assets`

**Commit:** `feat(frontend): add documentation and public assets`

-   Project documentation (structure, checklist, theme setup, type updates)
-   Database documentation and SQL files
-   Roles and rules documentation
-   Public assets (icons, images, fonts directories)
-   robots.txt for SEO
-   SVG assets for UI elements

**Files:** 18 files

## 📊 Summary

-   **Total Branches:** 10
-   **Total Files Committed:** ~493 files
-   **Total Lines Added:** ~60,000+ lines

## 🔄 Next Steps

1. **Review each branch** to ensure all changes are correct
2. **Merge branches** in order (setup → infrastructure → state → styling → i18n → mocking → ui-components → pages → testing → docs-assets)
3. **Create pull requests** for each branch if using a collaborative workflow
4. **Test the application** after merging all branches

## 📝 Branch Order (Dependencies)

The branches should be merged in this order due to dependencies:

1. `feat/frontend-setup` (no dependencies)
2. `feat/frontend-infrastructure` (depends on setup)
3. `feat/frontend-state` (depends on infrastructure)
4. `feat/frontend-styling` (depends on setup)
5. `feat/frontend-i18n` (depends on setup)
6. `feat/frontend-mocking` (depends on infrastructure)
7. `feat/frontend-ui-components` (depends on styling, infrastructure)
8. `feat/frontend-pages` (depends on ui-components, state, i18n, infrastructure)
9. `feat/frontend-testing` (depends on setup)
10. `feat/frontend-docs-assets` (no dependencies)

## 🚀 Usage

To view all branches:

```bash
git branch | grep frontend
```

To checkout a specific branch:

```bash
git checkout feat/frontend-setup
```

To see the commit history:

```bash
git log --oneline --all --graph --decorate | grep frontend
```
