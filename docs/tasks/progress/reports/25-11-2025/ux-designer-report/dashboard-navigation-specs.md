# مواصفات Dashboard Navigation - دليل التطوير
**تاريخ الإنشاء:** 25 نوفمبر 2025

---

## نظرة عامة

هذا الدليل يقدم مواصفات تفصيلية لإضافة نظام تنقل كامل لصفحة Dashboard للمستخدم.

---

## 1. المكونات المطلوبة

### 1.1 DashboardSidebar Component

#### المواصفات:

```tsx
interface DashboardSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  userType?: 'client' | 'supplier';
}

// Navigation Items Structure
interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
  children?: NavItem[];
}
```

#### الميزات:
- ✅ Collapsible sidebar
- ✅ Navigation items مع icons
- ✅ Badges للإشعارات
- ✅ Active state
- ✅ Responsive design
- ✅ Quick actions section

---

### 1.2 QuickActionCard Component

#### المواصفات:

```tsx
interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  href: string;
  variant?: 'primary' | 'secondary';
  badge?: number;
}
```

#### الميزات:
- ✅ Icon + Title + Description
- ✅ Link to page
- ✅ Badge support
- ✅ Hover effects
- ✅ Responsive design

---

### 1.3 BackButton Component

#### المواصفات:

```tsx
interface BackButtonProps {
  href: string;
  label?: string;
}
```

#### الميزات:
- ✅ Navigation back
- ✅ Custom label
- ✅ Icon (ArrowLeft)
- ✅ Responsive

---

## 2. Navigation Structure

### 2.1 Navigation Items للعميل (Client)

```tsx
const clientNavItems: NavItem[] = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'لوحة التحكم',
    href: '/dashboard',
  },
  {
    id: 'requests',
    icon: FileText,
    label: 'الطلبات',
    href: '/requests',
    children: [
      {
        id: 'requests-all',
        icon: List,
        label: 'جميع الطلبات',
        href: '/requests',
      },
      {
        id: 'requests-new',
        icon: Plus,
        label: 'إنشاء طلب جديد',
        href: '/requests/new',
      },
      {
        id: 'requests-my',
        icon: User,
        label: 'طلباتي',
        href: '/requests/my-requests',
      },
    ],
  },
  {
    id: 'projects',
    icon: Briefcase,
    label: 'المشاريع',
    href: '/projects',
    children: [
      {
        id: 'projects-all',
        icon: List,
        label: 'جميع المشاريع',
        href: '/projects',
      },
      {
        id: 'projects-active',
        icon: Activity,
        label: 'المشاريع النشطة',
        href: '/projects?status=active',
      },
      {
        id: 'projects-completed',
        icon: CheckCircle,
        label: 'المشاريع المكتملة',
        href: '/projects?status=completed',
      },
    ],
  },
  {
    id: 'contracts',
    icon: FileText,
    label: 'العقود',
    href: '/contracts',
    children: [
      {
        id: 'contracts-all',
        icon: List,
        label: 'جميع العقود',
        href: '/contracts',
      },
      {
        id: 'contracts-new',
        icon: Plus,
        label: 'إنشاء عقد جديد',
        href: '/contracts/new',
      },
    ],
  },
  {
    id: 'payments',
    icon: CreditCard,
    label: 'الدفعات',
    href: '/payments',
    children: [
      {
        id: 'payments-all',
        icon: List,
        label: 'جميع الدفعات',
        href: '/payments',
      },
      {
        id: 'payments-wallet',
        icon: Wallet,
        label: 'المحفظة',
        href: '/payments/wallet',
      },
      {
        id: 'payments-history',
        icon: History,
        label: 'سجل الدفعات',
        href: '/payments/history',
      },
    ],
  },
  {
    id: 'messages',
    icon: MessageSquare,
    label: 'الرسائل',
    href: '/messages',
    badge: 5, // عدد الرسائل غير المقروءة
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'الإشعارات',
    href: '/notifications',
    badge: 3, // عدد الإشعارات غير المقروءة
  },
  {
    id: 'profile',
    icon: User,
    label: 'الملف الشخصي',
    href: '/profile',
    children: [
      {
        id: 'profile-view',
        icon: User,
        label: 'عرض الملف',
        href: '/profile',
      },
      {
        id: 'profile-edit',
        icon: Edit,
        label: 'تعديل الملف',
        href: '/profile/edit',
      },
      {
        id: 'profile-settings',
        icon: Settings,
        label: 'الإعدادات',
        href: '/profile/settings',
      },
    ],
  },
];
```

---

### 2.2 Navigation Items للمورد (Supplier)

```tsx
const supplierNavItems: NavItem[] = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'لوحة التحكم',
    href: '/dashboard',
  },
  {
    id: 'offers',
    icon: Briefcase,
    label: 'العروض',
    href: '/offers',
    children: [
      {
        id: 'offers-all',
        icon: List,
        label: 'جميع العروض',
        href: '/offers',
      },
      {
        id: 'offers-new',
        icon: Plus,
        label: 'تقديم عرض جديد',
        href: '/offers/new',
      },
    ],
  },
  {
    id: 'projects',
    icon: Briefcase,
    label: 'المشاريع',
    href: '/supplier-projects',
  },
  {
    id: 'portfolio',
    icon: Image,
    label: 'المعرض',
    href: '/portfolio',
  },
  {
    id: 'stats',
    icon: BarChart3,
    label: 'الإحصائيات',
    href: '/stats',
  },
  {
    id: 'messages',
    icon: MessageSquare,
    label: 'الرسائل',
    href: '/messages',
    badge: 5,
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'الإشعارات',
    href: '/notifications',
    badge: 3,
  },
  {
    id: 'profile',
    icon: User,
    label: 'الملف الشخصي',
    href: '/supplier-profile',
  },
];
```

