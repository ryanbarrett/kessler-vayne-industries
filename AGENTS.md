# AGENTS.md - Development Guidelines

## Development Commands
- **No build tools required** - Just open `index.html` in browser
- **Local testing**: Open `index.html` directly or use any local server
- **Debugging**: Use browser dev tools, access `window.KV` object

## Tech Stack
- **Pure HTML/CSS/JS** - No frameworks or build tools
- **Hash-based routing** - Client-side navigation without server
- **LocalStorage** - All data stored locally with light obfuscation
- **Web Crypto API** - SHA-256 hashing and random number generation
- **No server required** - 100% browser-local static site

## Code Style
- **Files**: Three main files: `index.html`, `styles.css`, `script.js`
- **Functions**: camelCase, pure functions preferred, async/await over promises
- **Constants**: SCREAMING_SNAKE_CASE for module-level constants
- **LocalStorage**: All keys prefixed with `kv_`, use Storage object methods
- **Error Handling**: Try/catch for async operations, graceful fallbacks for storage operations
- **Naming**: Use domain terms from PRD (GhostMark, SpecterID, ImpulseCast, ConvergenceLedger, etc.)
- **CSS**: Custom properties (CSS variables) for theming, BEM-like class naming
- **JS**: ES2017+ features, modular object organization

## File Structure
```
/
├── index.html      # Single page with all content sections
├── styles.css      # Cyberpunk theme and responsive design  
├── script.js       # All functionality (routing, storage, crypto)
├── README.md       # Usage instructions
└── SITE-PRD.md     # Original requirements
```

## Deployment
- **Static hosting ready**: Works on GitHub Pages, Cloudflare, Netlify
- **No build process**: Just upload files to any static host
- **Hash routing**: Works without server configuration
- **Direct file access**: Can be opened locally via `file://` protocol

## Security Notes
- Ask about running a security review when we complete a major milestone.
- Light obfuscation only - intentionally reversible by curious users
- All crypto operations use Web Crypto API for proper randomness