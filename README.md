# Electrolights Team Website — FTC Team 30686

## 🎯 Vision & Mission

This platform exists to completely redefine what an FTC robotics team website can be. We are executing a massive overhaul to build a "$100k-tier" digital experience that blurs the lines between a traditional engineering portfolio and a deeply interactive, kinetic web application.

Our mission is twofold:

1. **The Public Showcase (The Hook):** To instantly paralyze visitors—sponsors, competition judges, and fellow engineers—with awe. We refuse to use stereotypical generic templates. Through WebGL physics, Apple-style scroll assemblies, and dynamic data charting, we will prove that our digital engineering is just as relentless as our physical robot, **Vectair**. This site serves as the ultimate flex of our flagship capabilities (like our 21-ball auto) and our massive core outreach footprint (mentoring 15+ FLL teams).
2. **The Tactical Sub-Application (The Machine Room):** To operate a securely authenticated, hidden internal portal that powers the logistics of Team 30686. This isn't just a website — it's our internal master control center utilizing live Supabase data grids tightly tracking match scouting telemetry, parts inventory, and hardware/software sprint backlogs.

---

## 🗂️ File Architecture

```
src/
│
├── main.tsx                              # App entry point
├── App.tsx                               # Routes ONLY — no logic, no JSX beyond router
│
├── router/
│   ├── PublicRoutes.tsx                  # All public route definitions
│   ├── PortalRoutes.tsx                  # All /portal/* route definitions
│   └── AuthGuard.tsx                     # Redirects unauthenticated users to /portal/login
│
├── layouts/
│   ├── PublicLayout.tsx                  # Noise overlay + spotlight cursor + Lenis init + FluidMenu
│   └── PortalLayout.tsx                  # Sidebar + toast provider + command palette shell
│
├── pages/                                # ONE file per route — thin shells only, no logic
│   ├── public/
│   │   ├── LandingPage.tsx
│   │   ├── TeamPage.tsx
│   │   ├── RobotPage.tsx
│   │   ├── OutreachPage.tsx
│   │   ├── MatchesPage.tsx
│   │   ├── SponsorsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── AwardsPage.tsx
│   │   └── NotFoundPage.tsx              # 404 — themed, not boring
│   └── portal/
│       ├── PortalLogin.tsx
│       ├── PortalDashboard.tsx
│       ├── PortalTasks.tsx
│       ├── PortalCalendar.tsx
│       ├── PortalInventory.tsx
│       ├── PortalScouting.tsx
│       ├── PortalUpdates.tsx
│       └── PortalAdmin.tsx
│
├── features/                             # All heavy logic — isolated per domain
│   ├── landing/
│   │   ├── HeroSection.tsx               # Main hook, video mask, parallax
│   │   ├── StatsBar.tsx                  # OPR, points, matches played
│   │   ├── CountdownTimer.tsx            # Next event countdown
│   │   ├── AwardsCallout.tsx             # Innovate Winner, Inspire Finalist
│   │   └── KineticBackground.tsx         # WebGL fluid mouse-reactive bg
│   │
│   ├── team/
│   │   ├── MemberCard.tsx                # 3D tilt-glare card, X-ray hover
│   │   ├── RosterGrid.tsx                # Staggered spring layout
│   │   ├── SubteamFilter.tsx             # Gooey SVG morph filter
│   │   ├── ToolBadges.tsx                # SolidWorks, Java, OpenCV, etc.
│   │   ├── MemberAccordion.tsx           # Animated expanding bio
│   │   └── SeasonChangelog.tsx           # V1 → V2 → Vectair timeline
│   │
│   ├── robot/
│   │   ├── VectairViewer.tsx             # Three.js exploded view (.glb)
│   │   ├── AutoScrubPlayer.tsx           # Apple-style scroll → video playhead
│   │   ├── TerminalTypewriter.tsx        # Mock CLI typing tele-op code
│   │   ├── BeforeAfterSlicer.tsx         # CAD vs physical photo drag slider
│   │   ├── BlueprintSVG.tsx              # Self-drawing SVG transfer path
│   │   ├── HoverMagnifier.tsx            # Circular magnifier on intake photos
│   │   ├── SpecSheet.tsx                 # Drivetrain, intake, launcher specs
│   │   └── MagneticCADButton.tsx         # Cursor-pulled download CTA
│   │
│   ├── matches/
│   │   ├── BezierChart.tsx               # Season score arc chart
│   │   ├── FieldDiagram.tsx              # Neon SVG auto path vectors
│   │   ├── MatchCard.tsx                 # Score card with blur-up thumbnail
│   │   ├── OPRDisplay.tsx                # Live OPR from FTCScout API
│   │   └── VideoEmbed.tsx                # Competition footage with transitions
│   │
│   ├── outreach/
│   │   ├── FLLNodeGraph.tsx              # D3.js force graph — 30686 → FLL nodes
│   │   ├── EventMap.tsx                  # React Leaflet pinned workshop locations
│   │   ├── ImpactTimeline.tsx            # Mechanical lock-in scroll timeline
│   │   ├── PhotoCarousel.tsx             # Snap-physics rubber-band gallery
│   │   └── MorphingPath.tsx              # Fluid SVG community growth path
│   │
│   ├── sponsors/
│   │   ├── SponsorBento.tsx              # Asymmetric tier bento layout
│   │   ├── SponsorMarquee.tsx            # Infinite velocity marquee
│   │   ├── FlipCoin3D.tsx                # Platinum rotating 3D coin
│   │   └── LiquidButton.tsx              # Liquid fill hover CTA
│   │
│   ├── contact/
│   │   ├── ContactForm.tsx               # Validated form + rate limiting
│   │   ├── PlaneAnimation.tsx            # Slingshot → airplane exit
│   │   ├── ConfettiCannon.tsx            # Physics confetti on success
│   │   ├── NeonInputTracer.tsx           # SVG border race on focus
│   │   ├── MagneticSocials.tsx           # Proximity-following social icons
│   │   └── SignaturePad.tsx              # Canvas draw-your-name block
│   │
│   └── portal/
│       ├── dashboard/
│       │   ├── WelcomeWidget.tsx         # Personalized greeting + priority tasks
│       │   ├── ScheduleWidget.tsx        # 7-day mini calendar
│       │   ├── AttendanceToggle.tsx      # Clock-in/out → attendance_logs
│       │   ├── CompetitionCountdown.tsx  # Next comp + next shop session
│       │   └── BroadcastFilter.tsx       # Hardware / Software / Outreach filter
│       │
│       ├── tasks/
│       │   ├── KanbanBoard.tsx           # DnD Kit + spring physics board
│       │   ├── KanbanCard.tsx            # Card with context menu, aurora drop
│       │   ├── TaskModal.tsx             # Full task detail — assignees, files, sub-tasks
│       │   ├── SubtaskChecklist.tsx      # Nested checklist inside modal
│       │   ├── AvatarCluster.tsx         # Overlapping assignee avatars
│       │   └── DestructiveHold.tsx       # 2s hold-to-delete mechanic
│       │
│       ├── calendar/
│       │   ├── TeamCalendar.tsx          # FullCalendar with event type grouping
│       │   ├── PulseRingEvent.tsx        # Sonar pulse on live events
│       │   └── MeetingMinutes.tsx        # TipTap rich text, searchable archive
│       │
│       ├── updates/
│       │   ├── AnnouncementFeed.tsx      # Real-time feed with unread badge
│       │   ├── BroadcastForm.tsx         # Subteam-targeted push form
│       │   └── NotificationPrefs.tsx     # Per-user notification settings
│       │
│       ├── inventory/
│       │   ├── PartsGrid.tsx             # TanStack Table, virtualized 1000+ rows
│       │   ├── InlineCellEditor.tsx      # Double-click → edit → Enter → save
│       │   ├── LowStockAlert.tsx         # Row highlight on threshold breach
│       │   ├── PurchaseForm.tsx          # Request raw materials
│       │   └── ExpenseLog.tsx            # Budget consumed vs remaining
│       │
│       ├── scouting/
│       │   ├── ScoutingForm.tsx          # Match entry — auto, tele, endgame, notes
│       │   ├── HeatmapField.tsx          # Interpolated color overlay field map
│       │   └── ScoutingGrid.tsx          # Inline-editable entry table
│       │
│       └── admin/
│           ├── RosterManager.tsx         # Add/remove members, change roles
│           ├── AuditLogViewer.tsx        # Who did what, when
│           ├── SessionManager.tsx        # View + revoke active sessions
│           ├── SponsorCRM.tsx            # Lead status tracker
│           ├── VolunteerSummary.tsx      # Auto-sum hours per member
│           └── DirectLinkHub.tsx         # GitHub, OnShape, Google Drive
│
├── components/                           # Truly shared, reusable atoms only
│   ├── ui/
│   │   ├── GlassCard.tsx                 # Glassmorphism container
│   │   ├── MagneticButton.tsx            # Cursor-pull button base
│   │   ├── NeonInput.tsx                 # Input with SVG glow tracing
│   │   ├── SkeletonLoader.tsx            # Shimmer placeholder
│   │   ├── ToastProvider.tsx             # Global slide-in toast system
│   │   ├── CommandPalette.tsx            # Cmd+K spotlight search
│   │   ├── ContextMenu.tsx               # Custom right-click menu
│   │   ├── BottomSheet.tsx               # Mobile slide-up modal
│   │   ├── BackdropModal.tsx             # Heavy blur backdrop popup
│   │   └── ErrorBoundary.tsx             # Per-route crash containment
│   └── motion/
│       ├── SpringFadeIn.tsx              # Staggered spring entrance
│       ├── MarqueeLoop.tsx               # Seamless infinite scroll
│       ├── StickyReveal.tsx              # Mechanical sticky content blocks
│       └── ReducedMotionWrapper.tsx      # Disables all animation if OS setting on
│
├── hooks/
│   ├── useAuth.ts                        # Session, user, role helpers
│   ├── useCursor.ts                      # Global cursor position tracking
│   ├── useSupabase.ts                    # Typed Supabase client wrapper
│   ├── useScrollProgress.ts              # Scroll % for GSAP timelines
│   ├── useReducedMotion.ts               # prefers-reduced-motion listener
│   ├── useRealtime.ts                    # Supabase realtime subscription helper
│   ├── useOfflineFallback.ts             # Detect + handle no-network state
│   └── useHaptic.ts                      # Web Vibration API wrapper (mobile)
│
├── lib/
│   ├── supabase.ts                       # Supabase client init (typed)
│   ├── ftcscout.ts                       # FTCScout API wrapper
│   ├── resend.ts                         # Contact form email via Resend API
│   ├── utils.ts                          # cn(), formatDate(), clamp(), etc.
│   └── constants.ts                      # Team number, colors, roster data, season info
│
├── contexts/
│   ├── AuthContext.tsx                   # Session + role provider
│   └── ThemeContext.tsx                  # Dark/light mode + iris transition
│
└── assets/
    ├── models/                           # .glb / .gltf — Vectair 3D model
    ├── logos/                            # Sponsor logos (WebP)
    ├── media/                            # Match videos, workshop photos
    └── fonts/                            # Custom typefaces
```

