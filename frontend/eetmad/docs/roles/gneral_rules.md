I'll create comprehensive rules files for all aspects of your project to guide AI development.

## 1. THEME_RULES.md

````markdown
# Theme & Styling Rules

## Color System - STRICT RULES

### ✅ ALWAYS Use Semantic Tokens

```tsx
// Correct - semantic tokens that adapt to light/dark mode
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground border-border">
<div className="bg-primary text-primary-foreground">
<div className="bg-muted text-muted-foreground">
```
````

### ❌ NEVER Use Hardcoded Colors

```tsx
// WRONG - Will break theme switching
<div className="bg-white dark:bg-gray-900">
<div className="bg-blue-600 text-white">
<div className="text-gray-500 dark:text-gray-400">
```

## Available Theme Tokens

### Background Colors

- `bg-background` - Main page background
- `bg-foreground` - Inverted (rarely used)
- `bg-card` - Cards, panels, elevated surfaces
- `bg-popover` - Dropdowns, popovers
- `bg-primary` - Primary brand color
- `bg-secondary` - Secondary actions
- `bg-muted` - Subdued backgrounds
- `bg-accent` - Highlighted elements
- `bg-destructive` - Errors, warnings

### Text Colors

- `text-foreground` - Default text
- `text-card-foreground` - Text on cards
- `text-primary` - Primary brand text
- `text-primary-foreground` - Text on primary backgrounds
- `text-secondary-foreground` - Text on secondary backgrounds
- `text-muted-foreground` - Secondary/helper text
- `text-accent-foreground` - Text on accent backgrounds
- `text-destructive` - Error text
- `text-success` - Success messages
- `text-warning` - Warning messages
- `text-info` - Information messages

### Borders & Rings

- `border-border` - Default borders
- `border-input` - Input borders
- `ring-ring` - Focus rings

## Opacity for Variations

Use opacity instead of color shades:

```tsx
// ✅ Correct
<div className="bg-primary/10">        // 10% opacity
<div className="bg-card/50">           // 50% opacity
<div className="text-foreground/70">   // 70% opacity
<div className="border-border/30">     // 30% opacity

// ❌ Wrong
<div className="bg-primary-100">
<div className="bg-gray-50">
```

## Common Patterns

### Cards

```tsx
<div className="bg-card text-card-foreground border-border rounded-lg border shadow-sm">
  <h3 className="text-foreground font-semibold">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Buttons

```tsx
// Primary
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">

// Secondary
<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">

// Ghost
<Button variant="ghost" className="text-foreground hover:bg-accent">

// Destructive
<Button variant="destructive" className="bg-destructive text-destructive-foreground">
```

### Forms

```tsx
<Input
  className="bg-background border-input text-foreground
             placeholder:text-muted-foreground
             focus:ring-ring focus:border-primary"
/>
<Label className="text-foreground">
<FormDescription className="text-muted-foreground">
<FormMessage className="text-destructive">
```

### Status Indicators

```tsx
<Badge className="bg-success/10 text-success">Active</Badge>
<Badge className="bg-warning/10 text-warning">Pending</Badge>
<Badge className="bg-destructive/10 text-destructive">Rejected</Badge>
<Badge className="bg-info/10 text-info">Draft</Badge>
```

### Hero Sections

```tsx
<section className="bg-primary text-primary-foreground">
  <h1 className="text-primary-foreground">Hero Title</h1>
  <p className="text-primary-foreground/90">Subtitle with slight transparency</p>

  {/* Card on colored background */}
  <div className="bg-card text-card-foreground border-border">Content</div>
</section>
```

### Glass Effects

```tsx
<div className="bg-card/80 border-border/50 border backdrop-blur-md">Glass morphism content</div>
```

## Dark Mode Rules

### ❌ DO NOT use dark: prefix for colors

```tsx
// WRONG - defeats the purpose of theme system
<div className="bg-white dark:bg-gray-900">
<div className="text-black dark:text-white">
```

### ✅ Theme handles it automatically

```tsx
// CORRECT - automatically adapts
<div className="bg-background">
<div className="text-foreground">
```

### Exception: Non-color utilities only

```tsx
// OK - for spacing, sizing, etc.
<div className="p-4 md:p-6 dark:p-8">
<img className="opacity-100 dark:opacity-80">
```

## RTL Support

Use logical properties for RTL compatibility:

```tsx
// ✅ Good - RTL compatible
<div className="ps-4 pe-8">  // padding-inline-start/end
<div className="ms-auto">    // margin-inline-start
<div className="text-start">  // text-align: start

