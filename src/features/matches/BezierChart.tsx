import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { type MatchResult } from '@/lib/ftcscout'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface BezierChartProps {
  matches: MatchResult[]
}

const CHART_W = 900
const CHART_H = 280
const PAD_L = 50
const PAD_R = 24
const PAD_T = 24
const PAD_B = 48

function catmullRom(
  points: [number, number][],
  alpha = 0.5,
): string {
  if (points.length < 2) return ''
  const result: string[] = []

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)]!
    const p1 = points[i]!
    const p2 = points[i + 1]!
    const p3 = points[Math.min(i + 2, points.length - 1)]!

    const cp1x = p1[0] + (p2[0] - p0[0]) * alpha
    const cp1y = p1[1] + (p2[1] - p0[1]) * alpha
    const cp2x = p2[0] - (p3[0] - p1[0]) * alpha
    const cp2y = p2[1] - (p3[1] - p1[1]) * alpha

    if (i === 0) result.push(`M ${p1[0]} ${p1[1]}`)
    result.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`)
  }

  return result.join(' ')
}

export function BezierChart({ matches }: BezierChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [pathLength, setPathLength] = useState(0)

  if (!matches || matches.length === 0) return null

  const scores = matches.map((m) => m.ourScore)
  const maxScore = Math.max(...scores, 100)
  const minScore = Math.min(...scores, 0)
  const scoreRange = maxScore - minScore || 1

  const plotW = CHART_W - PAD_L - PAD_R
  const plotH = CHART_H - PAD_T - PAD_B

  const points: [number, number][] = matches.map((m, i) => {
    const x = PAD_L + (i / Math.max(matches.length - 1, 1)) * plotW
    const y = PAD_T + plotH - ((m.ourScore - minScore) / scoreRange) * plotH
    return [x, y]
  })

  const pathD = catmullRom(points, 0.3)

  // Y-axis gridlines
  const gridLines = 4
  const gridScores = Array.from({ length: gridLines + 1 }, (_, i) =>
    Math.round(minScore + (scoreRange / gridLines) * i),
  )

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [pathD])

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full"
        style={{ height: 'auto' }}
        aria-label="Season score bezier arc chart"
        role="img"
      >
        <defs>
          {/* Gradient fill under the curve */}
          <linearGradient id="score-fill-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0044ff" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#0044ff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0044ff" stopOpacity="0" />
          </linearGradient>

          {/* Neon glow filter for the path */}
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip path for stroke animation */}
          <clipPath id="chart-clip">
            <rect
              x={PAD_L}
              y={0}
              width={plotW}
              height={CHART_H}
            />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {gridScores.map((score, i) => {
          const y = PAD_T + plotH - ((score - minScore) / scoreRange) * plotH
          return (
            <g key={i}>
              <line
                x1={PAD_L}
                y1={y}
                x2={CHART_W - PAD_R}
                y2={y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
              <text
                x={PAD_L - 8}
                y={y + 4}
                fill="rgba(255,255,255,0.25)"
                fontSize="11"
                textAnchor="end"
                fontFamily="monospace"
              >
                {score}
              </text>
            </g>
          )
        })}

        {/* Fill area */}
        {pathD && (
          <path
            d={`${pathD} L ${points[points.length - 1]![0]} ${PAD_T + plotH} L ${PAD_L} ${PAD_T + plotH} Z`}
            fill="url(#score-fill-grad)"
            clipPath="url(#chart-clip)"
          />
        )}

        {/* Main curve */}
        {pathD && (
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#0044ff"
            strokeWidth="2.5"
            filter="url(#neon-glow)"
            clipPath="url(#chart-clip)"
            strokeDasharray={pathLength || 9999}
            strokeDashoffset={
              prefersReduced || !isInView
                ? pathLength || 9999
                : 0
            }
            style={{
              transition: prefersReduced
                ? 'none'
                : `stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s`,
            }}
          />
        )}

        {/* Glow duplicate curve (wider, dimmer) */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#0044ff"
            strokeWidth="8"
            opacity="0.12"
            clipPath="url(#chart-clip)"
          />
        )}

        {/* Data points */}
        {points.map((p, i) => {
          const match = matches[i]!
          const isHovered = hoveredIndex === i
          const outcome = match.outcome
          const dotColor =
            outcome === 'W' ? '#00d4ff' : outcome === 'L' ? '#ff5e00' : '#94a3b8'

          return (
            <g
              key={match.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hit area */}
              <circle cx={p[0]} cy={p[1]} r={16} fill="transparent" />

              {/* Outer ring on hover */}
              {isHovered && (
                <circle
                  cx={p[0]}
                  cy={p[1]}
                  r={10}
                  fill="none"
                  stroke={dotColor}
                  strokeWidth="1"
                  opacity="0.4"
                />
              )}

              {/* Main dot */}
              <circle
                cx={p[0]}
                cy={p[1]}
                r={isHovered ? 5 : 4}
                fill={dotColor}
                filter="url(#neon-glow)"
                style={{ transition: 'r 0.15s ease' }}
              />

              {/* Tooltip */}
              {isHovered && (
                <g>
                  <rect
                    x={p[0] - 44}
                    y={p[1] - 52}
                    width={88}
                    height={40}
                    rx="6"
                    fill="#0f172a"
                    stroke={`${dotColor}40`}
                    strokeWidth="1"
                  />
                  <text
                    x={p[0]}
                    y={p[1] - 32}
                    fill={dotColor}
                    fontSize="14"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {match.ourScore}
                  </text>
                  <text
                    x={p[0]}
                    y={p[1] - 18}
                    fill="rgba(255,255,255,0.35)"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    M{match.matchNum} — {outcome}
                  </text>
                </g>
              )}

              {/* Match number x-axis label */}
              <text
                x={p[0]}
                y={PAD_T + plotH + 18}
                fill="rgba(255,255,255,0.2)"
                fontSize="10"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {match.matchNum}
              </text>
            </g>
          )
        })}

        {/* Avg score reference line */}
        {(() => {
          const avg = Math.round(
            matches.reduce((a, m) => a + m.ourScore, 0) / matches.length,
          )
          const avgY =
            PAD_T + plotH - ((avg - minScore) / scoreRange) * plotH
          return (
            <g>
              <line
                x1={PAD_L}
                y1={avgY}
                x2={CHART_W - PAD_R}
                y2={avgY}
                stroke="rgba(255,94,0,0.3)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={CHART_W - PAD_R + 4}
                y={avgY + 4}
                fill="rgba(255,94,0,0.5)"
                fontSize="9"
                fontFamily="monospace"
              >
                AVG {avg}
              </text>
            </g>
          )
        })()}

        {/* X-axis label */}
        <text
          x={CHART_W / 2}
          y={CHART_H - 4}
          fill="rgba(255,255,255,0.15)"
          fontSize="10"
          textAnchor="middle"
          fontFamily="monospace"
          letterSpacing="0.2em"
        >
          MATCH INDEX / 2025-26 SEASON
        </text>
      </svg>
    </div>
  )
}