---

## 🗄️ Supabase Database Schema

```sql
profiles          (id, name, subteam, role, avatar_url, bio, tools[])
tasks             (id, title, description, status, subteam, assignees[], deadline, attachments[], created_by)
subtasks          (id, task_id, title, completed)
calendar_events   (id, title, type, date, location, created_by)
meeting_minutes   (id, event_id, body_richtext, created_by, created_at)
inventory_parts   (id, name, vendor, qty, low_stock_threshold, location, unit_cost)
purchase_requests (id, part_name, qty, reason, requested_by, status)
expenses          (id, description, amount, category, logged_by, date)
scouting_entries  (id, match_num, team_num, auto_score, tele_score, endgame, notes, data jsonb)
announcements     (id, body, subteam_target, created_by, created_at)
attendance_logs   (id, user_id, clock_in, clock_out)
volunteer_hours   (id, user_id, event, hours, date)
sponsors          (id, name, tier, logo_url, color_hex, website, active)
sponsor_leads     (id, company, contact_name, status, notes, last_contacted)
audit_logs        (id, user_id, action, target_table, target_id, timestamp)
sessions          (managed by Supabase Auth — view via admin panel)
```

**RLS Policy Rules:**
- `student` — read own profile, read/write tasks, read calendar, enter scouting, read announcements
- `mentor` — all student perms + create events, approve purchase requests, broadcast announcements
- `admin` — full access, delete, roster management, audit log access, session revocation

