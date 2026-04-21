export function TechDivider({ label = 'SECURE DATALINK // ACTIVE' }: { label?: string }) {
  return (
    <div className="relative flex w-full select-none items-center justify-center overflow-hidden py-16">
      {/* Ghost geometric gridline */}
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-glass to-transparent opacity-50" />

      {/* Layer 1: Wide electric blue blur pulse */}
      <div
        className="absolute top-1/2 h-[2px] w-64 -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-electric to-transparent blur-[2px]"
        style={{ animation: 'optic-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
      />
      
      {/* Layer 2: Tight intense core white pulse */}
      <div
        className="absolute top-1/2 h-[1px] w-32 -translate-y-1/2 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_#0044ff]"
        style={{ animation: 'optic-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
      />

      {/* Central data node */}
      <div className="relative z-10 flex items-center gap-6 bg-bg-base px-8 py-1">
        {/* Left optic node */}
        <div className="relative h-2 w-2 rotate-45 border border-brand-electric bg-brand-electric/20 shadow-[0_0_10px_#0044ff]">
          <div className="absolute inset-0 animate-ping bg-brand-electric opacity-50" />
        </div>

        {/* Text readout */}
        <span className="font-display text-[9px] font-bold uppercase tracking-[0.4em] text-white/50 mix-blend-screen md:text-[11px]">
          {label}
        </span>

        {/* Right optic node */}
        <div className="h-2 w-2 rotate-45 border border-brand-orange bg-brand-orange/20 shadow-[0_0_10px_#ff5e00]" />
      </div>
    </div>
  )
}
