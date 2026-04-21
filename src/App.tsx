export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tight text-brand-electric drop-shadow-[0_0_15px_rgba(0,68,255,0.5)]">
        Electrolights // 30686
      </h1>
      <p className="mt-4 text-text-muted">
        Phase 1: Foundation
      </p>
      
      {/* Quick Color Palette Test */}
      <div className="mt-8 flex gap-4">
        <button className="rounded-md border border-glass bg-bg-surface px-4 py-2 text-brand-electric transition-colors hover:bg-brand-electric hover:text-white">
          Electric Blue
        </button>
        <button className="rounded-md border border-glass bg-bg-surface px-4 py-2 text-brand-orange transition-colors hover:bg-brand-orange hover:text-white">
          Energy Orange
        </button>
        <button className="rounded-md border border-glass bg-bg-surface px-4 py-2 text-destructive-base transition-colors hover:bg-destructive-base hover:text-white">
          Destructive Burgundy
        </button>
      </div>
    </div>
  )
}
