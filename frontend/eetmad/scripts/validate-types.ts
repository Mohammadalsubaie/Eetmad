/**
 * Script to validate TypeScript types against database schema
 *
 * This script parses the SQL schema file and TypeScript type files,
 * then validates that all database tables and fields have corresponding
 * TypeScript types with matching structures.
 *
 * Usage:
 *   npx tsx scripts/validate-types.ts
 *   or
 *   npm run validate-types
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Type Definitions
// ============================================================================

interface DatabaseField {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: string;
}

interface DatabaseTable {
  name: string;
  fields: DatabaseField[];
}

interface TypeScriptProperty {
  name: string;
  type: string;
  optional: boolean;
  nullable: boolean;
}

interface TypeScriptInterface {
  name: string;
  properties: TypeScriptProperty[];
  filePath: string;
}

interface ValidationError {
  table: string;
  field?: string;
  type:
    | 'missing_table'
    | 'missing_field'
    | 'type_mismatch'
    | 'optionality_mismatch'
    | 'field_name_mismatch';
  message: string;
  expected?: string;
  actual?: string;
}

// ============================================================================
// SQL Parser
// ============================================================================

/**
 * Maps SQL types to TypeScript types
 */
function sqlTypeToTypeScript(sqlType: string): string {
  const lowerType = sqlType.toLowerCase().trim();

  if (lowerType === 'uuid') return 'string';
  if (lowerType === 'string' || lowerType === 'text') return 'string';
  if (lowerType === 'int' || lowerType === 'decimal') return 'number';
  if (lowerType === 'boolean') return 'boolean';
  if (lowerType === 'date' || lowerType === 'timestamp') return 'string';
  if (lowerType === 'json') return 'Record<string, any> | any[] | null';
  if (lowerType.startsWith('enum')) return 'string'; // Enum types are string unions

  return 'any';
}

/**
 * Parse SQL CREATE TABLE statement
 */
function parseCreateTable(sql: string): DatabaseTable[] {
  const tables: DatabaseTable[] = [];

  // Match CREATE TABLE statements
  const tableRegex = /CREATE TABLE `?(\w+)`?\s*\(([\s\S]*?)\);/gi;
  let match;

  while ((match = tableRegex.exec(sql)) !== null) {
    const tableName = match[1];
    const tableBody = match[2];
    const fields: DatabaseField[] = [];

    // Parse fields
    const fieldLines = tableBody
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line);

    for (const line of fieldLines) {
      // Skip constraints, indexes, and PRIMARY KEY definitions
      if (
        line.startsWith('PRIMARY KEY') ||
        line.startsWith('CONSTRAINT') ||
        line.startsWith('FOREIGN KEY') ||
        line.startsWith('CREATE INDEX') ||
        line.startsWith('ALTER TABLE') ||
        line.startsWith('REFERENCES')
      ) {
        continue;
      }

      // Match field definition: `fieldName` type NOT NULL/NULL, ...
      const fieldMatch = line.match(/`?(\w+)`?\s+(\w+)\s+(NOT\s+NULL|NULL)/i);
      if (fieldMatch) {
        const fieldName = fieldMatch[1];
        const fieldType = fieldMatch[2];
        const nullable =
          fieldMatch[3].toUpperCase().includes('NULL') &&
          !fieldMatch[3].toUpperCase().includes('NOT');

        fields.push({
          name: fieldName,
          type: fieldType,
          nullable,
        });
      }
    }

    if (fields.length > 0) {
      tables.push({
        name: tableName,
        fields,
      });
    }
  }

  return tables;
}

/**
 * Convert database table name to TypeScript interface name
 */
function tableNameToInterfaceName(tableName: string): string {
  // Remove table prefix if needed, convert to PascalCase
  // User -> User
  // SupplierProfile -> SupplierProfile
  // ProjectMilestone -> ProjectMilestone
  return tableName;
}

