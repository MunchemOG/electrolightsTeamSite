import { TOOL_COLORS } from '@/lib/constants'

interface ToolBadgesProps {
  tools: string[]
  /** Max badges to show before collapsing into +N */
  limit?: number
}

/**
 * ToolBadges — Renders pill badges for each tool/technology.
 * Colors are sourced from TOOL_COLORS constant.
 * Excess badges collapse into a count chip.
 */
export function ToolBadges({ tools, limit = 4 }: ToolBadgesProps) {
  const visible = tools.slice(0, limit)
  const overflow = tools.length - limit

  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Tool proficiencies">
      {visible.map((tool) => {
        const color = TOOL_COLORS[tool] ?? '#666666'
        return (
          <span
            key={tool}
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: `${color}18`,
              color,
              border: `1px solid ${color}40`,
              boxShadow: `0 0 8px ${color}20`,
            }}
            title={tool}
          >
            {tool}
          </span>
        )
      })}
      {overflow > 0 && (
        <span
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/40"
          title={tools.slice(limit).join(', ')}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
