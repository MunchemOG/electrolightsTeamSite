# Electrolights Team Website — FTC Team 30686

## 🎯 Vision & Mission

This platform exists to completely redefine what an FTC robotics team website can be. We are executing a massive overhaul to build a "$100k-tier" digital experience that blurs the lines between a traditional engineering portfolio and a deeply interactive, kinetic web application.

Our mission is twofold:

1. **The Public Showcase (The Hook):** To instantly paralyze visitors—sponsors, competition judges, and fellow engineers—with awe. We refuse to use stereotypical generic templates. Through WebGL physics, Apple-style scroll assemblies, and dynamic data charting, we will prove that our digital engineering is just as relentless as our physical robot, **Vectair**. This site serves as the ultimate flex of our flagship capabilities (like our 21-ball auto) and our massive core outreach footprint (mentoring 15+ FLL teams).
2. **The Tactical Sub-Application (The Machine Room):** To operate a securely authenticated, hidden internal portal that powers the logistics of Team 30686. This isn't just a website — it's our internal master control center utilizing live Supabase data grids tightly tracking match scouting telemetry, parts inventory, and hardware/software sprint backlogs.

---

## ✨ UI Features Index

A complete map of every kinetic, interactive, and visual feature — where it lives, what component owns it, and what it does.

### Public Showcase — 46 Features

