# Quick Build Prompt

## 🎯 Build Frontend Pages & Components

**INSTRUCTION**: Build frontend pages and components following ALL guidelines in `docs/build-prompt.md`

---

## 📋 Build Task Format

**Example**: "Build requests feature pages and components"

---

## ✅ MANDATORY Requirements

### 1. Theme System

-   ✅ **ALWAYS** use `cssVars` from `@/styles/theme`
-   ❌ **NEVER** hardcode colors (`#FAF8F1`, `#34656D`, etc.)

```tsx
import { cssVars } from '@/styles/theme';
<div style={{ backgroundColor: cssVars.neutral.bg }}>
```

### 2. Internationalization

-   ✅ **ALWAYS** use `useTranslations` from `next-intl`
-   ❌ **NEVER** hardcode text

```tsx
import { useTranslations } from 'next-intl';
const t = useTranslations('requests');
<h1>{t('pageTitle')}</h1>;
```

### 3. TypeScript Types

-   ✅ **ALWAYS** use types from `@/lib/types`
-   ❌ **NEVER** create inline types

```tsx
import type { Request } from '@/lib/types/request.types';
```

### 4. API Integration

-   ✅ **ALWAYS** match endpoints in `docs/docs/endpoints.md`
-   ✅ Use API functions from `@/lib/api/{feature}.ts`

```tsx
import { requestsApi } from '@/lib/api/requests';
const data = await requestsApi.getAll();
```

### 5. Design Consistency

-   ✅ Match visual style from `docs/design-sample.md`
-   ✅ Use Framer Motion for animations
-   ✅ Follow component structure from examples

---

## 🏗️ Build Process

1. **Read** `docs/build-prompt.md` for complete guidelines
2. **Review** `docs/docs/endpoints.md` for API endpoints
3. **Check** `frontend/eetmad/src/lib/types/{feature}.types.ts` for types
4. **Build** components in `components/features/{feature}/`
5. **Create** pages in `app/[locale]/{feature}/`
6. **Add** translations to `messages/ar.json` and `messages/en.json`
7. **Verify** against checklist in `docs/build-prompt.md`

---

## 📝 Component Template

```tsx
'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { Request } from '@/lib/types/request.types';

interface RequestCardProps {
	request: Request;
	onAction?: () => void;
}

export default function RequestCard({ request, onAction }: RequestCardProps) {
	const t = useTranslations('requests');

	return (
		<motion.div
			whileHover={{ y: -8 }}
			className='rounded-2xl border-2 p-6'
			style={{
				backgroundColor: cssVars.neutral.surface,
				borderColor: cssVars.neutral.border,
			}}
		>
			<h3 style={{ color: cssVars.secondary.DEFAULT }}>{request.title}</h3>
			<p style={{ color: cssVars.neutral.textSecondary }}>{request.description}</p>
			{onAction && (
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onAction}
					style={{ background: cssVars.gradient.gold }}
				>
					{t('viewDetails')}
				</motion.button>
			)}
		</motion.div>
	);
}
```

---

## 🚫 Common Mistakes to AVOID

```tsx
// ❌ WRONG
<div style={{ backgroundColor: '#FAF8F1' }}>
<h1>Welcome</h1>

// ✅ CORRECT
<div style={{ backgroundColor: cssVars.neutral.bg }}>
<h1>{t('welcome')}</h1>
```

---

## 📖 Complete Reference

**For full guidelines, see**: `docs/build-prompt.md`

**Sections include**:

-   Design & Visual Guidelines
-   Component Building Rules
-   Project Structure
-   API Integration Patterns
-   TypeScript Types
-   Page Building Workflow
-   Complete Checklist

---

**Version**: 1.0
**Last Updated**: 2025
