# Conteful MVP Architecture

## Goal
Build a Contentful-like CMS admin MVP with Nuxt 4, TypeScript, Tailwind CSS, and mock-first server routes. The product focuses on schema management, entry editing, media metadata, and API-ready shapes rather than production persistence.

## Primary User Flows
1. Admin creates a content model in `/models/new`.
2. Editors create entries from the selected model in `/entries/new`.
3. Editors register mock media in `/media/new` and reference it from entry fields.
4. API consumers inspect token and endpoint examples in `/api-settings`.
5. Delivery endpoints expose published content under `/api/v1/content/:modelApiId`.

## Frontend Structure
- `src/pages/` contains dashboard, model, entry, media, and API settings screens.
- `src/components/` holds form primitives and model-driven editors such as `ModelForm`, `EntryForm`, and `MediaForm`.
- `src/composables/useCmsAdmin.ts` centralizes repository access and shared option sets.
- `src/repositories/` separates page code from HTTP details so the mock layer can be replaced later.

## Backend Structure
- `src/server/api/v1/admin/*` provides mock CRUD for models, entries, media, tokens, and dashboard aggregation.
- `src/server/api/v1/content/*` and `/api/v1/media/*` provide delivery-style read endpoints.
- `src/server/utils/content-store.ts` keeps an in-memory store backed by initial values from `src/mocks/mock-data.ts`.
- `src/server/utils/api-response.ts` normalizes list, item, and mutation responses.

## Data Model
Shared types live in `src/types/index.ts`. The core entities are:
- `ContentModel` for schema definitions and API metadata
- `ContentEntry` for model-driven content records
- `MediaItem` for upload-mock metadata
- `ApiToken` for mocked delivery and management access

## Notes
- Persistence is intentionally in-memory for the MVP; restarting the server resets mutations.
- The draw.io MCP tool was not exposed in this session, so `docs/conteful-mvp.drawio` is stored as native draw.io XML for direct opening in draw.io.
