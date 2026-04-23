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
    bio: 'Moksh designed Vectair\'s drivetrain from scratch, iterating through seven CAD revisions to achieve sub-200ms intake cycles. Obsessed with gear ratios and dead-wheel odometry.',
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
    bio: 'Nithin owns the intake subsystem — he prototyped 12 different roller configurations before landing on the current V-shaped dual-roller design that achieves 99% pick-up reliability.',
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
    bio: 'Mithun owns the team\'s Git workflow, FTCDashboard telemetry system, and wrote the testing harness that lets the team simulate matches without a physical robot. Also built this website.',
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
    bio: 'Debasish built the 21-ball autonomous from scratch — a dynamic route-planning system that re-evaluates ball positions in real time using OpenCV. The algorithm adjusts trajectory mid-match.',
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
    bio: 'Howard wrote the full tele-op control stack, including the field-centric drive mode with gyro correction and the one-touch auto-aim feature that aligns the launcher to the high goal.',
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
    bio: 'Ayush engineered Vectair\'s dual-flywheel launcher that achieves consistent trajectory at variable angles. His PID-tuned velocity controller is what makes shoot-on-the-move possible.',
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
    bio: 'Raymond manages the team\'s Instagram, documents competitions on video, and handles all sponsor communications. He designed the sponsorship deck that landed Electrolights\' first platinum sponsor.',
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
  twitch: 'https://twitch.tv/electrolights30686',
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
}