| # | Feature | Page / Route | Component | Description |
|---|---|---|---|---|
| 1 | **Glassmorphism Design** | Global (all public pages) | `components/ui/GlassCard.tsx` | Semi-transparent frosted glass container applied to stat cards, hero overlays, and sponsor tiles across every public page. |
| 2 | **Kinetic Mesh Background** | `/` Landing | `features/landing/KineticBackground.tsx` | WebGL fluid simulation (Vanta.js → custom GLSL) that reacts to mouse velocity with pulsing team-color flows. |
| 3 | **Mechanical Sticky Reveals** | `/team`, `/robot` | `components/motion/StickyReveal.tsx` | Content blocks lock in place via `position: sticky` while inner layers animate into view — used for team story and robot spec reveals. |
| 4 | **Physics-Based Floating Nav** | Global (all public pages) | `layouts/PublicLayout.tsx` → `FluidMenu` | Centralized floating menu that expands on click with rotating icons, spring scaling, and smooth physics — accessible anywhere on the page. |
| 5 | **Magnetic CTA Buttons** | `/robot`, `/sponsors`, `/contact` | `components/ui/MagneticButton.tsx` | Buttons that track cursor proximity and pull slightly toward the pointer, used on Download CAD, Sponsor Us, and Submit CTAs. |
| 6 | **Back-to-Top Frosted Glass Button** | Global (all public pages) | `layouts/PublicLayout.tsx` | Scroll-distance-aware floating button with scaling hover state and a frosted-glass backdrop. |
| 7 | **WebGL Liquid Simulation** | `/` Landing | `features/landing/KineticBackground.tsx` | Mouse-velocity-reactive WebGL fluid that breathes and flows behind the hero section. Same component as #2 — the full GLSL pass. |
| 8 | **GSAP ScrollTimeline** | `/` Landing | `features/landing/HeroSection.tsx` | Full-page GSAP `ScrollTrigger` architecture driving scroll-reveal of stats, callouts, and the hero text sequence. |
| 9 | **Vectair 3D Parallax** | `/` Landing | `features/landing/HeroSection.tsx` | High-res robot PNG (Phase 1) → Three.js model (Phase 2) that mathematically shifts perspective based on scroll offset and gyroscope input on mobile. |
| 10 | **Typography Video Mask** | `/` Landing | `features/landing/HeroSection.tsx` | A match highlight video plays exclusively *inside* clipped "30686" text via CSS `mix-blend-mode` / SVG clip-path masking. |
| 11 | **Lenis Smooth Scroll** | Global (all public pages) | `layouts/PublicLayout.tsx` | Friction-based buttery smooth scrolling initialized once at layout level, passed as context to GSAP ScrollTrigger. |
| 12 | **Spotlight Cursor** | Global (all public pages) | `layouts/PublicLayout.tsx` + `hooks/useCursor.ts` | Radial gradient light follows the cursor behind hero sections, implemented via `useCursor` tracking raw mouse position. |
| 13 | **Noise Texture / Film Grain Overlay** | Global (all public pages) | `layouts/PublicLayout.tsx` | A fixed SVG turbulence filter or CSS `background-image` of a transparent PNG grain overlaid at `pointer-events: none` on the entire DOM. |
| 14 | **3D Tilt-Glare Profile Cards** | `/team` | `features/team/MemberCard.tsx` | Mouse X/Y tracked per card — translates to CSS `rotateX`/`rotateY` and a dynamic glossy light reflection highlight moving across the card surface. |
| 15 | **Gooey SVG Filter** | `/team` | `features/team/SubteamFilter.tsx` | An SVG `feGaussianBlur` + `feColorMatrix` gooey filter applied to the filter pill buttons, making them liquid-morph between states. |
| 16 | **Staggered Spring Physics** | `/team`, `/sponsors` | `components/motion/SpringFadeIn.tsx` | Framer Motion `staggerChildren` + spring variants — cards cascade into the viewport sequentially with elastic overshoot. |
| 17 | **X-Ray Hover Mode** | `/team` | `features/team/MemberCard.tsx` | Hovering a member card performs a CSS clip-path or opacity crossfade to reveal an alternative "X-ray" or fun secondary photo. |
| 18 | **Elastic Cursor-Following Tooltips** | `/team` | `features/team/MemberCard.tsx` | Custom tooltip that tracks cursor position with a slight spring delay (`useSpring`) — shows tool proficiencies and fun facts on hover. |
| 19 | **Text Glitch Effect** | `/team` | `features/team/MemberCard.tsx` | CSS `@keyframes` clip-path glitch animation triggered periodically on member title text for a cyberpunk aesthetic. |
| 20 | **Animated Accordions** | `/team` | `features/team/MemberAccordion.tsx` | Smooth height transition (`Framer Motion layout` or `max-height` CSS transition) for expanding member bio blocks. |
| 21 | **Three.js Exploded View** | `/robot` | `features/robot/VectairViewer.tsx` | Interactive `.glb` model — dragging explodes the drivetrain away from the intake using morph targets or manual mesh translation. |
| 22 | **Apple-Style Scroll Video Scrubbing** | `/robot` | `features/robot/AutoScrubPlayer.tsx` | Scroll progress (via `useScrollProgress`) maps linearly to the `currentTime` of a `<video>` element showing the 21-ball auto routine. |
| 23 | **Terminal Typewriter** | `/robot` | `features/robot/TerminalTypewriter.tsx` | A mock CLI window that physically types the tele-op handler code character-by-character using a recursive `setTimeout` loop, with blinking cursor. |
| 24 | **Before/After Image Slicer** | `/robot` | `features/robot/BeforeAfterSlicer.tsx` | Drag handle splits the viewport between the CAD render and the physical build photo — uses `pointer` events and `clip-path: inset()`. |
| 25 | **SVG Self-Drawing Paths** | `/robot` | `features/robot/BlueprintSVG.tsx` | SVG `stroke-dashoffset` animated to zero on scroll-enter, drawing the transfer mechanism blueprint live on screen. |
| 26 | **Hover Magnifier Glass** | `/robot` | `features/robot/HoverMagnifier.tsx` | A circular `div` with `overflow: hidden` that zooms locally into a high-res intake photo, following the cursor within the image bounds. |
| 27 | **D3.js Force Node Graph** | `/outreach` | `features/outreach/FLLNodeGraph.tsx` | D3 force simulation: Team 30686 as center node, 15+ FLL team nodes bouncing on elastic links — draggable and interactive. |
| 28 | **Snap-Physics Photo Carousel** | `/outreach` | `features/outreach/PhotoCarousel.tsx` | Draggable gallery with heavy rubber-band inertia (Framer Motion `drag` + `dragElastic`) that snaps to the nearest photo on release. |
| 29 | **Interactive WebGL Dark Map** | `/outreach` | `features/outreach/EventMap.tsx` | React Leaflet map with a CartoDB dark tile layer, pinning workshop and outreach event locations across the region. |
| 30 | **Mechanical Timeline Lock** | `/outreach` | `features/outreach/ImpactTimeline.tsx` | Scroll-triggered: crossing an outreach date milestone triggers a CSS `transform` lock-in animation and plays an audible CLACK via the Web Audio API. |
| 31 | **Fluid Morphing SVG Path** | `/outreach` | `features/outreach/MorphingPath.tsx` | An SVG `<path>` whose `d` attribute smoothly interpolates between states as the user scrolls, representing community growth. |
| 32 | **Live Bezier Charting** | `/matches` | `features/matches/BezierChart.tsx` | Season match scores plotted as an animated bezier arc chart (Recharts custom curve), drawing itself on mount with an eased stroke animation. |
| 33 | **Neon SVG Field Path Vectors** | `/matches` | `features/matches/FieldDiagram.tsx` | SVG polylines glowing with `filter: drop-shadow` on a digital field diagram, tracing the 21-ball autonomous route. |
| 34 | **View Transitions API** | `/matches` | `features/matches/MatchCard.tsx` + router | Native browser `document.startViewTransition()` wrapping match card route changes for seamless, app-like page mounting. |
| 35 | **Blur-Up Image Placeholders** | `/matches` | `features/matches/MatchCard.tsx` | Match thumbnails load from a solid dominant hex color (stored in DB), cross-fading to a sharp image on load completion. |
| 36 | **Bento-Box Sponsor Tier Layout** | `/sponsors` | `features/sponsors/SponsorBento.tsx` | Asymmetric CSS Grid layout — Platinum tiles span 2 columns, Gold/Silver fit smaller cells, all with glassmorphism styling. |
| 37 | **3D Rotating Coin** | `/sponsors` | `features/sponsors/FlipCoin3D.tsx` | CSS `transform-style: preserve-3d` + continuous `rotateY` animation rendering Platinum sponsor logos as casually spinning coins. |
| 38 | **Infinite Velocity Marquee** | `/sponsors` | `features/sponsors/SponsorMarquee.tsx` + `components/motion/MarqueeLoop.tsx` | Seamless CSS `translateX` marquee that accelerates its `animation-duration` on hover via a CSS variable update. |
| 39 | **Dynamic Logo Color Extraction** | `/sponsors` | `features/sponsors/SponsorBento.tsx` | Sponsor card border glows the hex color stored in `sponsors.color_hex` — applied as a CSS `box-shadow` and `border-color` inline style. |
| 40 | **Liquid Button Fill** | `/sponsors` | `features/sponsors/LiquidButton.tsx` | "Sponsor Us" CTA fills with an animated cyan liquid on hover using a `clip-path: ellipse()` expanding from the bottom. |
| 41 | **Paper Airplane Slingshot** | `/contact` | `features/contact/PlaneAnimation.tsx` | Submit button animates backward (pull back) then transforms into an SVG paper airplane that arcs and exits the screen via GSAP path motion. |
| 42 | **Confetti Cannon** | `/contact` | `features/contact/ConfettiCannon.tsx` | On successful form submission, physics-based colored confetti particles burst from the submit button position using Canvas API. |
| 43 | **Neon SVG Input Border Trace** | `/contact` | `features/contact/NeonInputTracer.tsx` + `components/ui/NeonInput.tsx` | On focus, an SVG `<rect>` border races around the input field with a glowing neon stroke using `stroke-dashoffset` animation. |
| 44 | **Magnetic Social Icons** | `/contact` | `features/contact/MagneticSocials.tsx` | Social media icons dynamically translate toward cursor proximity within a defined radius using `mousemove` distance math. |
| 45 | **Canvas Digital Signature Pad** | `/contact` | `features/contact/SignaturePad.tsx` | A `<canvas>` element captures `pointerdown` + `pointermove` events to let users physically draw their name as part of the contact block. |
| 46 | **Odometer / Counter Spinner** | `/` Landing | `features/landing/StatsBar.tsx` | Numeric stats (OPR, total points, matches) animate from 0 to their final value with an eased counter on scroll-enter. |

