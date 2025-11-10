/**
 * Usage Examples for Naming Convention Validator
 *
 * This file demonstrates how to use the naming convention validator
 * with various Next.js file types and code patterns.
 */

import {
  formatValidationResult,
  validateNamingConventions,
  type ValidationInput,
} from './naming-validator';

// Example 1: Validating a single component file
export function example1_validateComponent() {
  const componentCode = `
import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ variant, onClick }: ButtonProps) {
  const isDisabled = false;
  const hasIcon = true;
  
  return (
    <button onClick={onClick} disabled={isDisabled}>
      Click me
    </button>
  );
}
  `;

  const input: ValidationInput = {
    filePath: 'src/components/ui/Button.tsx',
    code: componentCode,
  };

  const result = validateNamingConventions(input);
  console.log(formatValidationResult(result));

  return result;
}

// Example 2: Validating a route page file
export function example2_validateRoute() {
  const pageCode = `
export default function UserProfile() {
  const userId = '123';
  const isActive = true;
  const MAX_RETRIES = 3;
  
  return <div>Profile</div>;
}
  `;

  const input: ValidationInput = {
    filePath: 'src/app/(client)/user-profile/page.tsx',
    code: pageCode,
  };

  const result = validateNamingConventions(input);
  return result;
}

// Example 3: Validating a utility file
export function example3_validateUtility() {
  const utilityCode = `
export function formatDate(date: Date): string {
  return date.toISOString();
}

export function isValidEmail(email: string): boolean {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

export const DEFAULT_TIMEOUT = 5000;
export const API_BASE_URL = 'https://api.example.com';
  `;

  const input: ValidationInput = {
    filePath: 'src/lib/utils/formatHelpers.ts',
    code: utilityCode,
  };

  const result = validateNamingConventions(input);
  return result;
}

// Example 4: Validating multiple files at once
export function example4_validateMultipleFiles() {
  const inputs: ValidationInput[] = [
    {
      filePath: 'src/components/UserCard.tsx',
      code: `
export function UserCard({ name }: { name: string }) {
  const isOnline = true;
  return <div>{name}</div>;
}
      `,
    },
    {
      filePath: 'src/lib/utils/helpers.ts',
      code: `
export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function(...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
      `,
    },
    {
      filePath: 'src/lib/constants/config.ts',
      code: `
export const APP_NAME = 'My App';
export const API_URL = 'https://api.example.com';
export const MAX_FILE_SIZE = 10485760;
      `,
    },
  ];

  const result = validateNamingConventions(inputs);
  console.log(formatValidationResult(result));

  return result;
}

// Example 5: Handling violations programmatically
export function example5_handleViolations() {
  const input: ValidationInput = {
    filePath: 'src/components/bad-component.tsx', // Wrong: should be BadComponent.tsx
    code: `
export function badComponent() { // Wrong: should be BadComponent
  const UserName = 'John'; // Wrong: should be userName
  const active = true; // Warning: boolean should have prefix
  const apiUrl = 'https://api.example.com'; // Wrong: constant should be API_URL
}
    `,
  };

  const result = validateNamingConventions(input);

  // Filter by severity
  const errors = result.violations.filter((v) => v.severity === 'error');
  const warnings = result.violations.filter((v) => v.severity === 'warning');

  console.log(`Found ${errors.length} errors and ${warnings.length} warnings`);

  // Get violations by type (for potential future use)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _fileViolations = result.violations.filter((v) => v.type === 'file');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _functionViolations = result.violations.filter((v) => v.type === 'function');

  // Apply suggestions automatically (example)
  const suggestions = result.violations.map((v) => ({
    name: v.name,
    suggestion: v.suggestion,
    line: v.line,
  }));

  return {
    result,
    errors,
    warnings,
    suggestions,
  };
}

// Example 6: Validating a Next.js app directory structure
export function example6_validateAppDirectory() {
  const inputs: ValidationInput[] = [
    // Layout file
    {
      filePath: 'src/app/(auth)/layout.tsx',
      code: `
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
      `,
    },
    // Page file
    {
      filePath: 'src/app/(auth)/login/page.tsx',
      code: `
export default function LoginPage() {
  const isAuthenticated = false;
  const errorMessage = '';
  
  return <div>Login</div>;
}
      `,
    },
    // Route segment (should be kebab-case)
    {
      filePath: 'src/app/(client)/user-profile/settings/page.tsx',
      code: `
export default function SettingsPage() {
  return <div>Settings</div>;
}
      `,
    },
  ];

  const result = validateNamingConventions(inputs);
  return result;
}

// Example 7: TypeScript usage with strict types
export function example7_typescriptUsage() {
  const input: ValidationInput = {
    filePath: 'src/components/ProductList.tsx',
    code: `
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const MAX_ITEMS = 10;
  const DEFAULT_PAGE_SIZE = 20;
  
  return <div>Products</div>;
}
    `,
  };

  const result = validateNamingConventions(input);

  // Type-safe access to results
  if (result.score < 100) {
    console.warn(`Code quality score: ${result.score}%`);
    result.violations.forEach((violation) => {
      console.warn(`${violation.type}: ${violation.message}`);
      console.info(`Suggestion: ${violation.suggestion}`);
    });
  }

  return result;
}

// Example 8: Integration with CI/CD pipeline
export function example8_cicdIntegration() {
  const inputs: ValidationInput[] = [
    // Add your files here
  ];

  const result = validateNamingConventions(inputs);

  // Fail CI if score is below threshold
  const MIN_SCORE = 95;
  if (result.score < MIN_SCORE) {
    console.error(`❌ Validation failed! Score: ${result.score}% (minimum: ${MIN_SCORE}%)`);
    console.error(formatValidationResult(result));
    process.exit(1); // Exit with error code
  } else {
    console.log(`✅ Validation passed! Score: ${result.score}%`);
  }

  return result;
}
