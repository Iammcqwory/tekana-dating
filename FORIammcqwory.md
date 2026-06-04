# 🚀 Tekana Dating Platform — The Astro Shift

## What Just Happened?

We just migrated the **Tekana Dating Platform** from **Next.js** to **Astro** — a framework that takes a fundamentally different approach to building websites. Think of it like this: if Next.js is a Swiss Army Knife that does everything (server rendering, static generation, API routes, image optimization), Astro is a laser-focused scalpel that does one thing brilliantly: **ship less JavaScript to the browser**.

This document is your complete guide to understanding what we built, *why* we built it this way, and the engineering wisdom you can carry into every future project.

---

## 🏗️ Technical Architecture

### The "Islands Architecture" — Astro's Superpower

Astro uses something called **Islands Architecture**. Here's the analogy:

Imagine a newspaper page. Most of it is static — headlines, text, images — it doesn't need JavaScript. But there's a small interactive widget on the side (like a live stock ticker or a poll). In the old world (Next.js), the *entire newspaper page* would ship as a JavaScript application, even though 90% of it is just text and images.

Astro flips this: the newspaper page is rendered as **pure HTML** (zero JavaScript), and only the interactive bits (the "islands") get JavaScript hydrated on the client.

```
┌─────────────────────────────────────┐
│  Static HTML (Astro renders this)   │
│  ┌───────────┐   ┌───────────────┐  │
│  │ 🏝️ React  │   │ 🏝️ React     │  │
│  │ Navbar    │   │ AI Wingman   │  │
│  │ Island    │   │ Island       │  │
│  └───────────┘   └───────────────┘  │
│                                     │
│  Pure HTML content (0 JS shipped)   │
│  Hero section, features, pricing... │
│                                     │
│  ┌───────────┐                      │
│  │ 🏝️ React  │                      │
│  │ Footer    │                      │
│  │ Island    │                      │
│  └───────────┘                      │
└─────────────────────────────────────┘
```

### How Our Code Maps to This

```
tekana-dating/
├── astro.config.mjs         # 🎯 Astro's brain — configures React + Tailwind
├── tsconfig.json             # 🔧 TypeScript config (extends Astro's strict preset)
├── tailwind.config.ts        # 🎨 Design token system (shadcn/ui compatible)
├── package.json              # 📦 Dependencies (no Next.js!)
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro      # 🏠 Master layout — HTML shell, <head>, theme, etc.
│   │
│   ├── pages/                # 📄 File-based routing (like Next.js app/ dir)
│   │   ├── index.astro       # Homepage — mostly static HTML (fast!)
│   │   ├── community.astro   # Community hub — static HTML
│   │   ├── premium.astro     # Pricing page — static HTML
│   │   ├── rewards.astro     # Gamification — static HTML
│   │   ├── discover.astro    # Wraps <DiscoverPage /> React island
│   │   ├── profile.astro     # Wraps <ProfilePage /> React island
│   │   ├── settings.astro    # Wraps <SettingsPage /> React island
│   │   ├── onboarding.astro  # Wraps <OnboardingPage /> React island
│   │   ├── auth/
│   │   │   ├── login.astro   # Wraps <LoginForm /> React island
│   │   │   └── register.astro
│   │   ├── events/
│   │   │   ├── index.astro   # Wraps <EventsPage /> React island
│   │   │   └── [id].astro    # Dynamic route with getStaticPaths()
│   │   └── messages/
│   │       ├── index.astro   # Wraps <MessagesPage /> React island
│   │       └── [id].astro    # Dynamic route with getStaticPaths()
│   │
│   ├── components/           # ⚛️ React components (unchanged from Next.js!)
│   │   ├── ui/               # shadcn/ui primitives (Button, Card, Dialog, etc.)
│   │   ├── site/             # Navbar, Footer
│   │   ├── auth/             # LoginForm, RegisterForm
│   │   ├── discover/         # DiscoverPage
│   │   ├── events/           # EventsPage, EventDetailsPage
│   │   ├── messages/         # MessagesPage, MessageDetailPage
│   │   ├── profile/          # ProfilePage, ProfileCard, EditProfileDialog
│   │   ├── onboarding/       # OnboardingPage
│   │   ├── settings/         # SettingsPage
│   │   ├── ai/               # AIWingman (floating chat widget)
│   │   └── providers/        # ThemeProvider (next-themes)
│   │
│   ├── lib/
│   │   └── utils.ts          # cn() utility (clsx + tailwind-merge)
│   │
│   └── styles/
│       └── globals.css       # Tailwind + shadcn/ui CSS variables
│
└── netlify.toml              # Deployment config
```

