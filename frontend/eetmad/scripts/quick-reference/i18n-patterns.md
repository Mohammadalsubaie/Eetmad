# 🌍 i18n Patterns - Quick Reference

**Common internationalization patterns for Arabic/English support**

---

## 📦 Setup

### Basic Import

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');

  return <h1>{t('key')}</h1>;
}
```

---

## 🎯 Common Patterns

### Simple Text

```tsx
// Component
const t = useTranslations('home');

<h1>{t('welcome')}</h1>
<p>{t('description')}</p>
```

```json
// messages/ar.json
{
  "home": {
    "welcome": "مرحباً",
    "description": "وصف الصفحة"
  }
}

// messages/en.json
{
  "home": {
    "welcome": "Welcome",
    "description": "Page description"
  }
}
```

---

### With Variables

```tsx
// Component
const t = useTranslations('user');
const userName = 'Ahmad';

<p>{t('greeting', { name: userName })}</p>;
```

```json
// messages/ar.json
{
  "user": {
    "greeting": "مرحباً {name}"
  }
}

// messages/en.json
{
  "user": {
    "greeting": "Welcome {name}"
  }
}
```

---

### Pluralization

```tsx
// Component
const t = useTranslations('items');
const count = 5;

<p>{t('itemCount', { count })}</p>;
```

```json
// messages/ar.json
{
  "items": {
    "itemCount": "{count, plural, =0 {لا توجد عناصر} one {عنصر واحد} two {عنصران} few {# عناصر} many {# عنصر} other {# عنصر}}"
  }
}

// messages/en.json
{
  "items": {
    "itemCount": "{count, plural, =0 {No items} one {1 item} other {# items}}"
  }
}
```

---

### Rich Text (with HTML)

```tsx
// Component
const t = useTranslations('content');

<div>
  {t.rich('description', {
    strong: (chunks) => <strong>{chunks}</strong>,
    link: (chunks) => <a href="/about">{chunks}</a>,
  })}
</div>;
```

```json
// messages/ar.json
{
  "content": {
    "description": "هذا <strong>نص مهم</strong> مع <link>رابط</link>"
  }
}

// messages/en.json
{
  "content": {
    "description": "This is <strong>important text</strong> with a <link>link</link>"
  }
}
```

---

### Dates & Times

```tsx
// Component
import { useFormatter } from 'next-intl';

