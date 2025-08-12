# AGENTS.md - Development Guidelines

## Build/Test Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (when configured)
- `npm run type-check` - Run TypeScript compiler check
- `npm test` - Run all tests (when configured)
- `npm test -- --run` - Run tests once (no watch mode)
- `npm test -- <pattern>` - Run specific test file/pattern

## Tech Stack
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS (utility + tokens)
- **Storage**: LocalStorage + IndexedDB cache
- **No server required** - 100% browser-local

## Code Style
- **Imports**: Absolute imports from `/src`, group by: React, libraries, local components, utils
- **Components**: PascalCase, functional components with TypeScript interfaces
- **Files**: kebab-case for files, PascalCase for components (e.g., `product-card.tsx` exports `ProductCard`)
- **Types**: Interfaces over types, prefix with `I` if needed for clarity
- **Functions**: camelCase, pure functions preferred, async/await over promises
- **Constants**: SCREAMING_SNAKE_CASE for module-level constants
- **LocalStorage**: All keys prefixed with `kv_`, use helper functions from `/src/lib/storage.ts`
- **Error Handling**: Try/catch for async operations, graceful fallbacks for storage operations
- **Naming**: Use domain terms from PRD (GhostMark, SpecterID, ImpulseCast, ConvergenceLedger, etc.)

## Deployment
- **Static hosting ready**: Configured for GitHub Pages, Cloudflare, Netlify
- **Build command**: `npm run build` (outputs to `dist/`)
- **SPA routing**: Includes GitHub Pages routing fallback
- **Relative paths**: Uses `./` base for universal hosting compatibility

## Security Notes
- Ask about running a security review when we complete a major milestone.