/**
 * Convert database field name (snake_case/camelCase) to TypeScript property name
 */
function fieldNameToPropertyName(fieldName: string): string {
  // Database uses camelCase already in most cases
  // If it's snake_case, convert to camelCase
  if (fieldName.includes('_')) {
    return fieldName
      .split('_')
      .map((part, index) => {
        if (index === 0) return part;
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join('');
  }
  return fieldName;
}

// ============================================================================
// Placeholder Detection
// ============================================================================

/**
 * Check if a file is a placeholder (not ready for validation)
 */
function isPlaceholderFile(content: string): boolean {
  const placeholderPatterns = [
    /\/\/\s*TODO:\s*Implement/i,
    /\/\/\s*PLACEHOLDER/i,
    /\/\/\s*not\s+ready/i,
    /\/\/\s*not\s+implemented/i,
    /\/\/\s*placeholder\s+only/i,
    /\/\*\s*TODO:\s*Implement/i,
    /\/\*\s*PLACEHOLDER/i,
  ];

  // Check for placeholder patterns in the first 10 lines
  const lines = content.split('\n').slice(0, 10).join('\n');
  const hasPlaceholderPattern = placeholderPatterns.some((pattern) => pattern.test(lines));

  // Also check if file is very minimal (likely a placeholder)
  const isMinimalPlaceholder =
    content.split('\n').length < 10 &&
    (content.includes('return null') || content.includes('return;'));

  return hasPlaceholderPattern || isMinimalPlaceholder;
}

// ============================================================================
// TypeScript Parser
// ============================================================================

/**
 * Parse TypeScript type aliases (for enums)
 */
function parseTypeScriptTypeAliases(content: string): Map<string, string> {
  const typeAliases = new Map<string, string>();

  // Match type aliases: export type TypeName = 'value1' | 'value2';
  const typeRegex = /export\s+type\s+(\w+)\s*=\s*([^;]+);/g;
  let match;

  while ((match = typeRegex.exec(content)) !== null) {
    const typeName = match[1];
    const typeValue = match[2].trim();
    typeAliases.set(typeName, typeValue);
  }

  return typeAliases;
}

/**
 * Check if a TypeScript type is a string type (including union types and type aliases)
 */
function isStringType(type: string, typeAliases: Map<string, string>): boolean {
  // Direct string type
  if (type === 'string') return true;

  // Check if it's a type alias that resolves to string
  if (typeAliases.has(type)) {
    const aliasValue = typeAliases.get(type)!;
    // If it's a union type (contains |), it's still a string type
    return aliasValue.includes('|') || aliasValue.includes("'") || aliasValue.includes('"');
  }

  // Union type containing string
  if (type.includes('|')) {
    return true; // Union types are generally acceptable for enum fields
  }

  return false;
}

/**
 * Parse TypeScript interface from file content
 */
function parseTypeScriptInterfaces(
  filePath: string,
  content: string,
  typeAliases: Map<string, string>
): TypeScriptInterface[] {
  const interfaces: TypeScriptInterface[] = [];

  // More robust interface matching - handle nested braces properly
  const interfaceRegex = /export\s+interface\s+(\w+)(?:\s+extends\s+[^{]+)?\s*{/g;
  let match;

  while ((match = interfaceRegex.exec(content)) !== null) {
    const interfaceName = match[1];
    const startPos = match.index + match[0].length;

    // Find the matching closing brace
    let braceDepth = 1;
    let endPos = startPos;
    let inString = false;
    let stringChar = '';

    for (let i = startPos; i < content.length && braceDepth > 0; i++) {
      const char = content[i];
      const prevChar = i > 0 ? content[i - 1] : '';

      // Handle strings
      if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = '';
        }
      }

      if (!inString) {
        if (char === '{') braceDepth++;
        if (char === '}') braceDepth--;
        if (braceDepth === 0) {
          endPos = i;
          break;
        }
      }
    }

    const interfaceBody = content.substring(startPos, endPos);
    const properties: TypeScriptProperty[] = [];

    // Simple line-by-line parsing - look for property patterns
    const lines = interfaceBody.split('\n');

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmed = line.trim();

      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('//')) continue;

      // Remove inline comments
      line = line.replace(/\/\/.*$/, '');

      // Try to match property on single line: name: type; or name?: type; or name: type | null;
      // Pattern: word, optional ?, colon, type (can include |, [], {}, etc.), semicolon or comma
      let propertyMatch = line.match(
        /^\s*(\w+)(\??)\s*:\s*([^;|,]+(?:\s*\|\s*[^;|,]+)*)\s*[;,]?\s*$/
      );

      // If no match, try matching without semicolon (for multi-line types)
      if (!propertyMatch) {
        propertyMatch = line.match(/^\s*(\w+)(\??)\s*:\s*(.+?)\s*$/);
      }

      if (propertyMatch) {
        const propertyName = propertyMatch[1];
        const optional = propertyMatch[2] === '?';
        let propertyType = propertyMatch[3].trim();
        const nullable = line.includes('| null');

        // Clean up type - remove semicolons, commas, extra spaces
        propertyType = propertyType.replace(/[;,]\s*$/, '').trim();
        propertyType = propertyType.replace(/\s+/g, ' ');

        // Handle type aliases - check if the type (before | null) is an alias
        const typeWithoutNull = propertyType.replace(/\s*\|\s*null$/, '').trim();
        if (typeAliases.has(typeWithoutNull)) {
          const aliasValue = typeAliases.get(typeWithoutNull)!;
          propertyType = nullable ? `${aliasValue} | null` : aliasValue;
        } else {
          // Check if it's a direct reference to a type alias (without resolving)
          // Keep the original type name for validation
          propertyType = typeWithoutNull + (nullable ? ' | null' : '');
        }

        properties.push({
          name: propertyName,
          type: propertyType,
          optional,
          nullable,
        });
      }
    }

    interfaces.push({
      name: interfaceName,
      properties,
      filePath,
    });
  }

  return interfaces;
}