---

### Portal Sub-Application — 30 Features

| # | Feature | Portal Route | Component | Description |
|---|---|---|---|---|
| 1 | **Bifurcated Chunking** | All `/portal/*` | `router/PortalRoutes.tsx` + Vite config | Portal JS bundle is fully split from the public bundle via Vite `manualChunks` — portal pages never bloat the public LCP. |
| 2 | **Magic Auth Morph** | `/portal/login` | `pages/portal/PortalLogin.tsx` | The login button smoothly scales and morphs into the portal app shell frame using a Framer Motion `layoutId` shared element transition. |
| 3 | **Sidebar Spring-Physics Collapse** | All `/portal/*` | `layouts/PortalLayout.tsx` | The sidebar nav collapses to icon-only width via a spring animation (`Framer Motion` `animate` on width), expanding on hover or toggle. |
| 4 | **Biometric CSS Aesthetic** | `/portal/login` | `pages/portal/PortalLogin.tsx` | A FaceID/TouchID shimmer ring animation plays on mobile login as a CSS `@keyframes` pulse — purely cosmetic, not functional auth. |
| 5 | **Cmd+K Command Palette** | All `/portal/*` | `components/ui/CommandPalette.tsx` | Global `keydown` listener intercepts `Cmd+K` / `Ctrl+K` — opens a Spotlight-style fuzzy-search modal over teammates, tasks, and parts. |
| 6 | **Skeleton Shimmer Loaders** | All `/portal/*` | `components/ui/SkeletonLoader.tsx` | Every dashboard widget and data grid shows an animated shimmer placeholder while React Query fetches data, preventing layout shift. |
| 7 | **Aggressive React Query Caching** | All `/portal/*` | `hooks/useSupabase.ts` + global Query Client | `staleTime` tuned per data type — tasks cache for 30s, calendar for 60s, inventory for 5min — making tab returns feel instant. |
| 8 | **Gravity Drag-and-Drop Kanban** | `/portal/tasks` | `features/portal/tasks/KanbanBoard.tsx` | DnD Kit provides drag primitives; Framer Motion overlays spring physics and a slight gravity drop animation when a card is released. |
| 9 | **Aurora Droppable Column Highlight** | `/portal/tasks` | `features/portal/tasks/KanbanCard.tsx` | Kanban columns emit a radial glowing gradient (CSS custom property animated on `isOver`) when a card is dragged over them. |
| 10 | **Slide-In Toast Notifications** | All `/portal/*` | `components/ui/ToastProvider.tsx` | Global toast system mounted in `PortalLayout` — snappy slide-in confirmations appear on all successful or failed DB writes. |
| 11 | **2-Second Destructive Hold** | `/portal/tasks`, `/portal/inventory` | `features/portal/tasks/DestructiveHold.tsx` | Holding the delete button for 2 seconds fills a progress ring — releasing early cancels. Prevents accidental data loss on critical deletes. |
| 12 | **Inline Cell Editing** | `/portal/inventory`, `/portal/scouting` | `features/portal/inventory/InlineCellEditor.tsx` | Double-clicking a TanStack Table cell replaces it with a controlled input; Enter/blur triggers an optimistic update + Supabase write. |
| 13 | **Sticky Frosted-Glass Table Headers** | `/portal/inventory` | `features/portal/inventory/PartsGrid.tsx` | TanStack Table header row is `position: sticky; top: 0` with `backdrop-filter: blur()` — stays pinned while thousands of rows scroll beneath. |
| 14 | **Grid Virtualization** | `/portal/inventory` | `features/portal/inventory/PartsGrid.tsx` | TanStack Virtual renders only the rows in the viewport — 1000+ parts rows render at a steady 60fps with no DOM bloat. |
| 15 | **Heatmap Interpolation** | `/portal/scouting` | `features/portal/scouting/HeatmapField.tsx` | Scouting position data array is fed into a D3 color scale — Canvas or SVG overlays interpolated heat colors across the field map in real time. |
| 16 | **Confetti on Milestone Completion** | `/portal/tasks` | `features/portal/tasks/KanbanCard.tsx` | When a task tagged "Epic" is marked complete, a mini canvas confetti burst fires from the cursor position via Canvas API. |
| 17 | **Avatar Clusters on Task Cards** | `/portal/tasks` | `features/portal/tasks/AvatarCluster.tsx` | Assigned member avatars overlap with a negative `margin-left` offset — hovering reveals a tooltip listing full names via Framer Motion. |
| 18 | **Haptic Feedback** | `/portal/inventory` (mobile) | `hooks/useHaptic.ts` | Wraps the Web Vibration API — short pulse on row scan, double pulse on low-stock alert, long pulse on destructive delete confirm. |
| 19 | **Pulse Ring on Live Events** | `/portal/calendar` | `features/portal/calendar/PulseRingEvent.tsx` | Calendar events that are currently active display a CSS `@keyframes` expanding ring (sonar pulse) to indicate live/ongoing status. |
| 20 | **Optimistic UI Updates** | `/portal/tasks`, `/portal/inventory` | `features/portal/tasks/SubtaskChecklist.tsx` | Checkbox state flips instantly in React state before the Supabase write resolves — `onError` rolls it back if the write fails. |
| 21 | **Swipe-to-Action** | `/portal/tasks` (mobile) | `features/portal/tasks/KanbanCard.tsx` | On mobile, dragging a task card left triggers a delete confirmation; dragging right marks it complete — implemented via Framer Motion `drag` bounds. |
| 22 | **Bottom Sheet Modals** | All `/portal/*` (mobile) | `components/ui/BottomSheet.tsx` | On viewports under 768px, detail forms and task modals slide up natively from the bottom instead of rendering as centered dialogs. |
| 23 | **Iris Dark Mode Transition** | All `/portal/*` | `contexts/ThemeContext.tsx` | Toggling dark mode triggers a `clip-path: circle()` expanding from the click point, masking the entire portal into dark theme. |
| 24 | **Hidden Scrollbars** | `/portal/inventory`, `/portal/tasks` | Global CSS in `PortalLayout.tsx` | `::-webkit-scrollbar` hidden by default; a thin scrollbar fades in on `scroll` event and fades out after 1.5s of inactivity. |
| 25 | **Lottie Empty States** | `/portal/tasks`, `/portal/calendar` | `features/portal/tasks/KanbanBoard.tsx` | When a Kanban column is empty, a `lottie-react` animation plays a cute sleepy robot vector in the empty column space. |
| 26 | **Custom Right-Click Context Menus** | `/portal/tasks` | `components/ui/ContextMenu.tsx` | `contextmenu` event is intercepted on task cards — a custom styled action menu appears with options: Edit, Assign, Duplicate, Delete. |
| 27 | **Backdrop Blur Glass Modals** | All `/portal/*` | `components/ui/BackdropModal.tsx` | Task modals and form popups render over a heavy `backdrop-filter: blur(20px)` layer, keeping background context visible but defocused. |
| 28 | **Dynamic Clamp-Based Text Resizing** | All `/portal/*` | Global CSS via `PortalLayout.tsx` | CSS `clamp()` on dashboard widget font sizes and table density — identical information density from 1080p monitors to 4K displays. |
| 29 | **Lateral Wipe Route Transitions** | All `/portal/*` | `router/PortalRoutes.tsx` | Portal tab switches animate with a lateral slide using Framer Motion `AnimatePresence` + `x` translate — mimics terminal sheet swapping. |
| 30 | **Yellow Flash Real-Time Data Ping** | All `/portal/*` | `hooks/useRealtime.ts` | Supabase Realtime subscription: rows updated by other connected users briefly flash a yellow `background-color` transition, signaling live sync. |

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
│   │   └── MemberAccordion.tsx           # Animated expanding bio
│   │
│   ├── robot/
│   │   ├── SeasonChangelog.tsx           # V1 → V2 → Vectair timeline
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
- [x] Vercel project linked to GitHub — auto-deploy from day 1
- [x] Separate Supabase projects for `dev` and `prod`

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
- [x] `App.tsx` router tree (public vs `/portal`)
- [x] `AuthGuard.tsx` — redirect unauthenticated to `/portal/login`
- [x] `PublicLayout.tsx` — noise overlay, spotlight cursor, Lenis smooth scroll init, `FluidMenu`
- [x] `PortalLayout.tsx` shell (sidebar placeholder, toast layer)
- [x] `ScrollToTop` on every route change
- [x] 404 page — themed, on-brand, not boring
- [x] React Helmet Async: unique `<title>` and `<meta>` per page
- [x] Open Graph image + description for every public page
- [x] `sitemap.xml` + `robots.txt`
- [x] Plausible Analytics script (privacy-friendly, no cookies)
- [x] `ReducedMotionWrapper` applied globally
- [x] WebGL fallback: detect, render static fallback content if GPU unavailable
- [x] Cookie / privacy notice if analytics enabled