---

## 3. Quick Action Cards

### 3.1 Cards للعميل

```tsx
const clientQuickActions = [
  {
    icon: Plus,
    title: 'إنشاء طلب جديد',
    description: 'ابدأ بإنشاء طلب جديد للحصول على عروض',
    href: '/requests/new',
    variant: 'primary' as const,
  },
  {
    icon: Briefcase,
    title: 'عرض المشاريع',
    description: 'تابع مشاريعك النشطة',
    href: '/projects',
    variant: 'secondary' as const,
  },
  {
    icon: MessageSquare,
    title: 'الرسائل',
    description: 'لديك 5 رسائل غير مقروءة',
    href: '/messages',
    badge: 5,
  },
  {
    icon: Bell,
    title: 'الإشعارات',
    description: 'لديك 3 إشعارات جديدة',
    href: '/notifications',
    badge: 3,
  },
];
```

---

### 3.2 Cards للمورد

```tsx
const supplierQuickActions = [
  {
    icon: Plus,
    title: 'تقديم عرض جديد',
    description: 'ابحث عن طلبات وتقدم بعروضك',
    href: '/offers/new',
    variant: 'primary' as const,
  },
  {
    icon: Briefcase,
    title: 'مشاريعي',
    description: 'تابع مشاريعك النشطة',
    href: '/supplier-projects',
    variant: 'secondary' as const,
  },
  {
    icon: BarChart3,
    title: 'الإحصائيات',
    description: 'عرض إحصائياتك وأدائك',
    href: '/stats',
  },
  {
    icon: MessageSquare,
    title: 'الرسائل',
    description: 'لديك 5 رسائل غير مقروءة',
    href: '/messages',
    badge: 5,
  },
];
```

---

## 4. التصميم والـ Styling

### 4.1 Sidebar Design

#### الألوان:
- Background: `cssVars.neutral.surface`
- Active item: `cssVars.primary.DEFAULT`
- Hover: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`
- Border: `cssVars.neutral.border`

#### الأبعاد:
- Width (desktop): 280px
- Width (collapsed): 80px
- Min-height: 100vh

#### Responsive:
- Desktop: Sidebar visible
- Tablet: Sidebar collapsible
- Mobile: Sidebar drawer

---

### 4.2 Quick Action Cards Design

#### الألوان:
- Primary: `cssVars.gradient.gold`
- Secondary: `cssVars.primary.DEFAULT`
- Background: `cssVars.neutral.surface`
- Border: `cssVars.neutral.border`

#### الأبعاد:
- Min-height: 120px
- Padding: 24px
- Border-radius: 16px

#### Effects:
- Hover: `y: -4px`, `shadow-lg`
- Transition: `0.2s ease`

---

## 5. Implementation Steps

### Step 1: إنشاء DashboardSidebar Component

```tsx
// components/shared/layouts/DashboardSidebar.tsx
export default function DashboardSidebar({
  isOpen = true,
  onToggle,
  userType = 'client',
}: DashboardSidebarProps) {
  // Implementation
}
```

---

### Step 2: إنشاء QuickActionCard Component

```tsx
// components/shared/cards/QuickActionCard.tsx
export default function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  variant = 'secondary',
  badge,
}: QuickActionCardProps) {
  // Implementation
}
```

---

### Step 3: تحديث Client Layout

```tsx
// app/[locale]/(client)/layout.tsx
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
```

---

### Step 4: تحديث Dashboard Page

```tsx
// app/[locale]/(main)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <QuickActionCards />
      <DashboardOverviewStats />
      <DashboardStatistics />
      <DashboardRecentActivity />
    </div>
  );
}
```

---

## 6. Checklist للتنفيذ

### Components:
- [ ] DashboardSidebar component
- [ ] QuickActionCard component
- [ ] BackButton component
- [ ] NavigationItem component

### Integration:
- [ ] تحديث Client Layout
- [ ] تحديث Dashboard Page
- [ ] إضافة navigation items
- [ ] إضافة quick actions

### Styling:
- [ ] Sidebar styling
- [ ] Cards styling
- [ ] Responsive design
- [ ] Dark mode support

### Testing:
- [ ] Test navigation
- [ ] Test responsive
- [ ] Test accessibility
- [ ] Test performance

---

## 7. أمثلة الكود

### 7.1 DashboardSidebar Example

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, LayoutDashboard, FileText, Plus, ... } from 'lucide-react';
import { cssVars } from '@/styles/theme';

export default function DashboardSidebar({ isOpen = true, onToggle, userType = 'client' }) {
  const pathname = usePathname();
  const navItems = userType === 'client' ? clientNavItems : supplierNavItems;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      className="sticky top-0 h-screen border-r"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {/* Sidebar content */}
    </motion.aside>
  );
}
```

---

### 7.2 QuickActionCard Example

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';

export default function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  variant = 'secondary',
  badge,
}: QuickActionCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        {/* Card content */}
      </motion.div>
    </Link>
  );
}
```

---

## الخلاصة

هذا الدليل يقدم مواصفات كاملة لإضافة نظام تنقل شامل لـ Dashboard. التنفيذ سيتطلب:

1. ✅ إنشاء DashboardSidebar component
2. ✅ إنشاء QuickActionCard component
3. ✅ تحديث Client Layout
4. ✅ تحديث Dashboard Page

**الوقت المتوقع:** 8-13 يوم عمل

**التأثير المتوقع:** تحسين كبير في تجربة المستخدم

