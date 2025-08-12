# Deployment Guide

This project is configured for static hosting on GitHub Pages, Cloudflare Pages, Netlify, or any static hosting service.

## Quick Deploy

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. The GitHub Action will automatically build and deploy

### Cloudflare Pages
1. Connect your GitHub repository to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Manual Deploy
1. Run `npm run build`
2. Upload the `dist/` folder contents to your hosting service
3. Ensure your hosting service serves `index.html` for all routes (SPA routing)

## Build Output

The production build creates:
- `dist/index.html` - Main HTML file with relative asset paths
- `dist/assets/` - CSS and JS bundles
- `dist/404.html` - GitHub Pages SPA routing fallback

## Configuration

- **Base path**: Configured for relative paths (`./`) to work anywhere
- **SPA routing**: Includes GitHub Pages SPA routing script
- **Bundle splitting**: Vendor libraries separated for better caching
- **Asset optimization**: CSS and JS are minified and optimized

## Testing Locally

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to test the production build locally.