**Sprint 1.2 — Landing Page**
- [x] Hero: team name, number, season theme, rookie highlights
- [x] Typography mask: match video playing inside massive "30686" text (deferred to post-Phase 6 polish pass)
- [x] modern bg background (Vanta.js first pass → custom GLSL later)
- [x] Vectair parallax hero (moved to Robot Page — `/robot` per design: unused landing features → specialized page)
- [x] Stats bar: OPR, total points, matches played (hardcoded → Supabase in Phase 3)
- [x] "Next Event" countdown timer
- [x] Awards callout block (Innovate Winner, Inspire Finalist)
- [x] GSAP ScrollTrigger scroll-reveal timelines
- [x] Odometer spinner on stats
- [x] Spotlight cursor radial gradient
- [x] Lenis smooth scroll configured
- [x] Noise texture overlay (global)
- [x] Mobile responsive pass

**Sprint 1.3 — Team Page**
- [x] Team origins / history narrative block
- [x] Roster data in `constants.ts` (name, subteam, role, tools, bio, photo)
- [x] `RosterGrid` with subteam filter (Hardware / Software / Outreach / Mentors)
- [x] `MemberCard` — 3D tilt-glare (VanillaTilt or custom mouse math)
- [x] X-Ray hover mode (CSS clip-path swaps to alt photo)
- [x] Gooey SVG filter on filter transition between subteams
- [x] Staggered spring physics entrance (Framer Motion)
- [x] Cursor-following tooltip with elastic delay
- [x] Text glitch effect on member titles
- [x] Animated accordion bios (smooth height transition)
- [x] Tool proficiency badges (SolidWorks, Java, OpenCV, OnShape, FreeCAD)
- [x] Mobile responsive pass