### The Two Types of Pages

We have two distinct patterns:

**1. Static Pages** (index, community, premium, rewards):
These pages are written entirely in Astro's `.astro` syntax — they render to pure HTML with zero client-side JavaScript (except for the Navbar and Footer islands). They're **blazingly fast** because there's nothing to download, parse, or execute.

**2. Interactive Pages** (discover, messages, profile, settings, etc.):
These pages use the Astro wrapper pattern — a thin `.astro` shell that imports a full React component with `client:load`. The React component becomes an "island" that hydrates on the client.

```astro
---
import Layout from "../layouts/Layout.astro";
import { Navbar } from "../components/site/navbar";
import { DiscoverPage } from "../components/discover/discover-page";
---

<Layout title="Discover | Tekana">
  <Navbar client:load />        <!-- 🏝️ React island -->
  <DiscoverPage client:load />  <!-- 🏝️ React island -->
</Layout>
```

The `client:load` directive tells Astro: "This component needs JavaScript — hydrate it immediately when the page loads."

---

## 🔧 Technologies Used & Why

| Technology | What It Does | Why We Chose It |
|---|---|---|
| **Astro 6** | Static site generator with islands | Ships minimal JS, perfect for content-heavy pages |
| **React 18** | UI component library | We already had components from Next.js; Astro supports React islands natively |
| **@astrojs/react** | Astro-React integration | Enables `client:load` hydration for React components inside .astro pages |
| **Tailwind CSS 3** | Utility-first CSS | Fast styling, consistent design tokens, pairs perfectly with shadcn/ui |
| **shadcn/ui** | Component library built on Radix | Accessible, customizable, beautiful UI primitives (Button, Card, Dialog, etc.) |
| **next-themes** | Theme switcher (light/dark) | Despite the name, it's framework-agnostic — works in any React context |
| **Sonner** | Toast notification library | Clean, minimal toast UI for success/error feedback |
| **React Hook Form + Zod** | Form handling + validation | Type-safe form validation with excellent DX |
| **Lucide React** | Icon library | Tree-shakable SVG icons (only ships what you use) |
| **date-fns** | Date formatting | Lightweight alternative to Moment.js |

---

## 🧠 Key Design Decisions

### 1. Why Migrate to Astro?

**The problem with Next.js for this project:** Next.js ships a full React runtime to every page, even pages that are mostly static content. For a dating platform where the homepage, pricing page, community hub, and rewards page are essentially marketing/content pages, this is overkill.

**The Astro advantage:** Those four pages now ship as **pure HTML** — no React, no hydration, no JavaScript bundle. The result? Faster load times, better SEO, better Core Web Vitals scores, and happier users on slow connections (critical for a Kenyan-market dating app where mobile networks vary).

### 2. Why Keep React Components?

We could have rewritten everything in Astro's native syntax, but that would have been a waste of working code. Instead, we kept the React components as-is and wrapped them in Astro's island architecture. This is the beauty of Astro — it's **incrementally adoptable**. You don't have to throw away your React code.

### 3. Why `next-themes` Still Works

This is a common misconception. The `next-themes` package is named after Next.js, but it's actually a standalone React library that:
- Reads/writes to `localStorage`
- Toggles a CSS class on `<html>`
- Has zero Next.js dependencies

Since our React components run inside Astro islands, `next-themes` works perfectly. No changes needed.

### 4. Path Aliases (`@/components/...`)

The shadcn/ui components all import using `@/components/ui/button` style paths. In Next.js, this was handled by `tsconfig.json` paths. In Astro, we needed to add **both**:
- `tsconfig.json` → `"paths": { "@/*": ["./src/*"] }` (for TypeScript intellisense)
- `astro.config.mjs` → Vite `resolve.alias` (for the actual bundler resolution)

This dual configuration is a common gotcha when migrating to Astro.

### 5. Static vs. Dynamic Routes

For dynamic routes like `/events/[id]` and `/messages/[id]`, Astro (in static mode) requires `getStaticPaths()` to know which pages to pre-render at build time. We hardcoded the IDs for now (matching the mock data), but in production you'd fetch these from an API.

---

## 🐛 Bugs We Ran Into & How We Fixed Them

### Bug 1: Broken CSS After Deleting `src/app`

