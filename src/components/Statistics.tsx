import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { Reveal } from './ui/Reveal'

const STATS = [
  { value: 15, suffix: '+', label: 'Years of Craft' },
  { value: 300, suffix: '+', label: 'Bespoke Projects' },
  { value: 20, suffix: '+', label: 'Countries Served' },
  { value: 10, suffix: 'K+', label: 'Pieces Delivered' },
]

function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, active)
  return (
    <div className="flex flex-col items-center border-t border-white/10 px-4 py-9 text-center first:border-t-0 sm:border-t-0 sm:border-l sm:py-11 sm:first:border-l-0">
      <span className="font-display text-4xl tabular-nums text-gold-400 sm:text-5xl">
        {count}
        {suffix}
      </span>
      <span className="mt-2.5 text-[11px] font-medium uppercase tracking-widest text-cream-200/60">{label}</span>
    </div>
  )
}

export function Statistics() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section className="relative bg-ink-950 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div ref={ref} className="grid grid-cols-2 border-y border-white/10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} active={inView} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
