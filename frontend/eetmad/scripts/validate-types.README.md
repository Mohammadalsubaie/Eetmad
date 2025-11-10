# Type Validation Script

## Overview

The `validate-types.ts` script validates that all TypeScript type definitions match the database schema defined in `docs/database/mysql.sql`.

## What It Does

1. **Parses SQL Schema**: Extracts table definitions and field specifications from `mysql.sql`
2. **Parses TypeScript Types**: Extracts interface definitions from all `*.types.ts` files
3. **Validates Alignment**: Checks that:
   - All database tables have corresponding TypeScript interfaces
   - All database fields have corresponding TypeScript properties
   - Field types match (uuid → string, boolean → boolean, etc.)
   - Required fields (NOT NULL) are required in TypeScript
   - Optional fields (NULL) are optional or nullable in TypeScript
   - Enum fields are properly typed as string unions

## Usage

```bash
# Run validation
npm run validate-types

# Or directly with tsx
npx tsx scripts/validate-types.ts
```

## Output

The script provides:

- ✅ **Success**: All types match the database schema (exit code 0)
- ❌ **Failure**: Lists all mismatches with details (exit code 1)

### Example Success Output

```
🔍 TypeScript Type Validation against Database Schema
================================================================================
📖 Parsing SQL schema...
   Found 32 tables

📖 Parsing TypeScript type files...
   Found 25 type files
   Found 41 type alias(es)
   Total: 69 interfaces

🔍 Validating types against database schema...

================================================================================
📊 Validation Results

✅ All types match the database schema!

   • 32 tables validated
   • 69 interfaces checked
   • 0 errors found
```

### Example Error Output

```
❌ Found 5 error(s):

MISSING FIELD (3):
  Table: User
  Field: status
  Message: Missing property in interface User: status

TYPE MISMATCH (2):
  Table: Request
  Field: budget
  Message: Type mismatch for Request.budget: expected number, got string
  Expected: number
  Actual: string
```

## Validation Rules

### Type Mappings

| SQL Type    | TypeScript Type                                      |
| ----------- | ---------------------------------------------------- |
| `uuid`      | `string`                                             |
| `string`    | `string`                                             |
| `text`      | `string`                                             |
| `int`       | `number`                                             |
| `decimal`   | `number`                                             |
| `boolean`   | `boolean`                                            |
| `date`      | `string`                                             |
| `timestamp` | `string`                                             |
| `json`      | `Record<string, any> \| any[] \| null`               |
| `enum`      | `string` (or union type like `'value1' \| 'value2'`) |

### Optionality Rules

- **Database `NOT NULL`** → TypeScript: **Required** (no `?`, no `| null`)
- **Database `NULL`** → TypeScript: **Optional** (`?`) or **Nullable** (`| null`)

### Special Cases

- **`passwordHash`**: Skipped (backend-only field)
- **Enum fields**: Accept string types, union types, or type aliases
- **JSON fields**: Accept `Record<string, any>`, arrays, or specific interfaces
- **Type aliases**: Resolved and validated correctly

## Integration

Add to CI/CD pipeline:

```yaml
# .github/workflows/ci.yml
- name: Validate Types
  run: npm run validate-types
```

Or add to pre-commit hook:

```json
// package.json
{
  "scripts": {
    "pre-commit": "npm run validate-types && npm run type-check"
  }
}
```

## Troubleshooting

### Missing Table Error

If you see "Missing TypeScript interface for table: X":

1. Check if the interface exists in `src/lib/types/`
2. Verify the interface name matches the table name (e.g., `User` table → `User` interface)
3. Ensure the interface is exported

### Missing Field Error

If you see "Missing property in interface X: fieldY":

1. Check if the property exists in the interface
2. Verify the property name matches (camelCase conversion is handled automatically)
3. Ensure the property is not commented out

### Type Mismatch Error

If you see "Type mismatch":

1. Check the SQL type mapping table above
2. Verify the TypeScript type matches the expected type
3. For enum fields, ensure it's a string type or union type

### Optionality Mismatch Error

If you see "Optionality mismatch":

1. Check if the database field is `NULL` or `NOT NULL`
2. Ensure the TypeScript property matches:
   - `NOT NULL` → required (no `?`, no `| null`)
   - `NULL` → optional (`?`) or nullable (`| null`)

## Notes

- The script automatically handles:
  - CamelCase conversion (e.g., `user_type` → `userType`)
  - Type alias resolution (e.g., `UserStatus` → `'active' | 'inactive' | ...`)
  - Nested interfaces and complex types
  - Comments in TypeScript files

- The script ignores:
  - Backend-only fields (e.g., `passwordHash`)
  - Helper interfaces (not directly mapped to tables)
  - Extended interfaces (properties from parent interfaces)

## Maintenance

When updating the database schema:

1. Update `docs/database/mysql.sql`
2. Run `npm run validate-types` to see what needs updating
3. Update TypeScript types accordingly
4. Re-run validation to confirm

## See Also

- `docs/TYPE_UPDATES_REQUIRED.md` - Detailed type update requirements
- `docs/ACTIONS_ALIGNMENT_ANALYSIS.md` - Actions alignment analysis
- `docs/database/mysql.sql` - Database schema
