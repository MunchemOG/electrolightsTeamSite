// ─────────────────────────────────────────────────────────────────────────────
// TEAM CONSTANTS — FTC 30686 Electrolights
// ─────────────────────────────────────────────────────────────────────────────

export const TEAM_NUMBER = 30686
export const TEAM_NAME = 'Electrolights'
export const ROBOT_NAME = 'Vectair'
export const SEASON = 'DECODE'
export const SEASON_YEAR = '2025–26'

export const BRAND_COLORS = {
  electric: '#0044ff',
  orange: '#ff5e00',
  cyan: '#00d4ff',
  bg: '#05050f',
  surface: '#0d0d1f',
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS (hardcoded until Supabase integration in Phase 3)
// ─────────────────────────────────────────────────────────────────────────────

export const TEAM_STATS = {
  opr: 91.58,
  totalPoints: 3291,
  matchesPlayed: 37,
  rankingPoints: 39,
  highScore: 253,
  autoAvg: 36.43,
}

// ─────────────────────────────────────────────────────────────────────────────
// NEXT EVENT
// ─────────────────────────────────────────────────────────────────────────────

export const NEXT_EVENT = {
  name: 'Michiana Premier Event',
  location: 'Purdue University, Fort Wayne, IN',
  date: '2026-05-28T08:00:00-05:00',
}

// ─────────────────────────────────────────────────────────────────────────────
// AWARDS
// ─────────────────────────────────────────────────────────────────────────────

export const AWARDS = [
  {
    title: 'Innovate Award',
    status: 'Winner',
    event: 'Lone Star Regional',
    description:
      'Recognized for Vectair\'s shoot-on-the-move autonomous algorithm — the first in-region to achieve dynamic trajectory correction mid-launch.',
  },
  {
    title: 'Inspire Award',
    status: 'Finalist',
    event: 'Texas State Championship',
    description:
      'Acknowledged for mentoring 15+ FLL teams and running STEM workshops reaching 400+ middle schoolers across the district.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ROSTER DATA
// ─────────────────────────────────────────────────────────────────────────────

export type Subteam = 'Hardware' | 'Software' | 'Outreach' | 'Mentor'

export interface TeamMember {
  id: string
  name: string
  subteam: Subteam
  role: string
  bio: string
  /** Primary photo URL */
  photo: string
  /** Secondary / "X-ray" alternate photo URL */
  altPhoto: string
  tools: string[]
  funFact: string
  grade?: string
}

export const ROSTER: TeamMember[] = [
  // ── HARDWARE ──────────────────────────────────────────────────────────────
  {
    id: 'moksh-w',
    name: 'Moksh Wadhwani',
    subteam: 'Hardware',
    role: 'Lead Mechanical Engineer',
    bio: 'Moksh specializes in Vectair\'s drivetrain development, iterating through multiple CAD revisions to achieve sub-200ms intake cycles. Focused on gear ratios and dead-wheel odometry.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['OnShape', 'SolidWorks', 'FreeCAD', 'Fusion 360'],
    funFact: 'Has broken 3 drill bits this season (new personal record).',
    grade: '11',
  },
  {
    id: 'nithin-c',
    name: 'Nithin Cuddapah',
    subteam: 'Hardware',
    role: 'Intake Specialist',
    bio: 'Nithin leads the intake subsystem development — he prototyped various roller configurations before landing on the current V-shaped dual-roller design that achieves 99% pick-up reliability.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['OnShape', 'SolidWorks', 'Lathe', 'Mill'],
    funFact: 'Can assemble the intake from memory in under 4 minutes.',
    grade: '12',
  },
  {
    id: 'mithun-d',
    name: 'Mithun Dhanes',
    subteam: 'Software',
    role: 'Software Infrastructure',
    bio: 'Mithun manages the team\'s Git workflow, FTCDashboard telemetry system, and developed the testing harness that lets the team simulate matches without a physical robot. Also contributed to this website.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['Java', 'TypeScript', 'React', 'Git', 'FTCDashboard'],
    funFact: 'Has 847 commits this season and counting.',
    grade: '12',
  },

  // ── SOFTWARE ──────────────────────────────────────────────────────────────
  {
    id: 'debasish-b',
    name: 'Debasish Beura',
    subteam: 'Software',
    role: 'Autonomous Lead',
    bio: 'Debasish leads the 21-ball autonomous development — a dynamic route-planning system that re-evaluates ball positions in real time using OpenCV. The algorithm adjusts trajectory mid-match.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['Java', 'OpenCV', 'RoadRunner', 'FTC SDK'],
    funFact: 'Runs the auto routine simulator 100+ times before every competition.',
    grade: '12',
  },
  {
    id: 'howard-y',
    name: 'Howard Yao',
    subteam: 'Software',
    role: 'TeleOp & Driver Controls',
    bio: 'Howard developed the full tele-op control stack, including the field-centric drive mode with gyro correction and the one-touch auto-aim feature that aligns the launcher to the high goal.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['Java', 'FTC SDK', 'FTCDashboard', 'Git'],
    funFact: 'Memorized the FTC SDK source code JavaDocs. Willingly.',
    grade: '11',
  },
  {
    id: 'aarav-k',
    name: 'Aarav Kumar',
    subteam: 'Software',
    role: 'Computer Vision',
    bio: 'Aarav trained and deployed the YOLO-based game element detection pipeline running on the Control Hub. The model achieves 94% accuracy on the game pieces at 30fps — on embedded hardware.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['Python', 'OpenCV', 'TensorFlow Lite', 'ONNX', 'Java'],
    funFact: 'Annotated 1,200+ training images by hand over winter break.',
    grade: '10',
  },
  {
    id: 'ayush-g',
    name: 'Ayush Geddamuri',
    subteam: 'Hardware',
    role: 'Launcher Systems',
    bio: 'Ayush leads development of Vectair\'s dual-flywheel launcher that achieves consistent trajectory at variable angles. His PID-tuned velocity controller is what makes shoot-on-the-move possible.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['OnShape', 'FreeCAD', 'CNC Router', '3D Printing'],
    funFact: 'Maintains a spreadsheet with 200+ launcher angle data points.',
    grade: '10',
  },

  // ── OUTREACH ──────────────────────────────────────────────────────────────
  {
    id: 'viraj-d',
    name: 'Viraj Divekar',
    subteam: 'Outreach',
    role: 'Outreach Director',
    bio: 'Viraj coordinates all 15+ FLL mentorship partnerships and leads the summer STEM camp curriculum. He has directly introduced 200+ students to robotics and engineering over two seasons.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['Google Workspace', 'Canva', 'Project Management'],
    funFact: 'Has given the "what is a servo motor" explanation approximately 800 times.',
    grade: '12',
  },
  {
    id: 'raymond-y',
    name: 'Raymond Ye',
    subteam: 'Outreach',
    role: 'Media & Sponsorship',
    bio: 'Raymond manages the team\'s Instagram, documents competitions on video, and coordinates sponsor communications. He contributed to the sponsorship deck that landed Electrolights\' first platinum sponsor.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['Premiere Pro', 'Photoshop', 'Canva', 'Google Slides'],
    funFact: 'Has filmed every single match this season — all 18 of them.',
    grade: '11',
  },

  // ── MENTOR ────────────────────────────────────────────────────────────────
  {
    id: 'narendra-w',
    name: 'Narendra Wadhwani',
    subteam: 'Mentor',
    role: 'Head Coach & Advisor',
    bio: 'Narendra has mentored FTC teams for 8 years. He provides technical guidance, navigates competition logistics, and is the reason Electrolights operates like a professional engineering org, not a school club.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['SolidWorks', 'Java', 'Project Management', 'Competition Strategy'],
    funFact: 'Still holds the team record for fastest robot field reset: 22 seconds.',
  },
  {
    id: 'mr-cuddapah',
    name: 'Mr. Cuddapah',
    subteam: 'Mentor',
    role: 'Technical Advisor',
    bio: 'Mr. Cuddapah brings years of industry engineering experience to the team, helping students translate theoretical designs into competition-ready mechanisms.',
    photo: '/teamLogo.jpg',
    altPhoto: '/teamLogo.jpg',
    tools: ['Engineering Design', 'Project Management', 'Safety Validation'],
    funFact: 'Can spot a loose set screw from 20 feet away.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TOOL BADGE COLORS (for ToolBadges component)
// ─────────────────────────────────────────────────────────────────────────────

export const TOOL_COLORS: Record<string, string> = {
  Java: '#b07219',
  Python: '#3572A5',
  TypeScript: '#3178c6',
  React: '#61dafb',
  OpenCV: '#5C3EE8',
  OnShape: '#0099ff',
  SolidWorks: '#ff1e1e',
  FreeCAD: '#ff9900',
  'Fusion 360': '#ff6d00',
  RoadRunner: '#00d4ff',
  'FTC SDK': '#0044ff',
  FTCDashboard: '#ff5e00',
  Git: '#f05032',
  TensorFlow: '#ff6f00',
  'TensorFlow Lite': '#ff6f00',
  ONNX: '#005cbb',
  'Premiere Pro': '#9999FF',
  Photoshop: '#31A8FF',
  Canva: '#00C4CC',
  'Google Slides': '#f4b400',
  'Google Workspace': '#4285f4',
  Soldering: '#888888',
  Lathe: '#aaaaaa',
  Mill: '#aaaaaa',
  'CNC Router': '#aaaaaa',
  '3D Printing': '#aaaaaa',
  Multimeter: '#aaaaaa',
  'REV Hardware Client': '#ff5e00',
  'Project Management': '#00aa66',
  'Competition Strategy': '#6600cc',
}

// ─────────────────────────────────────────────────────────────────────────────
// SPONSORS (static until Supabase Phase 3 integration)
// ─────────────────────────────────────────────────────────────────────────────

export type SponsorTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze'

export interface Sponsor {
  id: string
  name: string
  tier: SponsorTier
  logo_url: string
  color_hex: string
  website: string
  tagline?: string
  active: boolean
}

export const SPONSORS: Sponsor[] = [
  // ── PLATINUM ─────────────────────────────────────────────────────────────
  {
    id: 'gene-haas',
    name: 'Gene Haas Foundation',
    tier: 'Platinum',
    logo_url: '/teamLogo.jpg',
    color_hex: '#CC2222',
    website: 'https://www.ghaasfoundation.org',
    tagline: 'Advancing manufacturing education & FIRST teams nationwide',
    active: true,
  },
  // ── GOLD ──────────────────────────────────────────────────────────────────
  {
    id: 'bearbotics-frc',
    name: 'Bearbotics FRC',
    tier: 'Gold',
    logo_url: '/teamLogo.jpg',
    color_hex: '#B45309',
    website: 'https://bearbotics.com',
    tagline: 'FRC Team 2358 — Lake Zurich, IL · Peer engineering partner',
    active: true,
  },
  {
    id: 'ftc-hardship-grant',
    name: 'FIRST Hardship Grant',
    tier: 'Gold',
    logo_url: '/teamLogo.jpg',
    color_hex: '#005DAA',
    website: 'https://www.firstinspires.org/robotics/team-grants',
    tagline: 'FIRST Inspires team equity grant program',
    active: true,
  },
  // ── SILVER ────────────────────────────────────────────────────────────────
  {
    id: 'ftcsim',
    name: 'FTCSim',
    tier: 'Silver',
    logo_url: '/teamLogo.jpg',
    color_hex: '#00B4D8',
    website: 'https://ftcsim.org',
    tagline: 'Free web-based FTC programming simulation platform',
    active: true,
  },
  {
    id: 'frc-tees',
    name: 'FRC Tees',
    tier: 'Silver',
    logo_url: '/teamLogo.jpg',
    color_hex: '#F97316',
    website: 'https://frctees.com',
    tagline: 'Custom apparel & managed stores for robotics teams',
    active: true,
  },
  {
    id: 'hack-club',
    name: 'Hack Club',
    tier: 'Silver',
    logo_url: '/teamLogo.jpg',
    color_hex: '#EC3750',
    website: 'https://hackclub.com',
    tagline: 'Fiscal sponsorship & grants for student-led STEM teams',
    active: true,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// COMMUNITY PARTNER TEAMS — FTC/FRC teams Electrolights mentors or partners with
// ─────────────────────────────────────────────────────────────────────────────

export interface FTCMentorTeam {
  id: string
  name: string
  teamNumber: number
  program: 'FTC' | 'FRC'
  logo_url?: string
  website: string
  color_hex: string
  tagline: string
  location: string
}

export const FTC_MENTOR_TEAMS: FTCMentorTeam[] = [
  {
    id: 'meta-infinity',
    name: 'Meta^Infinity',
    teamNumber: 18221,
    program: 'FTC',
    logo_url: '/teamLogo.jpg',
    website: 'https://metainfinity.org',
    color_hex: '#7C3AED',
    tagline: 'Pushing the Boundaries of Innovation',
    location: 'Highland Park, IL',
  },
  {
    id: 'techineers',
    name: 'Techineers',
    teamNumber: 19652,
    program: 'FTC',
    logo_url: '/teamLogo.jpg',
    website: 'https://ftc19652.org',
    color_hex: '#059669',
    tagline: 'FIRST Championship Qualifiers · 5x State Record Holders',
    location: 'Naperville, IL',
  },
  {
    id: 'nyan',
    name: 'Not Your Average Nerds',
    teamNumber: 10091,
    program: 'FTC',
    logo_url: '/teamLogo.jpg',
    website: 'http://nyanrobotics.com',
    color_hex: '#EC4899',
    tagline: 'World Champions · Carmel Catholic High School',
    location: 'Mundelein, IL',
  },
  {
    id: 'bearbotics',
    name: 'Bearbotics',
    teamNumber: 2358,
    program: 'FRC',
    logo_url: '/teamLogo.jpg',
    website: 'https://bearbotics.com',
    color_hex: '#D97706',
    tagline: 'FRC peer engineering partner · Lake Zurich High School',
    location: 'Lake Zurich, IL',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────────────────────────────────────

export const SOCIALS = {
  instagram: 'https://instagram.com/electrolights30686',
  youtube: 'https://youtube.com/@electrolights30686',
  github: 'https://github.com/electrolights30686',
  email: 'team@electrolights30686.com',
}

// ─────────────────────────────────────────────────────────────────────────────
// OUTREACH STATS
// ─────────────────────────────────────────────────────────────────────────────

export const OUTREACH_STATS = {
  fllTeamsMentored: 15,
  studentsReached: 200,
  volunteerHours: 1240,
  workshopsRun: 32,
  economicImpact: 48000,
  summerCampStudents: 85,
}

// ─────────────────────────────────────────────────────────────────────────────
// FLL TEAMS MENTORED
// ─────────────────────────────────────────────────────────────────────────────

export interface FLLTeam {
  id: string
  name: string
  number: number
  school: string
  location: string
  startDate: string
  color: string
}

export const FLL_TEAMS: FLLTeam[] = [
  { id: 'fll-1', name: 'Circuit Breakers', number: 52140, school: 'Lincoln Middle School', location: 'Lake Zurich, IL', startDate: '2024-09', color: '#22d3ee' },
  { id: 'fll-2', name: 'Gear Grinders', number: 53201, school: 'Prairie Trail School', location: 'Wadsworth, IL', startDate: '2024-09', color: '#a78bfa' },
  { id: 'fll-3', name: 'Nano Builders', number: 51877, school: 'Woodland Middle', location: 'Gurnee, IL', startDate: '2024-10', color: '#34d399' },
  { id: 'fll-4', name: 'Tech Titans', number: 54320, school: 'Fremont Middle', location: 'Mundelein, IL', startDate: '2024-09', color: '#f472b6' },
  { id: 'fll-5', name: 'Binary Bots', number: 50998, school: 'Gavin South Middle', location: 'Ingleside, IL', startDate: '2024-10', color: '#fbbf24' },
  { id: 'fll-6', name: 'Pixel Pioneers', number: 55612, school: 'Thompson Middle', location: 'Barrington, IL', startDate: '2024-11', color: '#60a5fa' },
  { id: 'fll-7', name: 'Robo Rangers', number: 52789, school: 'Emmons Elementary', location: 'Antioch, IL', startDate: '2025-01', color: '#f97316' },
  { id: 'fll-8', name: 'Spark Squad', number: 56100, school: 'Hawthorn Middle', location: 'Vernon Hills, IL', startDate: '2024-09', color: '#e879f9' },
  { id: 'fll-9', name: 'Mech Minds', number: 53450, school: 'Oak Grove School', location: 'Libertyville, IL', startDate: '2024-10', color: '#4ade80' },
  { id: 'fll-10', name: 'Quantum Crew', number: 57231, school: 'Highland Middle', location: 'Wauconda, IL', startDate: '2025-01', color: '#38bdf8' },
  { id: 'fll-11', name: 'Iron Eagles', number: 51342, school: 'Lotus Elementary', location: 'Round Lake, IL', startDate: '2024-09', color: '#fb923c' },
  { id: 'fll-12', name: 'Code Crushers', number: 58010, school: 'Millburn Middle', location: 'Lindenhurst, IL', startDate: '2024-11', color: '#c084fc' },
  { id: 'fll-13', name: 'Voltage Vipers', number: 54890, school: 'Lake Zurich MS North', location: 'Lake Zurich, IL', startDate: '2025-02', color: '#2dd4bf' },
  { id: 'fll-14', name: 'Steel Storm', number: 59002, school: 'Prairieview Elementary', location: 'Waukegan, IL', startDate: '2025-01', color: '#fb7185' },
  { id: 'fll-15', name: 'Byte Force', number: 55780, school: 'Stanton Middle', location: 'Fox Lake, IL', startDate: '2024-10', color: '#818cf8' },
]

// ─────────────────────────────────────────────────────────────────────────────
// OUTREACH TIMELINE EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export interface OutreachEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'workshop' | 'mentoring' | 'camp' | 'competition' | 'milestone'
  metric?: string
}

export const OUTREACH_TIMELINE: OutreachEvent[] = [
  { id: 'ot-1', date: '2024-09-14', title: 'Season Kickoff Mentoring', description: 'Launched mentoring partnerships with 8 FLL teams across Lake County. Set up weekly Saturday workshop sessions.', type: 'mentoring', metric: '8 teams' },
  { id: 'ot-2', date: '2024-10-05', title: 'Fall STEM Workshop Series', description: 'Hosted a 4-week workshop at Lincoln Middle School covering EV3 programming, mechanical linkages, and competition strategy.', type: 'workshop', metric: '45 students' },
  { id: 'ot-3', date: '2024-10-19', title: 'Robot Building Day', description: 'Open-door robot build day where middle schoolers observed Vectair V2 assembly and tried hands-on prototyping.', type: 'workshop', metric: '32 attendees' },
  { id: 'ot-4', date: '2024-11-02', title: 'FLL Scrimmage Hosted', description: 'Organized and ran a full FLL scrimmage event for 6 teams, providing referee volunteers and field inspection training.', type: 'competition', metric: '6 teams' },
  { id: 'ot-5', date: '2024-11-16', title: 'Curriculum Expansion', description: 'Expanded mentoring to 15 total FLL teams. Developed standardized curriculum packets covering sensors, loops, and game strategy.', type: 'milestone', metric: '15 teams' },
  { id: 'ot-6', date: '2024-12-07', title: 'Winter Coding Workshop', description: 'Taught Python basics and block-based coding to 3rd-5th graders at Emmons Elementary. Full-day hands-on session.', type: 'workshop', metric: '28 students' },
  { id: 'ot-7', date: '2025-01-18', title: 'FLL Regional Support', description: 'Provided judging volunteers and pit coaching at the Lake County FLL Regional Qualifier. Three mentored teams advanced.', type: 'competition', metric: '3 qualifiers' },
  { id: 'ot-8', date: '2025-02-08', title: 'Engineering Design Sprint', description: 'Led a 2-day design sprint for FLL teams preparing for state. Covered iterative CAD, testing protocols, and presentation skills.', type: 'workshop', metric: '22 students' },
  { id: 'ot-9', date: '2025-03-15', title: 'Girls in STEM Day', description: 'Partnered with Barrington District 220 for a dedicated girls-in-engineering workshop. Hands-on with 3D printing and robotics.', type: 'workshop', metric: '40 students' },
  { id: 'ot-10', date: '2025-04-12', title: '200th Student Milestone', description: 'Reached 200 unique students directly impacted through our mentoring and workshop programs since team founding.', type: 'milestone', metric: '200 students' },
]

// ─────────────────────────────────────────────────────────────────────────────
// WORKSHOP LOCATIONS (lat/lng for map pins)
// ─────────────────────────────────────────────────────────────────────────────

export interface WorkshopLocation {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  type: 'workshop' | 'school' | 'competition'
  eventsHeld: number
}

export const WORKSHOP_LOCATIONS: WorkshopLocation[] = [
  { id: 'loc-1', name: 'Lincoln Middle School', address: 'Lake Zurich, IL', lat: 42.1967, lng: -88.0934, type: 'school', eventsHeld: 12 },
  { id: 'loc-2', name: 'Prairie Trail School', address: 'Wadsworth, IL', lat: 42.4281, lng: -87.9240, type: 'school', eventsHeld: 8 },
  { id: 'loc-3', name: 'Fremont Middle School', address: 'Mundelein, IL', lat: 42.2631, lng: -88.0034, type: 'school', eventsHeld: 6 },
  { id: 'loc-4', name: 'Emmons Elementary', address: 'Antioch, IL', lat: 42.4773, lng: -88.0956, type: 'school', eventsHeld: 4 },
  { id: 'loc-5', name: 'Lake County Fairgrounds', address: 'Grayslake, IL', lat: 42.3447, lng: -88.0415, type: 'competition', eventsHeld: 3 },
  { id: 'loc-6', name: 'Hawthorn Middle School', address: 'Vernon Hills, IL', lat: 42.2197, lng: -87.9798, type: 'school', eventsHeld: 5 },
  { id: 'loc-7', name: 'Lake Zurich High School', address: 'Lake Zurich, IL', lat: 42.1975, lng: -88.0850, type: 'workshop', eventsHeld: 18 },
  { id: 'loc-8', name: 'Thompson Middle School', address: 'Barrington, IL', lat: 42.1531, lng: -88.1368, type: 'school', eventsHeld: 3 },
]

// ─────────────────────────────────────────────────────────────────────────────
// CURRICULUM BREAKDOWN
// ─────────────────────────────────────────────────────────────────────────────

export interface CurriculumModule {
  id: string
  title: string
  weeks: number
  topics: string[]
  gradeLevel: string
  color: string
}

export const CURRICULUM_MODULES: CurriculumModule[] = [
  { id: 'cur-1', title: 'Mechanical Foundations', weeks: 3, topics: ['Gear ratios', 'Linkages', 'Material selection', 'Structural integrity'], gradeLevel: '6-8', color: '#0044ff' },
  { id: 'cur-2', title: 'Programming Basics', weeks: 4, topics: ['Block coding', 'Loops & conditionals', 'Sensor input', 'Motor control'], gradeLevel: '5-8', color: '#00d4ff' },
  { id: 'cur-3', title: 'Competition Strategy', weeks: 2, topics: ['Game analysis', 'Alliance selection', 'Autonomous planning', 'Scoring optimization'], gradeLevel: '6-8', color: '#ff5e00' },
  { id: 'cur-4', title: 'CAD & Design Thinking', weeks: 3, topics: ['OnShape basics', 'Iterative design', 'Prototyping', '3D printing workflow'], gradeLevel: '7-8', color: '#a78bfa' },
  { id: 'cur-5', title: 'Outreach & Presentation', weeks: 2, topics: ['Engineering notebook', 'Judge presentations', 'Team branding', 'Public speaking'], gradeLevel: '6-8', color: '#34d399' },
]
