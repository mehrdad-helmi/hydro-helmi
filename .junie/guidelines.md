Project: hydro-helmi — Development Guidelines for Advanced Contributors

This document captures project-specific knowledge to speed up onboarding and
reduce friction during development. It assumes familiarity with React, Vite,
TypeScript, and modern frontend tooling.

1) Build & Configuration

- Toolchain
	- Vite 7 (React SWC plugin) is used to serve and build the app.
	- TypeScript 5 with project references: tsconfig.json references
		tsconfig.app.json and tsconfig.node.json.
	- Tailwind CSS v4 with @tailwindcss/vite plugin.
	- React 19 + react-dom 19.
	- Shadcn/ui components are included as a design system foundation.

- Vite configuration highlights (vite.config.ts)
	- Dev server runs on port 4242.
	- Alias: @ resolves to ./src.
	- Plugins: @vitejs/plugin-react-swc and @tailwindcss/vite.

- Build scripts (package.json)
	- dev: vite
	- build: tsc -b && vite build
		- Note: tsc -b validates types per project references; noEmit is true for
			app build; Vite does the bundling.
	- preview: vite preview
	- lint: eslint .

- Node / npm requirements
	- Use Node 18+ (recommended Node 20+) to ensure built-in test runner support
		and modern ESM features.
	- Package type is module, so ESM import/export is expected everywhere (no
		CommonJS).

- Path aliases & TS config
	- @/* -> ./src/* configured via tsconfig paths and Vite alias.
	- tsconfig.app.json uses bundler resolution and react-jsx; noEmit; strict mode
		with several additional checks enabled (noUnused*,
		noFallthroughCasesInSwitch, noUncheckedSideEffectImports,
		erasableSyntaxOnly).
	- tsconfig.node.json covers node-side TS (currently vite.config.ts), same
		strictness.

- Tailwind CSS v4 specifics
	- The project uses Tailwind 4 with the Vite plugin. There is no
		tailwind.config.js by default; Tailwind 4 relies on @tailwindcss/vite and
		CSS entry files. Check src/styles/*.css imports in src/main.tsx for layer
		order and customizations.

2) Linting & Code Style

- ESLint is configured with:
	- typescript-eslint recommendedTypeChecked + stylisticTypeChecked (via flat
		config).
	- react-refresh (Vite), react-hooks, react-x and react-dom plugins.
	- Prettier is included via eslint-config-prettier to disable conflicting
		stylistic rules. Use Prettier 3 formatting conventions.
- Key TS strictness is enabled; address unused variables/params and fallthrough
	cases promptly. Prefer explicit types where inference reduces clarity under
	strict mode.
- use the components in components/ui if possible(like Button, Input)

3) Project Conventions & Tips

- Imports & Aliases
	- Prefer alias-based imports: import { X } from '@/path/to/module'; Avoid
		complex relative paths.
- Styling
	- Tailwind-first styling. src/styles includes fonts.css, index.css,
		typography.css; main.tsx imports these. Maintain import order to avoid
		specificity issues.
	- It's a Persian language project; ensure RTL support and appropriate font
		usage.
- React
	- React 19 with SWC transform. Prefer function components and hooks; ensure
		hooks rules (react-hooks plugin) are respected.
- Build/Preview
	- Local dev: npm run dev (serves on http://localhost:4242)
	- Production build: npm run build; preview locally with npm run preview.
- Performance & DX
	- Keep bundle-size in check; code-split via dynamic import if views grow.
	- Ensure third-party libraries are ESM-compatible due to type: module.
