/**
 * Next.js Naming Convention Validator
 *
 * Validates code against Next.js and TypeScript naming conventions:
 * - Files: PascalCase for components, kebab-case for routes, camelCase for utils
 * - Functions: PascalCase for components, camelCase for utilities
 * - Variables: camelCase (booleans with is/has/should/can prefix)
 * - Constants: UPPER_SNAKE_CASE
 */

export type ViolationType = 'file' | 'function' | 'variable' | 'constant';
export type Severity = 'error' | 'warning' | 'info';

export interface Violation {
  type: ViolationType;
  severity: Severity;
  message: string;
  suggestion: string;
  line?: number;
  column?: number;
  name: string;
}

export interface ValidationSummary {
  file: number;
  function: number;
  variable: number;
  constant: number;
  total: number;
}

export interface ValidationResult {
  violations: Violation[];
  score: number;
  summary: ValidationSummary;
}

export interface ValidationInput {
  filePath: string;
  code: string;
}

// Regex patterns for extracting code constructs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PATTERNS = {
  // Function declarations: function name() or const name = () => or export function name()
  function:
    /(?:export\s+)?(?:async\s+)?function\s+(\w+)|(?:export\s+)?const\s+(\w+)\s*[:=]\s*(?:\(|async\s*\()|(?:export\s+)?(?:const|let|var)\s+(\w+)\s*[:=]\s*(?:function|\(|async)/g,

  // Variable declarations: const name =, let name =, var name =
  variable: /(?:const|let|var)\s+(\w+)\s*[:=]/g,

  // Constant declarations: const NAME = or export const NAME =
  constant: /(?:export\s+)?const\s+([A-Z_][A-Z0-9_]*)\s*[:=]/g,

  // React component: const Component = () => or function Component() or export default function Component()
  componentFunction:
    /(?:export\s+default\s+)?(?:function|const)\s+([A-Z]\w*)\s*(?:\(|[:=]\s*(?:\(|React\.(?:FC|forwardRef)))/g,
} as const;

// Naming convention validators
const validators = {
  /**
   * Check if a string is PascalCase
   */
  isPascalCase(name: string): boolean {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name);
  },

  /**
   * Check if a string is camelCase
   */
  isCamelCase(name: string): boolean {
    return /^[a-z][a-zA-Z0-9]*$/.test(name);
  },

  /**
   * Check if a string is kebab-case
   */
  isKebabCase(name: string): boolean {
    return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name);
  },

  /**
   * Check if a string is UPPER_SNAKE_CASE
   */
  isUpperSnakeCase(name: string): boolean {
    return /^[A-Z][A-Z0-9_]*$/.test(name);
  },

  /**
   * Check if a boolean variable has proper prefix
   */
  hasBooleanPrefix(name: string): boolean {
    return /^(is|has|should|can|will|did|was|were|are|do|does)[A-Z]/.test(name);
  },

  /**
   * Check if a name is a valid boolean variable (with prefix)
   */
  isValidBooleanVariable(name: string): boolean {
    return this.isCamelCase(name) && (this.hasBooleanPrefix(name) || !this.isLikelyBoolean(name));
  },

  /**
   * Heuristic to determine if a variable is likely a boolean
   */
  isLikelyBoolean(name: string): boolean {
    const booleanIndicators = [
      'flag',
      'status',
      'active',
      'enabled',
      'disabled',
      'visible',
      'hidden',
      'open',
      'closed',
    ];
    return booleanIndicators.some((indicator) =>
      name.toLowerCase().includes(indicator.toLowerCase())
    );
  },
};

/**
 * Determine file type based on path
 */
function getFileType(
  filePath: string
): 'component' | 'route' | 'utility' | 'page' | 'layout' | 'unknown' {
  const normalizedPath = filePath.toLowerCase();
  const fileName = filePath.split('/').pop()?.toLowerCase() || '';

  // Next.js app directory routes (page.tsx, layout.tsx, etc.)
  if (
    fileName === 'page.tsx' ||
    fileName === 'page.ts' ||
    fileName === 'layout.tsx' ||
    fileName === 'layout.ts'
  ) {
    return fileName.startsWith('page') ? 'page' : 'layout';
  }

  // Route segments (kebab-case directories)
  if (normalizedPath.includes('/app/') || normalizedPath.includes('/(')) {
    const routeSegment = filePath
      .split('/')
      .filter((p) => p && !p.includes('.'))
      .pop();
    if (routeSegment && validators.isKebabCase(routeSegment)) {
      return 'route';
    }
  }

  // Components (usually in components/ directory with PascalCase)
  if (normalizedPath.includes('/components/') || normalizedPath.includes('/component/')) {
    return 'component';
  }

  // Utilities (usually in lib/utils/, lib/helpers/, etc.)
  if (
    normalizedPath.includes('/utils/') ||
    normalizedPath.includes('/helpers/') ||
    normalizedPath.includes('/lib/')
  ) {
    return 'utility';
  }

  return 'unknown';
}

/**
 * Extract functions from code
 */
function extractFunctions(
  code: string
): Array<{ name: string; line: number; isComponent: boolean }> {
  const functions: Array<{ name: string; line: number; isComponent: boolean }> = [];
  const seen = new Set<string>();

  // Extract function declarations: function name() or export function name()
  const functionRegex =
    /(?:export\s+default\s+)?(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*[<(]/g;
  let match;
  while ((match = functionRegex.exec(code)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      const line = code.substring(0, match.index).split('\n').length;
      const isComponent = validators.isPascalCase(name);
      functions.push({ name, line, isComponent });
      seen.add(name);
    }
  }

  // Extract arrow function assignments: const name = () => or const name = async () =>
  const arrowFunctionRegex =
    /(?:export\s+default\s+)?(?:export\s+)?(?:const|let)\s+(\w+)\s*[:=]\s*(?:async\s*)?\(/g;
  while ((match = arrowFunctionRegex.exec(code)) !== null) {
    const name = match[1];
    if (seen.has(name)) {
      continue;
    }
    // Check if it's actually a function (followed by arrow or React.FC)
    const matchEnd = match.index + match[0].length;
    const afterMatch = code.substring(matchEnd, Math.min(matchEnd + 200, code.length));
    const isArrowFunction = /^[^=]*=>/.test(afterMatch);
    const isReactComponent =
      afterMatch.includes('React.FC') || afterMatch.includes('React.forwardRef');

    if (isArrowFunction || isReactComponent) {
      const line = code.substring(0, match.index).split('\n').length;
      const isComponent = validators.isPascalCase(name);
      functions.push({ name, line, isComponent });
      seen.add(name);
    }
  }

  // Extract React.forwardRef patterns: const Component = React.forwardRef(...)
  const forwardRefRegex =
    /(?:export\s+default\s+)?(?:export\s+)?(?:const|let)\s+(\w+)\s*=\s*React\.forwardRef/g;
  while ((match = forwardRefRegex.exec(code)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      const line = code.substring(0, match.index).split('\n').length;
      const isComponent = validators.isPascalCase(name);
      functions.push({ name, line, isComponent });
      seen.add(name);
    }
  }

  return functions;
}

/**
 * Extract variables from code
 */
function extractVariables(code: string): Array<{ name: string; line: number; isBoolean: boolean }> {
  const variables: Array<{ name: string; line: number; isBoolean: boolean }> = [];
  const seen = new Set<string>();
  const variableRegex = /(?:const|let|var)\s+(\w+)\s*[:=]/g;
  let match;

  while ((match = variableRegex.exec(code)) !== null) {
    const name = match[1];

    // Skip if already seen (avoid duplicates)
    if (seen.has(name)) {
      continue;
    }

    // Skip if it's likely a constant (all caps)
    if (validators.isUpperSnakeCase(name)) {
      continue;
    }

    // Skip if it's a function assignment (arrow function or function expression)
    const afterDeclaration = code.substring(match.index + match[0].length);
    const isFunctionAssignment =
      afterDeclaration.trim().startsWith('(') ||
      afterDeclaration.trim().startsWith('async') ||
      afterDeclaration.includes('React.forwardRef') ||
      afterDeclaration.includes('React.FC');

    if (isFunctionAssignment) {
      continue;
    }

    // Skip destructuring patterns
    if (code.substring(Math.max(0, match.index - 10), match.index).includes('{')) {
      continue;
    }

    const line = code.substring(0, match.index).split('\n').length;
    const isBoolean = validators.isLikelyBoolean(name);
    variables.push({ name, line, isBoolean });
    seen.add(name);
  }

  return variables;
}

/**
 * Extract constants from code
 */
function extractConstants(code: string): Array<{ name: string; line: number }> {
  const constants: Array<{ name: string; line: number }> = [];
  const constantRegex = /(?:export\s+)?const\s+([A-Z_][A-Z0-9_]*)\s*[:=]/g;
  let match;

  while ((match = constantRegex.exec(code)) !== null) {
    const name = match[1];
    const line = code.substring(0, match.index).split('\n').length;
    constants.push({ name, line });
  }

  return constants;
}

/**
 * Validate file name based on file type
 */
function validateFileName(
  filePath: string,
  fileType: ReturnType<typeof getFileType>
): Violation | null {
  const fileName = filePath.split('/').pop() || '';
  const nameWithoutExt = fileName.replace(/\.(tsx?|jsx?)$/, '');

  // Special Next.js files
  if (
    fileName === 'page.tsx' ||
    fileName === 'page.ts' ||
    fileName === 'layout.tsx' ||
    fileName === 'layout.ts' ||
    fileName === 'loading.tsx' ||
    fileName === 'error.tsx' ||
    fileName === 'not-found.tsx'
  ) {
    return null; // These are valid Next.js special files
  }

  // For files with dots (e.g., auth.schema.ts), only validate the first part
  const baseName = nameWithoutExt.split('.')[0];

  switch (fileType) {
    case 'component':
      if (!validators.isPascalCase(nameWithoutExt)) {
        return {
          type: 'file',
          severity: 'error',
          message: `Component file "${fileName}" should be in PascalCase`,
          suggestion: `Rename to ${nameWithoutExt
            .split(/[-_]/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join('')}.tsx`,
          name: fileName,
        };
      }
      break;

    case 'route':
      // Route segments should be kebab-case
      const routeSegment = filePath
        .split('/')
        .filter((p) => p && !p.includes('.'))
        .pop();
      if (
        routeSegment &&
        !validators.isKebabCase(routeSegment) &&
        !routeSegment.match(/^\[.*\]$/)
      ) {
        return {
          type: 'file',
          severity: 'error',
          message: `Route segment "${routeSegment}" should be in kebab-case`,
          suggestion: `Rename to ${routeSegment
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .replace(/^-/, '')}`,
          name: routeSegment,
        };
      }
      break;

    case 'utility':
      // For utility files, validate the base name (part before first dot)
      // Files like auth.schema.ts should have camelCase base name
      if (baseName !== 'index' && !validators.isCamelCase(baseName)) {
        // If the whole name is valid, it's okay (e.g., kebab-case with dots is sometimes acceptable)
        if (!validators.isCamelCase(nameWithoutExt)) {
          return {
            type: 'file',
            severity: 'error',
            message: `Utility file "${fileName}" base name should be in camelCase`,
            suggestion: `Rename to ${baseName.charAt(0).toLowerCase() + baseName.slice(1).replace(/[-_](.)/g, (_, c) => c.toUpperCase())}${nameWithoutExt.substring(baseName.length)}.ts`,
            name: fileName,
          };
        }
      }
      break;
  }

  return null;
}

/**
 * Validate function names
 */
function validateFunction(
  func: { name: string; line: number; isComponent: boolean },
  fileType: ReturnType<typeof getFileType>
): Violation | null {
  const { name, line, isComponent } = func;

  // Skip React built-ins, default exports, and common patterns
  if (
    name === 'default' ||
    name.startsWith('_') ||
    name.match(/^[a-z]$/) ||
    name === 'metadata' ||
    name === 'generateMetadata'
  ) {
    return null;
  }

  // Determine if this should be a component based on context
  const shouldBeComponent =
    isComponent ||
    fileType === 'component' ||
    fileType === 'page' ||
    fileType === 'layout' ||
    (fileType === 'unknown' && validators.isPascalCase(name));

  // Component functions should be PascalCase
  if (shouldBeComponent) {
    if (!validators.isPascalCase(name)) {
      return {
        type: 'function',
        severity: 'error',
        message: `Component function "${name}" should be in PascalCase`,
        suggestion: `${name.charAt(0).toUpperCase() + name.slice(1).replace(/[-_](.)/g, (_, c) => c.toUpperCase())}`,
        line,
        name,
      };
    }
  } else {
    // Utility functions should be camelCase
    if (!validators.isCamelCase(name)) {
      // Don't flag if it's already PascalCase in a utility file (might be intentional)
      if (validators.isPascalCase(name) && fileType === 'utility') {
        return {
          type: 'function',
          severity: 'warning',
          message: `Function "${name}" in utility file uses PascalCase. Consider using camelCase for utilities.`,
          suggestion: `${name.charAt(0).toLowerCase() + name.slice(1)}`,
          line,
          name,
        };
      }
      if (!validators.isPascalCase(name)) {
        return {
          type: 'function',
          severity: 'error',
          message: `Utility function "${name}" should be in camelCase`,
          suggestion: `${name.charAt(0).toLowerCase() + name.slice(1).replace(/[-_](.)/g, (_, c) => c.toUpperCase())}`,
          line,
          name,
        };
      }
    }
  }

  return null;
}

/**
 * Check if variable is a React Context (should be PascalCase)
 */
function isReactContext(variable: { name: string; line: number }, code: string): boolean {
  // Check if it's created with createContext
  const contextPattern = new RegExp(
    `(const|let|var)\\s+${variable.name}\\s*=\\s*createContext`,
    'i'
  );
  if (contextPattern.test(code)) {
    return true;
  }

  // Check if name ends with Context and is PascalCase (common pattern)
  if (variable.name.endsWith('Context') && validators.isPascalCase(variable.name)) {
    return true;
  }

  return false;
}

/**
 * Validate variable names
 */
function validateVariable(
  variable: { name: string; line: number; isBoolean: boolean },
  code: string
): Violation | null {
  const { name, line, isBoolean } = variable;

  // Skip React built-ins and common patterns
  if (name === 'default' || name.startsWith('_') || name.match(/^[a-z]$/)) {
    return null;
  }

  // Skip if it's actually a constant
  if (validators.isUpperSnakeCase(name)) {
    return null;
  }

  // React Context variables should be PascalCase (e.g., AuthContext, ThemeContext)
  if (isReactContext(variable, code)) {
    if (!validators.isPascalCase(name)) {
      return {
        type: 'variable',
        severity: 'error',
        message: `React Context "${name}" should be in PascalCase`,
        suggestion: `${name.charAt(0).toUpperCase() + name.slice(1).replace(/[-_](.)/g, (_, c) => c.toUpperCase())}`,
        line,
        name,
      };
    }
    return null; // Valid React Context, no violation
  }

  // Variables should be camelCase
  if (!validators.isCamelCase(name)) {
    return {
      type: 'variable',
      severity: 'error',
      message: `Variable "${name}" should be in camelCase`,
      suggestion: `${name.charAt(0).toLowerCase() + name.slice(1).replace(/[-_](.)/g, (_, c) => c.toUpperCase())}`,
      line,
      name,
    };
  }

  // Boolean variables should have proper prefix
  if (isBoolean && !validators.hasBooleanPrefix(name)) {
    return {
      type: 'variable',
      severity: 'warning',
      message: `Boolean variable "${name}" should have a prefix (is/has/should/can)`,
      suggestion: `Consider renaming to "is${name.charAt(0).toUpperCase() + name.slice(1)}" or "has${name.charAt(0).toUpperCase() + name.slice(1)}"`,
      line,
      name,
    };
  }

  return null;
}

/**
 * Validate constant names
 */
function validateConstant(constant: { name: string; line: number }): Violation | null {
  const { name, line } = constant;

  // Constants should be UPPER_SNAKE_CASE
  if (!validators.isUpperSnakeCase(name)) {
    return {
      type: 'constant',
      severity: 'error',
      message: `Constant "${name}" should be in UPPER_SNAKE_CASE`,
      suggestion: `${name
        .toUpperCase()
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[-]/g, '_')}`,
      line,
      name,
    };
  }

  return null;
}

/**
 * Main validation function
 */
export function validateNamingConventions(
  input: ValidationInput | ValidationInput[]
): ValidationResult {
  const inputs = Array.isArray(input) ? input : [input];
  const violations: Violation[] = [];

  for (const { filePath, code } of inputs) {
    const fileType = getFileType(filePath);

    // Validate file name
    const fileViolation = validateFileName(filePath, fileType);
    if (fileViolation) {
      violations.push(fileViolation);
    }

    // Extract and validate functions
    const functions = extractFunctions(code);
    for (const func of functions) {
      const violation = validateFunction(func, fileType);
      if (violation) {
        violations.push(violation);
      }
    }

    // Extract and validate variables
    const variables = extractVariables(code);
    for (const variable of variables) {
      const violation = validateVariable(variable, code);
      if (violation) {
        violations.push(violation);
      }
    }

    // Extract and validate constants
    const constants = extractConstants(code);
    for (const constant of constants) {
      const violation = validateConstant(constant);
      if (violation) {
        violations.push(violation);
      }
    }
  }

  // Calculate summary
  const summary: ValidationSummary = {
    file: violations.filter((v) => v.type === 'file').length,
    function: violations.filter((v) => v.type === 'function').length,
    variable: violations.filter((v) => v.type === 'variable').length,
    constant: violations.filter((v) => v.type === 'constant').length,
    total: violations.length,
  };

  // Calculate total items checked (approximate)
  const totalChecked = inputs.reduce((acc, { code }) => {
    const functions = extractFunctions(code);
    const variables = extractVariables(code);
    const constants = extractConstants(code);
    return acc + functions.length + variables.length + constants.length + 1; // +1 for file
  }, 0);

  // Calculate score (compliance percentage)
  const score =
    totalChecked > 0
      ? Math.max(0, Math.round(((totalChecked - summary.total) / totalChecked) * 100))
      : 100;

  return {
    violations,
    score,
    summary,
  };
}

/**
 * Format validation result as a readable string
 */
export function formatValidationResult(result: ValidationResult): string {
  const { violations, score, summary } = result;

  let output = `\n📊 Naming Convention Validation Results\n`;
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  output += `Overall Score: ${score}%\n\n`;
  output += `Summary:\n`;
  output += `  • Files: ${summary.file} violation(s)\n`;
  output += `  • Functions: ${summary.function} violation(s)\n`;
  output += `  • Variables: ${summary.variable} violation(s)\n`;
  output += `  • Constants: ${summary.constant} violation(s)\n`;
  output += `  • Total: ${summary.total} violation(s)\n\n`;

  if (violations.length > 0) {
    output += `Violations:\n`;
    violations.forEach((violation, index) => {
      output += `\n${index + 1}. [${violation.severity.toUpperCase()}] ${violation.type}: ${violation.name}\n`;
      output += `   ${violation.message}\n`;
      if (violation.line) {
        output += `   Line: ${violation.line}\n`;
      }
      output += `   Suggestion: ${violation.suggestion}\n`;
    });
  } else {
    output += `✅ No violations found! All naming conventions are followed.\n`;
  }

  return output;
}