export default function DateDisplay() {
  const format = useFormatter();
  const date = new Date();

  return (
    <div>
      <p>
        {format.dateTime(date, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  );
}
```

---

### Numbers & Currency

```tsx
// Component
import { useFormatter } from 'next-intl';

export default function PriceDisplay() {
  const format = useFormatter();
  const price = 1234.56;

  return (
    <div>
      {/* Number */}
      <p>{format.number(price)}</p>

      {/* Currency */}
      <p>
        {format.number(price, {
          style: 'currency',
          currency: 'SAR',
        })}
      </p>
    </div>
  );
}
```

---

## 🏗️ Organization Patterns

### By Feature

```
messages/
├── ar.json
│   ├── common: { ... }
│   ├── home: { ... }
│   ├── auth: { ... }
│   └── dashboard: { ... }
└── en.json
    ├── common: { ... }
    ├── home: { ... }
    ├── auth: { ... }
    └── dashboard: { ... }
```

**Usage:**

```tsx
// In any component
const t = useTranslations('home');
const common = useTranslations('common');

<div>
  <h1>{t('title')}</h1>
  <button>{common('save')}</button>
</div>;
```

---

### Nested Keys

```json
{
  "auth": {
    "login": {
      "title": "تسجيل الدخول",
      "email": "البريد الإلكتروني",
      "password": "كلمة المرور",
      "submit": "دخول"
    },
    "register": {
      "title": "إنشاء حساب",
      "submit": "تسجيل"
    }
  }
}
```

**Usage:**

```tsx
const t = useTranslations('auth.login');

<form>
  <h1>{t('title')}</h1>
  <input placeholder={t('email')} />
  <input placeholder={t('password')} />
  <button>{t('submit')}</button>
</form>;
```

---

## 🎨 Component Patterns

### Button Component

```tsx
'use client';

import { useTranslations } from 'next-intl';

interface ButtonProps {
  translationKey: string;
  namespace?: string;
  onClick?: () => void;
}

export default function Button({ translationKey, namespace = 'common', onClick }: ButtonProps) {
  const t = useTranslations(namespace);

  return <button onClick={onClick}>{t(translationKey)}</button>;
}

// Usage
<Button translationKey="save" namespace="common" />;
```

---

### Form Component

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function LoginForm() {
  const t = useTranslations('auth.login');
  const common = useTranslations('common');

  return (
    <form>
      <h1>{t('title')}</h1>

      <div>
        <label>{t('email')}</label>
        <input type="email" placeholder={t('emailPlaceholder')} />
      </div>

      <div>
        <label>{t('password')}</label>
        <input type="password" placeholder={t('passwordPlaceholder')} />
      </div>

      <button type="submit">{t('submit')}</button>

      <a href="/register">{t('noAccount')}</a>
    </form>
  );
}
```

---

### Error Messages

```tsx
'use client';

import { useTranslations } from 'next-intl';

interface ErrorMessageProps {
  errorCode: string;
}

export default function ErrorMessage({ errorCode }: ErrorMessageProps) {
  const t = useTranslations('errors');

  return <div role="alert">{t(errorCode)}</div>;
}

// Usage
<ErrorMessage errorCode="invalidEmail" />;
```

```json
// messages/ar.json
{
  "errors": {
    "invalidEmail": "البريد الإلكتروني غير صحيح",
    "requiredField": "هذا الحقل مطلوب",
    "passwordTooShort": "كلمة المرور قصيرة جداً"
  }
}
```

---

## 🔄 Dynamic Content

### Conditional Text

```tsx
const t = useTranslations('status');
const isActive = true;

<p>{t(isActive ? 'active' : 'inactive')}</p>;
```

---

### List Items

```tsx
const t = useTranslations('navigation');
const menuItems = ['home', 'about', 'services', 'contact'];

<nav>
  {menuItems.map((item) => (
    <a key={item} href={`/${item}`}>
      {t(item)}
    </a>
  ))}
</nav>;
```

```json
{
  "navigation": {
    "home": "الرئيسية",
    "about": "من نحن",
    "services": "الخدمات",
    "contact": "اتصل بنا"
  }
}
```

---

### Dynamic Keys

```tsx
const t = useTranslations('categories');
const category = 'technology'; // Dynamic value

<h2>{t(category)}</h2>;
```

---

## 🎯 Best Practices

### ✅ DO

```tsx
// Descriptive keys
const t = useTranslations('home');
<h1>{t('welcomeTitle')}</h1>
<p>{t('welcomeDescription')}</p>

// Namespace by feature
const auth = useTranslations('auth');
const common = useTranslations('common');

// Variables for dynamic content
<p>{t('greeting', { name: userName })}</p>
```

### ❌ DON'T

```tsx
// Don't hardcode text
<h1>Welcome</h1>  // ❌

// Don't use generic keys
<h1>{t('text1')}</h1>  // ❌

// Don't concatenate translations
{t('hello')} + ' ' + {t('world')}  // ❌
// Use: {t('helloWorld')} instead
```

---

## 📋 Translation File Structure

### Good Structure

```json
{
  "common": {
    "save": "حفظ",
    "cancel": "إلغاء",
    "delete": "حذف",
    "edit": "تعديل",
    "loading": "جاري التحميل..."
  },
  "home": {
    "hero": {
      "title": "مرحباً بك",
      "subtitle": "منصة الخدمات",
      "cta": "ابدأ الآن"
    },
    "features": {
      "title": "المميزات",
      "feature1": "سهل الاستخدام",
      "feature2": "آمن وموثوق"
    }
  },
  "auth": {
    "login": {
      "title": "تسجيل الدخول",
      "email": "البريد الإلكتروني",
      "password": "كلمة المرور",
      "submit": "دخول",
      "forgotPassword": "نسيت كلمة المرور؟"
    }
  }
}
```

---

## 🚀 Quick Commands

### Check Translations

```bash
# Coming soon
npm run i18n:check
```

### Extract Keys

```bash
# Coming soon
npm run i18n:extract
```

### Sync Files

```bash
# Coming soon
npm run i18n:sync
```

---

## 🔗 Related Resources

- [Design Rules Quick Reference](./design-rules.md)
- [Common Fixes](./common-fixes.md)
- [Next.js i18n Docs](https://next-intl-docs.vercel.app/)

---

**🌍 Build multilingual apps with confidence!**

_Last Updated: November 15, 2025_
