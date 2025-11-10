# Frontend Structure Application - Documentation

This document describes the structure and changes applied to the frontend/eetmad directory based on the structure defined in `docs/structrure.md`.

## 📋 Overview

The complete Next.js 14 App Router structure has been applied to the frontend project, organizing the codebase into a scalable, maintainable architecture following modern best practices.

## 🗂️ Directory Structure Created

### 1. **src/app/** - Next.js App Router

#### Route Groups:

- **`(auth)/`** - Authentication routes
  - `login/page.tsx`
  - `register/page.tsx`
  - `forgot-password/page.tsx`
  - `reset-password/page.tsx`
  - `verify-email/page.tsx`
  - `layout.tsx` - Centered auth layout

- **`(main)/`** - Main application routes
  - `dashboard/page.tsx`
  - `profile/page.tsx`
  - `profile/edit/page.tsx`
  - `profile/security/page.tsx`
  - `layout.tsx` - Main layout with header/sidebar

- **`(client)/`** - Client-specific routes
  - `requests/page.tsx`
  - `requests/new/page.tsx`
  - `requests/[id]/page.tsx`
  - `requests/[id]/edit/page.tsx`
  - `requests/[id]/offers/page.tsx`
  - `requests/my-requests/page.tsx`
  - `projects/page.tsx`
  - `projects/[id]/page.tsx`

- **`(supplier)/`** - Supplier-specific routes
  - `profile/setup/page.tsx`
  - `profile/edit/page.tsx`
  - `portfolio/page.tsx`
  - `offers/page.tsx`
  - `offers/new/page.tsx`
  - `offers/[id]/page.tsx`
  - `offers/[id]/edit/page.tsx`
  - `projects/[id]/page.tsx`
  - `stats/page.tsx`

- **`(public)/`** - Public pages
  - `page.tsx` - Home/Landing page
  - `about/page.tsx`
  - `how-it-works/page.tsx`
  - `categories/page.tsx`
  - `categories/[slug]/page.tsx`
  - `suppliers/page.tsx`
  - `suppliers/[id]/page.tsx`
  - `terms/page.tsx`
  - `privacy/page.tsx`
  - `faq/page.tsx`
  - `contact/page.tsx`
  - `layout.tsx` - Public layout

- **`(admin)/`** - Admin routes
  - `admin/dashboard/page.tsx`
  - `admin/users/page.tsx`
  - `admin/users/[id]/page.tsx`
  - `admin/verification/page.tsx`
  - `admin/categories/page.tsx`
  - `admin/disputes/page.tsx`
  - `admin/disputes/[id]/page.tsx`
  - `admin/reports/page.tsx`
  - `admin/settings/page.tsx`
  - `admin/analytics/page.tsx`

- **`api/`** - API routes
  - `webhooks/route.ts` - Webhook handler

#### Root App Files:

- `layout.tsx` - Root layout (updated to use new structure)
- `page.tsx` - Home page
- `error.tsx` - Error boundary
- `loading.tsx` - Global loading component
- `not-found.tsx` - 404 page
- `globals.css` - Moved to `src/styles/globals.css`

### 2. **src/components/** - React Components

#### **ui/** - Base UI Components (shadcn/ui)

- `button.tsx` - Button component with variants

#### **shared/** - Shared/Reusable Components

