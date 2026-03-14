# Architecture — The Young Player's Guide

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | Next.js 16 (App Router, Turbopack) |
| Language      | TypeScript 5                        |
| Styling       | Tailwind CSS 4 + shadcn/ui         |
| Database      | Neon (serverless Postgres)          |
| ORM           | Drizzle ORM                         |
| Auth          | Better Auth (email/password)        |
| State         | Zustand                             |
| Charts        | Recharts                            |
| Animation     | Framer Motion                       |
| Icons         | Lucide React                        |
| Theming       | next-themes (light/dark/system)     |
| Testing       | Vitest + React Testing Library      |

## Directory Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Auth route group (login, signup, profile)
│   ├── api/auth/[...all]/      # Better Auth catch-all API route
│   ├── dashboard/              # Dashboard pages (plans, log, progress)
│   ├── sleep/                  # Sleep guide page
│   ├── nutrition/              # Nutrition guide page
│   ├── training/               # Training guide page
│   ├── mental-wellness/        # Mental wellness guide page
│   ├── injury-prevention/      # Injury prevention guide page
│   ├── globals.css             # Global styles + CSS custom properties
│   ├── layout.tsx              # Root layout (font, theme, metadata)
│   └── page.tsx                # Landing page
├── components/
│   ├── layout/                 # Layout components (theme-provider, nav, footer)
│   ├── shared/                 # Reusable components across sections
│   ├── ui/                     # shadcn/ui primitives
│   ├── sleep/                  # Sleep-specific components
│   ├── nutrition/              # Nutrition-specific components
│   ├── training/               # Training-specific components
│   ├── mental-wellness/        # Mental wellness components
│   ├── injury-prevention/      # Injury prevention components
│   └── dashboard/              # Dashboard components
├── data/                       # Static content and citation data
├── lib/
│   ├── db/                     # Drizzle client, schema, migrations
│   ├── auth.ts                 # Better Auth server config
│   ├── auth-client.ts          # Better Auth client helper
│   └── utils.ts                # Utility functions (cn helper)
├── stores/                     # Zustand state stores
└── types/                      # Shared TypeScript type definitions
```

## Theming

- Soccer-themed color palette with deep green primary (#1B5E20) and orange accent (#FF8F00)
- CSS custom properties defined in `globals.css` using oklch color space
- Light and dark mode support via `next-themes` with class strategy
- Convenience colors available: `soccer-green`, `soccer-green-light`, `soccer-orange`, `soccer-orange-light`

## Database

- **Provider**: Neon serverless Postgres
- **ORM**: Drizzle ORM with neon-http driver
- **Config**: `drizzle.config.ts` at project root
- **Schema**: `src/lib/db/schema.ts`
- **Migrations**: `src/lib/db/migrations/`
- **Scripts**: `db:generate`, `db:migrate`, `db:push`, `db:studio`

### Schema Tables

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `user` | Registered users | id, name, email (unique), emailVerified, image, createdAt, updatedAt |
| `session` | Active login sessions | id, token (unique), expiresAt, userId (FK → user), ipAddress, userAgent |
| `account` | Auth provider accounts | id, accountId, providerId, userId (FK → user), accessToken, password |
| `verification` | Email verification tokens | id, identifier, value, expiresAt |
| `user_profile` | Player profile (1 per user) | id, userId (FK unique), ageGroup, gender, playingLevel, onboardingCompleted |
| `goal` | User goals (1–3 per user) | id, userId (FK), text |
| `daily_log` | Daily wellness log entries | id, userId (FK), date, sleepHours, sleepQuality, energy, mood, soreness, hadTraining, hadMatch, hydration, notes |
| `schedule_event` | Team schedule events | id, userId (FK), eventType, title, date, startTime, endTime, recurrence, dayOfWeek, location, opponent, notes |

All IDs are `text` (Better Auth generates string UUIDs). Foreign keys cascade on delete.

## Authentication

- **Library**: Better Auth with Drizzle adapter
- **Server config**: `src/lib/auth.ts`
- **Client helper**: `src/lib/auth-client.ts` — exports `useSession`, `signIn`, `signUp`, `signOut`
- **API route**: `src/app/api/auth/[...all]/route.ts` (catch-all handler)
- **Methods**: Email/password (Google OAuth prepared but not yet enabled)

### Auth Flow

1. **Sign up**: Client calls `signUp.email()` → Better Auth creates `user` + `account` + `session` rows → session cookie set
2. **Login**: Client calls `signIn.email()` → Better Auth validates credentials → creates `session` row → session cookie set
3. **Session check**: `useSession()` hook fetches current session from the API; used in navbar and protected pages
4. **Sign out**: Client calls `signOut()` → session row deleted → cookie cleared → redirect to home
5. **Navbar**: Shows Login/Sign Up when logged out; shows user initial + dropdown (Profile, Sign Out) when logged in

## API Routes

| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/auth/[...all]` | All | Better Auth catch-all handler |
| `/api/profile` | GET, POST | Get or create user profile + goals |
| `/api/daily-log` | GET, POST | Get or upsert daily wellness log — supports `?date=` (single) and `?from=&to=` (range) |
| `/api/schedule` | GET, POST, DELETE | Schedule events — GET `?from=&to=` returns one-time + recurring events; POST creates; DELETE `?id=` removes |