---

## 🌐 Application Routing Tree

```
/ (App.tsx — Global Layout)
│
├── /                   Landing Page        Parallax hero, stats, countdown, awards
├── /team               Team Page           Roster bios, 3D cards, changelog
├── /robot              Vectair Showcase    Three.js exploded view, 21-ball auto
├── /matches            Match Data          Live OPR, bezier charts, field diagrams
├── /outreach           Outreach Hub        D3 node graph, map, impact timeline
├── /sponsors           Sponsor Deck        Bento tiers, marquee, 3D coins
├── /contact            Contact             Paper airplane form, signature pad
├── /awards             Awards              Innovate Winner, Inspire Finalist showcase
├── /404                Not Found           Themed error page
│
└── /portal             🔒 AuthGuard
    ├── /login          Auth Gateway        OAuth + magic link + password reset
    ├── /               Dashboard           Welcome widget, schedule, attendance
    ├── /tasks          Task Management     Kanban boards (HW + SW)
    ├── /calendar       Team Schedule       Competition, outreach, shop sessions
    ├── /updates        Announcements       Subteam-targeted push feed
    ├── /scouting       Match Scouting      Data entry + heatmap field
    ├── /inventory      Parts Inventory     Virtualized grid, inline edit, alerts
    └── /admin          Admin Panel         Roster, audit log, sessions, CRM
```

