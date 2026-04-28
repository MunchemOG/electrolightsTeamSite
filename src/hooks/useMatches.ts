import { useQuery } from '@tanstack/react-query'
import {
  getTeamQuickStats,
  getTeamMatches,
  type MatchResult,
  type TeamQuickStatsResponse,
} from '@/lib/ftcscout'

// ─────────────────────────────────────────────────────────────────────────────
// QUERY KEYS
// ─────────────────────────────────────────────────────────────────────────────

export const matchQueryKeys = {
  quickStats: ['ftcscout', 'quickStats'] as const,
  matches: ['ftcscout', 'matches', 'v2'] as const,
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches live OPR, TOTEP, and ranking stats from FTCScout.
 * Cached for 5 minutes — data doesn't change mid-render.
 */
export function useTeamQuickStats() {
  return useQuery<TeamQuickStatsResponse, Error>({
    queryKey: matchQueryKeys.quickStats,
    queryFn: getTeamQuickStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  })
}

/**
 * Fetches all match results for the current season from FTCScout.
 * Normalized into our internal MatchResult shape.
 * Cached for 2 minutes — match results only update between events.
 */
export function useMatchResults() {
  return useQuery<MatchResult[], Error>({
    queryKey: matchQueryKeys.matches,
    queryFn: getTeamMatches,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  })
}

/**
 * Derives season summary stats from the match results array.
 * W/L/T record, high score, avg score, total points.
 */
export function useSeasonSummary(matches: MatchResult[] | undefined) {
  if (!matches || matches.length === 0) {
    return {
      wins: 0,
      losses: 0,
      ties: 0,
      highScore: 0,
      avgScore: 0,
      totalPoints: 0,
      winRate: 0,
    }
  }

  const wins = matches.filter((m) => m.outcome === 'W').length
  const losses = matches.filter((m) => m.outcome === 'L').length
  const ties = matches.filter((m) => m.outcome === 'T').length
  const scores = matches.map((m) => m.ourScore)
  const totalPoints = scores.reduce((a, b) => a + b, 0)
  const highScore = Math.max(...scores)
  const avgScore = Math.round(totalPoints / matches.length)
  const winRate = Math.round((wins / matches.length) * 100)

  return { wins, losses, ties, highScore, avgScore, totalPoints, winRate }
}

// ─────────────────────────────────────────────────────────────────────────────
// CSV EXPORT UTILITY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Converts the match results array into a CSV blob and triggers a download.
 */
export function exportMatchesCSV(matches: MatchResult[]) {
  const headers = [
    'Match',
    'Event',
    'Our Alliance',
    'Our Score',
    'Their Score',
    'Outcome',
    'Auto',
    'TeleOp',
    'Endgame',
    'Alliance Partner',
  ]

  const rows = matches.map((m) => {
    const ourData = m.ourAlliance === 'red' ? m.red : m.blue
    const partner =
      m.ourAlliance === 'red'
        ? m.red.team1?.number === 30686
          ? m.red.team2?.name
          : m.red.team1?.name
        : m.blue.team1?.number === 30686
          ? m.blue.team2?.name
          : m.blue.team1?.name

    return [
      m.matchNum,
      m.eventCode,
      m.ourAlliance.toUpperCase(),
      m.ourScore,
      m.theirScore,
      m.outcome,
      ourData.auto,
      ourData.teleop,
      ourData.endgame,
      partner ?? 'Unknown',
    ]
  })

  const csvContent = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `electrolights-30686-matches-2025-26.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
