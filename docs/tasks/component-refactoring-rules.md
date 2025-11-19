# 🔒 Component Refactoring Rules - STRICT ENFORCEMENT

**Branch:** `refactor/components-reusability`  
**Stage:** Component Refactoring & Reusability  
**Focus:** Code Maintenance & Reusability  
**Status:** MANDATORY - NO EXCEPTIONS

---

## ⚠️ CRITICAL: These Rules Are NON-NEGOTIABLE

**This document defines MANDATORY rules that CANNOT be bypassed, skipped, or ignored.**

-   ❌ No exceptions allowed
-   ❌ No "quick fixes" that violate these rules
-   ❌ No merging code that doesn't comply
-   ✅ All code MUST pass these rules before merge

---

## 📋 Table of Contents

1. [Core Principles](#core-principles)
2. [Component Structure Rules](#component-structure-rules)
3. [State Management Rules](#state-management-rules)
4. [Data Fetching Rules](#data-fetching-rules)
5. [UI Pattern Rules](#ui-pattern-rules)
6. [Code Duplication Rules](#code-duplication-rules)
7. [Type Safety Rules](#type-safety-rules)
8. [Testing Requirements](#testing-requirements)
9. [Documentation Requirements](#documentation-requirements)
10. [Validation Checklist](#validation-checklist)

---

## 🎯 Core Principles

### Principle 1: DRY (Don't Repeat Yourself)

-   **RULE:** Any code pattern used in 2+ places MUST be extracted into a reusable component/hook/utility
-   **ENFORCEMENT:** Automated detection via code analysis
-   **PENALTY:** Code will be rejected if duplication is found

### Principle 2: Single Responsibility

-   **RULE:** Each component must have ONE clear purpose
-   **ENFORCEMENT:** Component names must clearly indicate their purpose
-   **PENALTY:** Components with unclear/multiple purposes will be rejected

### Principle 3: Composition Over Duplication

-   **RULE:** Build complex components by composing simple, reusable ones
-   **ENFORCEMENT:** Complex components must be broken down into smaller parts
-   **PENALTY:** Monolithic components (>300 lines) will be rejected

### Principle 4: Consistency

-   **RULE:** Similar functionality must use the same patterns/components
-   **ENFORCEMENT:** All list components must follow the same structure
-   **PENALTY:** Inconsistent patterns will be rejected

---

## 🏗️ Component Structure Rules

### Rule 1.1: Component File Organization

**MANDATORY STRUCTURE:**

```
components/
  ├── ui/              # Base UI components (Button, Input, Card, etc.)
  ├── shared/          # Shared business components
  │   ├── data-display/    # Data display components (lists, tables, etc.)
  │   ├── forms/           # Form components
  │   ├── feedback/        # Loading, error, empty states
  │   └── layouts/         # Layout components
  └── features/        # Feature-specific components
```

**VIOLATION:** Components in wrong directories will be rejected

### Rule 1.2: Component Size Limits

-   **RULE:**
    -   UI components: MAX 150 lines
    -   Shared components: MAX 250 lines
    -   Feature components: MAX 300 lines
-   **ENFORCEMENT:** Automated line count check
-   **PENALTY:** Components exceeding limits MUST be split

### Rule 1.3: Component Naming

-   **RULE:**
    -   PascalCase for component names
    -   Descriptive names that indicate purpose
    -   No abbreviations unless universally understood
-   **EXAMPLES:**
    -   ✅ `ProjectsList`, `RequestCard`, `LoadingState`
    -   ❌ `ProjList`, `ReqCard`, `Load`

### Rule 1.4: Component Exports

-   **RULE:**
    -   Default export for main component
    -   Named exports for types/interfaces
    -   Index file for public API
-   **ENFORCEMENT:** All components must have index.ts exports

### Rule 1.5: UI Component Imports

-   **RULE:**
    -   ALL UI components MUST be imported from `@/components/ui` (index file)
    -   Use named exports: `import { Button, LoadingSpinner } from '@/components/ui'`
    -   NO direct file path imports allowed
-   **FORBIDDEN:**
    ```tsx
    // ❌ FORBIDDEN: Direct file imports
    import Button from '@/components/ui/Button/Button';
    import { Button } from '@/components/ui/Button';
    import LoadingSpinner from '@/components/ui/LoadingSpinner';
    ```
-   **REQUIRED:**
    ```tsx
    // ✅ REQUIRED: Import from index
    import { Button, LoadingSpinner, EmptyState, ErrorMessage } from '@/components/ui';
    ```
-   **ENFORCEMENT:**
    -   All UI components must be exported from index.ts
    -   All imports must use the index
    -   Violations will cause immediate rejection

---

## 🔄 State Management Rules

### Rule 2.1: Custom Hooks for Data Fetching

**MANDATORY:** All data fetching MUST use custom hooks from `@/lib/hooks`

**FORBIDDEN PATTERNS:**

```tsx
// ❌ FORBIDDEN: Direct useState + useEffect for data fetching
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
	// fetch logic
}, []);
```

**REQUIRED PATTERN:**

```tsx
// ✅ REQUIRED: Use custom hooks
import { useProjects } from '@/lib/hooks/useProjects';

const { data, isLoading, error } = useProjects(filters);
```

**ENFORCEMENT:**

-   All list components MUST use hooks
-   Direct API calls in components are FORBIDDEN
-   Violations will cause immediate rejection

### Rule 2.2: Loading State Management

**MANDATORY:** All loading states MUST use `LoadingSpinner` component

**FORBIDDEN:**

```tsx
// ❌ FORBIDDEN: Custom loading UI
if (loading) {
	return (
		<div className='flex items-center justify-center py-12'>
			<div>{t('loading')}</div>
		</div>
	);
}
```

**REQUIRED:**

```tsx
// ✅ REQUIRED: Use LoadingSpinner
import LoadingSpinner from '@/components/ui/LoadingSpinner';

if (isLoading) {
	return <LoadingSpinner text={t('loading')} />;
}
```

**ENFORCEMENT:**

-   No custom loading UI allowed
-   Must use LoadingSpinner component
-   Violations will cause immediate rejection

### Rule 2.3: Error State Management

**MANDATORY:** All error states MUST use `ErrorMessage` component

**FORBIDDEN:**

```tsx
// ❌ FORBIDDEN: Custom error UI
if (error) {
	return (
		<div className='rounded-2xl border-2 p-8'>
			<p>{error}</p>
		</div>
	);
}
```

**REQUIRED:**

```tsx
// ✅ REQUIRED: Use ErrorMessage
import ErrorMessage from '@/components/ui/ErrorMessage';

if (error) {
	return <ErrorMessage error={error} />;
}
```

**ENFORCEMENT:**

-   No custom error UI allowed
-   Must use ErrorMessage component
-   Violations will cause immediate rejection

### Rule 2.4: Empty State Management

**MANDATORY:** All empty states MUST use `EmptyState` component

**FORBIDDEN:**

```tsx
// ❌ FORBIDDEN: Custom empty state UI
{
	items.length === 0 && <div>No items found</div>;
}
```

**REQUIRED:**

```tsx
// ✅ REQUIRED: Use EmptyState
import EmptyState from '@/components/ui/EmptyState';

{items.length === 0 ? (
  <EmptyState title={t('noItems')} description={t('noItemsDescription')} />
) : (
  // content
)}
```

**ENFORCEMENT:**

-   No custom empty state UI allowed
-   Must use EmptyState component
-   Violations will cause immediate rejection

---

## 📡 Data Fetching Rules

### Rule 3.1: Hook Usage Requirement

**MANDATORY:** All data fetching operations MUST use existing hooks or create new hooks

**EXISTING HOOKS:**

-   `useProjects(params)` - for projects
-   `useRequests(params)` - for requests
-   `useOffers(params)` - for offers
-   `useNotifications(params)` - for notifications
-   `useUser()` - for user profile

**IF HOOK DOESN'T EXIST:**

1. Create hook in `@/lib/hooks/`
2. Follow existing hook patterns
3. Export from hooks index
4. Use in components

**ENFORCEMENT:**

-   Direct API calls in components = REJECTION
-   Must use hooks for all data fetching
-   New hooks must follow existing patterns

### Rule 3.2: Hook Standardization

**MANDATORY:** All data fetching hooks MUST follow this pattern:

```tsx
export function useResource(params?: QueryParams) {
	const [data, setData] = useState<Resource[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		resourceApi
			.getAll(params)
			.then(setData)
			.catch(setError)
			.finally(() => setIsLoading(false));
	}, [params]);

	return { data, isLoading, error };
}
```

**REQUIRED RETURN:**

-   `data` - the fetched data
-   `isLoading` - loading state (boolean)
-   `error` - error state (Error | null)

**ENFORCEMENT:**

-   All hooks must return this exact structure
-   Violations will cause immediate rejection

---

## 🎨 UI Pattern Rules

### Rule 4.1: List Component Standardization

**MANDATORY:** All list components MUST follow this structure:

```tsx
export default function ResourceList({ filters }: ResourceListProps) {
	const t = useTranslations('pages.resource');
	const { data, isLoading, error } = useResource(filters);

	if (isLoading) return <LoadingSpinner text={t('loading')} />;
	if (error) return <ErrorMessage error={error} />;

	return (
		<div className='space-y-6'>
			{data.length === 0 ? (
				<EmptyState title={t('noItems')} description={t('noItemsDescription')} />
			) : (
				<ResourceGrid>
					{data.map((item) => (
						<ResourceCard key={item.id} resource={item} />
					))}
				</ResourceGrid>
			)}
		</div>
	);
}
```

**REQUIRED ELEMENTS:**

1. Hook-based data fetching
2. LoadingSpinner for loading
3. ErrorMessage for errors
4. EmptyState for empty lists
5. Consistent grid layout

**ENFORCEMENT:**

-   All list components must follow this exact pattern
-   Deviations will cause immediate rejection

### Rule 4.2: Grid Layout Standardization

**MANDATORY:** All grid layouts MUST use a shared component

**FORBIDDEN:**

```tsx
// ❌ FORBIDDEN: Inline grid classes
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
```

**REQUIRED:**

```tsx
// ✅ REQUIRED: Use ResourceGrid component
import { ResourceGrid } from '@/components/shared/data-display/ResourceGrid';

<ResourceGrid>
	{items.map((item) => (
		<ResourceCard key={item.id} resource={item} />
	))}
</ResourceGrid>;
```

**ENFORCEMENT:**

-   Create ResourceGrid component
-   All grids must use it
-   Violations will cause immediate rejection

### Rule 4.3: Form Component Standardization

**MANDATORY:** All forms MUST use shared form components

**REQUIRED COMPONENTS:**

-   `FormField` - for input fields
-   `FormLabel` - for labels
-   `FormError` - for error messages
-   `FormButton` - for submit buttons

**ENFORCEMENT:**

-   No custom form elements allowed
-   Must use shared form components
-   Violations will cause immediate rejection

---

## 🔁 Code Duplication Rules

### Rule 5.1: Duplication Detection

**MANDATORY:** No code duplication allowed

**DETECTION CRITERIA:**

-   Same code pattern in 2+ files = DUPLICATION
-   Similar logic with minor variations = DUPLICATION
-   Repeated UI patterns = DUPLICATION

**ENFORCEMENT:**

-   Automated duplication detection
-   Manual code review
-   Violations will cause immediate rejection

### Rule 5.2: Extraction Requirements

**MANDATORY:** When duplication is found:

1. **IMMEDIATELY** extract to shared component/hook
2. **IMMEDIATELY** update all usages
3. **IMMEDIATELY** test all affected components
4. **IMMEDIATELY** update documentation

**NO EXCEPTIONS:**

-   Cannot leave duplication "for later"
-   Cannot create TODO comments
-   Must fix immediately

### Rule 5.3: Common Patterns to Extract

**MANDATORY EXTRACTION TARGETS:**

1. **Loading States** → `LoadingSpinner`
2. **Error States** → `ErrorMessage`
3. **Empty States** → `EmptyState`
4. **Grid Layouts** → `ResourceGrid`
5. **Data Fetching** → Custom hooks
6. **Form Validation** → Shared utilities
7. **API Error Handling** → Shared utilities

**ENFORCEMENT:**

-   All patterns must be extracted
-   No exceptions allowed

---

## 🔒 Type Safety Rules

### Rule 6.1: Type Definitions

**MANDATORY:** All components MUST have proper TypeScript types

**REQUIRED:**

-   Props interfaces for all components
-   Return types for all functions
-   Type imports from `@/lib/types`

**FORBIDDEN:**

```tsx
// ❌ FORBIDDEN: Any types
const Component = (props: any) => { ... }
```

**REQUIRED:**

```tsx
// ✅ REQUIRED: Proper types
interface ComponentProps {
  data: Resource[];
  onAction: (id: string) => void;
}

const Component: React.FC<ComponentProps> = ({ data, onAction }) => { ... }
```

**ENFORCEMENT:**

-   No `any` types allowed
-   All props must be typed
-   Violations will cause immediate rejection

### Rule 6.2: Type Reusability

**MANDATORY:** Types must be defined in `@/lib/types` and reused

**FORBIDDEN:**

```tsx
// ❌ FORBIDDEN: Inline type definitions
interface LocalType {
	id: string;
	name: string;
}
```

**REQUIRED:**

```tsx
// ✅ REQUIRED: Use shared types
import type { Resource } from '@/lib/types/resource.types';
```

**ENFORCEMENT:**

-   No duplicate type definitions
-   Must use shared types
-   Violations will cause immediate rejection

---

## ✅ Testing Requirements

### Rule 7.1: Component Testing

**MANDATORY:** All refactored components MUST have tests

**REQUIRED TESTS:**

-   Component renders correctly
-   Props are handled correctly
-   Loading states work
-   Error states work
-   Empty states work

**ENFORCEMENT:**

-   No component without tests
-   Tests must pass before merge
-   Violations will cause immediate rejection

---

## 📚 Documentation Requirements

### Rule 8.1: Component Documentation

**MANDATORY:** All new/extracted components MUST have:

1. JSDoc comments
2. Usage examples
3. Props documentation
4. Export in index file

**ENFORCEMENT:**

-   No undocumented components
-   Documentation must be complete
-   Violations will cause immediate rejection

---

## ✅ Validation Checklist

### Pre-Commit Checklist (MANDATORY)

Before ANY commit, verify:

-   [ ] All components use hooks for data fetching
-   [ ] All loading states use `LoadingSpinner`
-   [ ] All error states use `ErrorMessage`
-   [ ] All empty states use `EmptyState`
-   [ ] All list components follow standard structure
-   [ ] All grid layouts use shared component
-   [ ] No code duplication exists
-   [ ] All components have proper TypeScript types
-   [ ] All components are under size limits
-   [ ] All components have tests
-   [ ] All components are documented
-   [ ] All components are exported properly

### Pre-Merge Checklist (MANDATORY)

Before merge, verify:

-   [ ] All validation checks pass
-   [ ] No linter errors
-   [ ] All tests pass
-   [ ] Code review completed
-   [ ] Documentation updated
-   [ ] Refactoring report generated

---

## 📊 Refactoring Targets

### Phase 1: Core Infrastructure (IMMEDIATE)

1. ✅ Create `ErrorMessage` component (currently empty)
2. ✅ Create `ResourceGrid` component
3. ✅ Standardize all hooks
4. ✅ Update all list components

### Phase 2: Component Extraction (IMMEDIATE)

1. ✅ Extract loading patterns → `LoadingSpinner`
2. ✅ Extract error patterns → `ErrorMessage`
3. ✅ Extract empty patterns → `EmptyState`
4. ✅ Extract grid patterns → `ResourceGrid`

### Phase 3: Component Refactoring (IMMEDIATE)

1. ✅ Refactor `ProjectsList`
2. ✅ Refactor `RequestsList`
3. ✅ Refactor `OffersList`
4. ✅ Refactor all other list components

### Phase 4: Validation (IMMEDIATE)

1. ✅ Run duplication detection
2. ✅ Verify all rules compliance
3. ✅ Generate refactoring report

---

## 🚫 ABSOLUTE PROHIBITIONS

**These actions are FORBIDDEN and will result in immediate rejection:**

1. ❌ Creating custom loading UI instead of `LoadingSpinner`
2. ❌ Creating custom error UI instead of `ErrorMessage`
3. ❌ Creating custom empty UI instead of `EmptyState`
4. ❌ Using direct API calls instead of hooks
5. ❌ Duplicating code patterns
6. ❌ Using `any` types
7. ❌ Creating components >300 lines
8. ❌ Skipping tests
9. ❌ Skipping documentation
10. ❌ Bypassing validation checks

---

## 📈 Success Metrics

**Refactoring is complete when:**

1. ✅ Zero code duplication in components
2. ✅ 100% hook usage for data fetching
3. ✅ 100% standardized UI components usage
4. ✅ 100% type safety
5. ✅ 100% test coverage
6. ✅ All components under size limits
7. ✅ All validation checks pass

---

## 🔍 Enforcement Mechanism

**How rules are enforced:**

1. **Automated Checks:**

    - Pre-commit hooks
    - Linter rules
    - Type checking
    - Duplication detection

2. **Manual Review:**

    - Code review checklist
    - Technical manager review
    - Validation checklist

3. **Rejection Criteria:**
    - Any rule violation = immediate rejection
    - No exceptions
    - No "quick fixes"
    - Must fix before merge

---

## 📝 Notes

-   **This document is living** - rules may be updated based on findings
-   **All updates must be approved** by technical manager
-   **No rule can be bypassed** without updating this document first
-   **Questions?** Ask technical manager before proceeding

---

**Last Updated:** [Date]  
**Branch:** `refactor/components-reusability`  
**Status:** ACTIVE - ENFORCEMENT ENABLED
