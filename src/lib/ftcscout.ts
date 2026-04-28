export const FTCSCOUT_GRAPHQL_URL = 'https://api.ftcscout.org/graphql'
export const TEAM_NUMBER = 30686
export const CURRENT_SEASON = 2025

// ─────────────────────────────────────────────────────────────────────────────
// CORE FETCHER
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchFTCScout<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(FTCSCOUT_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`FTCScout API error: ${response.statusText}`)
  }

  const json = await response.json()
  if (json.errors) {
    throw new Error(`GraphQL Error: ${json.errors[0].message}`)
  }

  return json.data as T
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface QuickStats {
  tot: { value: number; rank: number }
  auto: { value: number; rank: number }
  dc: { value: number; rank: number }
  eg: { value: number; rank: number }
  count: number
}

export interface TeamQuickStatsResponse {
  teamByNumber: {
    name: string
    rookieYear: number
    quickStats: QuickStats
  }
}

export interface Alliance {
  team1: { number: number; name: string } | null
  team2: { number: number; name: string } | null
  score: number
  auto: number
  teleop: number
  endgame: number
}

export interface MatchResult {
  id: string
  matchNum: number
  series: number
  eventCode: string
  eventStart: string | null
  red: Alliance
  blue: Alliance
  /** Which alliance our team was on */
  ourAlliance: 'red' | 'blue'
  ourScore: number
  theirScore: number
  outcome: 'W' | 'L' | 'T'
}

export interface TeamMatchesResponse {
  teamByNumber: {
    matches: Array<{
      alliance: 'Red' | 'Blue'
      match: {
        id: number
        matchNum: number
        series: number
        eventCode: string
        event: {
          start: string | null
        }
        scores: {
          __typename: string
          red: { totalPoints: number; autoPoints: number; dcPoints: number }
          blue: { totalPoints: number; autoPoints: number; dcPoints: number }
        } | null
        teams: Array<{
          alliance: 'Red' | 'Blue'
          team: { number: number; name: string }
        }>
      }
    }>
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// QUERIES
// ─────────────────────────────────────────────────────────────────────────────

export const TEAM_QUICK_STATS_QUERY = `
  query GetTeamQuickStats($teamNumber: Int!, $season: Int!) {
    teamByNumber(number: $teamNumber) {
      name
      rookieYear
      quickStats(season: $season) {
        tot { value rank }
        auto { value rank }
        dc { value rank }
        eg { value rank }
        count
      }
    }
  }
`

export const TEAM_MATCHES_QUERY = `
  query GetTeamMatches($teamNumber: Int!, $season: Int!) {
    teamByNumber(number: $teamNumber) {
      matches(season: $season) {
        match {
          id
          matchNum
          series
          eventCode
          scores {
            __typename
            ... on MatchScores2025 {
              red { totalPoints autoPoints dcPoints }
              blue { totalPoints autoPoints dcPoints }
            }
          }
        }
      }
    }
  }
`

export const TEAM_ALLIANCE_QUERY = `
  query GetTeamAlliance($teamNumber: Int!, $season: Int!) {
    teamByNumber(number: $teamNumber) {
      matches(season: $season) {
        alliance
        match {
          id
        }
      }
    }
  }
`

export const TEAM_EVENTS_QUERY = `
  query GetTeamEvents($teamNumber: Int!, $season: Int!) {
    teamByNumber(number: $teamNumber) {
      events(season: $season) {
        event {
          code
          start
        }
      }
    }
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// HIGH-LEVEL FETCH FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function getTeamQuickStats(): Promise<TeamQuickStatsResponse> {
  return fetchFTCScout<TeamQuickStatsResponse>(TEAM_QUICK_STATS_QUERY, {
    teamNumber: TEAM_NUMBER,
    season: CURRENT_SEASON,
  })
}

export async function getTeamMatches(): Promise<MatchResult[]> {
  // Fetch matches, alliance info, and event metadata in separate parallel requests 
  // to stay under the API's strict complexity-based truncation limit (24 results).
  const [matchData, allianceData, eventData] = await Promise.all([
    fetchFTCScout<TeamMatchesResponse>(TEAM_MATCHES_QUERY, {
      teamNumber: TEAM_NUMBER,
      season: CURRENT_SEASON,
    }),
    fetchFTCScout<any>(TEAM_ALLIANCE_QUERY, {
      teamNumber: TEAM_NUMBER,
      season: CURRENT_SEASON,
    }),
    fetchFTCScout<any>(TEAM_EVENTS_QUERY, {
      teamNumber: TEAM_NUMBER,
      season: CURRENT_SEASON,
    }),
  ])

  const matchParticipations = matchData?.teamByNumber?.matches ?? []
  const allianceParticipations = allianceData?.teamByNumber?.matches ?? []
  
  // Create maps for fast lookup
  const eventDateMap: Record<string, string | null> = {}
  eventData?.teamByNumber?.events?.forEach((e: any) => {
    if (e.event) {
      eventDateMap[e.event.code] = e.event.start
    }
  })

  const allianceMap: Record<number, string> = {}
  allianceParticipations.forEach((p: any) => {
    if (p.match && p.alliance) {
      allianceMap[p.match.id] = p.alliance
    }
  })

  return matchParticipations
    .map(({ match }) => {
      const alliance = allianceMap[match.id] ?? 'Red'
      const ourAlliance = alliance.toLowerCase() as 'red' | 'blue'
      const scores = match.scores
      
      const redScore = scores?.red?.totalPoints ?? 0
      const blueScore = scores?.blue?.totalPoints ?? 0
      
      const ourScore = ourAlliance === 'red' ? redScore : blueScore
      const theirScore = ourAlliance === 'red' ? blueScore : redScore

      const outcome: 'W' | 'L' | 'T' =
        ourScore > theirScore ? 'W' : ourScore < theirScore ? 'L' : 'T'

      // We focus on scores and outcomes for the main list
      const red: Alliance = {
        team1: null,
        team2: null,
        score: redScore,
        auto: scores?.red?.autoPoints ?? 0,
        teleop: scores?.red?.dcPoints ?? 0,
        endgame: 0,
      }

      const blue: Alliance = {
        team1: null,
        team2: null,
        score: blueScore,
        auto: scores?.blue?.autoPoints ?? 0,
        teleop: scores?.blue?.dcPoints ?? 0,
        endgame: 0,
      }

      return {
        // Use composite ID as match ID is only unique within an event
        id: `${match.eventCode}_${match.id}`,
        matchNum: match.matchNum,
        series: match.series,
        eventCode: match.eventCode,
        eventStart: eventDateMap[match.eventCode] ?? null,
        red,
        blue,
        ourAlliance,
        ourScore,
        theirScore,
        outcome,
      } satisfies MatchResult
    })
    .sort((a, b) => {
      // Custom event priority based on the requested season progression
      const EVENT_PRIORITY: Record<string, number> = {
        'USILNEM1': 10,
        'USILNEM2': 20,
        'USILNEM3': 30,
        'USILCSNELT': 40,
        'USILCMPS': 50,
        'USILCMP': 60,
        'FPEMI': 70,
      }

      const pA = EVENT_PRIORITY[a.eventCode] ?? 999
      const pB = EVENT_PRIORITY[b.eventCode] ?? 999

      // 1. Sort by custom priority first
      if (pA !== pB) return pA - pB

      // 2. Fallback to event start date (ISO string)
      if (a.eventStart && b.eventStart) {
        if (a.eventStart !== b.eventStart) {
          return a.eventStart.localeCompare(b.eventStart)
        }
      }
      
      // 3. Sort by match number within event
      return a.matchNum - b.matchNum
    })
}
