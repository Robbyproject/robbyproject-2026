# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Robby Fabian — a Graphic Designer & Front-End Developer. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Features a sidebar-driven layout, dark/light theming, bilingual support (EN/ID), visitor analytics via Supabase, a rule-based chatbot ("Mikoo"), and animated page transitions.

## Commands

```bash
npm run dev       # Start dev server (next dev)
npm run build     # Production build (next build)
npm run start     # Serve production build
npm run lint      # Run ESLint (eslint)
```

No test framework is configured.

## Architecture

### Layout Hierarchy (top → bottom)

1. **`app/layout.tsx`** (Server Component) — Root layout. Loads Inter font, wraps everything in `AnalyticsTracker` → `AppProviders` → `NextTopLoader` → `SystemLayout` → `ContentWrapper`.
2. **`SystemLayout`** — Manages the initial loading/splash screen (shown once per session via `sessionStorage.isVisited`). Once loaded, renders `DashboardLayout`.
3. **`DashboardLayout`** — Fixed `Sidebar` on the left (w-64), scrollable main content area on the right. Handles scroll-to-top on route change, a sticky progress bar (Framer Motion spring), and a floating back-to-top button.
4. **`FrozenRoute`** — Freezes the Next.js `LayoutRouterContext` during transitions to prevent layout shift during AnimatePresence exit animations.

### Navigation Model

- **Sidebar** (`components/layout/Sidebar.tsx`) is the sole navigation. It supports three item types: `page` (hard navigation via `window.location.href`), `scroll` (smooth scroll to element ID on homepage), and `dropdown` (collapsible sub-menu for Entertainment → Anime/Waifu).
- There is no top Navbar used in the main layout.

### State & Providers

- **`AppProviders`** wraps `ThemeProvider` (next-themes, class-based, default dark) and a custom `LanguageContext` (EN/ID toggle, persisted in `sessionStorage`). Access via `useLanguage()` hook which returns `{ lang, toggleLang, t }` where `t` is the current translation object.
- **Supabase** client is a singleton at `lib/supabase.ts`, exported as `supabase`. Used for analytics (`app_visits` table) and data storage.

### Bilingual System

- All UI text lives in `data/locales.ts` — a typed `translations` object keyed by language code (`en` / `id`), with a `TranslationKeys` interface for type-safe access.
- Components access text via `const { t } = useLanguage()` and use keys like `t.nav_home`.

### Styling

- **Tailwind CSS 3** with class-based dark mode (`darkMode: 'class'`).
- Color palette: zinc-based neutrals, cyan-500 as the primary accent.
- `cn()` utility in `lib/utils.ts` (clsx + tailwind-merge) for conditional class composition.
- Custom scrollbar styles injected via `<style jsx global>` in Sidebar.

### File Organization

```
app/                    # Next.js App Router pages (page.tsx per route)
app/api/chat/           # POST route for Mikoo chatbot (rule-based, no AI)
components/layout/      # SystemLayout, Sidebar, FrozenRoute, LoadingScreen, SplashScreen
components/sections/    # Page-level content sections (Hero, About, Gallery, etc.)
components/features/    # Standalone features (ChatBot, AnalyticsTracker, BackgroundMusic, LockScreen)
components/providers/   # AppProviders (theme + language context)
components/ui/          # Reusable UI primitives (TextEffects, Spotlight, ImageLightbox, etc.)
components/home/        # HomeClient
components/pdf/         # ResumePDF (react-pdf)
data/                   # Static data: locales.ts (translations + TranslationKeys), index.ts (bot data, gallery items + types)
lib/                    # supabase.ts client, utils.ts (cn utility)
utils/                  # helpers.ts (playSound, scrollToId)
```

### Key Patterns

- **Full TypeScript**: All source files are `.ts` or `.tsx`. The project has `strict: false` in tsconfig. Framer Motion variant objects need `as const` on `ease` string values (e.g., `ease: "easeOut" as const`) to prevent type widening.
- **"use client"** is on nearly all components — this is a heavily client-rendered app. The root layout is the only server component.
- **Page navigation uses `window.location.href`** (hard refresh) instead of Next.js `<Link>` or `router.push()`. This is intentional to reset all state on page change.
- **Animations**: Framer Motion for page transitions (blur + fade + slide), AnimatePresence for mount/unmount, and anime.js for some section animations.
- **Images**: All portfolio images are hosted on Supabase Storage (`cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/`).

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
```

## ESLint

Uses `next/core-web-vitals` config via flat config (`eslint.config.mjs`). No custom rules.
