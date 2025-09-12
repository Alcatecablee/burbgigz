# Vite + React (TypeScript) + shadcn/ui App

A modern, production‑ready single‑page application built with Vite, React 18, TypeScript, Tailwind CSS, and shadcn/ui (Radix UI). It implements a small business IT services site with pages for Home, Blog, Blog Post, Remote Support, Pricing, Booking, and Service Areas.

## Tech Stack
- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 with custom design tokens (HSL CSS variables) and @tailwindcss/typography
- shadcn/ui components (Radix UI primitives)
- React Router v6 for routing
- TanStack Query (React Query) setup
- Lucide icons

## Getting Started

Prerequisites:
- Node.js 18+ (LTS recommended)

Install dependencies (choose one):
- npm: `npm i`
- pnpm: `pnpm i`
- bun: `bun install`

Run dev server:
- `npm run dev` and open http://localhost:8080/

Type check & lint:
- Lint: `npm run lint`

Build & preview production build:
- Build: `npm run build`
- Preview: `npm run preview` (serves dist/)

## Project Structure
```
.
├─ src/
│  ├─ components/
│  │  ├─ ui/                  # shadcn/ui components (Radix wrappers)
│  │  ├─ Header.tsx, Footer.tsx, Hero.tsx, ...
│  │  └─ StickyCta.tsx
│  ├─ pages/                   # Route components
│  │  ├─ Index.tsx             # Home
│  │  ├─ Blog.tsx              # Blog index
│  │  ├─ BlogPost.tsx          # Blog article
│  │  ├─ Remote.tsx            # Remote support
│  │  ├─ Pricing.tsx           # Pricing calculators
│  │  ├─ Booking.tsx           # Simple booking form (client‑side)
│  │  ├─ Areas.tsx             # Service areas
│  │  └─ NotFound.tsx
│  ├─ data/
│  │  └─ blog.ts               # Example blog content
│  ├─ hooks/
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts          # Toast state; see notes below
│  ├─ lib/
│  │  └─ utils.ts
│  ├─ main.tsx                 # React root
│  ├─ App.tsx                  # Router + providers
│  ├─ index.css                # Tailwind + design tokens
│  └─ App.css
├─ public/                     # Static assets
├─ tailwind.config.ts
├─ vite.config.ts              # Port 8080, @ alias → ./src
├─ tsconfig*.json
└─ package.json
```

## Routing
Routes are defined in src/App.tsx using React Router:
- `/` → Home (src/pages/Index.tsx)
- `/blog` → Blog index (tag filter, reading time)
- `/blog/:slug` → Blog article (prev/next, share, basic renderer)
- `/remote` → Remote Support (RustDesk instructions, meta tags)
- `/pricing` → Upgrade + callout cost estimators
- `/booking` → Client‑side booking helper (WhatsApp/email handoff)
- `/areas` → Service areas
- `*` → NotFound

## UI, Styling, and Theming
- Tailwind configured with HSL CSS variables for light/dark and brand tokens: see src/index.css and tailwind.config.ts (colors, gradients, shadows, sidebar tokens, animations).
- shadcn/ui components live under src/components/ui and wrap Radix primitives with Tailwind classes.
- Dark mode is class‑based (add/remove .dark on <html> or <body>). The project does not mount next-themes by default.

## Toasts and Notifications
Two toast systems are included but not mounted at the app root by default to avoid provider/hook issues in some environments:
- Radix Toast (src/components/ui/toast.tsx + src/components/ui/toaster.tsx)
- Sonner (src/components/ui/sonner.tsx) which expects a theme provider from next-themes

To enable Radix Toast globally:
1) Import and render <Toaster /> from src/components/ui/toaster in src/App.tsx within providers.

To enable Sonner with theme support:
1) Install and wrap the app with ThemeProvider from next-themes at the root.
2) Import and render <Toaster /> from src/components/ui/sonner.

## Data and State
- Example blog content in src/data/blog.ts. Replace with your CMS or API.
- TanStack Query is initialized (src/App.tsx) for future data fetching and caching.

## Vite Config and Aliases
- Vite dev server runs on port 8080 (vite.config.ts).
- Path alias @ maps to ./src (e.g., import { Button } from "@/components/ui/button").

## Accessibility and SEO
- Semantic headings, focusable controls, label associations in forms.
- Remote page sets document.title and key meta tags at runtime.
- Consider adding route‑level meta, JSON‑LD, sitemap.xml, and robots.txt (public/robots.txt exists).

## Deployment
This is a static SPA build (dist/). You can deploy to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.). Typical Netlify/Vercel settings:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: enable redirects to index.html ("/*    /index.html   200").

## Common Tasks
- Add a new page: create src/pages/MyPage.tsx and add a <Route> in src/App.tsx.
- Add a new component: place under src/components or src/components/ui for shadcn‑style primitives.
- Add styles: edit src/index.css (design tokens) or use Tailwind utility classes.

## Troubleshooting
- Dev server not visible: the app serves at http://localhost:8080/ (see vite.config.ts). Ensure your preview/proxy points to 8080.
- Duplicate identifier/import errors: ensure each import appears once (e.g., src/pages/Pricing.tsx previously had a duplicate Header import).
- Hook errors like "Cannot read properties of null (reading 'useState'/'useRef')": usually indicates a provider mismatch or multiple React copies. Keep only one React instance, and mount required providers (e.g., next-themes) before components that depend on them. If using Sonner, add ThemeProvider from next-themes.

## Extending
- Booking backend: add persistence (Supabase/Neon + Prisma) for slots/availability and confirmations.
- CMS: replace src/data/blog.ts with a headless CMS.
- PWA: add a manifest and service worker for offline support.
- Code splitting: convert route components to lazy‑loaded imports for faster startup.
- Image optimization: use responsive images and modern formats.

## Acknowledgements
- shadcn/ui and Radix UI
- Tailwind CSS
- Lucide Icons
- Vite + SWC React plugin
