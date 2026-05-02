import { useEffect, useRef, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { FLL_TEAMS, type FLLTeam } from '@/lib/constants'

// ─────────────────────────────────────────────────────────────────────────────
// FORCE SIMULATION NODE TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface SimNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  label: string
  number: number
  color: string
  school: string
  isCenter: boolean
  fx?: number | null
  fy?: number | null
}

// ─────────────────────────────────────────────────────────────────────────────
// FORCE GRAPH COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function FLLNodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const nodesRef = useRef<SimNode[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const dragRef = useRef<{ node: SimNode | null; offsetX: number; offsetY: number }>({
    node: null,
    offsetX: 0,
    offsetY: 0,
  })
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const prefersReduced = useReducedMotion()

  const initNodes = useCallback(
    (width: number, height: number) => {
      const cx = width / 2
      const cy = height / 2
      const nodes: SimNode[] = []

      // Center node: Team 30686
      nodes.push({
        x: cx,
        y: cy,
        vx: 0,
        vy: 0,
        radius: 38,
        label: 'Electrolights',
        number: 30686,
        color: '#0044ff',
        school: 'FTC 30686',
        isCenter: true,
        fx: cx,
        fy: cy,
      })

      // FLL team nodes in orbital positions
      FLL_TEAMS.forEach((team: FLLTeam, i: number) => {
        const angle = (i / FLL_TEAMS.length) * Math.PI * 2 - Math.PI / 2
        const orbitRadius = Math.min(width, height) * 0.3 + (Math.random() - 0.5) * 40
        nodes.push({
          x: cx + Math.cos(angle) * orbitRadius + (Math.random() - 0.5) * 30,
          y: cy + Math.sin(angle) * orbitRadius + (Math.random() - 0.5) * 30,
          vx: 0,
          vy: 0,
          radius: 18,
          label: team.name,
          number: team.number,
          color: team.color,
          school: team.school,
          isCenter: false,
        })
      })

      return nodes
    },
    [],
  )

  useEffect(() => {
    if (prefersReduced || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const rawCtx = canvas.getContext('2d')
    if (!rawCtx) return
    const ctx = rawCtx as CanvasRenderingContext2D

    let width = 0
    let height = 0
    let dpr = 1

    function resize() {
      if (!containerRef.current || !canvasRef.current) return
      dpr = window.devicePixelRatio || 1
      const rect = containerRef.current.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvasRef.current.width = width * dpr
      canvasRef.current.height = height * dpr
      canvasRef.current.style.width = `${width}px`
      canvasRef.current.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (nodesRef.current.length === 0) {
        nodesRef.current = initNodes(width, height)
      } else {
        // Update center node fixed position
        const center = nodesRef.current[0]
        if (center) {
          center.fx = width / 2
          center.fy = height / 2
        }
      }
    }

    resize()

    // ── FORCE SIMULATION ──
    const DAMPING = 0.92
    const LINK_STRENGTH = 0.008
    const REPULSION = 1200
    const CENTER_PULL = 0.0005

    function simulate() {
      const nodes = nodesRef.current
      const centerX = width / 2
      const centerY = height / 2

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!

        // Fixed nodes
        if (n.fx != null) { n.x = n.fx; n.vx = 0 }
        if (n.fy != null) { n.y = n.fy; n.vy = 0 }
        if (n.fx != null && n.fy != null) continue

        // Gravity toward center
        n.vx += (centerX - n.x) * CENTER_PULL
        n.vy += (centerY - n.y) * CENTER_PULL

        // Repulsion from other nodes
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue
          const o = nodes[j]!
          const dx = n.x - o.x
          const dy = n.y - o.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const force = REPULSION / (dist * dist)
          n.vx += (dx / dist) * force
          n.vy += (dy / dist) * force
        }

        // Link attraction to center node
        const centerNode = nodes[0]!
        const ldx = centerNode.x - n.x
        const ldy = centerNode.y - n.y
        n.vx += ldx * LINK_STRENGTH
        n.vy += ldy * LINK_STRENGTH

        // Mouse interaction - gentle repulsion
        const mdx = n.x - mouseRef.current.x
        const mdy = n.y - mouseRef.current.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < 100 && mDist > 0) {
          const mForce = (100 - mDist) / 100
          n.vx += (mdx / mDist) * mForce * 2
          n.vy += (mdy / mDist) * mForce * 2
        }

        // Damping
        n.vx *= DAMPING
        n.vy *= DAMPING

        // Integrate
        n.x += n.vx
        n.y += n.vy

        // Bounds
        const pad = n.radius + 4
        if (n.x < pad) { n.x = pad; n.vx *= -0.3 }
        if (n.x > width - pad) { n.x = width - pad; n.vx *= -0.3 }
        if (n.y < pad) { n.y = pad; n.vy *= -0.3 }
        if (n.y > height - pad) { n.y = height - pad; n.vy *= -0.3 }
      }
    }

    function drawLink(
      ctx: CanvasRenderingContext2D,
      from: SimNode,
      to: SimNode,
      _alpha: number,
    ) {
      const dx = to.x - from.x
      const dy = to.y - from.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = Math.min(width, height) * 0.45
      const alpha = Math.max(0, 1 - dist / maxDist) * 0.4

      if (alpha <= 0) return

      // Gradient link
      const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y)
      grad.addColorStop(0, `rgba(0, 68, 255, ${alpha})`)
      grad.addColorStop(0.5, `rgba(0, 212, 255, ${alpha * 0.6})`)
      grad.addColorStop(1, hexToRgba(to.color, alpha * 0.8))

      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.strokeStyle = grad
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    function drawNode(ctx: CanvasRenderingContext2D, node: SimNode, time: number) {
      const { x, y, radius, color, label, number: teamNum, isCenter } = node
      const breathe = isCenter ? 1 + Math.sin(time * 0.002) * 0.05 : 1

      // Outer glow ring
      const glowRadius = radius * breathe * 1.8
      const glowGrad = ctx.createRadialGradient(x, y, radius * 0.5, x, y, glowRadius)
      glowGrad.addColorStop(0, hexToRgba(color, 0.12))
      glowGrad.addColorStop(1, hexToRgba(color, 0))
      ctx.beginPath()
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
      ctx.fillStyle = glowGrad
      ctx.fill()

      // Node body
      const bodyGrad = ctx.createRadialGradient(
        x - radius * 0.25,
        y - radius * 0.25,
        0,
        x,
        y,
        radius * breathe,
      )
      bodyGrad.addColorStop(0, hexToRgba(color, 0.9))
      bodyGrad.addColorStop(0.7, hexToRgba(color, 0.6))
      bodyGrad.addColorStop(1, hexToRgba(color, 0.3))
      ctx.beginPath()
      ctx.arc(x, y, radius * breathe, 0, Math.PI * 2)
      ctx.fillStyle = bodyGrad
      ctx.fill()

      // Border ring
      ctx.beginPath()
      ctx.arc(x, y, radius * breathe, 0, Math.PI * 2)
      ctx.strokeStyle = hexToRgba(color, 0.5)
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Label
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      if (isCenter) {
        ctx.font = 'bold 11px Oxanium, sans-serif'
        ctx.fillText('30686', x, y - 6)
        ctx.font = '600 8px Outfit, sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.7)'
        ctx.fillText('ELECTROLIGHTS', x, y + 8)
      } else {
        ctx.font = '600 8px Outfit, sans-serif'
        ctx.fillText(String(teamNum), x, y)
      }
    }

    function render() {
      const time = performance.now()
      simulate()

      ctx.clearRect(0, 0, width, height)

      const nodes = nodesRef.current
      const center = nodes[0]!

      // Draw links first
      for (let i = 1; i < nodes.length; i++) {
        drawLink(ctx, center, nodes[i]!, 0.3)
      }

      // Inter-node proximity links (secondary connections)
      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!
          const b = nodes[j]!
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw nodes (center last for z-order)
      for (let i = nodes.length - 1; i >= 1; i--) {
        drawNode(ctx, nodes[i]!, time)
      }
      drawNode(ctx, center, time)

      rafRef.current = requestAnimationFrame(render)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      mouseRef.current = { x: mx, y: my }

      // Dragging
      if (dragRef.current.node) {
        dragRef.current.node.fx = mx
        dragRef.current.node.fy = my
        return
      }

      // Hover detection
      let found: SimNode | null = null
      for (const node of nodesRef.current) {
        const dx = mx - node.x
        const dy = my - node.y
        if (Math.sqrt(dx * dx + dy * dy) < node.radius + 4) {
          found = node
          break
        }
      }
      setHoveredNode(found)
      if (found) {
        setTooltipPos({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      for (const node of nodesRef.current) {
        if (node.isCenter) continue
        const dx = mx - node.x
        const dy = my - node.y
        if (Math.sqrt(dx * dx + dy * dy) < node.radius + 4) {
          dragRef.current = { node, offsetX: dx, offsetY: dy }
          node.fx = mx
          node.fy = my
          break
        }
      }
    }

    const handleMouseUp = () => {
      if (dragRef.current.node) {
        dragRef.current.node.fx = null
        dragRef.current.node.fy = null
        dragRef.current = { node: null, offsetX: 0, offsetY: 0 }
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
      setHoveredNode(null)
      handleMouseUp()
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReduced, initNodes])

  // ── STATIC FALLBACK (reduced motion) ──
  if (prefersReduced) {
    return (
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-3 px-6 sm:grid-cols-5">
        {FLL_TEAMS.map((team) => (
          <div
            key={team.id}
            className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-center"
          >
            <div className="text-xs font-bold" style={{ color: team.color }}>
              {team.number}
            </div>
            <div className="mt-0.5 text-[10px] text-white/50">{team.name}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative h-[520px] w-full sm:h-[600px]">
      <canvas
        ref={canvasRef}
        className="block h-full w-full cursor-grab active:cursor-grabbing"
        aria-label="Interactive force graph showing Electrolights mentoring 15 FLL teams"
      />

      {/* Hover tooltip */}
      {hoveredNode && !hoveredNode.isCenter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pointer-events-none fixed z-50 rounded-xl border border-white/10 bg-[#0a0a1a]/95 px-4 py-3 backdrop-blur-xl"
          style={{
            left: tooltipPos.x + 16,
            top: tooltipPos.y - 40,
            boxShadow: `0 0 20px ${hoveredNode.color}20`,
          }}
        >
          <div className="text-xs font-black" style={{ color: hoveredNode.color }}>
            {hoveredNode.label}
          </div>
          <div className="mt-1 text-[10px] text-white/40">
            FLL #{hoveredNode.number}
          </div>
          <div className="mt-0.5 text-[10px] text-white/30">{hoveredNode.school}</div>
        </motion.div>
      )}

      {/* Corner HUD label */}
      <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[#0044ff] pulse-ring" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">
          Force Simulation / Live
        </span>
      </div>
    </div>
  )
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
