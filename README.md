# Vielorine - Mystical Tarot Website

A beautiful, mystical tarot reading website built with Next.js 14, TypeScript, and Tailwind CSS.

## Deployment Options

### Option 1: Netlify (Recommended)
1. Push this folder to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repo
5. Netlify will auto-detect settings from `netlify.toml`
6. Click "Deploy"

### Option 2: Cloudflare Pages
1. Push this folder to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Create a new project and connect your GitHub repo
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version: 18
5. Deploy

### Option 3: Hostinger (Static Files)
1. Run locally first:
   ```bash
   npm install
   npm run build
   ```
2. This creates an `out` folder with static files
3. Upload the contents of `out` folder to Hostinger via File Manager or FTP

### Option 4: Vercel
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo - Vercel auto-detects Next.js
4. Deploy

## Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Build for Production
```bash
npm run build
```
Static files will be in the `out` directory.

## Tech Stack
- Next.js 14 (Static Export)
- TypeScript
- Tailwind CSS
- GSAP (animations)
- Lucide Icons

## Features
- Responsive design
- Custom cursor
- Animated zodiac wheel
- Interactive Tree of Life
- Tarot card trail effect
- Floating WhatsApp/Call buttons

---
Designed & Developed by [LaunchPixel](https://launchpixel.in)