- **layouts/**
  - `Header.tsx` - Application header
  - `Footer.tsx` - Application footer
  - `Sidebar.tsx` - (placeholder directory)
  - `MobileNav.tsx` - (placeholder directory)
  - `PageLayout.tsx` - (placeholder directory)
  - `Container.tsx` - (placeholder directory)

- **navigation/** - (placeholder directory)
  - Breadcrumbs, Pagination, Tabs, MobileBottomNav

- **forms/** - (placeholder directory)
  - FormField, TextInput, PhoneInput, DatePicker, etc.

- **data-display/** - (placeholder directory)
  - DataTable, EmptyState, StatCard, Timeline, etc.

- **feedback/** - (placeholder directory)
  - Toast, Alert, ConfirmationDialog, Tooltip

- **media/** - (placeholder directory)
  - Avatar, ImageGallery, Lightbox, Carousel, etc.

- **badges/** - (placeholder directory)
  - StatusBadge, VerifiedBadge, RatingDisplay, Tag

- **cards/** - (placeholder directory)
  - RequestCard, OfferCard, ProjectCard, SupplierCard, UserCard

- **misc/** - (placeholder directory)
  - Logo, LanguageSwitcher, ThemeToggle, SearchBar, etc.

#### **features/** - Feature-Specific Components

Feature directories created (placeholder):

- `auth/` - LoginForm, RegisterForm, etc.
- `profile/` - ProfileHeader, ProfileEditForm, etc.
- `supplier/` - ProfileSetupWizard, PortfolioManager, etc.
- `requests/` - RequestForm, RequestCard, RequestDetail, etc.
- `offers/` - OfferForm, OfferCard, OfferDetail, etc.
- `projects/` - ProjectCard, ProjectDetail, ProjectTimeline, etc.
- `contracts/` - ContractViewer, SignatureModal, etc.
- `payments/` - PaymentModal, WalletBalance, etc.
- `reviews/` - ReviewForm, ReviewCard, ReviewsList, etc.
- `messages/` - ConversationsList, MessageThread, etc.
- `notifications/` - NotificationsList, NotificationItem, etc.
- `disputes/` - DisputeForm, DisputeDetail, etc.
- `admin/` - UserManagement, VerificationQueue, etc.
- `common/` - SearchWithFilters, FavoriteButton, etc.

### 3. **src/lib/** - Library Code

#### **api/** - API Client

- `client.ts` - Axios instance with interceptors
- `auth.ts` - Authentication API endpoints
- `users.ts` - User API endpoints
- `suppliers.ts` - Supplier API endpoints
- `categories.ts` - Categories API endpoints
- `requests.ts` - Requests API endpoints
- `offers.ts` - Offers API endpoints
- `projects.ts` - Projects API endpoints

#### **hooks/** - Custom React Hooks

- `useAuth.ts` - Authentication hook
- `useDebounce.ts` - Debounce hook
- `useLocalStorage.ts` - LocalStorage hook

#### **utils/** - Utility Functions

- `cn.ts` - Classnames utility (tailwind-merge + clsx)
- `formatters.ts` - Date and currency formatters
- `validators.ts` - Validation helpers (email, phone, URL)
- `helpers.ts` - General helpers (debounce, slugify, truncate)
- `storage.ts` - localStorage/sessionStorage helpers
- `constants.ts` - App constants

#### **types/** - TypeScript Types

- `index.ts` - Main type exports
- `auth.types.ts` - Authentication types
- `user.types.ts` - User types
- `common.types.ts` - Common types (ApiResponse, PaginatedResponse, etc.)

#### **schemas/** - Zod Validation Schemas

- `auth.schema.ts` - Login and register schemas

#### **constants/** - App Constants

- `routes.ts` - Route constants
- `config.ts` - App configuration
- `status.ts` - Status constants (REQUEST_STATUS, OFFER_STATUS, PROJECT_STATUS)

### 4. **src/store/** - Zustand Stores

- `authStore.ts` - Authentication state management
- `uiStore.ts` - UI state (sidebar, theme)
- `messagesStore.ts` - Messages state
- `notificationsStore.ts` - Notifications state

### 5. **src/contexts/** - React Contexts

- `AuthContext.tsx` - Authentication context provider
- `ThemeContext.tsx` - Theme context provider (light/dark)
- `LocaleContext.tsx` - Locale context provider (i18n)
- `SocketContext.tsx` - WebSocket context provider (placeholder)

### 6. **src/styles/** - Styles

- `globals.css` - Global styles (moved from app/)
- `themes.css` - Theme variables (CSS custom properties)
- `tokens.ts` - Design tokens (TypeScript)

### 7. **src/mocks/** - MSW Mocks

- `browser.ts` - MSW browser setup
- `handlers.ts` - Request handlers
- `data/users.ts` - Mock user data
- `utils/factories.ts` - Data factories

### 8. **src/i18n/** - Internationalization

- `config.ts` - i18n configuration
- `index.ts` - Main exports
- `locales/en/common.json` - English translations
- `locales/ar/common.json` - Arabic translations

### 9. **public/** - Static Assets

- `images/` - Static images
  - `illustrations/` - Illustration images
  - `placeholders/` - Placeholder images
- `icons/` - App icons
- `fonts/` - Local fonts
- `robots.txt` - SEO robots file

### 10. **tests/** - Test Directories

- `unit/` - Unit tests
  - `components/`
  - `utils/`
- `integration/` - Integration tests
  - `api/`
- `e2e/` - End-to-end tests
  - `flows/`

### 11. **docs/** - Documentation

- Documentation directory structure ready

### 12. **.github/** - GitHub Configuration

- `workflows/` - CI/CD workflows (placeholder)
- `ISSUE_TEMPLATE/` - Issue templates (placeholder)

## 🔧 Configuration Files Updated

### 1. **tsconfig.json**

- Updated path aliases:
  - `@/*` → `./src/*`
  - `@/components/*` → `./src/components/*`
  - `@/lib/*` → `./src/lib/*`
  - `@/hooks/*` → `./src/lib/hooks/*`
  - `@/utils/*` → `./src/lib/utils/*`
  - `@/types/*` → `./src/lib/types/*`
  - `@/styles/*` → `./src/styles/*`
  - `@/api/*` → `./src/lib/api/*`
- Added `src/**/*` to include array

### 2. **next.config.ts**

- Added `reactStrictMode: true`
- Configured image domains: `['localhost', 'i.pravatar.cc']`
- Added image formats: `['image/avif', 'image/webp']`
- Added experimental optimizations for `lucide-react`

### 3. **package.json**

- Added dependencies:
  - `axios` - HTTP client
  - `zustand` - State management
  - `react-hook-form` - Form handling
  - `@hookform/resolvers` - Form resolvers
  - `zod` - Schema validation
  - `clsx` - Classnames utility
  - `tailwind-merge` - Tailwind class merging
- Added devDependencies:
  - `prettier` - Code formatter
  - `msw` - Mock Service Worker
- Updated scripts:
  - `lint` - Changed to `next lint`
  - Added `format` - Prettier formatting
  - Added `type-check` - TypeScript type checking

### 4. **components.json**

- Created shadcn/ui configuration file
- Configured paths and aliases

### 5. **.prettierrc**

- Created Prettier configuration
- Set formatting rules (semi, singleQuote, printWidth, etc.)

### 6. **src/app/layout.tsx**

- Updated import path for `globals.css`: `@/styles/globals.css`

### 7. **src/styles/globals.css**

- Added import for `themes.css`

## 📝 Key Files Created

### API Client

- **src/lib/api/client.ts**: Axios instance with request/response interceptors
  - Automatically adds auth token to requests
  - Handles 401 errors (redirects to login)

### Authentication

- **src/lib/api/auth.ts**: Authentication API methods
  - `login`, `register`, `logout`, `refreshToken`, `forgotPassword`, `resetPassword`
- **src/lib/hooks/useAuth.ts**: Authentication hook
- **src/contexts/AuthContext.tsx**: Auth context provider
- **src/store/authStore.ts**: Auth state store

### Utilities

- **src/lib/utils/cn.ts**: Classnames utility (combines clsx + tailwind-merge)
- **src/lib/utils/formatters.ts**: Date and currency formatting
- **src/lib/utils/validators.ts**: Email, phone, URL validation
- **src/lib/utils/storage.ts**: localStorage/sessionStorage helpers

### Types & Schemas

- **src/lib/types/**: TypeScript type definitions
- **src/lib/schemas/auth.schema.ts**: Zod validation schemas for auth

### State Management

- **src/store/**: Zustand stores for global state
- **src/contexts/**: React contexts for theme, locale, auth, socket

### Internationalization

- **src/i18n/**: i18n setup with English and Arabic locales

### Mocking

- **src/mocks/**: MSW setup for API mocking during development

## 🎯 What Was Done

1. ✅ Created complete directory structure following the structure document
2. ✅ Moved existing `app/` folder to `src/app/`
3. ✅ Moved `globals.css` to `src/styles/globals.css`
4. ✅ Created all route group directories with placeholder pages
5. ✅ Created component directories (ui, shared, features)
6. ✅ Set up API client structure with axios
7. ✅ Created utility functions and helpers
8. ✅ Set up TypeScript types and schemas
9. ✅ Created Zustand stores for state management
10. ✅ Set up React contexts (Auth, Theme, Locale, Socket)
11. ✅ Configured i18n with English and Arabic
12. ✅ Set up MSW for API mocking
13. ✅ Updated all configuration files (tsconfig, next.config, package.json)
14. ✅ Created design tokens and theme files
15. ✅ Created placeholder component files

## 🚀 Next Steps

### 1. Install Dependencies

```bash
cd frontend/eetmad
npm install
```

### 2. Add More UI Components

Install shadcn/ui components as needed:

```bash
npx shadcn@latest add [component-name]
```

### 3. Implement Pages

Fill in the placeholder page components with actual implementations:

- Start with authentication pages (login, register)
- Then dashboard and profile pages
- Then feature-specific pages

### 4. Add More API Endpoints

Extend the API files in `src/lib/api/` as backend endpoints become available:

- `contracts.ts`
- `payments.ts`
- `reviews.ts`
- `messages.ts`
- `notifications.ts`
- `disputes.ts`
- `admin.ts`

### 5. Create Feature Components

Start building components in `src/components/features/`:

- Begin with shared components (Header, Footer, Sidebar)
- Then feature-specific components (RequestForm, OfferCard, etc.)

### 6. Set Up MSW Handlers

Configure mock handlers in `src/mocks/handlers.ts` for development:

- Add handlers for all API endpoints
- Use factories from `src/mocks/utils/factories.ts` to generate mock data

### 7. Configure Environment Variables

Create `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Service Platform"
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_USE_MOCKS=true
```

### 8. Add More Hooks

Create additional custom hooks as needed:

- `useRequests.ts`
- `useOffers.ts`
- `useProjects.ts`
- `useMessages.ts`
- `useNotifications.ts`
- `useMediaQuery.ts`
- `useClickOutside.ts`
- `useInfiniteScroll.ts`

### 9. Implement Testing

Set up testing infrastructure:

- Configure Jest for unit tests
- Set up Playwright for E2E tests
- Write tests for critical components and utilities

### 10. Add Documentation

Create documentation files in `docs/`:

- `setup.md` - Setup instructions
- `architecture.md` - Architecture overview
- `components.md` - Component documentation
- `api-integration.md` - API integration guide

## 📚 Architecture Principles

### Component Organization

- **UI Components** (`/components/ui`): Base components from shadcn/ui, minimal customization
- **Shared Components** (`/components/shared`): Generic components with light business logic
- **Feature Components** (`/components/features`): Feature-specific components with business logic

### State Management Strategy

1. **Server State**: Use TanStack Query (to be added) for data fetching and caching
2. **Global UI State**: Use Zustand stores for theme, sidebar, modals
3. **Auth State**: Use React Context + Zustand
4. **Form State**: Use React Hook Form

### File Naming Conventions

- **React Components**: PascalCase with `.tsx` (e.g., `Button.tsx`)
- **Utilities**: camelCase with `.ts` (e.g., `formatDate.ts`)
- **Hooks**: camelCase starting with `use` (e.g., `useAuth.ts`)
- **Types**: PascalCase with `.types.ts` (e.g., `User.types.ts`)
- **Routes**: lowercase with `page.tsx` (e.g., `page.tsx`)

## ✅ Benefits of This Structure

1. **Scalability**: Easy to add new features and components
2. **Maintainability**: Clear organization and separation of concerns
3. **Type Safety**: Full TypeScript support with proper types
4. **Developer Experience**: Path aliases make imports clean
5. **Testability**: Easy to test isolated components and utilities
6. **Mock-First Development**: MSW enables development without backend
7. **Internationalization**: Ready for multi-language support
8. **Modern Best Practices**: Follows Next.js 14 App Router patterns

## 📖 References

- Structure document: `docs/structrure.md`
- Next.js 14 Documentation: https://nextjs.org/docs
- shadcn/ui: https://ui.shadcn.com
- Zustand: https://zustand-demo.pmnd.rs
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev
- MSW: https://mswjs.io

---

**Created:** $(date)
**Structure Applied From:** `docs/structrure.md`
**Project:** Service Platform Frontend
