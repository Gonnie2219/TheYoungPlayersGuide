# Youth Soccer Development Guide — Project Prompt for Claude Code

## PROJECT OVERVIEW

Build a full-stack web application called **"The Young Player's Guide"** — an interactive, science-backed resource designed to help youth soccer players (ages 6–18) and their parents understand how to optimize player development through proper sleep, nutrition, training, mental wellness, and injury prevention. Every piece of guidance on the site must be traceable to peer-reviewed research or established institutional guidelines (e.g., AAP, UEFA, FIFA, US Youth Soccer).

The site should feel modern, clean, and youth-friendly — not clinical or boring. Think of it as the resource a smart parent or motivated young player wishes existed: trustworthy, practical, and engaging.

---

## TECH STACK

Use the following stack. Do NOT deviate unless a clear technical reason arises.

| Layer | Technology |
|---|---|
| Framework | **Next.js 15+** (App Router, TypeScript) |
| Styling | **Tailwind CSS** + **shadcn/ui** components |
| Database | **PostgreSQL** via **Neon** (serverless) |
| ORM | **Drizzle ORM** |
| Authentication | **Better Auth** (email/password + Google OAuth) |
| State Management | **Zustand** (for client state) + React Server Components for server state |
| Charts / Data Viz | **Recharts** |
| Animations | **Framer Motion** |
| Deployment Target | **Vercel** |
| Testing | **Vitest** + **React Testing Library** |

### Why this stack
- Next.js App Router gives us SSR, server components, and API routes in one place.
- Better Auth is TypeScript-first, framework-agnostic, and handles email/password + OAuth without heavy config.
- Drizzle + Neon is a lightweight, type-safe database layer with serverless Postgres.
- shadcn/ui gives us accessible, customizable components we fully own (not a black-box library).
- This stack is well-understood by AI coding tools, which keeps our Claude Code workflow smooth.

---

## PROJECT STRUCTURE

```
SoccerGuideWebsite/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (nav, footer, theme)
│   │   ├── page.tsx                  # Landing / home page
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── sleep/page.tsx            # Sleep science section
│   │   ├── nutrition/page.tsx        # Nutrition section
│   │   ├── training/page.tsx         # Training plans & activities
│   │   ├── mental-wellness/page.tsx  # Mental health & burnout prevention
│   │   ├── injury-prevention/page.tsx# Injury prevention section
│   │   ├── dashboard/               # Authenticated user dashboard
│   │   │   ├── page.tsx             # Overview / daily tracker
│   │   │   ├── plans/page.tsx       # Personalized plans
│   │   │   ├── log/page.tsx         # Daily logging interface
│   │   │   └── progress/page.tsx    # Progress visualization
│   │   └── api/                     # API routes
│   │       ├── auth/[...all]/route.ts
│   │       └── ...
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   ├── layout/                  # Nav, Footer, Sidebar
│   │   ├── sleep/                   # Sleep section components
│   │   ├── nutrition/               # Nutrition section components
│   │   ├── training/                # Training section components
│   │   ├── mental-wellness/         # Mental wellness components
│   │   ├── injury-prevention/       # Injury prevention components
│   │   ├── dashboard/               # Dashboard components
│   │   └── shared/                  # Shared/reusable (CitationTooltip, AgeSelector, etc.)
│   ├── lib/
│   │   ├── auth.ts                  # Better Auth server config
│   │   ├── auth-client.ts           # Better Auth client
│   │   ├── db/
│   │   │   ├── index.ts             # Drizzle client
│   │   │   ├── schema.ts            # DB schema
│   │   │   └── migrations/
│   │   └── utils.ts
│   ├── data/
│   │   ├── citations.ts             # Master citation registry
│   │   ├── sleep-content.ts         # Sleep section content + source refs
│   │   ├── nutrition-content.ts     # Nutrition content + source refs
│   │   ├── training-content.ts      # Training plans + source refs
│   │   ├── mental-wellness-content.ts
│   │   └── injury-prevention-content.ts
│   ├── stores/                      # Zustand stores
│   │   └── user-profile-store.ts
│   └── types/
│       └── index.ts                 # Shared TypeScript types
├── public/
│   ├── images/
│   └── icons/
├── drizzle.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## PHASE 1 — Foundation (Build First)

### 1.1 Project Scaffolding
- Initialize Next.js 15+ with TypeScript, Tailwind, App Router
- Install and configure all dependencies
- Set up shadcn/ui with a custom theme (color palette that feels sporty/youthful — greens, whites, blacks — think soccer pitch vibes)
- Set up Drizzle ORM with Neon Postgres (provide a `.env.example` with placeholder connection strings)
- Set up Better Auth with email/password provider (Google OAuth can be added later)

### 1.2 Layout & Navigation
- Responsive top navbar with links: Home, Sleep, Nutrition, Training, Mental Wellness, Injury Prevention, Dashboard (shows only when logged in)
- Mobile hamburger menu
- Footer with credits, disclaimer, and link to full citation list
- All pages should have smooth scroll behavior and Framer Motion page transitions

### 1.3 Database Schema

Design the schema to support these core models:

```
users
  - id (uuid, PK)
  - email (unique)
  - name
  - date_of_birth (date)
  - gender (enum: male, female, other)
  - playing_level (enum: recreational, club, travel, academy, elite)
  - position (optional, string)
  - years_playing (integer)
  - created_at, updated_at