All custom API routes use `auth.api.getSession({ headers: await headers() })` for server-side auth.

## Onboarding Flow

1. **Sign up** → redirects to `/onboarding`
2. **Onboarding page** (`src/app/onboarding/page.tsx`) — single-page form: age group, gender, playing level, 1–3 goals
3. **Submit** → POST `/api/profile` → redirect to `/dashboard`
4. Already-onboarded users visiting `/onboarding` are redirected to `/dashboard`

## Dashboard

- **Layout** (`src/app/dashboard/layout.tsx`) — client component with two guards:
  1. Auth guard: `useSession()` — no session → `/login`
  2. Onboarding guard: fetch `/api/profile` — 404 → `/onboarding`
  - Populates Zustand store with profile data after passing guards
- **Sub-pages**: `/dashboard` (home), `/dashboard/log`, `/dashboard/plans`, `/dashboard/progress`, `/dashboard/schedule`, `/dashboard/drills`, `/dashboard/meals`

## Dashboard Pages

### Overview (`/dashboard`)
- **Data**: `useDailyLogs(7)` hook fetches last 7 days via date-range API
- **Today's Snapshot**: Shows today's log metrics or "No log yet" link
- **Wellness Score**: Average of (sleepQuality + energy + mood + soreness) / 4 across 7 days, displayed as X/5
- **Streak**: Consecutive days backwards from today with a log entry
- **Charts**: `SleepTrendChart` (7-day line) + `TrainingLoadChart` (7-day bars)
- **Quick Nav**: Cards linking to Log, Plans, Schedule, Drills, Meals, Progress (3-column grid)
- **Empty state**: Friendly message + button when no logs exist

### Training Plans (`/dashboard/plans`)
- **7-day grid**: Mon–Sun view showing training (orange badge), match (green badge), rest (gray badge), or no log
- **Emoji indicators**: Sleep quality + energy shown as colored circles per day
- **Weekly summary**: Counts of training, match, and rest days
- **Recommendations**: Static advice based on `playingLevel` (recreational → elite)

### Progress (`/dashboard/progress`)
- **30-day data**: `useDailyLogs(30)` for long-term trends
- **Charts**: `SleepTrendChart`, `WellnessTrendChart` (4 metrics), `TrainingLoadChart` (4 weekly buckets)
- **Goal progress**: Keyword-based matching (sleep, nutrition, injury, mental, training, recovery) → percentage bars
- **Hydration distribution**: Horizontal segmented bar showing poor/ok/good/great counts

### Drills (`/dashboard/drills`)
- **Data**: Static drill library (35 drills in `src/data/drill-library.ts`) — no database tables
- **Recommendation engine**: Pure function in `src/lib/recommend-drills.ts` — filters drills by age group, playing level, day type (from schedule), and readiness (from wellness log)
- **Day type detection**: game > rest > practice > individual training > free — based on today's schedule events
- **Readiness score**: Average of energy + inverted soreness from today's log → low/moderate/high
- **Intensity filtering**: Game/rest days → low only; practice → low/moderate; training/free → all (high excluded if low readiness)
- **Difficulty filtering**: Recreational → beginner; club → beginner+intermediate; academy/elite → all
- **Tabs**: "Today's Recommendation" (default) shows day summary + personalized drill cards; "Browse Library" shows all 35 drills with skill area filter badges
- **Skill areas**: Technical (8), Tactical (7), Physical (7), Coordination (7), Recovery (6)
- **Components**: `DrillCard` (`src/components/drills/drill-card.tsx`) — card with skill area badge, difficulty badge, duration, equipment, description, coaching points

