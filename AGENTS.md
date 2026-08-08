# Laravel & Inertia React Starter Agent Guidelines

Use these rules to avoid common codebase errors and check code correctly.

## Essential Commands

Always run these verification commands before final checks.

### PHP (Backend)
- **Code Formatter**: `vendor/bin/pint --format agent` (automatically fixes dirty PHP files)
- **Linter Check**: `composer lint:check` (checks formatting via pint)
- **Static Analysis (Types)**: `composer types:check` (runs `phpstan analyse`)
- **Tests**: `php artisan test --compact` (runs Pest tests)
- **Route generation**: `php artisan wayfinder:generate` (updates TypeScript route/controller actions)

### JS/TS (Frontend)
- **Build**: `npm run build`
- **Dev Server**: `npm run dev`
- **Formatter**: `npm run format`
- **Formatter Check**: `npm run format:check`
- **Linter**: `npm run lint` (runs `eslint . --fix`)
- **Linter Check**: `npm run lint:check`
- **Type Check**: `npm run types:check` (runs `tsc --noEmit`)

## Project Structure & Conventions

- **Frontend Pages**: Located in `resources/js/pages/`.
- **Backend Controllers**: Located in `app/Http/Controllers/`.
- **Ecosystem**: Laravel 13, React 19, Inertia.js v3, Tailwind CSS v4, PHP 8.3, Pest 4.
- **Route Binding**: Use Laravel Wayfinder functions under `@/actions/` or `@/routes/` for UI connections. Run `php artisan wayfinder:generate` if routes change.
- **Testing**: Built with Pest. Create feature tests with `php artisan make:test --pest <Name>Test` (skip the directory prefix `Feature/`).
- **PHP Conventions**: Use strict typing and constructor property promotion. Ensure curly braces are used for all control flows.

## Core Gotchas

- **Vite Manifest Errors**: If "Unable to locate file in Vite manifest" occurs, execute `npm run build` or start `npm run dev`.
- **Pint Formatter**: Always run `vendor/bin/pint --format agent` after altering PHP files.
- **TypeScript Import Order**: Ensure `@inertiajs/react` and framework/library imports (e.g. `dayjs`, `lucide-react`) are ordered before `react` imports to satisfy ESLint.
- **Wayfinder Generation**: Frontend routes are generated dynamically. Update them using `php artisan wayfinder:generate`.
