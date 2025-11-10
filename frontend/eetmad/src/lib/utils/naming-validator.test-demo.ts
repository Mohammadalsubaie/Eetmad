/**
 * Demo/test file for the naming convention validator
 *
 * This file demonstrates the validator with various test cases
 * Run this file to see the validator in action
 */

import {
  formatValidationResult,
  validateNamingConventions,
  type ValidationInput,
} from './naming-validator';

// Test Case 1: Valid component file
const validComponent: ValidationInput = {
  filePath: 'src/components/ui/Button.tsx',
  code: `
import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant }: ButtonProps) {
  const isDisabled = false;
  const hasIcon = true;
  
  return <button disabled={isDisabled}>Click me</button>;
}
  `,
};

// Test Case 2: Invalid component file (wrong naming)
const invalidComponent: ValidationInput = {
  filePath: 'src/components/ui/button.tsx', // Should be Button.tsx
  code: `
export function badComponent() { // Should be BadComponent
  const UserName = 'John'; // Should be userName
  const active = true; // Warning: should be isActive
  const apiUrl = 'https://api.example.com'; // Should be API_URL if constant
}
  `,
};

// Test Case 3: Valid utility file
const validUtility: ValidationInput = {
  filePath: 'src/lib/utils/formatDate.ts',
  code: `
export function formatDate(date: Date): string {
  return date.toISOString();
}

export function isValidEmail(email: string): boolean {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

export const DEFAULT_TIMEOUT = 5000;
export const API_BASE_URL = 'https://api.example.com';
  `,
};

// Test Case 4: Valid route file
const validRoute: ValidationInput = {
  filePath: 'src/app/(auth)/forgot-password/page.tsx',
  code: `
export default function ForgotPasswordPage() {
  const isSubmitted = false;
  const hasError = false;
  const MAX_ATTEMPTS = 3;
  
  return <div>Forgot Password</div>;
}
  `,
};

// Test Case 5: Invalid route (wrong case)
const invalidRoute: ValidationInput = {
  filePath: 'src/app/(client)/UserProfile/page.tsx', // Route should be user-profile
  code: `
export default function UserProfilePage() {
  return <div>Profile</div>;
}
  `,
};

// Run all tests
export function runDemo() {
  console.log('='.repeat(60));
  console.log('Naming Convention Validator Demo');
  console.log('='.repeat(60));

  const testCases = [
    { name: 'Valid Component', input: validComponent },
    { name: 'Invalid Component', input: invalidComponent },
    { name: 'Valid Utility', input: validUtility },
    { name: 'Valid Route', input: validRoute },
    { name: 'Invalid Route', input: invalidRoute },
  ];

  testCases.forEach(({ name, input }) => {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`Test: ${name}`);
    console.log(`File: ${input.filePath}`);
    console.log(`${'─'.repeat(60)}`);

    const result = validateNamingConventions(input);
    console.log(formatValidationResult(result));
  });

  // Test batch validation
  console.log(`\n${'='.repeat(60)}`);
  console.log('Batch Validation Test');
  console.log('='.repeat(60));

  const batchResult = validateNamingConventions([
    validComponent,
    invalidComponent,
    validUtility,
    validRoute,
    invalidRoute,
  ]);

  console.log(formatValidationResult(batchResult));

  return {
    individual: testCases.map(({ name, input }) => ({
      name,
      result: validateNamingConventions(input),
    })),
    batch: batchResult,
  };
}

// Export for use in other files
export const testCases = {
  validComponent,
  invalidComponent,
  validUtility,
  validRoute,
  invalidRoute,
};