---

## 🚀 Development Roadmap

---

### PRE-PHASE 0 — Project Bootstrap (Days 1–3)

*Do this before touching a single component or you will regret it.*

**Tooling & Config**
- [x] Init Vite + React + TypeScript
- [x] Configure absolute imports (`@/components/...`)
- [x] Tailwind CSS + CSS variables for team colors (cyan, electric blue, dark bg)
- [x] ESLint + Prettier + Husky pre-commit hooks
- [x] `.env` structure: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_RESEND_KEY`
- [ ] Vercel project linked to GitHub — auto-deploy from day 1
- [ ] Separate Supabase projects for `dev` and `prod`

**Database**
- [x] Init all tables from schema above
- [x] Enable RLS on every table from day 1
- [x] Write RLS policies for `student` / `mentor` / `admin` roles
- [x] Seed dev DB: placeholder sponsors, mock team profiles, test events

**Global Infrastructure**
- [x] React Query (`TanStack Query`) setup with global client
- [x] Global `ErrorBoundary` wrapping entire app
- [x] Suspense + `SkeletonLoader` fallback system wired
- [x] `useReducedMotion` hook built — passed into every animated component
- [x] WebGL capability detection utility — `canUseWebGL()` boolean
- [x] `prefers-reduced-motion` disables all GSAP / Framer Motion if set

---

### PHASE 1 — Public Foundation (Weeks 1–2)

**Sprint 1.1 — Global Shell**
- `App.tsx` router tree (public vs `/portal`)
- `AuthGuard.tsx` — redirect unauthenticated to `/portal/login`
- `PublicLayout.tsx` — noise overlay, spotlight cursor, Lenis smooth scroll init, `FluidMenu`
- `PortalLayout.tsx` shell (sidebar placeholder, toast layer)
- `ScrollToTop` on every route change
- 404 page — themed, on-brand, not boring
- React Helmet Async: unique `<title>` and `<meta>` per page
- Open Graph image + description for every public page
- `sitemap.xml` + `robots.txt`
- Plausible Analytics script (privacy-friendly, no cookies)
- `ReducedMotionWrapper` applied globally
- WebGL fallback: detect, render static fallback content if GPU unavailable
- Cookie / privacy notice if analytics enabled

**Sprint 1.2 — Landing Page**
- Hero: team name, number, season theme, rookie highlights
- Typography mask: match video playing inside massive "30686" text
- Kinetic fluid background (Vanta.js first pass → custom GLSL later)
- Vectair parallax hero (high-res PNG first, swap to Three.js model in Phase 2)
- Stats bar: OPR, total points, matches played (hardcoded → Supabase in Phase 3)
- "Next Event" countdown timer
- Awards callout block (Innovate Winner, Inspire Finalist)
- GSAP ScrollTrigger scroll-reveal timelines
- Odometer spinner on stats
- Spotlight cursor radial gradient
- Lenis smooth scroll configured
- Noise texture overlay (global)
- Mobile responsive pass

**Sprint 1.3 — Team Page**
- Roster data in `constants.ts` (name, subteam, role, tools, bio, photo)
- `RosterGrid` with subteam filter (Hardware / Software / Outreach / Mentors)
- `MemberCard` — 3D tilt-glare (VanillaTilt or custom mouse math)
- X-Ray hover mode (CSS clip-path swaps to alt photo)
- Gooey SVG filter on filter transition between subteams
- Staggered spring physics entrance (Framer Motion)
- Cursor-following tooltip with elastic delay
- Text glitch effect on member titles
- Animated accordion bios (smooth height transition)
- Tool proficiency badges (SolidWorks, Java, OpenCV, OnShape, FreeCAD)
- Team origins / history narrative block
- Season changelog: V1 → V2 → Vectair (photos + build notes)
- Mobile responsive pass

**Sprint 1.4 — Sponsors Page**
- Sponsors pulled from Supabase `sponsors` table — no code touch to update tiers
- Bento-box tier layout (Platinum asymmetric large, Gold/Silver smaller)
- 3D flipping coin for Platinum sponsors (CSS 3D first, Three.js swap optional)
- Infinite velocity marquee — speeds up on hover
- Dynamic color extraction from logo URL → card border glow (hex from `sponsors.color_hex`)
- Liquid button fill on "Sponsor Us" hover (cyan fill animation)
- 501(c)(3) info block
- Business pitch deck PDF download (hosted on Supabase Storage)
- Mobile responsive pass

---

### PHASE 2 — Complex Visualizers (Weeks 3–4)

**Sprint 2.1 — Vectair Robot Page**
- Drivetrain spec sheet (motors, gear ratios, dead-wheels)
- Side-spike intake tolerances
- Transfer system logic block
- Launcher compression + angles
- Shoot-on-the-move math breakdown
- Vision pipeline / OpenCV auto-aim explanation
- 21-ball auto step-by-step breakdown
- Season changelog V1 → V2 → Vectair (CAD screenshots)
- CAD STEP file download (Supabase Storage)
- Three.js exploded view — `.glb` model, drag to explode drivetrain from intake
- Apple-style scroll scrubbing — scrolling controls 21-ball auto video playhead
- Terminal typewriter — mock CLI physically typing tele-op handler code
- Before/After slicer — drag to compare CAD model vs physical build photo
- SVG line drawing — transfer mechanism blueprint paths drawing live
- Hover magnifier — circular zoom on high-res intake photos
- Magnetic "Download CAD" button (cursor pull)
- WebGL fallback: static spec table + image grid if GPU unavailable
- Mobile responsive pass

**Sprint 2.2 — Matches / Data Page**
- FTCScout API integration (live OPR, match results) via `lib/ftcscout.ts`
- Cache API responses in React Query — do not hit on every render
- Match list with score cards
- Animated bezier charting (score over season arc)
- Autonomous path diagrams (SVG neon vectors on field diagram)
- Embedded competition YouTube footage
- View Transitions API on match card switching
- Blur-up image placeholders (dominant color → sharp on load)
- Match scouting data export — CSV download
- Mobile responsive pass

**Sprint 2.3 — Outreach Page**
- 15+ FLL teams documented (names, schools, mentorship dates)
- D3.js force node graph: 30686 in center → 15 bouncing FLL team nodes
- Middle school curriculum breakdown block
- Summer STEM camp signup link
- Total volunteer hours metric (pulled from Supabase `volunteer_hours` — public aggregate)
- Estimated local economic impact stat
- Snap-physics photo carousel (workshop photos, heavy rubber-band inertia)
- Interactive dark map (React Leaflet pinned workshop locations)
- Mechanical timeline: scroll past date → CLACK sound + visual lock-in
- Fluid morphing SVG path as community growth metaphor
- Mobile responsive pass

**Sprint 2.4 — Contact Page**
- Email form with validation (react-hook-form + zod)
- Rate limiting via Supabase Edge Function (max 5 submissions / IP / hour) or Resend API
- Workshop location map embed
- Instagram + Twitch social handles
- Paper airplane sling: submit button pulls back → transforms into airplane → exits screen
- Confetti cannon (Canvas API) on successful submission
- Neon SVG border trace racing around input fields on focus
- Magnetic social icons — follow cursor by proximity
- Digital signature pad (Canvas API — draw your name)
- Privacy notice if analytics enabled
- Mobile responsive pass

---

### PHASE 3 — Portal Auth + Dashboard (Week 5)

**Sprint 3.1 — Auth Layer**
- Supabase OAuth (Google + GitHub)
- Magic link email sign-in
- Password reset flow
- `AuthContext` + `useAuth` hook providing session, user, role
- `AuthGuard` redirect confirmed working for all `/portal/*` routes
- Active session list + revoke (Supabase admin API)
- Audit log: write to `audit_logs` on every destructive action
- Role system (`student` / `mentor` / `admin`) enforced via RLS + client-side gate
- RLS policy final check — every table locked before portal goes live
- Magic auth morph animation: login button scales into app shell
- Biometric CSS aesthetic (FaceID shimmer prompt on mobile)
- Mobile responsive pass

**Sprint 3.2 — Portal Dashboard**
- Personalized "Welcome Back" widget (name, subteam, today's priority tasks)
- 7-day mini schedule widget (from `calendar_events`)
- Attendance clock-in / clock-out toggle (writes to `attendance_logs`)
- Live countdown: next competition + next shop session
- Subteam broadcast filter (Hardware / Software / Outreach)
- `Cmd+K` Command Palette — search teammates, tasks, parts instantly
- Portal JS bundle fully split from public bundle (Vite chunk config)
- Skeleton shimmer on every widget while data loads
- React Query aggressive caching (`staleTime` tuned per widget type)
- Iris dark mode transition (circular expanding mask flips theme)
- `PortalLayout` sidebar physics — spring collapse to icons
- Global toast provider confirmed (slide-in success/error/info)
- Supabase Realtime subscription: values updated by others flash yellow
- `useOfflineFallback` hook: detect no-network → display offline banner, serve cache
- Mobile responsive pass

---

### PHASE 4 — Portal Operations Engine (Weeks 6–7)

**Sprint 4.1 — Task Management**
- Hardware Kanban columns: To-Do → CAD → Machining → Assembled → Tested
- Software sprint columns: Vision → TeleOp → Auto Routines → Tuning
- DnD Kit drag-and-drop with Framer Motion gravity + spring physics on cards
- Aurora glow on droppable column when card is hovering over it
- Task modal: title, description, subteam, assignees, deadline, attachments
- Multi-user assignment with `AvatarCluster` display
- Sub-task nested checklist inside modal
- Deadline countdown + OVERDUE badge (red, animated)
- Media attachments: upload CAD screenshots to Supabase Storage
- Optimistic UI: checkbox ticks instantly while DB syncs silently
- Right-click `ContextMenu` on cards (custom, intercepts browser menu)
- `BackdropModal` for task detail
- Mini confetti pop on Epic milestone task completion
- Lottie empty state (sleepy robot SVG animation when board is empty)
- Wipe transition animation between portal sidebar tabs
- Swipe-to-action on mobile (swipe left = delete confirm, swipe right = complete)
- `BottomSheet` modals on mobile instead of centered popups
- `DestructiveHold` component: hold 2s to confirm delete
- Mobile responsive pass

**Sprint 4.2 — Calendar + Meeting Minutes**
- Master calendar (FullCalendar) with color-coded event types: Scrimmage, Tournament, Outreach, Shop
- `PulseRingEvent` — sonar pulse animation on current/active events
- New event form gated to `mentor` + `admin` roles
- Meeting minutes: TipTap rich text editor, archived by event
- Minutes searchable by date
- Export minutes to PDF (browser print or jsPDF)
- Toast notification when new event is created
- Realtime: new events appear live for all portal users
- Mobile responsive pass

**Sprint 4.3 — Announcements / Updates**
- Global push announcement form (mentor / admin only)
- Subteam targeting: broadcast to Hardware only, Software only, or all
- Notification preferences per user (all announcements / subteam-only / none)
- Announcement feed with unread indicator badge
- Realtime: new announcement flashes in live without refresh
- Mobile responsive pass

---

### PHASE 5 — Portal Data Grids + Scouting (Weeks 7–8)

**Sprint 5.1 — Inventory**
- Parts ledger: name, vendor, qty, low_stock_threshold, location, unit cost
- TanStack Table with grid virtualization — 1000+ rows at 60fps
- Sticky frosted-glass column headers (backdrop-blur pinned to top)
- Inline cell editing: double-click → edit in place → Enter → save to DB
- Low-stock row highlight when `qty <= low_stock_threshold`
- `LowStockAlert` banner summary at top of page
- Purchase request form — logs to `purchase_requests` table
- Expense log: budget consumed vs remaining (from `expenses` table)
- `DestructiveHold` on row delete (2s hold)
- Haptic feedback on mobile row actions (Web Vibration API)
- CSV export of full parts ledger
- Dynamic text resizing (CSS clamp — identical density 1080p → 4K)
- Hidden scrollbars (visible only while actively scrolling)
- Mobile responsive pass

**Sprint 5.2 — Scouting**
- Match data entry form: match #, team #, auto score, tele score, endgame, notes
- JSON serialization to Supabase `scouting_entries`
- `HeatmapField` — interpolated color overlay on field map from scouting array
- Inline grid editing on existing scouting entries
- CSV export of all scouting data
- Delete gated to `admin` role (RLS + client check)
- Mobile responsive pass

**Sprint 5.3 — Admin Panel**
- Roster management: add / remove members, change subteam, change role
- Content editing: update sponsor tiers directly (writes to `sponsors` table)
- Audit log viewer: searchable table of all actions from `audit_logs`
- Session manager: list active sessions, revoke specific session
- Direct link hub: GitHub, OnShape, Google Drive (editable by admin)
- Volunteer hour auto-sum per member (computed from `attendance_logs` + `volunteer_hours`)
- Sponsor CRM: lead pipeline (Contacted → Negotiating → Confirmed → Declined)
- Mobile responsive pass

---

### PHASE 6 — Polish + Launch (Weeks 9–10)

**Sprint 6.1 — Performance**
- Lighthouse audit — target >90 all four categories on every page
- Vite bundle visualizer — find and lazy-load heavy chunks (Three.js, D3)
- All images converted to WebP with correct `srcset` sizing
- Three.js `.glb` model DRACO compressed
- React Query `staleTime` / `gcTime` tuned per data type
- Prefetch route chunks on nav hover

**Sprint 6.2 — Accessibility**
- ARIA labels on every interactive element
- Full keyboard navigation — correct tab order, visible focus rings
- Color contrast audit (WCAG AA minimum across all themes)
- Screen reader test on: landing page, login flow, task modal, inventory grid
- Skip-to-content link on every page
- All icon-only buttons have `aria-label`

**Sprint 6.3 — Cross-Browser + Device**
- Chrome, Firefox, Safari, Edge — full pass
- iOS Safari specifics: WebGL context, CSS backdrop-filter, Canvas API
- Android Chrome
- Tablet layout pass (768px–1024px breakpoints)
- Final `prefers-reduced-motion` audit — every animation component verified

**Sprint 6.4 — Security Hardening**
- Supabase RLS final audit — attempt access as each role, verify denials
- Contact form rate limit confirmed live
- Env var audit — zero sensitive keys exposed client-side
- Content Security Policy headers configured on Vercel
- `npm audit` — zero high/critical vulnerabilities
- Supabase Storage bucket policies — files readable only by authenticated portal users where required

**Sprint 6.5 — Launch**
- Custom domain configured on Vercel
- Supabase `prod` environment fully separate from `dev`
- Seed prod DB: real sponsor data, real team profiles, real upcoming events
- Smoke test every public route (logged out)
- Smoke test every portal route as `student`, `mentor`, `admin`
- Share with sponsors, judges, and competition community

---

## ⚠️ Risk Register

| Risk | Severity | Mitigation |
|---|---|---|
| Three.js exploded view scope creep | High | Time-box to 1 week — ship static fallback if not done |
| Supabase RLS misconfiguration leaks portal data | Critical | Audit every policy before portal goes live — test as each role |
| WebGL unsupported on judge's or sponsor's device | Medium | `canUseWebGL()` detection built in Phase 0 — fallback always ships |
| Shop WiFi drops mid-portal session | Medium | React Query offline cache + `useOfflineFallback` banner |
| Team photo / CAD assets never delivered | High | Enforce asset deadline = end of Week 2 — use placeholders until then |
| FTCScout API rate limits | Low | Cache all responses in React Query — never fetch on every render |
| D3.js node graph performance on low-end devices | Medium | Limit simultaneous physics nodes, reduce on mobile |
| Portal real-time subscriptions overloading Supabase free tier | Medium | Scope subscriptions tightly — only subscribe on pages that need it |

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + TypeScript (Vite) |
| Routing | react-router-dom v6 |
| Styling | Tailwind CSS + CSS variables |
| Animation | Framer Motion + GSAP ScrollTrigger + Lenis |
| 3D / WebGL | Three.js (r3f optional) |
| Data Viz | D3.js, Recharts (bezier charts) |
| Maps | React Leaflet + CartoDB |
| Drag and Drop | DnD Kit |
| Tables | TanStack Table (virtualized) |
| Rich Text | TipTap |
| Forms | react-hook-form + zod |
| Backend / Auth | Supabase (Postgres + Auth + Storage + Realtime + Edge Functions) |
| Email | Resend API |
| Live Scores |FTCScout API |
| Caching | TanStack Query (React Query) |
| Analytics | Plausible (privacy-first) |
| Deployment | Vercel |
| Lottie | lottie-react (empty states) |

---

## 📅 Timeline Summary

| Phase | Focus | Duration |
|---|---|---|
| Phase 0 | Bootstrap, DB schema, tooling | Days 1–3 |
| Phase 1 | Public shell, landing, team, sponsors | Weeks 1–2 |
| Phase 2 | Robot, matches, outreach, contact | Weeks 3–4 |
| Phase 3 | Portal auth + dashboard | Week 5 |
| Phase 4 | Portal tasks, calendar, updates | Weeks 6–7 |
| Phase 5 | Inventory, scouting, admin | Weeks 7–8 |
| Phase 6 | Polish, accessibility, security, launch | Weeks 9–10 |