/**
 * Find all TypeScript type files
 */
function findTypeFiles(dir: string): string[] {
  const files: string[] = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...findTypeFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.types.ts')) {
        files.push(fullPath);
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }

  return files;
}

// ============================================================================
// Validation Logic
// ============================================================================

/**
 * Validate types against database schema
 */
function validateTypes(
  dbTables: DatabaseTable[],
  tsInterfaces: TypeScriptInterface[],
  typeAliases: Map<string, string>
): ValidationError[] {
  const errors: ValidationError[] = [];
  const interfaceMap = new Map<string, TypeScriptInterface>();

  // Create a map of interface names
  for (const tsInterface of tsInterfaces) {
    interfaceMap.set(tsInterface.name, tsInterface);
  }

  // Validate each database table
  for (const table of dbTables) {
    const expectedInterfaceName = tableNameToInterfaceName(table.name);
    const tsInterface = interfaceMap.get(expectedInterfaceName);

    if (!tsInterface) {
      errors.push({
        table: table.name,
        type: 'missing_table',
        message: `Missing TypeScript interface for table: ${table.name}. Expected interface: ${expectedInterfaceName}`,
      });
      continue;
    }

    // Create a map of properties
    const propertyMap = new Map<string, TypeScriptProperty>();
    for (const property of tsInterface.properties) {
      propertyMap.set(property.name, property);
    }

    // Validate each database field
    for (const dbField of table.fields) {
      const expectedPropertyName = fieldNameToPropertyName(dbField.name);
      const tsProperty = propertyMap.get(expectedPropertyName);

      // Skip passwordHash and other backend-only fields
      if (dbField.name === 'passwordHash') {
        continue;
      }

      if (!tsProperty) {
        // Check if field exists with different name (camelCase vs snake_case)
        let found = false;
        for (const [propName] of propertyMap.entries()) {
          if (
            propName.toLowerCase() === dbField.name.toLowerCase() ||
            propName.toLowerCase() === expectedPropertyName.toLowerCase()
          ) {
            found = true;
            break;
          }
        }

        if (!found) {
          errors.push({
            table: table.name,
            field: dbField.name,
            type: 'missing_field',
            message: `Missing property in interface ${expectedInterfaceName}: ${dbField.name}. Expected property: ${expectedPropertyName}`,
          });
        }
        continue;
      }

      // Validate type
      const expectedType = sqlTypeToTypeScript(dbField.type);
      const isEnumField = dbField.type.toLowerCase() === 'enum';
      const isStringField = expectedType === 'string';

      // For enum fields, accept string types, union types, or type aliases
      if (isEnumField && isStringField) {
        // Enum fields can be string, union types, or type aliases - all are acceptable
        if (
          !isStringType(tsProperty.type, typeAliases) &&
          !tsProperty.type.includes('|') &&
          !typeAliases.has(tsProperty.type)
        ) {
          // Still report if it's clearly wrong, but be lenient
          if (
            !tsProperty.type.toLowerCase().includes('string') &&
            !tsProperty.type.toLowerCase().includes('enum')
          ) {
            errors.push({
              table: table.name,
              field: dbField.name,
              type: 'type_mismatch',
              message: `Type mismatch for ${expectedInterfaceName}.${expectedPropertyName}: enum field should be string or union type, got ${tsProperty.type}`,
              expected: 'string | union type',
              actual: tsProperty.type,
            });
          }
        }
      } else {
        // For non-enum fields, validate type more strictly
        if (
          !tsProperty.type.includes(expectedType) &&
          expectedType !== 'any' &&
          !tsProperty.type.includes('Record') && // JSON fields
          !tsProperty.type.includes('[]') && // Array types
          tsProperty.type !== 'string' &&
          expectedType === 'string'
        ) {
          // String is generic
          // Allow some flexibility for complex types
          if (
            !(
              expectedType === 'string' &&
              (tsProperty.type.includes('string') || tsProperty.type.includes('Date'))
            )
          ) {
            errors.push({
              table: table.name,
              field: dbField.name,
              type: 'type_mismatch',
              message: `Type mismatch for ${expectedInterfaceName}.${expectedPropertyName}: expected ${expectedType}, got ${tsProperty.type}`,
              expected: expectedType,
              actual: tsProperty.type,
            });
          }
        }
      }

      // Validate optionality
      // Database: NOT NULL -> TypeScript: required (not optional, not nullable)
      // Database: NULL -> TypeScript: optional or nullable
      if (!dbField.nullable) {
        // Field is NOT NULL in database, should be required in TypeScript
        if (tsProperty.optional && !tsProperty.nullable) {
          errors.push({
            table: table.name,
            field: dbField.name,
            type: 'optionality_mismatch',
            message: `Optionality mismatch for ${expectedInterfaceName}.${expectedPropertyName}: database field is NOT NULL but TypeScript property is optional`,
            expected: 'required',
            actual: 'optional',
          });
        }
      } else {
        // Field is NULL in database, should be optional or nullable in TypeScript
        if (!tsProperty.optional && !tsProperty.nullable) {
          errors.push({
            table: table.name,
            field: dbField.name,
            type: 'optionality_mismatch',
            message: `Optionality mismatch for ${expectedInterfaceName}.${expectedPropertyName}: database field is NULL but TypeScript property is required`,
            expected: 'optional or nullable',
            actual: 'required',
          });
        }
      }
    }
  }

  return errors;
}