// ❌ Avoid - physical directions
<div className="pl-4 pr-8">
<div className="ml-auto">
<div className="text-left">
```

## Component-Specific Patterns

### Navigation

```tsx
// Active item
<a className="bg-accent text-accent-foreground font-medium">

// Inactive item
<a className="text-muted-foreground hover:text-foreground hover:bg-accent/50">
```

### Tables

```tsx
<Table>
  <TableHeader className="bg-muted">
    <TableRow>
      <TableHead className="text-muted-foreground">Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="border-border hover:bg-muted/50">
      <TableCell className="text-foreground">Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Modals

```tsx
<Dialog>
  <DialogContent className="bg-card text-card-foreground border-border">
    <DialogHeader>
      <DialogTitle className="text-foreground">Title</DialogTitle>
      <DialogDescription className="text-muted-foreground">Description</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

## Testing Checklist

Before submitting any component:

- [ ] No hardcoded color classes (blue-600, gray-100, etc.)
- [ ] Uses only semantic tokens
- [ ] Uses opacity modifiers for variations
- [ ] No `dark:` variants for colors
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] Text is readable on all backgrounds
- [ ] Borders are visible
- [ ] RTL compatible (if applicable)

## Quick Reference

| Need            | Use                                  | Never Use                |
| --------------- | ------------------------------------ | ------------------------ |
| Page background | `bg-background`                      | `bg-white dark:bg-black` |
| Card            | `bg-card`                            | `bg-gray-50`             |
| Primary action  | `bg-primary text-primary-foreground` | `bg-blue-600 text-white` |
| Secondary text  | `text-muted-foreground`              | `text-gray-500`          |
| Border          | `border-border`                      | `border-gray-200`        |
| Success         | `text-success`                       | `text-green-600`         |
| Error           | `text-destructive`                   | `text-red-600`           |
| Light overlay   | `bg-primary/10`                      | `bg-primary-50`          |

````

## 2. I18N_RULES.md

```markdown
# Internationalization (i18n) Rules

## Translation System - next-intl

### Import Pattern
```tsx
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('namespace');

  return <h1>{t('title')}</h1>;
}
````

## File Structure

```
src/i18n/
├── config.ts                 # i18n configuration
├── locales/
│   ├── ar/                   # Arabic translations
│   │   ├── common.json
│   │   ├── auth.json
│   │   ├── requests.json
│   │   ├── offers.json
│   │   ├── projects.json
│   │   └── validation.json
│   └── en/                   # English translations
│       ├── common.json
│       ├── auth.json
│       ├── requests.json
│       ├── offers.json
│       ├── projects.json
│       └── validation.json
└── index.ts
```

## Namespace Organization

### common.json

```json
{
  "app": {
    "name": "Service Platform",
    "tagline": "Connect with trusted service providers"
  },
  "nav": {
    "home": "Home",
    "dashboard": "Dashboard",
    "requests": "Requests",
    "offers": "Offers",
    "projects": "Projects",
    "profile": "Profile"
  },
  "actions": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "submit": "Submit",
    "back": "Back",
    "next": "Next",
    "finish": "Finish",
    "confirm": "Confirm",
    "viewDetails": "View Details",
    "download": "Download"
  },
  "status": {
    "pending": "Pending",
    "active": "Active",
    "completed": "Completed",
    "cancelled": "Cancelled",
    "draft": "Draft"
  }
}
```

### auth.json

```json
{
  "login": {
    "title": "Login to Your Account",
    "email": "Email Address",
    "password": "Password",
    "submit": "Sign In",
    "forgotPassword": "Forgot Password?",
    "noAccount": "Don't have an account?",
    "signUp": "Sign Up"
  },
  "register": {
    "title": "Create Your Account",
    "selectType": "I want to",
    "client": "Request Services",
    "supplier": "Provide Services",
    "fullName": "Full Name",
    "email": "Email Address",
    "phone": "Phone Number",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "terms": "I agree to the Terms and Conditions",
    "submit": "Create Account",
    "hasAccount": "Already have an account?",
    "signIn": "Sign In"
  }
}
```

### requests.json

```json
{
  "list": {
    "title": "Service Requests",
    "empty": "No requests found",
    "create": "Create New Request"
  },
  "form": {
    "title": "Create Service Request",
    "category": "Service Category",
    "description": "Request Description",
    "budget": "Budget",
    "deadline": "Deadline",
    "location": "Location",
    "attachments": "Attachments"
  },
  "detail": {
    "postedBy": "Posted by",
    "postedOn": "Posted on",
    "status": "Status",
    "offers": "Offers Received",
    "viewOffers": "View All Offers"
  }
}
```

### validation.json

```json
{
  "required": "{field} is required",
  "email": "Please enter a valid email address",
  "phone": "Please enter a valid phone number",
  "minLength": "{field} must be at least {min} characters",
  "maxLength": "{field} must not exceed {max} characters",
  "passwordMatch": "Passwords do not match",
  "minValue": "{field} must be at least {min}",
  "maxValue": "{field} must not exceed {max}",
  "invalidDate": "Please enter a valid date",
  "futureDate": "Date must be in the future"
}
```

## Usage Patterns

### Simple Translation

```tsx
const t = useTranslations('auth.login');