**What happened:** The `Layout.astro` was importing CSS from `../app/globals.css`. When we deleted the `src/app` directory (Next.js app router), the CSS import broke.

**Fix:** Moved `globals.css` to `src/styles/globals.css` and updated the import.

**Lesson:** When deleting old framework directories during a migration, always search for imports pointing to those directories first. A simple `grep` for the directory name would have caught this.

### Bug 2: Missing Vite Alias for `@/` Paths

**What happened:** Components using `@/components/ui/button` imports would fail because Astro's Vite bundler didn't know about the `@` alias.

**Fix:** Added a `vite.resolve.alias` section to `astro.config.mjs`.

**Lesson:** `tsconfig.json` paths only help TypeScript understand imports — they don't tell the bundler how to resolve them. In Vite-based tools (Astro, Vite itself), you need to configure aliases in the Vite config too.

### Bug 3: `"use client"` Directives

**What happened:** React components had `"use client"` at the top (a Next.js directive).

**Fix:** These are harmless in Astro — they're just a string literal and get ignored. We left them in place for compatibility.

**Lesson:** Not every "leftover" needs to be cleaned up. `"use client"` is a no-op outside Next.js and won't cause errors. Prioritize real bugs over cosmetic cleanup.

---

## 📚 Lessons & Best Practices

### 1. **Migration Strategy: Wrap, Don't Rewrite**

The smartest migration strategy is to keep working components and wrap them in the new framework's patterns. We didn't rewrite a single React component — we just wrapped them in `.astro` pages with `client:load`. This cut migration time from days to hours.

### 2. **Framework Choice Matters More Than You Think**

Next.js is amazing for full-stack apps with server-side logic, API routes, and dynamic data. But for a content-heavy site with some interactive widgets (which is what most "apps" really are), Astro's islands architecture is a better fit. **Choose the right tool for the job, not the most popular one.**

### 3. **The `client:*` Directives Are Your Performance Knobs**

Astro gives you fine-grained control over when components hydrate:
- `client:load` — Hydrate immediately (for critical interactive elements)
- `client:visible` — Hydrate when the component scrolls into view (for below-the-fold content)
- `client:idle` — Hydrate when the browser is idle (for non-critical interactivity)
- `client:only="react"` — Only render on the client, skip SSR entirely

We used `client:load` everywhere for simplicity, but in production you'd optimize by using `client:visible` for the Footer and `client:idle` for the AI Wingman.

### 4. **How Good Engineers Think About Migrations**

Good engineers treat migrations like surgery:
1. **Understand the anatomy first** — Map every file, every import, every dependency before making a single change.
2. **Cut the smallest incision** — Change only what's necessary. Don't refactor components while migrating frameworks.
3. **Verify after each step** — Build after each major change, not just at the end.
4. **Leave clear breadcrumbs** — Write documentation (like this file) so future-you doesn't wonder "why did we do this?"

### 5. **Design Systems Are Framework-Agnostic**

Notice how we kept shadcn/ui components working across the framework migration? That's because shadcn/ui is built on:
- CSS variables (framework-agnostic)
- Radix primitives (React, but portable)
- Tailwind utilities (works with any bundler)

**Build your design system on standards, not frameworks.** CSS variables, semantic HTML, and headless UI patterns survive framework changes.

---

## 🗺️ Project Summary

**Tekana** is a dating platform designed for the Kenyan market. It features:
- 🏠 **Landing page** with hero, stats, features, and testimonials
- 🔍 **Discover** — swipe-style partner browsing with compatibility matching
- 💬 **Messages** — real-time chat interface with conversations
- 📅 **Events** — in-person and virtual dating events (Nairobi-focused)
- 👤 **Profile** — detailed user profiles with photos and preferences
- 🏆 **Rewards** — "Zenith Points" gamification system with daily quests
- 💎 **Premium** — 3-tier pricing (Silver/Gold/Platinum in KSH)
- 🌍 **Community** — forums, groups, and success stories
- 🤖 **AI Wingman** — floating AI chat assistant for dating advice
- ⚙️ **Settings** — account, notification, and privacy management
- 🎯 **Onboarding** — profile setup wizard

**Tech Stack:** Astro 6 + React 18 + Tailwind CSS + shadcn/ui  
**Design:** Dark mode default, rose/pink brand colors, responsive mobile-first  
**Target:** Kenya (Nairobi, Mombasa, Kisumu) with M-Pesa payment support

---

*Written with 💜 as a learning guide. Every project is a lesson — make sure you capture what you learned.*