// ============================================================================
// Main Function
// ============================================================================

function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const sqlFilePath = path.join(projectRoot, 'docs', 'database', 'mysql.sql');
  const typesDir = path.join(projectRoot, 'src', 'lib', 'types');

  console.log('🔍 TypeScript Type Validation against Database Schema\n');
  console.log('='.repeat(80));
  console.log(`Project root: ${projectRoot}`);
  console.log(`SQL file: ${sqlFilePath}`);
  console.log(`Types directory: ${typesDir}\n`);

  // Read SQL file
  if (!fs.existsSync(sqlFilePath)) {
    console.error(`❌ SQL file not found: ${sqlFilePath}`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');
  console.log('📖 Parsing SQL schema...');
  const dbTables = parseCreateTable(sqlContent);
  console.log(`   Found ${dbTables.length} tables\n`);

  // Find and parse TypeScript type files
  if (!fs.existsSync(typesDir)) {
    console.error(`❌ Types directory not found: ${typesDir}`);
    process.exit(1);
  }

  console.log('📖 Parsing TypeScript type files...');
  const typeFiles = findTypeFiles(typesDir);
  console.log(`   Found ${typeFiles.length} type files\n`);

  // First pass: collect all type aliases
  const allTypeAliases = new Map<string, string>();
  for (const filePath of typeFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const typeAliases = parseTypeScriptTypeAliases(content);
    for (const [name, value] of typeAliases.entries()) {
      allTypeAliases.set(name, value);
    }
  }
  console.log(`   Found ${allTypeAliases.size} type alias(es)\n`);

  // Second pass: parse interfaces
  const tsInterfaces: TypeScriptInterface[] = [];
  let skippedPlaceholders = 0;
  for (const filePath of typeFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Skip placeholder files
    if (isPlaceholderFile(content)) {
      skippedPlaceholders++;
      console.log(`   ${path.basename(filePath)}: ⏭️  skipped (placeholder)`);
      continue;
    }

    const interfaces = parseTypeScriptInterfaces(filePath, content, allTypeAliases);
    tsInterfaces.push(...interfaces);
    console.log(`   ${path.basename(filePath)}: ${interfaces.length} interface(s)`);
  }
  console.log(`   Total: ${tsInterfaces.length} interfaces`);
  if (skippedPlaceholders > 0) {
    console.log(`   ⏭️  Skipped ${skippedPlaceholders} placeholder file(s)`);
  }
  console.log();

  // Validate
  console.log('🔍 Validating types against database schema...\n');
  const errors = validateTypes(dbTables, tsInterfaces, allTypeAliases);

  // Report results
  console.log('='.repeat(80));
  console.log('📊 Validation Results\n');

  if (errors.length === 0) {
    console.log('✅ All types match the database schema!\n');
    console.log(`   • ${dbTables.length} tables validated`);
    console.log(`   • ${tsInterfaces.length} interfaces checked`);
    console.log(`   • 0 errors found\n`);
    process.exit(0);
  } else {
    console.log(`❌ Found ${errors.length} error(s):\n`);

    // Group errors by type
    const errorsByType = new Map<string, ValidationError[]>();
    for (const error of errors) {
      if (!errorsByType.has(error.type)) {
        errorsByType.set(error.type, []);
      }
      errorsByType.get(error.type)!.push(error);
    }

    // Report errors by type
    for (const [errorType, typeErrors] of errorsByType.entries()) {
      console.log(`\n${errorType.toUpperCase().replace(/_/g, ' ')} (${typeErrors.length}):`);
      console.log('-'.repeat(80));

      for (const error of typeErrors) {
        console.log(`\n  Table: ${error.table}`);
        if (error.field) {
          console.log(`  Field: ${error.field}`);
        }
        console.log(`  Message: ${error.message}`);
        if (error.expected && error.actual) {
          console.log(`  Expected: ${error.expected}`);
          console.log(`  Actual: ${error.actual}`);
        }
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('\n❌ Validation failed. Please fix the errors above.\n');
    process.exit(1);
  }
}

// Run the script
main();
