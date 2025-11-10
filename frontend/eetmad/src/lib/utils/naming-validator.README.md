# Next.js Naming Convention Validator

A comprehensive TypeScript function that validates Next.js and TypeScript naming conventions for files, functions, variables, and constants.

## Features

- ✅ Validates file naming conventions (PascalCase for components, kebab-case for routes, camelCase for utils)
- ✅ Validates function naming (PascalCase for components, camelCase for utilities)
- ✅ Validates variable naming (camelCase with boolean prefix recommendations)
- ✅ Validates constant naming (UPPER_SNAKE_CASE)
- ✅ Provides detailed violation reports with suggestions
- ✅ Calculates compliance score
- ✅ Supports single file or batch validation

## Naming Rules

### Files

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Routes**: kebab-case (e.g., `user-profile/page.tsx`, `forgot-password/page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `validators.ts`)
- **Special Next.js files**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` are always valid

### Functions

- **Component functions**: PascalCase (e.g., `Button`, `UserProfile`, `LoginPage`)
- **Utility functions**: camelCase (e.g., `formatDate`, `isValidEmail`, `debounce`)

### Variables

- **Regular variables**: camelCase (e.g., `userName`, `maxRetries`, `apiUrl`)
- **Boolean variables**: camelCase with prefix (e.g., `isActive`, `hasError`, `shouldRender`, `canEdit`)

### Constants

- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`, `MAX_RETRIES`, `DEFAULT_TIMEOUT`)

## Usage

### Basic Example

```typescript
import { validateNamingConventions, formatValidationResult } from '@/lib/utils/naming-validator';

const code = `
export function UserProfile() {
  const isActive = true;
  const MAX_RETRIES = 3;
  return <div>Profile</div>;
}
`;

const result = validateNamingConventions({
  filePath: 'src/components/UserProfile.tsx',
  code: code,
});

console.log(formatValidationResult(result));
```

### Validating Multiple Files

```typescript
const inputs = [
  {
    filePath: 'src/components/Button.tsx',
    code: `export function Button() { return <button>Click</button>; }`,
  },
  {
    filePath: 'src/lib/utils/helpers.ts',
    code: `export function formatDate(date: Date) { return date.toISOString(); }`,
  },
];

const result = validateNamingConventions(inputs);
```

### Handling Results Programmatically

```typescript
const result = validateNamingConventions(input);

// Check overall score
if (result.score < 100) {
  console.warn(`Code quality score: ${result.score}%`);
}

// Filter violations by type
const errors = result.violations.filter((v) => v.severity === 'error');
const warnings = result.violations.filter((v) => v.severity === 'warning');

// Get violations by category
const fileViolations = result.violations.filter((v) => v.type === 'file');
const functionViolations = result.violations.filter((v) => v.type === 'function');

// Apply suggestions
result.violations.forEach((violation) => {
  console.log(`${violation.name}: ${violation.suggestion}`);
});
```

## API Reference

### Types

```typescript
interface ValidationInput {
  filePath: string;
  code: string;
}

interface Violation {
  type: 'file' | 'function' | 'variable' | 'constant';
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
  line?: number;
  column?: number;
  name: string;
}

interface ValidationSummary {
  file: number;
  function: number;
  variable: number;
  constant: number;
  total: number;
}

interface ValidationResult {
  violations: Violation[];
  score: number;
  summary: ValidationSummary;
}
```

### Functions

#### `validateNamingConventions(input: ValidationInput | ValidationInput[]): ValidationResult`

Validates one or more files against naming conventions.

**Parameters:**

- `input`: Single file input or array of file inputs

**Returns:**

- `ValidationResult` with violations, score, and summary

#### `formatValidationResult(result: ValidationResult): string`

Formats the validation result as a readable string for console output.

**Parameters:**

- `result`: Validation result from `validateNamingConventions`

**Returns:**

- Formatted string with violations and suggestions

## Examples

See `naming-validator.examples.ts` for comprehensive usage examples including:

- Component validation
- Route validation
- Utility validation
- Batch validation
- CI/CD integration
- TypeScript usage patterns

## Integration with CI/CD

```typescript
import { validateNamingConventions, formatValidationResult } from '@/lib/utils/naming-validator';

// In your CI script
const result = validateNamingConventions(filesToValidate);

if (result.score < 95) {
  console.error('❌ Validation failed!');
  console.error(formatValidationResult(result));
  process.exit(1);
} else {
  console.log('✅ Validation passed!');
}
```

## Notes

- The validator uses regex patterns to extract code constructs. For more accurate results with complex code, consider using an AST parser (e.g., `@typescript-eslint/parser`).
- Boolean variable detection uses heuristics. Variables with names containing "flag", "status", "active", "enabled", etc. are considered likely booleans.
- The validator automatically detects file types based on path patterns. Files in `components/` are treated as components, files in `lib/utils/` are treated as utilities, etc.

## License

Part of the eetmad project.
