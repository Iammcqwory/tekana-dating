# 🎓 FORIammcqwory — Tekana Dating Platform

## 🏗️ What This Project Is

Tekana is a **dating platform** built for African dating culture — think Tinder meets African traditions. It's a full web application with:

- A **landing page** with hero, features, testimonials, and CTA sections
- **Discover** page with swipe-style profile browsing
- **Messages** and real-time chat interface
- **Events** listing with community gatherings
- **Community Hub** with interest groups and success stories
- **Premium subscriptions** (Silver, Gold, Platinum) with M-Pesa payment
- **Zenith Rewards** gamification system (daily streaks, achievements, XP)
- **AI Wingman** chatbot for dating tips and cultural advice
- **Onboarding** wizard and **Profile** editing
- **Settings** with preference controls

---

## 🧱 Technical Architecture

### The Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Astro 6.x | Astro gives us *islands architecture* — most of the page is static HTML (fast!), and only interactive parts (navbar, chat, forms) hydrate as React components |
| **UI Library** | React 19 | For interactive islands that need state management |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with the new v4 `@theme` directive |
| **Components** | Radix UI + shadcn/ui pattern | Headless, accessible component primitives |
| **Deployment** | Vercel via `@astrojs/vercel` | Server-side rendering with edge functions |
| **Theme** | next-themes | Dark/light mode switching |

### How The Pieces Connect

Think of Tekana like a sandwich:

```
┌──────────────────────────────────┐
│       Layout.astro               │  ← The bread: wraps EVERY page
│  ┌────────────────────────────┐  │
│  │  globals.css + fonts       │  │  ← The sauce: design tokens, colors
│  │  ThemeProvider (React)     │  │  ← Dark/light mode context
│  │  ┌──────────────────────┐  │  │
│  │  │  Page Content         │  │  │  ← The filling: each .astro page
│  │  │  (Navbar, sections,  │  │  │
│  │  │   Footer, AI Wingman) │  │  │
│  │  └──────────────────────┘  │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

**Astro pages** (`.astro` files) are like templates. They import React components and tell Astro *when* to make them interactive using `client:load`. Without that directive, React code renders to static HTML — no JavaScript shipped to the browser. This is why Astro is fast.

**The `@` alias** (`@/components/ui/button`) maps to `/src/` via `astro.config.mjs`'s Vite resolve alias. This keeps imports clean.

---

## 🎨 The CSS Color System (The Big Bug & Fix)

### The Bug 🐛

This was the single biggest issue. The site looked completely **unstyled** — no colors, no dark mode, everything was broken. Here's what happened:

**The old `globals.css` was doing this:**

```css
/* In @theme block (Tailwind v4 build-time) */
@theme {
  --color-background: hsl(var(--background));  /* ← THIS IS THE PROBLEM */
}

/* In :root (runtime CSS) */
:root {
  --background: 0 0% 100%;  /* ← Space-separated, no hsl() wrapper */
}
```

The `@theme` block says: "Hey Tailwind, `bg-background` should be `hsl(var(--background))`."

At runtime, `var(--background)` resolves to `0 0% 100%`.

So the browser sees: `hsl(0 0% 100%)`.

**This looks like it should work**, but the problem is **double indirection during Tailwind's build step**. Tailwind v4's `@theme` processes at build time and needs to resolve colors to generate utility classes. When it encounters `hsl(var(--background))`, it can't fully resolve the color at build time because `var(--background)` is a runtime CSS variable. This leads to **broken opacity modifiers** (`bg-background/50` doesn't work) and **broken color mixing**.

### The Fix ✅

We changed the approach: instead of wrapping `var()` in `hsl()` inside `@theme`, we define the theme colors as **direct `var()` references** and put the full `hsl()` values directly in the CSS custom properties:

```css
@theme {
  --color-background: var(--background);  /* ← Direct reference */
}

:root {
  --background: hsl(0, 0%, 100%);  /* ← Full hsl() value */
}