**Sprint 1.4 — Sponsors Page**
- [x] Sponsors pulled from Supabase `sponsors` table — no code touch to update tiers
- [x] Bento-box tier layout (Platinum asymmetric large, Gold/Silver smaller)
- [x] 3D flipping coin for Platinum sponsors (CSS 3D first, Three.js swap optional)
- [x] Infinite velocity marquee — individual hover states without speed acceleration
- [x] Dynamic color extraction from logo URL → card border glow (hex from `sponsors.color_hex`)
- [x] Liquid button fill on "Sponsor Us" hover (cyan fill animation)
- [x] 501(c)(3) info block
- [x] Business pitch deck PDF download (hosted on Supabase Storage)
- [x] Mobile responsive pass

---

### PHASE 2 — Complex Visualizers (Weeks 3–4)

**Sprint 2.1 — Vectair Robot Page**
- Season changelog: V1 → V2 → Vectair (photos + build notes)
- Drivetrain spec sheet (motors, gear ratios, dead-wheels)
- intake  showcase block (CAD sketch + explanation)
- Transfer showcase block (CAD sketch + explanation)
- Launcher showcase block (CAD sketch + explanation)
- Shoot-on-the-move gif with container
- 21-ball auto video with container
- Season changelog V1 → V2 → Vectair (CAD screenshots) and timeline of new features added
- Three.js exploded view — `.glb` model, drag to explode drivetrain from intake (saved for later after whole site is built)
- show 3d cad model like onshape does allowing for user to rotate
- Apple-style scroll scrubbing 
- Before/After slicer — drag to compare CAD model vs physical build photo (save for later after whole site built)
- Magnetic 3d "Download CAD" button (cursor pull)
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
| Live Scores | FTCScout API |
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