import { RotateCw, Sparkles } from 'lucide-react'

export type ViewerMode = '3d' | 'details'

interface ViewerModeSwitcherProps {
  mode: ViewerMode
  onChange: (mode: ViewerMode) => void
}

export function ViewerModeSwitcher({ mode, onChange }: ViewerModeSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Product viewer mode"
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-ink-900/70 p-1 backdrop-blur-md"
    >
      {(
        [
          { id: '3d' as const, label: '360° View', icon: RotateCw },
          { id: 'details' as const, label: 'Detail View', icon: Sparkles },
        ]
      ).map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={mode === id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-widest transition-all duration-300 ${
            mode === id
              ? 'bg-gold-400 text-ink-950 shadow-[0_8px_20px_-8px_rgba(212,175,86,0.6)]'
              : 'text-cream-200/55 hover:text-cream-100'
          }`}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
          {label}
        </button>
      ))}
    </div>
  )
}