.dark {
  --background: hsl(222.2, 84%, 4.9%);  /* ← Full hsl() value */
}
```

Now Tailwind knows `--color-background` is a CSS variable (deferred), and the variable itself contains a complete, valid color. **No double indirection, no broken opacity.**

### The Lesson 📝

> **When using Tailwind v4's `@theme`, colors need to either be fully resolved at build time (literal values) or use `var()` referencing CSS custom properties that contain *complete* color values (not partial HSL components).**
>
> The pattern `hsl(var(--some-hsl-values))` where `--some-hsl-values: 222 84% 5%` is a **Tailwind v3 pattern** that doesn't work in v4's `@theme`.

---

## ⚡ FOUC (Flash of Unstyled Content) Prevention

### The Bug 🐛

When you loaded the page, there was a brief flash of light theme before dark mode kicked in. This is because:

1. The HTML is SSR'd with `class="dark"` on `<html>`
2. But `next-themes` was configured with `defaultTheme="system"`
3. On the client, `next-themes` checks `localStorage`, finds nothing (first visit), checks system preference, and if it's light → removes `dark` → then adds it back if the user previously selected dark

This causes a **visible flash** where the page goes light → dark.

### The Fix ✅

Two-part fix:

1. **Inline `<script>` in the `<head>`** that runs *before* any rendering:
```html
<script is:inline>
  (function() {
    var theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

2. **Set `defaultTheme="dark"` and `enableSystem={false}`** in the ThemeProvider. This means:
   - First visit → dark mode (no flash)
   - Returning visit → reads from localStorage

### The Lesson 📝

> **Always add an inline script *before* your framework boots to apply the correct theme class.** Frameworks like React hydrate *after* the page paints, so any theme logic in React will always cause a flash. The inline script runs synchronously before paint, preventing FOUC.

---

## 🏗️ Codebase Structure

```
src/
├── components/
│   ├── ai/              # AI Wingman chatbot
│   ├── auth/            # Login/Register forms
│   ├── discover/        # Swipe-style discovery page
│   ├── events/          # Events listing & detail pages
│   ├── messages/        # Chat interface
│   ├── onboarding/      # Multi-step onboarding wizard
│   ├── profile/         # Profile viewing & editing
│   ├── providers/       # React context providers (ThemeProvider)
│   ├── settings/        # App settings page
│   ├── site/            # Navbar & Footer (layout-level)
│   └── ui/              # Reusable UI primitives (Button, Card, etc.)
├── layouts/
│   └── Layout.astro     # Master layout template
├── lib/
│   └── utils.ts         # cn() utility for class merging
├── pages/               # File-based routing (Astro)
│   ├── auth/            # /auth/login, /auth/register
│   ├── events/          # /events, /events/[id]
│   ├── messages/        # /messages, /messages/[id]
│   ├── index.astro      # Landing page (/)
│   ├── community.astro  # /community
│   ├── premium.astro    # /premium
│   ├── rewards.astro    # /rewards
│   └── ...
└── styles/
    └── globals.css      # Design tokens, theme colors, animations
```

### Key Design Decisions

1. **Astro + React (not Next.js)**: We chose Astro because most pages are content-heavy. Only interactive parts (forms, chat, navbar state) need React. This means *way less JavaScript* shipped to the browser than a full Next.js app.

2. **`client:load` directive**: This tells Astro to hydrate the React component immediately on page load. We use this for the Navbar (needs interactivity immediately) and the AI Wingman. For less critical components, `client:visible` or `client:idle` would be better for performance.

3. **shadcn/ui pattern (not library)**: We don't install shadcn as a package — we copy the component code into `src/components/ui/`. This gives us full control to customize. The `cn()` utility from `src/lib/utils.ts` merges Tailwind classes intelligently using `clsx` + `tailwind-merge`.

4. **Vercel adapter with `output: 'server'`**: This enables SSR for all pages (not just static generation). This is needed because we have dynamic routes like `/events/[id]` and `/messages/[id]`.

---

## 🧠 How Good Engineers Think

### 1. Debug Systematically, Not Randomly

When the CSS was broken, I could have randomly changed things. Instead:
- ✅ Ran `npm run build` to check for compilation errors
- ✅ Inspected the build output CSS to see what Tailwind actually generated
- ✅ Traced the color variable chain: `bg-background` → `--color-background` → `hsl(var(--background))` → found the break
- ✅ Tested the fix with a clean build

**Lesson**: Always trace the *chain of data*. Find where the value enters the system, where it transforms, and where it breaks.

### 2. Don't Fight The Framework

The old code used a Tailwind v3 pattern (`hsl(var(--x))` with raw HSL components) in a Tailwind v4 project. v4 changed how `@theme` works. Instead of hacking around it, we adopted v4's intended pattern.

**Lesson**: When a framework upgrades, read the migration guide. Fighting a framework is like swimming upstream — exhausting and you end up where you started.

### 3. Defense In Depth

The FOUC fix uses *two* mechanisms:
- Inline `<script>` (immediate, no dependencies)
- `ThemeProvider` config (correct defaults for React lifecycle)

If one fails, the other catches it. This is *defense in depth*.

### 4. Performance Is A Feature

- `loading="eager"` on the hero image (above the fold, critical)
- `loading="lazy"` would be appropriate for below-the-fold images
- `preconnect` hints for Google Fonts
- `backdrop-blur` only where it adds visual value (it's GPU-intensive)

---

## 🪤 Potential Pitfalls

| Pitfall | How To Avoid |
|---------|-------------|
| Tailwind v4 `@theme` with `hsl(var())` | Always use direct values or plain `var()` references. Never nest CSS functions around `var()` in `@theme`. |
| FOUC with theme switching | Always add an inline script in `<head>` before framework hydration |
| `next-themes` with SSR | Disable `enableSystem` and set an explicit `defaultTheme` that matches the server-rendered HTML |
| Unused imports in Vite | Vite warns about them — clean up to reduce bundle size |
| `client:load` everywhere | Use `client:visible` for below-fold components, `client:idle` for non-critical ones |
| Radix UI in Astro | Radix components need `client:load` since they rely on React context |

---

## 🔥 What I Learned From This Build

1. **Tailwind CSS v4 is a paradigm shift** — `@theme` replaces `tailwind.config.js`. The configuration is now CSS-native, not JavaScript.

2. **Astro's island architecture is genuinely smart** — ship zero JS by default, opt into interactivity per-component. Perfect for content-heavy sites.

3. **CSS custom properties are powerful but tricky** — they're runtime-resolved, which means build-time tools like Tailwind can't fully predict their values. Always test that your color system works in both light and dark modes.

4. **The "it works on my machine" bug** is often a build vs. dev divergence. Always test with `npm run build` + `npm run preview`, not just `npm run dev`.

5. **Small details make premium feel** — glass morphism on the navbar, stagger animations on stats, social proof avatars, gradient text, glow effects. These take 20% more time but make 80% of the visual impact.