<h1>{t('title')}</h1>;
// Output: "Login to Your Account"
```

### With Variables

```tsx
const t = useTranslations('validation');

t('minLength', { field: 'Password', min: 8 });
// Output: "Password must be at least 8 characters"
```

### Pluralization

```json
// en/common.json
{
  "offers": {
    "count": "{count, plural, =0 {No offers} =1 {1 offer} other {# offers}}"
  }
}
```

```tsx
const t = useTranslations('common.offers');

t('count', { count: 0 }); // "No offers"
t('count', { count: 1 }); // "1 offer"
t('count', { count: 5 }); // "5 offers"
```

### Rich Text

```json
{
  "terms": "I agree to the <terms>Terms and Conditions</terms>"
}
```

```tsx
const t = useTranslations('auth.register');

t.rich('terms', {
  terms: (chunks) => <Link href="/terms">{chunks}</Link>,
});
```

### Date & Number Formatting

```tsx
import { useFormatter } from 'next-intl';

const format = useFormatter();

// Dates
format.dateTime(new Date(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

// Numbers
format.number(1234.56, {
  style: 'currency',
  currency: 'USD',
});

// Relative Time
format.relativeTime(new Date('2024-01-01'));
// Output: "10 months ago"
```

## Component Patterns

### Page Component

```tsx
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('auth.login');

  return (
    <div>
      <h1>{t('title')}</h1>
      <form>
        <label>{t('email')}</label>
        <input type="email" placeholder={t('email')} />

        <label>{t('password')}</label>
        <input type="password" placeholder={t('password')} />

        <button>{t('submit')}</button>
      </form>
    </div>
  );
}
```

### Form with Validation

```tsx
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export default function Component() {
  const t = useTranslations('validation');

  const schema = z.object({
    email: z.string().email(t('email')),
    password: z.string().min(8, t('minLength', { field: 'Password', min: 8 })),
  });

  // ... rest of component
}
```

### Metadata (SEO)

```tsx
// app/[locale]/requests/page.tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'requests.list' });

  return {
    title: t('title'),
    description: t('description'),
  };
}
```

## RTL Support

### Layout Detection

```tsx
// app/[locale]/layout.tsx
import { notFound } from 'next/navigation';

const locales = ['en', 'ar'];

export default function LocaleLayout({ children, params: { locale } }) {
  if (!locales.includes(locale)) notFound();

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body>{children}</body>
    </html>
  );
}
```

### RTL-Aware Components

```tsx
import { useLocale } from 'next-intl';

export default function Component() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className={cn('flex items-center gap-2', isRTL ? 'flex-row-reverse' : 'flex-row')}>
      {/* Content */}
    </div>
  );
}
```

## Best Practices

### ✅ DO

```tsx
// Use semantic keys
t('auth.login.title');

// Use variables for dynamic content
t('offers.count', { count: offersCount });

// Organize by feature
useTranslations('requests.form');

// Use rich text for links
t.rich('terms', { link: (chunks) => <Link>{chunks}</Link> });
```

### ❌ DON'T

```tsx
// Hardcode text
<h1>Login to Your Account</h1>;

// Use generic keys
(t('text1'), t('label2'));

// Mix multiple namespaces
const t1 = useTranslations('auth');
const t2 = useTranslations('common');
// Instead, use one namespace per component

