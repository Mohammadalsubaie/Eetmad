# Frontend Build Prompt - Comprehensive Guide

This document provides a complete guide for building frontend pages and components for the Eetmad platform. Follow all sections carefully to ensure consistency, quality, and proper integration.

---

## 📋 Table of Contents

1. [Design & Visual Guidelines](#design--visual-guidelines)
2. [Component Building Rules](#component-building-rules)
3. [Project Structure](#project-structure)
4. [API Integration](#api-integration)
5. [TypeScript Types](#typescript-types)
6. [Page Building Workflow](#page-building-workflow)
7. [Component Checklist](#component-checklist)

---

## 🎨 Design & Visual Guidelines

### Reference: `docs/design-sample.md`

The home page design (`docs/design-sample.md`) serves as the **design foundation** for all pages. Key design elements to follow:

#### Color Palette (Use CSS Variables - Never Hardcode)

-   **Primary**: `#34656D` (Teal/Green)
-   **Secondary**: `#334443` (Dark Teal)
-   **Accent Gold**: `#FAEAB1` to `#F7DD7D` (Gradient)
-   **Background**: `#FAF8F1` (Cream/Beige)
-   **Text Primary**: `#334443`
-   **Text Secondary**: `#536765`
-   **Borders**: `#E0DCC8`
-   **Success**: `#3D8B64`
-   **Error**: `#C95454`
-   **Warning**: `#F3D049`

#### Design Patterns from Home Page

-   **Hero Sections**: Gradient backgrounds with blur effects
-   **Cards**: Rounded corners (`rounded-2xl` or `rounded-3xl`), subtle shadows, hover effects
-   **Buttons**: Gradient buttons for primary actions, outlined for secondary
-   **Icons**: Lucide React icons with consistent sizing
-   **Animations**: Framer Motion for hover, tap, and entrance animations
-   **Typography**: Bold headings, readable body text, proper hierarchy
-   **Spacing**: Generous padding and margins for breathing room

#### Visual Consistency

-   All pages must match the visual style of the home page
-   Use the same color scheme, spacing, and animation patterns
-   Maintain consistent card designs, button styles, and form layouts

---

## 🏗️ Component Building Rules

### Reference: `frontend/eetmad/docs/design/component-building-guidelines.md`

**CRITICAL**: Read and follow ALL rules from the component building guidelines. Key requirements:

### Rule 1: Theme System (MANDATORY)

```tsx
// ✅ ALWAYS use CSS variables
import { cssVars } from '@/styles/theme';

<div style={{ backgroundColor: cssVars.neutral.bg }}>
  <h1 style={{ color: cssVars.secondary.DEFAULT }}>Title</h1>
</div>

// ❌ NEVER hardcode colors
<div style={{ backgroundColor: '#FAF8F1' }}>  // WRONG!
```

**Available CSS Variables:**

-   `cssVars.primary.DEFAULT`, `cssVars.primary.dark`, `cssVars.primary.light`
-   `cssVars.secondary.DEFAULT`, `cssVars.secondary.darker`
-   `cssVars.accent.primary`, `cssVars.accent.secondary`, `cssVars.accent.warm`, `cssVars.accent.light`
-   `cssVars.neutral.bg`, `cssVars.neutral.surface`, `cssVars.neutral.surfaceAlt`, `cssVars.neutral.border`
-   `cssVars.neutral.textMuted`, `cssVars.neutral.textSecondary`
-   `cssVars.status.success`, `cssVars.status.error`, `cssVars.status.warning`, `cssVars.status.info`
-   `cssVars.gradient.gold`, `cssVars.gradient.primary`, `cssVars.gradient.hero`, `cssVars.gradient.cta`

**For Opacity:**

```tsx
// Use color-mix for opacity
style={{
  backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 95%, transparent)`,
}}
```

### Rule 2: Internationalization (MANDATORY)

```tsx
// ✅ ALWAYS use translations
import { useTranslations } from 'next-intl';

export default function MyComponent() {
	const t = useTranslations('namespace');

	return (
		<div>
			<h1>{t('title')}</h1>
			<p>{t('description')}</p>
			<button>{t('submitButton')}</button>
		</div>
	);
}

// ❌ NEVER hardcode text
<h1>Welcome</h1>; // WRONG!
```

**Translation Namespaces:**

-   `biddingPlatform` - Main platform content
-   `nav` - Navigation items
-   `common` - Common UI elements
-   `auth` - Authentication
-   `requests` - Requests feature
-   `offers` - Offers feature
-   `projects` - Projects feature
-   Feature-specific namespaces as needed

### Rule 3: Component Structure

```tsx
'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface MyComponentProps {
	title: string;
	description?: string;
	onAction?: () => void;
}

export default function MyComponent({ title, description, onAction }: MyComponentProps) {
	const t = useTranslations('namespace');

	return (
		<motion.div
			whileHover={{ y: -8 }}
			className='rounded-2xl border-2 p-6'
			style={{
				backgroundColor: cssVars.neutral.surface,
				borderColor: cssVars.neutral.border,
			}}
		>
			<h2 style={{ color: cssVars.secondary.DEFAULT }}>{title}</h2>
			{description && <p style={{ color: cssVars.neutral.textSecondary }}>{description}</p>}
			{onAction && (
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onAction}
					style={{
						background: cssVars.gradient.gold,
						color: cssVars.secondary.DEFAULT,
					}}
				>
					{t('actionButton')}
				</motion.button>
			)}
		</motion.div>
	);
}
```

### Rule 4: Styling Best Practices

-   **Use inline styles** with `cssVars` for colors
-   **Use Tailwind** for layout, spacing, and responsive design
-   **Combine both** for optimal results
-   **Never hardcode** colors, sizes, or spacing values

### Rule 5: Animations

-   Use **Framer Motion** for all animations
-   Common patterns: `whileHover`, `whileTap`, `initial`/`animate`/`transition`
-   Keep animations subtle and performant

### Rule 6: RTL Support

-   Use Tailwind logical properties (`ps-4`, `pe-6` instead of `pl-4`, `pr-6`)
-   Icons from Lucide React automatically flip in RTL
-   Test in both LTR and RTL modes

---

## 📁 Project Structure

### Reference: `docs/structure/frontendStructure.md`

#### Directory Organization

```
frontend/eetmad/src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Home page
│   │   ├── requests/      # Requests pages
│   │   ├── offers/        # Offers pages
│   │   └── projects/       # Projects pages
│   └── layout.tsx         # Root layout
│
├── components/
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── shared/            # Shared reusable components
│   │   ├── layouts/       # Header, Footer, Sidebar
│   │   ├── forms/         # Form components
│   │   ├── cards/         # Card components
│   │   └── data-display/  # Tables, lists, etc.
│   └── features/          # Feature-specific components
│       ├── requests/      # Request-related components
│       ├── offers/        # Offer-related components
│       └── projects/      # Project-related components
│
├── lib/
│   ├── api/              # API client functions
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── schemas/          # Zod validation schemas
│   ├── utils/            # Utility functions
│   └── constants/        # App constants
│
└── styles/
    └── theme/            # Theme system (CSS variables)
```

#### File Naming Conventions

-   **Components**: PascalCase with `.tsx` - `RequestCard.tsx`
-   **Hooks**: camelCase starting with `use` - `useRequests.ts`
-   **Types**: PascalCase with `.types.ts` - `request.types.ts`
-   **Utils**: camelCase with `.ts` - `formatters.ts`
-   **Pages**: lowercase `page.tsx`, `layout.tsx`

#### Component Placement

-   **Feature-specific**: `components/features/{feature-name}/`
-   **Shared across features**: `components/shared/`
-   **Base UI**: `components/ui/`

---

## 🔌 API Integration

### Reference: `docs/docs/endpoints.md`

**CRITICAL**: All API actions must match the endpoints documentation exactly.

### API Client Pattern

The API client is located in `frontend/eetmad/src/lib/api/`. Follow this pattern:

```tsx
// frontend/eetmad/src/lib/api/{feature}.ts
import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { CreateRequestInput, Request } from '@/lib/types/request.types';

export const requestsApi = {
	// GET requests
	getAll: async (params?: QueryParams) => {
		const { data } = await apiClient.get('/requests', { params });
		return data;
	},

	getById: async (id: string) => {
		const { data } = await apiClient.get(`/requests/${id}`);
		return data;
	},

	// POST requests
	create: async (requestData: CreateRequestInput) => {
		const { data: response } = await apiClient.post<Request>('/requests', requestData);
		return response;
	},

	// PUT requests
	update: async (id: string, requestData: Partial<CreateRequestInput>) => {
		const { data } = await apiClient.put(`/requests/${id}`, requestData);
		return data;
	},

	// PATCH requests
	publish: async (id: string) => {
		const { data } = await apiClient.patch(`/requests/${id}/publish`);
		return data;
	},

	close: async (id: string) => {
		const { data } = await apiClient.patch(`/requests/${id}/close`);
		return data;
	},

	// DELETE requests
	delete: async (id: string) => {
		const { data } = await apiClient.delete(`/requests/${id}`);
		return data;
	},
};
```

### Using API in Components

```tsx
'use client';

import { useState, useEffect } from 'react';
import { requestsApi } from '@/lib/api/requests';
import type { Request } from '@/lib/types/request.types';

export default function RequestsList() {
	const [requests, setRequests] = useState<Request[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const data = await requestsApi.getAll({ status: 'active' });
				setRequests(data);
			} catch (error) {
				console.error('Failed to fetch requests:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchRequests();
	}, []);

	// Component JSX...
}
```

### API Endpoints Reference

**Key Endpoints by Feature:**

#### Requests (`/api/v1/requests`)

-   `GET /requests` - List all requests
-   `GET /requests/{id}` - Get request details
-   `POST /requests` - Create request
-   `PUT /requests/{id}` - Update request
-   `PATCH /requests/{id}/publish` - Publish request
-   `PATCH /requests/{id}/close` - Close request
-   `PATCH /requests/{id}/cancel` - Cancel request
-   `POST /requests/{id}/select-offer` - Select winning offer

#### Offers (`/api/v1/offers`)

-   `GET /offers` - List all offers
-   `GET /offers/{id}` - Get offer details
-   `POST /offers` - Create offer
-   `PUT /offers/{id}` - Update offer
-   `PATCH /offers/{id}/withdraw` - Withdraw offer
-   `PATCH /offers/{id}/accept` - Accept offer (Client)
-   `PATCH /offers/{id}/reject` - Reject offer (Client)

#### Projects (`/api/v1/projects`)

-   `GET /projects/me` - My projects
-   `GET /projects/{id}` - Project details
-   `PATCH /projects/{id}/start` - Start project
-   `PATCH /projects/{id}/complete` - Complete project
-   `POST /projects/{id}/delivery-proof` - Submit delivery proof

**See `docs/docs/endpoints.md` for complete endpoint list.**

---

## 📝 TypeScript Types

### Reference: `frontend/eetmad/src/lib/types/`

**CRITICAL**: Always use types from `@/lib/types` - never create inline types.

### Type Import Pattern

```tsx
import type { Request, CreateRequestInput, UpdateRequestInput, RequestStatus } from '@/lib/types/request.types';

import type { Offer, CreateOfferInput, OfferStatus } from '@/lib/types/offer.types';

import type { User, UserRole } from '@/lib/types/user.types';

import type { QueryParams, PaginatedResponse, ApiError } from '@/lib/types/common.types';
```

### Available Type Files

-   `common.types.ts` - Common types (QueryParams, PaginatedResponse, etc.)
-   `user.types.ts` - User-related types
-   `auth.types.ts` - Authentication types
-   `request.types.ts` - Request types
-   `offer.types.ts` - Offer types
-   `project.types.ts` - Project types
-   `supplier.types.ts` - Supplier types
-   `payment.types.ts` - Payment types
-   `review.types.ts` - Review types
-   `message.types.ts` - Message types
-   `notification.types.ts` - Notification types
-   And more... (see `frontend/eetmad/src/lib/types/index.ts`)

### Component Props Typing

```tsx
import type { Request } from '@/lib/types/request.types';

interface RequestCardProps {
	request: Request;
	onView?: (id: string) => void;
	onEdit?: (id: string) => void;
	showActions?: boolean;
}

export default function RequestCard({ request, onView, onEdit, showActions = true }: RequestCardProps) {
	// Component implementation...
}
```

---

## 🚀 Page Building Workflow

### Step-by-Step Process

#### 1. **Plan the Page**

-   Identify required components
-   List all API endpoints needed
-   Determine data flow and state management
-   Plan responsive breakpoints

#### 2. **Create Page File**

```tsx
// app/[locale]/requests/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { requestsApi } from '@/lib/api/requests';
import type { Request } from '@/lib/types/request.types';
import RequestsList from '@/components/features/requests/RequestsList';

export default function RequestsPage() {
	const t = useTranslations('requests');

	return (
		<div style={{ backgroundColor: cssVars.neutral.bg }}>
			<h1 style={{ color: cssVars.secondary.DEFAULT }}>{t('pageTitle')}</h1>
			<RequestsList />
		</div>
	);
}
```

#### 3. **Build Feature Components**

-   Create components in `components/features/{feature-name}/`
-   Follow component building rules
-   Use proper TypeScript types
-   Implement API integration

#### 4. **Add Translations**

-   Add translation keys to `messages/ar.json` and `messages/en.json`
-   Use proper namespace organization
-   Test in both languages

#### 5. **Test & Refine**

-   Test responsive design
-   Test RTL/LTR
-   Test API integration
-   Test error handling
-   Verify theme consistency

### Example: Building Requests Pages

#### Requests List Page (`/requests`)

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { requestsApi } from '@/lib/api/requests';
import type { Request } from '@/lib/types/request.types';
import RequestCard from '@/components/features/requests/RequestCard';
import EmptyState from '@/components/shared/data-display/EmptyState';

export default function RequestsPage() {
	const t = useTranslations('requests');
	const [requests, setRequests] = useState<Request[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchRequests();
	}, []);

	const fetchRequests = async () => {
		try {
			const data = await requestsApi.getAll({ status: 'active' });
			setRequests(data);
		} catch (error) {
			console.error('Failed to fetch requests:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container mx-auto py-8' style={{ backgroundColor: cssVars.neutral.bg }}>
			<h1 className='text-4xl font-bold mb-8' style={{ color: cssVars.secondary.DEFAULT }}>
				{t('pageTitle')}
			</h1>

			{loading ? (
				<div>Loading...</div>
			) : requests.length === 0 ? (
				<EmptyState message={t('noRequests')} />
			) : (
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{requests.map((request) => (
						<RequestCard key={request.id} request={request} />
					))}
				</div>
			)}
		</div>
	);
}
```

#### Request Detail Page (`/requests/[id]`)

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { requestsApi } from '@/lib/api/requests';
import type { Request } from '@/lib/types/request.types';
import RequestDetail from '@/components/features/requests/RequestDetail';

export default function RequestDetailPage() {
	const params = useParams();
	const id = params.id as string;
	const t = useTranslations('requests');
	const [request, setRequest] = useState<Request | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (id) {
			fetchRequest(id);
		}
	}, [id]);

	const fetchRequest = async (requestId: string) => {
		try {
			const data = await requestsApi.getById(requestId);
			setRequest(data);
		} catch (error) {
			console.error('Failed to fetch request:', error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (!request) return <div>{t('notFound')}</div>;

	return (
		<div className='container mx-auto py-8' style={{ backgroundColor: cssVars.neutral.bg }}>
			<RequestDetail request={request} />
		</div>
	);
}
```

---

## ✅ Component Checklist

Before submitting any component or page, verify:

### Design & Styling

-   [ ] All colors use `cssVars` from theme (no hardcoded colors)
-   [ ] All text uses `useTranslations` (no hardcoded text)
-   [ ] Design matches home page style (`docs/design-sample.md`)
-   [ ] Responsive design works on mobile, tablet, desktop
-   [ ] RTL support tested (if applicable)
-   [ ] Animations use Framer Motion appropriately

### Code Quality

-   [ ] TypeScript types imported from `@/lib/types`
-   [ ] Component properly typed with interface
-   [ ] Props interface defined
-   [ ] No `any` types used
-   [ ] Error handling implemented
-   [ ] Loading states handled

### API Integration

-   [ ] API functions in `lib/api/{feature}.ts`
-   [ ] Endpoints match `docs/docs/endpoints.md`
-   [ ] Proper error handling for API calls
-   [ ] Loading states during API calls
-   [ ] Success/error feedback to user

### Structure

-   [ ] Component in correct directory (`features/`, `shared/`, or `ui/`)
-   [ ] File naming follows conventions
-   [ ] Imports organized and clean
-   [ ] No unused imports or variables

### Functionality

-   [ ] Component works as expected
-   [ ] All interactions functional
-   [ ] Forms validated (if applicable)
-   [ ] Navigation works correctly
-   [ ] State management appropriate

---

## 📚 Quick Reference

### Import Patterns

```tsx
// Theme
import { cssVars } from '@/styles/theme';

// Translations
import { useTranslations } from 'next-intl';

// Animations
import { motion } from 'framer-motion';

// API
import { requestsApi } from '@/lib/api/requests';

// Types
import type { Request } from '@/lib/types/request.types';

// Icons
import { Search, Filter, Plus } from 'lucide-react';
```

### Common CSS Variable Usage

```tsx
// Backgrounds
backgroundColor: cssVars.neutral.bg; // Page background
backgroundColor: cssVars.neutral.surface; // Card background

// Text
color: cssVars.secondary.DEFAULT; // Primary text
color: cssVars.neutral.textSecondary; // Secondary text

// Borders
borderColor: cssVars.neutral.border;

// Buttons
background: cssVars.gradient.gold; // Primary button
backgroundColor: cssVars.primary.DEFAULT; // Secondary button

// Status
color: cssVars.status.success; // Success
color: cssVars.status.error; // Error
```

### Common Translation Namespaces

-   `biddingPlatform` - Main platform
-   `nav` - Navigation
-   `common` - Common UI
-   `requests` - Requests feature
-   `offers` - Offers feature
-   `projects` - Projects feature
-   `auth` - Authentication

---

## 🎯 Building Specific Pages

### Example: Build Requests Feature

**Prompt**: "Build the requests feature pages and components"

**Steps:**

1. Review `docs/docs/endpoints.md` for Requests endpoints
2. Check `frontend/eetmad/src/lib/types/request.types.ts` for types
3. Create API functions in `lib/api/requests.ts` (if not exists)
4. Build components in `components/features/requests/`:
    - `RequestsList.tsx` - List view
    - `RequestCard.tsx` - Card component
    - `RequestDetail.tsx` - Detail view
    - `RequestForm.tsx` - Create/Edit form
    - `RequestFilters.tsx` - Filter component
5. Create pages in `app/[locale]/requests/`:
    - `page.tsx` - List page
    - `[id]/page.tsx` - Detail page
    - `new/page.tsx` - Create page
6. Add translations to `messages/ar.json` and `messages/en.json`
7. Test all functionality

---

## 📖 Additional Resources

-   **Component Guidelines**: `frontend/eetmad/docs/design/component-building-guidelines.md`
-   **Design Sample**: `docs/design-sample.md`
-   **Frontend Structure**: `docs/structure/frontendStructure.md`
-   **Project Scope**: `docs/docs/project-scope.md`
-   **API Endpoints**: `docs/docs/endpoints.md`
-   **Types**: `frontend/eetmad/src/lib/types/`
-   **API Client**: `frontend/eetmad/src/lib/api/`

---

**Last Updated**: 2025
**Version**: 1.0
