# Repository Guidelines

## Project Structure & Module Organization
This repository is currently unscaffolded: there is no committed application source, test suite, or package manifest yet. Keep the root minimal and reserve it for shared project files such as `AGENTS.md`, `README.md`, and future config files.

When code is introduced, use a predictable layout:
- `src/` for application code
- `tests/` for integration and end-to-end coverage
- `assets/` for static files such as images or fixtures
- `docs/` for architecture notes, runbooks, and decision records

Prefer grouping modules by feature rather than by file type once the codebase grows.

## Build, Test, and Development Commands
There are no project-specific build or test commands configured as of March 6, 2026. Add new scripts alongside the first runtime you introduce and document them here immediately.

Until then, use lightweight repo checks:
- `ls -la` to verify expected files
- `rg --files` to inspect the tracked layout quickly
- `git status` after Git is initialized to review pending changes

## Coding Style & Naming Conventions
No formatter or linter is configured yet. Until tooling is added, keep files readable and consistent:
- Use 2 spaces for Markdown, YAML, and JSON indentation
- Use descriptive, lowercase directory names such as `src/api`
- Use kebab-case for docs and config files, for example `deploy-notes.md`
- Name tests after the unit under test, for example `auth.service.test.ts`

If a language-specific formatter is introduced, treat its output as authoritative.

## Testing Guidelines
No test framework is present yet. When adding one, require automated coverage for new logic and place tests either in `tests/` or beside the code under `__tests__/`.

Each change should include:
- at least one automated test for new behavior
- a short note in the PR describing how the change was verified

## Commit & Pull Request Guidelines
No local Git history is available in this directory, so no repository-specific commit convention can be inferred yet. Use short imperative subjects and scope commits tightly, for example `docs: add repository guidelines`.

Pull requests should include:
- a clear summary of the change
- linked issue or task, if one exists
- screenshots or terminal output when behavior changes
- testing notes and any follow-up work

## Security & Configuration Tips
Do not commit secrets, API keys, or environment files. Keep machine-specific settings out of version control and document required environment variables once the app is scaffolded.

## Architecture Design Workflow
Use the registered `drawio` MCP server when the task is system design, screen-flow design, API topology design, or data-flow design.

Keep the workflow consistent:
- create or refine the diagram with `drawio` MCP first
- mirror the final decisions in Markdown under `docs/` so the design remains reviewable in Git
- prefer simple architecture, page transition, and entity-relationship diagrams over overly detailed canvases

Local Codex setup command:
- `codex mcp add drawio -- npx @drawio/mcp`