// Forget pluralization
{
  offers.length;
}
offers;
// Use: t('offers.count', { count: offers.length })
```

## Translation File Rules

### 1. Flat Structure Within Namespace

```json
// ✅ Good
{
  "title": "Login",
  "subtitle": "Welcome back",
  "submitButton": "Sign In"
}

// ❌ Too nested
{
  "page": {
    "header": {
      "title": "Login"
    }
  }
}
```

### 2. Consistent Naming

```json
{
  "createButton": "Create", // ✅ Consistent
  "submitButton": "Submit",
  "cancelButton": "Cancel",

  "btnCreate": "Create", // ❌ Inconsistent
  "submit": "Submit"
}
```

### 3. Reuse Common Terms

```json
// common.json
{
  "actions": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  }
}

// Use in components
const tCommon = useTranslations('common.actions');
<Button>{tCommon('save')}</Button>
```

## Language Switching

```tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <select value={locale} onChange={(e) => switchLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}
```

## Testing Translations

```tsx
// Check for missing translations
import en from '@/i18n/locales/en/common.json';
import ar from '@/i18n/locales/ar/common.json';

test('all keys exist in both languages', () => {
  const enKeys = Object.keys(en);
  const arKeys = Object.keys(ar);

  expect(enKeys).toEqual(arKeys);
});
```

## Checklist

Before submitting code with text:

- [ ] All text is translated (no hardcoded strings)
- [ ] Translation keys are semantic
- [ ] Variables are used for dynamic content
- [ ] Pluralization is handled
- [ ] RTL is considered
- [ ] Both EN and AR files are updated
- [ ] SEO metadata is translated

````

## 3. MOCK_DATA_RULES.md

```markdown
# Mock Data Rules (MSW)

## Overview

We use Mock Service Worker (MSW) for API mocking during development. This allows frontend development without backend dependency.

## File Structure

````

src/mocks/
├── browser.ts # MSW browser setup
├── handlers.ts # API handlers export
├── data/ # Mock data
│ ├── users.ts
│ ├── suppliers.ts
│ ├── requests.ts
│ ├── offers.ts
│ ├── projects.ts
│ └── messages.ts
└── utils/
├── factories.ts # Data generators
└── helpers.ts # Helper functions

````

## Setup

### 1. Browser Setup (`mocks/browser.ts`)
```typescript
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
````

### 2. App Integration (`app/layout.tsx`)

```typescript
'use client';

import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
      import('@/mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
        });
      });
    }
  }, []);

  return children;
}
```

## Mock Data Structure

### Users (`mocks/data/users.ts`)

```typescript
import { User } from '@/lib/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'client@example.com',
    fullName: 'Ahmed Mohammed',
    phone: '+966501234567',
    role: 'client',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isVerified: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'supplier@example.com',
    fullName: 'Sara Ahmed',
    phone: '+966507654321',
    role: 'supplier',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isVerified: true,
    supplierProfile: {
      id: 's1',
      userId: '2',
      businessName: 'Sara Design Studio',
      bio: 'Professional graphic designer with 5 years experience',
      categories: ['graphic-design', 'branding'],
      rating: 4.8,
      reviewsCount: 45,
      completedProjects: 67,
      isVerified: true,
      portfolio: [
        {
          id: 'p1',
          title: 'Logo Design',
          description: 'Modern logo for tech startup',
          images: ['https://picsum.photos/400/300?random=1'],
          category: 'graphic-design',
        },
      ],
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
];

export const getCurrentUser = () => mockUsers[0]; // Simulated logged-in user
```

### Requests (`mocks/data/requests.ts`)

```typescript
import { ServiceRequest } from '@/lib/types';

export const mockRequests: ServiceRequest[] = [
  {
    id: 'req1',
    userId: '1',
    user: mockUsers[0],
    categoryId: 'graphic-design',
    title: 'Logo Design for Tech Startup',
    description: 'Need a modern, minimalist logo for my new SaaS platform...',
    budget: {
      min: 500,
      max: 1500,
      currency: 'SAR',
    },
    deadline: '2024-12-31T23:59:59Z',
    location: 'Riyadh, Saudi Arabia',
    attachments: [
      {
        id: 'att1',
        name: 'brand-guidelines.pdf',
        url: '/uploads/brand-guidelines.pdf',
        type: 'application/pdf',
        size: 1024000,
      },
    ],
    status: 'open',
    offersCount: 12,
    viewsCount: 145,
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-05T15:30:00Z',
  },
  // Add more requests...
];
```

### Factories (`mocks/utils/factories.ts`)

```typescript
import { faker } from '@faker-js/faker';
import { User, ServiceRequest, Offer } from '@/lib/types';

