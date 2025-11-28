\*\*Build frontend pages and components

following ALL guidelines, rules, and examples in `docs/build-prompt.md`\*\*

## Critical Rules:

1. ✅ Use `cssVars` from `@/styles/theme` - NEVER hardcode colors
2. ✅ Use `useTranslations` from `next-intl` - NEVER hardcode text
3. ✅ Use types from `@/lib/types` - NEVER create inline types
4. ✅ Match API endpoints from `docs/docs/endpoints.md` exactly
5. ✅ Match design style from `docs/design-sample.md` exactly
6. ✅ Use mock data from `frontend/eetmad/src/mocks/data/` for testing NEVER create file mock data in the project, use the file in the mocks folder
7. ✅ Add translations to `frontend/eetmad/messages/en.json` and `frontend/eetmad/messages/ar.json`

## Translation Guidelines:

-   **ALWAYS** check `frontend/eetmad/messages/en.json` and `frontend/eetmad/messages/ar.json` for existing translation keys
-   **ALWAYS** add missing translation keys to BOTH files (English and Arabic)
-   Use proper namespaces: `pages.{feature}`, `common`, `nav`, etc.
-   Never hardcode any text - use `useTranslations('namespace')` hook

## Mock Data Guidelines:

-   Mock data is located in `frontend/eetmad/src/mocks/data/`
-   API functions automatically fallback to mock data in development mode
-   When building new features, create mock data files matching the type structure
-   Update `frontend/eetmad/src/mocks/handlers.ts` to add MSW handlers for new endpoints
-   Mock data should be realistic and match the actual API response structure

**Read `docs/build-prompt.md` for complete instructions before building anything.**
