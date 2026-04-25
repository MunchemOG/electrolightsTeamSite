import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { SpringFadeIn } from '@/components/motion/SpringFadeIn'
import { Cpu, Gauge, RotateCcw, Zap } from 'lucide-react'

interface SpecGroup {
  id: string
  label: string
  icon: typeof Cpu
  accent: string
  specs: { name: string; value: string; pct?: number }[]
}

const SPEC_GROUPS: SpecGroup[] = [
  {
    id: 'drivetrain',
    label: 'Drivetrain',
    icon: RotateCcw,
    accent: '#00d4ff',
    specs: [
      { name: 'Drive Config', value: 'Mecanum 4WD' },
      { name: 'Motors', value: '4× GoBILDA 5202 435RPM' },
      { name: 'Gear Ratio', value: '13.7:1' },
      { name: 'Top Speed', value: '~72 cm/s', pct: 80 },
      { name: 'Odometry', value: '3-wheel dead-wheel', pct: 100 },
      { name: 'Control Mode', value: 'Field-centric + Gyro correction', pct: 95 },
    ],
  },
  {
    id: 'intake',
    label: 'Intake',
    icon: Zap,
    accent: '#ff5e00',
    specs: [
      { name: 'Design', value: 'V-shaped dual-roller' },
      { name: 'Pick-up Rate', value: '99%', pct: 99 },
      { name: 'Cycle Time', value: '<200 ms', pct: 90 },
      { name: 'Ball Handling', value: 'Active compression', pct: 85 },
      { name: 'Material', value: 'TPU rollers + Al frame' },
      { name: 'Prototypes', value: '12 iterations before final' },
    ],
  },
  {
    id: 'launcher',
    label: 'Launcher',
    icon: Gauge,
    accent: '#0044ff',
    specs: [
      { name: 'Type', value: 'Dual-flywheel' },
      { name: 'Velocity Control', value: 'PID (PIDF)', pct: 100 },
      { name: 'Launch Modes', value: 'High goal / Power shots', pct: 85 },
      { name: 'Accuracy', value: '94% on-target', pct: 94 },
      { name: 'Shoot-on-move', value: 'Trajectory correction mid-launch', pct: 100 },
      { name: 'Angle Adjust', value: 'Servo-driven, 35°–55°', pct: 75 },
    ],
  },
  {
    id: 'vision',
    label: 'Vision / Auto',
    icon: Cpu,
    accent: '#a855f7',
    specs: [
      { name: 'Framework', value: 'OpenCV + YOLO v5' },
      { name: 'Detection FPS', value: '30 fps on Control Hub', pct: 88 },
      { name: 'Ball Detection Acc.', value: '94%', pct: 94 },
      { name: 'Auto Score', value: '21-ball sequence', pct: 100 },
      { name: 'Path Planning', value: 'RoadRunner 1.0', pct: 90 },
      { name: 'Avg Auto Score', value: `${36.43} pts`, pct: 78 },
    ],
  },
]

function SpecGroupCard({ group, delay }: { group: SpecGroup; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true })
  const Icon = group.icon

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }

  return (
    <SpringFadeIn delay={delay}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }) }}
        animate={{
          rotateY: hovered ? mousePos.x * 8 : 0,
          rotateX: hovered ? -mousePos.y * 6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        className="h-full"
      >
        <GlassCard
          glowColor={group.accent}
          className="h-full flex-col p-6"
        >
          {/* Top accent line */}
          <div
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, ${group.accent}, ${group.accent}00)` }}
            aria-hidden
          />

          {/* Shimmer overlay */}
          {hovered && (
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, ${group.accent}12, transparent 60%)`,
              }}
              aria-hidden
            />
          )}

          {/* Header */}
          <div className="mb-5 flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: `${group.accent}18`, border: `1px solid ${group.accent}30` }}
            >
              <Icon className="h-4 w-4" style={{ color: group.accent }} aria-hidden />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white">{group.label}</h3>
          </div>

          {/* Spec rows */}
          <div className="space-y-3">
            {group.specs.map((spec, i) => (
              <div key={spec.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40 font-medium">{spec.name}</span>
                  <span className="font-bold text-white">{spec.value}</span>
                </div>
                {spec.pct !== undefined && (
                  <div className="mt-1.5 h-[3px] w-full rounded-full bg-white/5">
                    <div
                      className="spec-fill h-full rounded-full"
                      style={{
                        '--fill-pct': `${spec.pct}%`,
                        background: `linear-gradient(90deg, ${group.accent}80, ${group.accent})`,
                        animationDelay: inView ? `${delay + i * 0.08}s` : '9999s',
                        boxShadow: `0 0 8px ${group.accent}60`,
                      } as React.CSSProperties}
                      role="progressbar"
                      aria-valuenow={spec.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${spec.name}: ${spec.pct}%`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </SpringFadeIn>
  )
}

export function SpecSheet() {
  return (
    <section id="spec-sheet" className="relative z-10 py-24" aria-label="Robot specification sheet">
      {/* Section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-brand-electric/40 to-transparent" aria-hidden />

      <div className="container mx-auto px-6">
        <SpringFadeIn>
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.35em] text-brand-electric">
              Engineering Specs
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Under the Hood
            </h2>
            <p className="mt-3 text-text-muted max-w-lg mx-auto">
              Full technical breakdown — every subsystem, tolerance, and performance metric.
            </p>
          </div>
        </SpringFadeIn>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SPEC_GROUPS.map((group, i) => (
            <SpecGroupCard key={group.id} group={group} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