export const createMockUser = (overrides?: Partial<User>): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  fullName: faker.person.fullName(),
  phone: faker.phone.number('+966 5# ### ####'),
  role: faker.helpers.arrayElement(['client', 'supplier']),
  avatar: faker.image.avatar(),
  isVerified: faker.datatype.boolean(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  ...overrides,
});

export const createMockRequest = (overrides?: Partial<ServiceRequest>): ServiceRequest => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  categoryId: faker.helpers.arrayElement(['graphic-design', 'web-dev', 'writing']),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraphs(2),
  budget: {
    min: faker.number.int({ min: 500, max: 2000 }),
    max: faker.number.int({ min: 2000, max: 10000 }),
    currency: 'SAR',
  },
  deadline: faker.date.future().toISOString(),
  status: faker.helpers.arrayElement(['draft', 'open', 'in-progress', 'completed', 'cancelled']),
  offersCount: faker.number.int({ min: 0, max: 20 }),
  viewsCount: faker.number.int({ min: 0, max: 500 }),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  ...overrides,
});

// Usage:
const users = Array.from({ length: 50 }, () => createMockUser());
const requests = Array.from({ length: 100 }, () => createMockRequest());
```

## API Handlers

### Basic Handler Structure (`mocks/handlers.ts`)

```typescript
import { http, HttpResponse } from 'msw';
import { mockUsers, mockRequests, mockOffers } from './data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const handlers = [
  // Auth
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const { email, password } = await request.json();

    const user = mockUsers.find((u) => u.email === email);

    if (!user || password !== 'password123') {
      return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return HttpResponse.json({
      user,
      token: 'mock-jwt-token',
    });
  }),

  http.post(`${API_URL}/auth/register`, async ({ request }) => {
    const data = await request.json();

    const newUser = createMockUser(data);
    mockUsers.push(newUser);

    return HttpResponse.json(
      {
        user: newUser,
        token: 'mock-jwt-token',
      },
      { status: 201 }
    );
  }),

  http.get(`${API_URL}/auth/me`, () => {
    return HttpResponse.json(getCurrentUser());
  }),

  // Requests
  http.get(`${API_URL}/requests`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const status = url.searchParams.get('status');
    const category = url.searchParams.get('category');

    let filtered = mockRequests;

    if (status) {
      filtered = filtered.filter((r) => r.status === status);
    }

    if (category) {
      filtered = filtered.filter((r) => r.categoryId === category);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filtered.slice(start, end);

    return HttpResponse.json({
      data: paginatedData,
      meta: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
      },
    });
  }),

  http.get(`${API_URL}/requests/:id`, ({ params }) => {
    const request = mockRequests.find((r) => r.id === params.id);

    if (!request) {
      return HttpResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return HttpResponse.json(request);
  }),

  http.post(`${API_URL}/requests`, async ({ request }) => {
    const data = await request.json();

    const newRequest = createMockRequest({
      ...data,
      userId: getCurrentUser().id,
      status: 'draft',
    });

    mockRequests.push(newRequest);

    return HttpResponse.json(newRequest, { status: 201 });
  }),

  http.patch(`${API_URL}/requests/:id`, async ({ params, request }) => {
    const data = await request.json();
    const index = mockRequests.findIndex((r) => r.id === params.id);

    if (index === -1) {
      return HttpResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    mockRequests[index] = {
      ...mockRequests[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(mockRequests[index]);
  }),

  http.delete(`${API_URL}/requests/:id`, ({ params }) => {
    const index = mockRequests.findIndex((r) => r.id === params.id);

    if (index === -1) {
      return HttpResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    mockRequests.splice(index, 1);

    return HttpResponse.json({ success: true });
  }),

  // Offers
  http.get(`${API_URL}/requests/:id/offers`, ({ params }) => {
    const offers = mockOffers.filter((o) => o.requestId === params.id);
    return HttpResponse.json(offers);
  }),

  http.post(`${API_URL}/offers`, async ({ request }) => {
    const data = await request.json();

    const newOffer = createMockOffer({
      ...data,
      supplierId: getCurrentUser().id,
      status: 'pending',
    });

    mockOffers.push(newOffer);

    // Increment offers count on request
    const req = mockRequests.find((r) => r.id === data.requestId);
    if (req) req.offersCount++;

    return HttpResponse.json(newOffer, { status: 201 });
  }),

  // Add more handlers for projects, messages, etc.
];
```

## Simulating Network Delays

```typescript
http.get(`${API_URL}/requests`, async () => {
  // Simulate network delay
  await delay(500);

  return HttpResponse.json(mockRequests);
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

## Simulating Errors

```typescript
http.post(`${API_URL}/requests`, async ({ request }) => {
  const data = await request.json();

  // Simulate validation error
  if (!data.title || data.title.length < 10) {
    return HttpResponse.json(
      {
        error: 'Validation failed',
        details: {
          title: 'Title must be at least 10 characters',
        },
      },
      { status: 400 }
    );
  }

  // Simulate server error (5% chance)
  if (Math.random() < 0.05) {
    return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  // Success
  const newRequest = createMockRequest(data);
  return HttpResponse.json(newRequest, { status: 201 });
});
```

## Using Mock Data in Components

### With TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchRequests } from '@/lib/api/requests';

export default function RequestsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['requests', { page: 1 }],
    queryFn: () => fetchRequests({ page: 1, limit: 10 }),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data.data.map(request => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
```

### With Mutations

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRequest } from '@/lib/api/requests';

export function CreateRequestForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      toast.success('Request created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  // ... rest of component
}
```

## Best Practices

### ✅ DO

```typescript
// Use factories for generating data
const users = Array.from({ length: 100 }, () => createMockUser());

// Simulate realistic delays
await delay(300);

// Handle pagination
const paginatedData = data.slice((page - 1) * limit, page * limit);

// Simulate errors
if (Math.random() < 0.1) {
  return HttpResponse.json({ error: 'Server error' }, { status: 500 });
}

// Use realistic data
fullName: faker.person.fullName(),
email: faker.internet.email(),
```

### ❌ DON'T

```typescript
// Hardcode small datasets
const users = [{ id: 1, name: 'User 1' }];

// Return instantly (unrealistic)
return HttpResponse.json(data);

// Ignore pagination
return HttpResponse.json(allData);

// Use generic data
name: 'Test User',
email: 'test@test.com',
```

## Transition to Real API

When backend is ready:

1. **Update environment variable:**

```env
NEXT_PUBLIC_USE_MOCKS=false
NEXT_PUBLIC_API_URL=https://api.yourplatform.com
```

2. **API client stays the same:**

```typescript
// No changes needed in components!
const { data } = useQuery({
  queryKey: ['requests'],
  queryFn: fetchRequests,
});
```

3. **Gradual migration:**

```typescript
// Can enable/disable mocks per endpoint
const USE_MOCK_AUTH = true;
const USE_MOCK_REQUESTS = false;

if (USE_MOCK_AUTH) {
  handlers.push(...authHandlers);
}
```

## Testing with MSW

```typescript
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

test('handles API error', async () => {
  server.use(
    http.get('/api/requests', () => {
      return HttpResponse.json(
        { error: 'Server error' },
        { status: 500 }
      );
    })
  );

  render(<RequestsList />);

  expect(await screen.findByText('Error loading requests')).toBeInTheDocument();
});
```

## Checklist

Before development:

- [ ] MSW is set up in `app/layout.tsx`
- [ ] Mock data files exist for all entities
- [ ] Factories are created for data generation
- [ ] Handlers cover all CRUD operations
- [ ] Pagination is implemented
- [ ] Errors are simulated
- [ ] Network delays are added
- [ ] Mock data is realistic (using Faker)

Before production:

- [ ] `NEXT_PUBLIC_USE_MOCKS=false` is set
- [ ] Real API URL is configured
- [ ] All API endpoints are implemented
- [ ] Authentication works with real backend
- [ ] MSW is removed from production build

```

## 4. COMPONENT_RULES.md

This is getting quite long! Would you like me to:

1. **Continue with the remaining rules files:**
   - COMPONENT_RULES.md (component development guidelines)
   - API_INTEGRATION_RULES.md (how to integrate with APIs)
   - PROJECT_STRUCTURE_RULES.md (folder organization)
   - DEVELOPMENT_WORKFLOW_RULES.md (step-by-step development process)

2. **Or create a master "AI_AGENT_GUIDE.md"** that references all these rules and provides a complete workflow for AI agents?

Let me know which approach you prefer, and I'll continue!
```
