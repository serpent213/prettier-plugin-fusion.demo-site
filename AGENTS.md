# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/index.astro`: Landing page with the Fusion formatter UI.
- `src/layouts/Layout.astro`: Base HTML shell, loads Plausible and shared head elements.
- `src/scripts/`: Frontend helpers (`playground.ts` for formatting, `plausible.ts` for analytics).
- `src/styles/global.css`: Lightweight global styles (single theme, no Tailwind runtime).
- `public/`: Static assets such as `favicon.svg`.

## Build, Test, and Development Commands
- `npm run dev`: Start Astro dev server (Vite) with live reload.
- `npm run build`: Produce static site into `dist/`.
- `npm run preview`: Serve the production build locally.
- `npm run format` / `npm run format:fix`: Prettier check or autofix.
- `npm run lint` / `npm run lint:fix`: ESLint check or autofix.
- `npm run check`: Runs format check, lint, and `astro check` for type/route validation.

## Coding Style & Naming Conventions
- Use TypeScript where possible; prefer explicit types for DOM queries and async handlers.
- Formatting: Prettier 3 with project plugins (Astro, Tailwind, Svelte). Two-space indentation, single quotes in scripts.
- Avoid inline comments unless they clarify non-obvious behavior. Use descriptive variable names; avoid one-letter identifiers.
- Keep styles scoped within components when possible; shared base rules belong in `src/styles/global.css`.

## Testing Guidelines
- No dedicated test suite is present. If adding tests, follow Astro/Vite conventions and colocate near the feature.
- For UI behavior, prefer small, focused checks (e.g., Playwright) and document how to run them.

## Commit & Pull Request Guidelines
- Commits should be concise and action-oriented (e.g., `fix: debounce fusion formatter` or `chore: update plausible import`).
- Pull requests should describe intent, list key changes, and mention build/lint status. Add screenshots/GIFs for UI updates.
- Link related issues and note any follow-up TODOs or limitations.

## Agent-Specific Tips
- Respect Vite bundling: import browser dependencies through `?url` when needed so dev and build both resolve.
- Keep the page single-theme and minimal; avoid reintroducing unused Tailwind or theme toggles.