### Meals (`/dashboard/meals`)
- **Data**: Static meal library (30 meals in `src/data/meal-library.ts`) — no database tables
- **Recommendation engine**: Pure function in `src/lib/recommend-meals.ts` — selects meals by day type (from schedule), readiness (from wellness log), and age group
- **Day type detection**: Reuses `determineDayType` and `determineReadiness` from `src/lib/recommend-drills.ts`
- **Timing slots**: Game day → breakfast, morning_snack, pre_game, halftime, post_game, dinner; Practice/Training → breakfast, morning_snack, lunch, afternoon_snack, dinner; Rest/Free → breakfast, lunch, afternoon_snack, dinner
- **Low readiness adjustment**: Drops morning_snack on non-game days
- **Meal selection**: Filters by timing slot and age group, prefers tag-matched meals (low readiness → light/recovery; high → high-carb/energy-boost), deterministic daily variety via `dayOfYear % count`
- **Tabs**: "Today's Meal Plan" (default) shows day summary + meal cards in time-of-day order; "Browse Meals" shows all 30 meals with timing filter badges
- **Meal timings**: Breakfast (4), Morning Snack (3), Lunch (4), Afternoon Snack (3), Dinner (4), Pre-Game (4), Halftime (4), Post-Game (4)
- **Components**: `MealCard` (`src/components/meals/meal-card.tsx`) — card with timing badge, tag badges, prep time, ingredient count, description, ingredients list, portion note

### Schedule (`/dashboard/schedule`)
- **Weekly calendar**: 7-column grid (Mon–Sun) with week navigation (prev/next), stacks vertically on mobile
- **Events**: Color-coded cards — green (practice), red (game), blue (individual training), gray (rest)
- **Recurrence**: Events can be one-time (matched by date) or weekly (matched by dayOfWeek, shown every week)
- **Add Event**: Dialog form for creating events with type, title, recurrence, date/day, times, location, opponent, notes
- **Delete**: Remove entire event record (no edit, no single-occurrence delete)
- **Components**: `AddEventDialog` (`src/components/schedule/add-event-dialog.tsx`), `WeeklyCalendar` (`src/components/schedule/weekly-calendar.tsx`)

### Chart Components (`src/components/dashboard/`)

| Component | Chart Type | Props |
|-----------|------------|-------|
| `SleepTrendChart` | Recharts LineChart | `data: { date, sleepHours }[]` |
| `WellnessTrendChart` | Recharts LineChart (4 lines) | `data: { date, sleepQuality, energy, mood, soreness }[]` |
| `TrainingLoadChart` | Recharts BarChart (2 bars) | `data: { label, training, match }[]` |

All charts use `var(--color-chart-N)` CSS variables for theming.

### Shared Hook

- `useDailyLogs(days)` in `src/hooks/use-daily-logs.ts` — computes date range, fetches `GET /api/daily-log?from=&to=`, returns `{ logs, loading }`
- `useScheduleEvents(weekOffset)` in `src/hooks/use-schedule-events.ts` — computes Mon–Sun range for given week offset, fetches `GET /api/schedule?from=&to=`, returns `{ events, loading, refetch }`

## Daily Log

- **Page**: `src/app/dashboard/log/page.tsx` — form for daily wellness tracking
- **Fields**: Sleep hours (slider), sleep quality (emoji), energy/mood/soreness (emoji), training/match toggles, hydration, notes
- **EmojiScale component**: `src/components/daily-log/emoji-scale.tsx` — reusable row of 5 emoji buttons
- **Upsert**: POST `/api/daily-log` creates or updates the log for a given date

## State Management

- **Zustand** for client-side state (user profile, preferences)
- Store files live in `src/stores/`
- `useUserProfileStore` holds ageGroup, gender, playingLevel, goals — populated by dashboard layout

## Layout Components

| File | Type | Purpose |
|------|------|---------|
| `src/components/layout/theme-provider.tsx` | Client | Wraps `next-themes` ThemeProvider |
| `src/components/layout/navbar.tsx` | Client | Sticky top navbar with desktop/mobile views, theme toggle, auth buttons |
| `src/components/layout/mobile-nav.tsx` | Client | Sheet-based mobile menu, receives nav links as props from Navbar |
| `src/components/layout/footer.tsx` | Server | 3-column footer with section links, resource links, and disclaimer |
| `src/components/layout/page-transition.tsx` | Client | Framer Motion fade+slide-up on route changes (enter-only, App Router compatible) |

