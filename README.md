# Kessler & Vayne Industries

A cyberpunk-themed e-commerce site with hidden CTF puzzles, built as a 100% client-side React application.

## Development

```bash
npm install
npm run dev
```

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS with cyberpunk theme
- **Storage**: LocalStorage with light obfuscation
- **Routing**: React Router
- **No server required** - runs entirely in the browser

## Project Structure

```
src/
├── pages/          # Route components (Shop, About, Balance, Settings)
├── components/     # Reusable UI components
├── lib/           # Utilities (storage, crypto, rng, puzzle)
└── data/          # Static data (products.json)
```

## Features

- **ConvergenceLedger Account**: Fake cryptocurrency balance system
- **ImpulseCast Ordering**: Simulated purchase flow with future delivery dates
- **Hidden CTF Puzzles**: Multi-step challenges for curious users
- **Cyberpunk Aesthetic**: Mail-order catalog styling with neon accents

## M1 Status: ✅ Complete

- [x] Project setup with Vite + React + TypeScript
- [x] Tailwind CSS with cyberpunk theme
- [x] Routing system (Shop, About, Balance, Settings)
- [x] Base layout with header and footer
- [x] Storage system with `kv_` prefixed keys
- [x] Crypto module for credential hashing
- [x] Balance page with account binding
- [x] Settings page with data clearing

Ready for M2: Shop Grid & Promo implementation.
```