daily_logs
  - id (uuid, PK)
  - user_id (FK → users)
  - date (date)
  - sleep_hours (decimal)
  - sleep_quality (1-5 scale)
  - bedtime (time)
  - wake_time (time)
  - meals_logged (jsonb — array of {meal_type, description, rating})
  - water_intake_ml (integer)
  - training_type (enum: team_practice, individual, match, rest, gym)
  - training_duration_min (integer)
  - training_intensity (1-10 RPE scale)
  - mood (1-5 scale)
  - energy_level (1-5 scale)
  - soreness_level (1-5 scale)
  - notes (text, optional)
  - created_at

training_plans
  - id (uuid, PK)
  - user_id (FK → users)
  - name (string)
  - age_group (string, e.g. "U12", "U15")
  - level (enum matching user levels)
  - duration_weeks (integer)
  - plan_data (jsonb — structured weekly plan)
  - is_active (boolean)
  - created_at, updated_at

goals
  - id (uuid, PK)
  - user_id (FK → users)
  - category (enum: sleep, nutrition, training, mental, general)
  - description (text)
  - target_value (decimal, optional)
  - current_value (decimal, optional)
  - target_date (date, optional)
  - is_completed (boolean)
  - created_at, updated_at
```

### 1.4 Authentication
- Sign up form: name, email, password, date of birth, gender, playing level
- Login form: email + password
- Protected routes: `/dashboard/*` requires auth
- Session management via Better Auth
- Profile page where users can update their info

---

## PHASE 2 — Content Sections (The Science)

Each content section should follow this pattern:
1. **Hero area** with a brief, engaging intro and a key stat or quote
2. **Interactive content** organized into expandable subsections (accordions or tabs)
3. **Age-adaptive content** — where guidance differs by age group (e.g., 6–9, 10–12, 13–15, 16–18), show a selector at the top and filter recommendations accordingly
4. **Inline citations** — every factual claim gets a superscript number. Clicking it opens a tooltip or side panel showing: authors, title, journal, year, DOI/URL
5. **"Quick Takeaways"** card at the bottom of each section with 3–5 bullet points summarizing the most actionable advice

### 2.1 Sleep Section (`/sleep`)

**Key topics to cover (with the science behind each):**

- **Why sleep matters for young soccer players**: Muscle recovery and protein synthesis happen primarily during deep sleep. Growth hormone secretion peaks during slow-wave (N3) sleep. Sleep deprivation impairs reaction time, decision-making, sprint speed, and endurance. Research shows youth athletes getting <8 hours have significantly higher injury rates.

- **How much sleep by age group**:
  - Ages 6–12: 9–12 hours/night (AAP recommendation)
  - Ages 13–18: 8–10 hours/night (AAP recommendation)
  - Note that adolescent circadian rhythm shifts later (delayed sleep phase), making early training a challenge. Reference the research on chronotype development in adolescents.

- **Sleep quality vs. quantity**: Explain sleep architecture (N1, N2, N3, REM) in youth-friendly language. Higher training intensity is associated with more wake time during sleep. One training session per day was found to be more advantageous for sleep quality than two-a-days.

- **Practical sleep hygiene for young athletes**:
  - Consistent bedtime/wake time (even weekends)
  - Avoid screens 60 min before bed (blue light suppresses melatonin)
  - Cool, dark room
  - A shower before bed may improve sleep onset latency in youth soccer players
  - Protein ingestion before sleep can support overnight muscle protein synthesis
  - Strategic napping: 20–30 min naps, not after 3 PM

- **Sleep challenges specific to soccer**: Late-night matches disrupt circadian rhythm and melatonin secretion. Travel and away games reduce sleep quality. Match congestion (multiple games with ≤4 days recovery) compounds sleep debt.

**Key sources to cite (search for and verify DOIs):**
- Frytz et al. (2023) "Soccer, Sleep, Repeat" — PMC10455405
- Whitworth-Turner et al. (2019) "Training load and schedule in youth-soccer" — Eur J Sport Sci
- Whitworth-Turner et al. (2017) "Shower before bedtime in youth soccer" — Eur J Sport Sci
- Frontiers in Sports (2026) "Sleep tight, play right: practical insights for soccer"
- AAP sleep duration recommendations
- Tate et al. (2025) "Training load and schedule on youth athletes' sleep" — J Sleep Res

### 2.2 Nutrition Section (`/nutrition`)

**Key topics to cover:**

- **Youth athletes are NOT mini-adults**: Their metabolism, growth demands, body composition changes, and thermoregulation differ from adults. Puberty brings dramatic shifts in nutrient partitioning and energy needs.

- **Energy requirements by age and activity level**: Include a reference table based on age/gender/activity (from USDA/AAP guidelines):
  - Female 9–13 active: 1,800–2,200 kcal
  - Male 9–13 active: 2,000–2,600 kcal
  - Female 14–18 active: 2,400 kcal
  - Male 14–18 active: 2,800–3,200 kcal
  - Note: Elite academy players may require higher (research on English Premier League academy players measured actual energy expenditure)

- **Macronutrient guidance**:
  - Carbohydrates: 45–65% of total calories; ~5–7 g/kg/day for youth players; many youth players currently under-consume carbs (~2 g/lb when they need 3.5–4.5 g/lb)
  - Protein: RDA varies by age; active youth may need up to 1.4 g/kg/day (especially those training 10–12 hr/week); protein timing around training matters
  - Fat: Essential for growth, brain development, and hormone production; don't restrict fat in growing athletes

- **Key micronutrients**:
  - Calcium: 1,300 mg/day for ages 9–18 (critical for bone development under training load)
  - Iron: Especially important for adolescent females (menstruation + training = higher risk of deficiency)
  - Vitamin D: Many youth athletes are deficient; important for bone health and immune function

- **Hydration**:
  - Children ages 9–12: 3–8 oz every 20 min during exercise (AAP)
  - Youth have a higher surface-area-to-mass ratio; their thermoregulation works differently
  - Teach signs of dehydration (headache, nausea, decreased performance)

- **Match day / training day / rest day nutrition**: Different fueling strategies for different days. Pre-game, during-game, and post-game eating windows. Youth players currently don't periodize their nutrition intake to match training demands (this is an evidence-based strategy that improves performance in adults).

- **Red flags**: The Female Athlete Triad (low energy availability, menstrual dysfunction, bone loss). Disordered eating patterns. Supplement misuse (nearly 48% of youth athletes believe supplements are necessary — they're generally not for well-fed young athletes).

**Key sources to cite:**
- Desbrow (2021) "Youth Athlete Development and Nutrition" — Sports Med
- North et al. (2022) "Nutritional Considerations in High Performance Youth Soccer" — J Sci Sport Exerc
- Hannon et al. (2021) "Energy Requirements of Male Academy Soccer Players" — Med Sci Sports Exerc
- UEFA Expert Group Statement on Nutrition in Elite Football
- US Youth Soccer Nutrition Guide
- Sports Dietitians Australia — Junior Soccer Player guide
- Tee et al. (2022) "Sleep, Recovery, and Nutrition of Elite Adolescent Athletes" — MDPI Sports

### 2.3 Training Section (`/training`)

**Key topics to cover:**

- **Long-Term Athletic Development (LTAD) framework**: Present the established developmental stages adapted for soccer:
  - **Active Start (ages 0–6)**: Fundamental movement skills — running, jumping, throwing, catching. Make it play.
  - **FUNdamentals (ages 6–9)**: Develop physical literacy through varied movement. Multi-sport participation is critical. 70:30 training-to-competition ratio. Keep it fun.
  - **Learn to Train (ages 9–12)**: The "golden age" of motor learning. Introduce sport-specific skills. Still emphasize multi-sport. Bodyweight exercises and basic movement patterns for strength.
  - **Train to Train (ages 12–16 male / 11–15 female)**: Growth spurt period. Prioritize aerobic training after growth spurt. Introduce structured strength training. Emphasize flexibility during and after growth spurt. 60:40 training-to-competition ratio.
  - **Train to Compete (ages 16–18 male / 15–17 female)**: Optimize fitness and position-specific skills. Advanced strength & conditioning. Sport-specific tactical preparation.

- **Age-appropriate training volumes**: Exercise progression is fundamental — gradually increase intensity, complexity, and specificity as players mature. What's appropriate at U10 is very different from U16. Include recommended weekly hours by age group.

- **Sample training activities by category**:
  - **Technical**: Ball mastery drills, passing patterns, first touch exercises, finishing drills, 1v1 moves
  - **Tactical**: Small-sided games (3v3, 4v4, 5v5), positional play exercises, pressing drills
  - **Physical**: Age-appropriate speed/agility work, bodyweight strength circuits, endurance through games
  - **Coordination**: Ladder drills, cone exercises, balance challenges

- **Training plan generator** (interactive feature): Based on the user's age, gender, level, and position, generate a suggested weekly plan. This should show:
  - Number of sessions/week
  - Session duration
  - Breakdown of technical/tactical/physical focus per session
  - Built-in rest days
  - RPE (Rate of Perceived Exertion) targets

- **Early specialization warning**: AAP and sport science research consistently show that early single-sport specialization increases risk of overuse injury, burnout, and early dropout. Multi-sport participation until at least puberty is recommended. Include the research on this.

**Key sources to cite:**
- Balyi & Hamilton LTAD Model
- Canada Soccer LTPD Community Guide
- Lloyd et al. (2021) "Training Management of the Elite Adolescent Soccer Player" — PMC8708071
- AAP Clinical Report on Overuse Injuries, Overtraining, and Burnout (2024) — Pediatrics
- ISSPF Youth Soccer Athletic Development resources
- Youth Athlete Development Models: A Narrative Review — PMC8669922

### 2.4 Mental Wellness Section (`/mental-wellness`)

**Key topics to cover:**

- **Why mental health matters in youth soccer**: Sport can be positive for development, but competitive demands, performance pressure, perfectionism, and early specialization create risk factors for anxiety, depression, and burnout. More than one-third of active professional soccer players experience depression or related disorders — prevention should start young.

- **Burnout recognition and prevention**:
  - Three dimensions: emotional/physical exhaustion, reduced sense of accomplishment, devaluation of sport
  - Warning signs: mood swings, declining performance, loss of enjoyment, chronic fatigue, social withdrawal, increased illness/injury
  - Prevention: Take 2–3 month breaks from single-sport training annually; maintain life balance; focus on mastery goals over performance goals

- **Stress management techniques appropriate for youth**:
  - Cognitive-behavioral approaches adapted for youth athletes (research shows significant improvement in stress management and mental skills)
  - Mindfulness and breathing exercises
  - Goal-setting (mastery-approach goals, not avoidance goals)
  - Journaling / reflection (tie into the daily log feature)

- **The role of identity beyond sport**: Encourage academic, social, and creative pursuits. Research shows an overly narrow athletic identity increases vulnerability to mental health decline, especially after injury or transition.

- **Communication guidance**: How to talk to coaches, parents, and teammates about pressure. When and how to seek professional help. Normalize help-seeking (athletes are significantly less likely than non-athletes to seek mental health care).

- **Parent/coach guidance**: A dedicated sub-section for adults. How adult behavior and expectations influence youth athlete mental health. Signs to watch for. How modeling openness about mental health increases athletes' willingness to seek support.

**Key sources to cite:**
- AAP Clinical Report (2024) on Overuse, Overtraining, and Burnout — Pediatrics
- Olmedilla et al. (2019) "Psychological Intervention Program to Control Stress in Youth Soccer" — PMC6805695
- Brenner & Watson (2024) AAP policy on burnout prevention
- PMC9517900 — Burnout and Mental Interventions meta-analysis
- PMC6805069 — Psychosocial Implications of Sport Specialization
- Frontiers in Psychology (2025) — Emotional intelligence and burnout in youth athletes
- Weigand et al. (2024) "Role of Sport Psychology in Injury Prevention" — PMC10968622

### 2.5 Injury Prevention Section (`/injury-prevention`)

**Key topics to cover:**

- **Common youth soccer injuries**: Ankle sprains, knee injuries (ACL particularly in females), muscle strains, growth plate injuries, overuse injuries (Sever's disease, Osgood-Schlatter)

- **Risk factors specific to youth**: Growth spurts create temporary vulnerability (rapid bone growth outpaces muscle/tendon adaptation). Maturation mismatches in the same age group. Fatigue from training overload. Poor sleep and nutrition compound injury risk.

- **Prevention strategies**:
  - Proper warm-up protocols (FIFA 11+ adapted for youth)
  - Strength and neuromuscular training (age-appropriate)
  - Load management — the relationship between acute:chronic workload ratio and injury
  - Adequate rest and recovery between sessions/matches
  - Proper footwear and playing surface awareness

- **The sleep-nutrition-injury connection**: Research shows that athletes sleeping <8 hours have significantly higher injury rates. Poor nutritional status impairs recovery and increases susceptibility. This ties back to the Sleep and Nutrition sections — cross-link them.

- **What to do when injured**: RICE/PEACE & LOVE protocols. When to see a doctor. The psychological impact of injury on youth athletes and how to support mental recovery alongside physical.

**Key sources to cite:**
- PMC10745648 — Sleep, Nutrition, and Injury Risk in Adolescent Athletes
- FIFA 11+ injury prevention program research
- AAP guidelines on youth sports injury prevention
- Lloyd et al. (2021) on maturation and injury risk in academy soccer

---

## PHASE 3 — Dashboard & Interactive Features (Authenticated Users)

### 3.1 User Onboarding
After signup, walk the user through a brief onboarding flow:
1. Confirm age, gender, playing level
2. Set 1–3 initial goals (e.g., "Sleep 9+ hours", "Drink 2L water daily", "Train 4x/week")
3. Generate an initial recommended training plan based on their profile

### 3.2 Daily Log (`/dashboard/log`)
A clean, mobile-friendly daily logging interface. Design it to take <2 minutes to fill out. Use sliders, quick-select buttons, and emoji scales (not text fields) wherever possible.

**Fields (matching the `daily_logs` schema):**
- Sleep: bedtime, wake time (auto-calculate hours), quality slider (1–5)
- Nutrition: quick meal logging (breakfast/lunch/dinner/snacks — just description + rating), water intake tracker
- Training: type selector, duration, intensity (RPE 1–10)
- Wellness: mood, energy, soreness (all 1–5 scales)
- Optional notes field

### 3.3 Dashboard Overview (`/dashboard`)
Show at-a-glance cards:
- **Sleep trends** (line chart of hours over last 7/30 days vs. recommended target for their age)
- **Training load** (bar chart of weekly training volume, with an indicator if they're exceeding recommended load)
- **Wellness scores** (mood, energy, soreness averages)
- **Goal progress** (progress bars for active goals)
- **Streak counter** (consecutive days logged)

### 3.4 Training Plans (`/dashboard/plans`)
- Display the user's active training plan as a week view
- Each day shows: session type, duration, focus areas, suggested activities
- Users can mark sessions as completed
- Plan adjusts recommendations based on age group, level, and LTAD stage

### 3.5 Progress & Insights (`/dashboard/progress`)
- Longer-term trend charts (weekly/monthly)
- Correlation insights: "Weeks where you averaged 9+ hours of sleep, your mood was 30% higher"
- Use Recharts for all data visualization
- Export data option (CSV)

---

## PHASE 4 — Citation System

This is critical to the project's credibility. Build it properly.

### 4.1 Citation Data Structure

```typescript
interface Citation {
  id: string;                    // e.g., "frytz-2023"
  authors: string;               // "Frytz, P., Heib, D.P.J., & Hoedlmoser, K."
  year: number;                  // 2023
  title: string;                 // "Soccer, Sleep, Repeat..."
  journal: string;               // "Brain Sciences"
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;                  // "10.3390/brainsci13081186"
  url?: string;                  // Full URL
  pmcId?: string;                // "PMC10455405"
  accessDate: string;            // When we accessed/verified this source
  tags: string[];                // ["sleep", "youth", "training-load"]
}
```

### 4.2 Citation Components
- **`<CitationRef id="frytz-2023" />`** — renders as a superscript number in the text. On hover: shows a tooltip with a brief citation. On click: scrolls to or opens the full reference.
- **`<CitationList tags={["sleep"]} />`** — renders a formatted reference list, filtered by tags, at the bottom of a section.
- **`/citations`** page — a searchable, filterable master list of all sources used on the site.

### 4.3 Citation Display Format
Use APA 7th edition format for all references. Each citation entry should include a clickable DOI link where available.

---

## PHASE 5 — Polish & Quality

### 5.1 Responsive Design
- Mobile-first approach
- Test all layouts at: 375px (phone), 768px (tablet), 1280px (desktop)
- The daily log must be especially smooth on mobile — this is where players will use it most

### 5.2 Accessibility
- All interactive elements must be keyboard navigable
- Color contrast must meet WCAG AA
- Use semantic HTML throughout
- Image alt text for all imagery
- Screen reader friendly charts (provide data tables as alternatives)

### 5.3 Performance
- Use Next.js Image component for all images
- Lazy load content sections below the fold
- Server Components by default; use "use client" only when needed
- Target Lighthouse scores: 90+ performance, 90+ accessibility

### 5.4 SEO
- Dynamic metadata for each page
- Open Graph tags for social sharing
- Structured data (JSON-LD) for article content

---

## DESIGN GUIDELINES

### Visual Identity
- **Primary color**: Deep green (#1B5E20 or similar — evokes the pitch)
- **Secondary color**: Clean white (#FFFFFF)
- **Accent**: Energetic orange or gold (#FF8F00) for CTAs and highlights
- **Dark mode**: Support dark mode toggle (use Tailwind's `dark:` variants)
- **Typography**: Clean sans-serif (Inter or similar from Google Fonts)
- **Iconography**: Lucide icons (already available via shadcn/ui)

### Tone
- Friendly and encouraging, never preachy
- Use "you" language, not clinical third-person
- When presenting science, explain it simply first, then offer a "Dive Deeper" expandable with the full detail
- Celebrate consistency over perfection (the dashboard should feel encouraging, not punishing)

---

## IMPORTANT CONSTRAINTS

1. **All scientific claims must have a citation.** No unsourced health/training advice. If a claim can't be sourced to peer-reviewed research or established institutional guidelines, don't include it.

2. **Age-appropriate language.** A 10-year-old using this site should be able to understand the main takeaways. Deeper scientific explanations should be in expandable "Learn More" sections.

3. **No medical diagnoses.** The site provides educational information. Include a clear disclaimer: "This site provides general educational information based on published research. It is not a substitute for professional medical, nutritional, or coaching advice. Always consult qualified professionals for personalized guidance."

4. **Privacy-first for minors.** This site will be used by children. Collect minimal data. No third-party trackers. No social features where kids interact with strangers. The account system is individual — no social/community features.

5. **Progressive disclosure.** Don't overwhelm users with all the science at once. Start simple, let users dig deeper if they want.

---

## BUILD ORDER

Execute in this order to minimize rework:

1. **Phase 1.1**: Scaffold project, install dependencies, configure all tools
2. **Phase 1.2**: Build layout, navigation, and routing skeleton
3. **Phase 1.3–1.4**: Set up database schema and authentication
4. **Phase 4**: Build the citation system (needed before content)
5. **Phase 2.1–2.5**: Build content sections one at a time (start with Sleep)
6. **Phase 3.1–3.2**: Build onboarding flow and daily log
7. **Phase 3.3–3.5**: Build dashboard, plans, and progress views
8. **Phase 5**: Polish, accessibility, performance, SEO

At each phase, pause and verify everything works before moving on. Run the dev server, test the UI, check for TypeScript errors. Don't accumulate tech debt.

---

## NOTES FOR CLAUDE CODE

- **Work incrementally.** Complete one file or feature at a time, test it, then move on.
- **Use server components by default.** Only add "use client" when you need interactivity, hooks, or browser APIs.
- **Keep components small.** If a component exceeds ~150 lines, break it up.
- **Type everything.** No `any` types. Define proper interfaces in `types/index.ts`.
- **Comment the "why", not the "what."** Code should be self-documenting; comments should explain non-obvious decisions.
- **When creating content**: For each section, first create the citation entries in `data/citations.ts`, then write the content referencing those citation IDs. This ensures every claim is traceable.
- **For the training plan generator**: Base recommendations on the LTAD stages described above. Don't invent arbitrary numbers — use the guidelines from the research (e.g., training-to-competition ratios, recommended session frequencies by age).
- **For the daily log**: Prioritize UX speed. A player filling this out after a tiring training session needs it to be fast and effortless. Sliders > text inputs. Defaults > blank fields.

---

*This prompt was prepared with research from PubMed Central, Frontiers in Sports and Active Living, the American Academy of Pediatrics, UEFA, ISSPF, US Youth Soccer, Sports Dietitians Australia, and the Journal of Science in Sport and Exercise, among other peer-reviewed sources.*