- **Navbar** is sticky (`sticky top-0`) with backdrop blur. Desktop shows all links inline; mobile collapses to hamburger menu.
- **Theme toggle** uses a dropdown (Light/Dark/System) on desktop, simple toggle on mobile.
- **PageTransition** uses `usePathname()` as `key` to trigger re-mount animation on navigation.
- **Footer** includes a full-length disclaimer (not medical advice, consult professionals) in a bordered card, plus copyright.

## Testing

## Citation System

- **Types**: `Citation`, `CitationType`, `CitationCategory` defined in `src/types/index.ts`
- **APA Formatter**: `formatApa()` in `src/lib/citations.ts` — formats citations to APA 7th edition for journal, book, website, and report types
- **Data**: `src/data/citations.ts` exports `citations: Citation[]` (the full array) and `citationMap: Map<string, Citation>` (lookup by ID)

### Components

| Component | File | Usage |
|-----------|------|-------|
| `<CitationRef id="...">` | `src/components/shared/citation-ref.tsx` | Inline superscript `[n]` with APA tooltip on hover |
| `<CitationList category="...">` | `src/components/shared/citation-list.tsx` | Filtered APA reference list at page bottom |

### Citations Page (`/citations`)

- Client component with search (by author/title) and category filter badges
- Displays all citations in APA format with category badges and DOI/URL links
- Link in footer under Resources

## Content Sections

Each content section (Sleep, Nutrition, Training, Mental Wellness, Injury Prevention) follows the same pattern:

| Layer | File | Purpose |
|-------|------|---------|
| Hero | `src/components/{section}/{section}-hero.tsx` | Gradient banner with icon, title, key stat + citation |
| Data | `src/data/{section}-content.ts` | Structured content, age-group recommendations, citation IDs |
| Page | `src/app/{section}/page.tsx` | Client component with age-group selector, tabs, takeaways, and references |

- **Age group selector** — row of Badge buttons that filters age-specific content
- **Tabs** — 4–5 tabs per section, each rendering paragraphs + bullet lists with inline `<CitationRef>` components
- **Quick Takeaways** — Card at the bottom summarizing key points
- **References** — `<CitationList category="...">` renders filtered APA citations

**Implemented sections:** Sleep, Nutrition, Training, Mental Wellness, Injury Prevention

## Landing Page

- **Server component** at `src/app/page.tsx` — no client-side JS needed
- **Hero**: Gradient background, title, subtitle, two CTAs (Get Started Free → signup, Explore Guides → sleep)
- **Feature cards**: 5 cards (Sleep, Nutrition, Training, Mental Wellness, Injury Prevention) with icons, descriptions, hover effects — each links to its content page
- **Dashboard CTA**: Bottom section encouraging account creation for tracking

## SEO & Metadata

- **Root layout** (`layout.tsx`): Default metadata with `title.template` (`%s | The Young Player's Guide`), Open Graph, Twitter card, robots directives
- **Page-specific metadata**: Each content section, citations, and auth pages have their own `layout.tsx` exporting route-specific `Metadata` with title, description, and OG tags
- **Landing page**: Exports its own `Metadata` directly (server component)
- Dashboard pages omit custom SEO since they are behind authentication

## Responsiveness

- All pages tested at 375px (mobile), 768px (tablet), 1280px (desktop)
- Grid layouts use mobile-first breakpoints: `grid-cols-1` default → `sm:grid-cols-2` → `lg:grid-cols-3/4`
- Onboarding age group selector: `grid-cols-2 sm:grid-cols-4`
- Hydration buttons: `grid-cols-2 sm:grid-cols-4`
- EmojiScale: `gap-1 sm:gap-2` and `h-10 w-10 sm:h-12 sm:w-12` for mobile fit
- Plans 7-day grid: `grid-cols-7 max-sm:grid-cols-1`
- Dashboard pages wrapped in `max-w-5xl px-4 py-8` container via layout

## Testing

- **Runner**: Vitest with jsdom environment
- **Assertions**: `@testing-library/jest-dom` matchers
- **Components**: React Testing Library
- **Config**: `vitest.config.ts` with `@/` path alias
- **Scripts**: `npm test` (watch), `npm run test:run` (CI)
