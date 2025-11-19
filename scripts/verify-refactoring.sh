#!/bin/bash

# Refactoring Verification Script
# This script verifies all components against refactoring rules

echo "🔍 Starting Refactoring Verification..."
echo "========================================"
echo ""

ERRORS=0
WARNINGS=0
PASSED=0

# Rule 1: Check UI Component Imports
echo "📋 Rule 1: UI Component Imports"
echo "Checking for direct file path imports..."
DIRECT_IMPORTS=$(grep -r "from '@/components/ui/" frontend/eetmad/src/components/features --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$DIRECT_IMPORTS" -eq 0 ]; then
    echo "✅ PASS: All imports use index pattern"
    ((PASSED++))
else
    echo "❌ FAIL: Found $DIRECT_IMPORTS direct file path imports"
    ((ERRORS++))
fi
echo ""

# Rule 2: Check for Direct API Calls
echo "📋 Rule 2: Data Fetching Hooks"
echo "Checking for direct API calls in components..."
API_CALLS=$(grep -r "Api\.getAll\|Api\.create\|Api\.update\|Api\.delete\|Api\.getById" frontend/eetmad/src/components/features --include="*.tsx" 2>/dev/null | grep -v "hooks\|api/" | grep -v "//" | wc -l | tr -d ' ')
if [ "$API_CALLS" -eq 0 ]; then
    echo "✅ PASS: No direct API calls found"
    ((PASSED++))
else
    echo "❌ FAIL: Found $API_CALLS direct API calls"
    grep -r "Api\.getAll\|Api\.create\|Api\.update\|Api\.delete\|Api\.getById" frontend/eetmad/src/components/features --include="*.tsx" | grep -v "hooks\|api/" | grep -v "//" | head -5
    ((ERRORS++))
fi
echo ""

# Rule 3: Check Loading States
echo "📋 Rule 3: Loading States"
echo "Checking for custom loading UI..."
CUSTOM_LOADING=$(grep -r "flex items-center justify-center.*loading\|flex items-center justify-center.*Loading" frontend/eetmad/src/components/features --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$CUSTOM_LOADING" -eq 0 ]; then
    echo "✅ PASS: All loading states use LoadingSpinner"
    ((PASSED++))
else
    echo "❌ FAIL: Found $CUSTOM_LOADING custom loading UI patterns"
    ((ERRORS++))
fi
echo ""

# Rule 4: Check Error States
echo "📋 Rule 4: Error States"
echo "Checking for custom error UI..."
CUSTOM_ERROR=$(grep -r "rounded.*border.*error\|borderColor.*error" frontend/eetmad/src/components/features --include="*.tsx" 2>/dev/null | grep -v "ErrorMessage" | wc -l | tr -d ' ')
if [ "$CUSTOM_ERROR" -eq 0 ]; then
    echo "✅ PASS: All error states use ErrorMessage"
    ((PASSED++))
else
    echo "❌ FAIL: Found $CUSTOM_ERROR custom error UI patterns"
    ((ERRORS++))
fi
echo ""

# Rule 5: Check Component Sizes
echo "📋 Rule 5: Component Size Limits"
echo "Checking for components exceeding 300 lines..."
LARGE_COMPONENTS=$(find frontend/eetmad/src/components/features -name "*.tsx" -type f -exec sh -c 'lines=$(wc -l < "$1"); if [ "$lines" -gt 300 ]; then echo "$lines $1"; fi' _ {} \; 2>/dev/null | wc -l | tr -d ' ')
if [ "$LARGE_COMPONENTS" -eq 0 ]; then
    echo "✅ PASS: All components under size limit"
    ((PASSED++))
else
    echo "❌ FAIL: Found $LARGE_COMPONENTS components exceeding 300 lines"
    find frontend/eetmad/src/components/features -name "*.tsx" -type f -exec sh -c 'lines=$(wc -l < "$1"); if [ "$lines" -gt 300 ]; then echo "  $lines lines: $1"; fi' _ {} \; 2>/dev/null
    ((ERRORS++))
fi
echo ""

# Rule 6: Check Type Safety
echo "📋 Rule 6: Type Safety"
echo "Checking for 'any' types..."
ANY_TYPES=$(grep -r ": any\|as any" frontend/eetmad/src/components/features --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')
if [ "$ANY_TYPES" -eq 0 ]; then
    echo "✅ PASS: No 'any' types found"
    ((PASSED++))
else
    echo "⚠️  WARN: Found $ANY_TYPES 'any' type usages"
    ((WARNINGS++))
fi
echo ""

# Summary
echo "========================================"
echo "📊 Verification Summary"
echo "========================================"
echo "✅ Passed: $PASSED rules"
echo "❌ Failed: $ERRORS rules"
echo "⚠️  Warnings: $WARNINGS rules"
echo ""

TOTAL_RULES=6
SCORE=$((PASSED * 100 / TOTAL_RULES))

if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo "🎉 Status: ✅ APPROVED - All rules passed!"
    echo "📈 Score: $SCORE% (Perfect)"
    exit 0
elif [ "$ERRORS" -eq 0 ]; then
    echo "⚠️  Status: ⚠️ CONDITIONAL - Warnings found"
    echo "📈 Score: $SCORE% (Good)"
    exit 0
else
    echo "❌ Status: ❌ REJECTED - Critical violations found"
    echo "📈 Score: $SCORE% (Needs Improvement)"
    echo ""
    echo "🔧 Required Actions:"
    echo "  1. Fix all failed rules"
    echo "  2. Address all warnings"
    echo "  3. Re-run verification"
    exit 1
fi

