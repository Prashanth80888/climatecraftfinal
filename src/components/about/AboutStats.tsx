import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { PRODUCT_FAMILIES } from '../../data/homeProducts'
import { contact } from '../../lib/assets'
import { useCountUp } from '../../hooks/useCountUp'
import { Reveal } from '../ui/Reveal'

// Every value here is traceable to real, existing data — the founding year in
// the Footer's copyright line, the fabric count from a real client testimonial
// already live on Collections, and the family/showroom counts read directly
// from the product and contact data. Nothing here is a marketing estimate.
const FOUNDING_YEAR = 2009
const ARCHIVE_FABRIC_COUNT = 2000
const showroomCount = contact.showrooms.split('&').length

const STATS = [
  { value: new Date().getFullYear() - FOUNDING_YEAR, suffix: '', label: 'Years of Engineering' },
  { value: ARCHIVE_FABRIC_COUNT, suffix: '+', label: 'Archive Fabrics' },
  { value: PRODUCT_FAMILIES.length, suffix: '', label: 'Product Families' },
  { value: showroomCount, suffix: '', label: `Showrooms · ${contact.showrooms}` },
]

function Stat({
  value,
  suffix,
  label,
  active,
}: {
  value: number
  suffix: string
  label: string
  active: boolean
}) {
  const count = useCountUp(value, active)
  return (
    <div className="flex flex-col items-start border-t border-white/10 px-1 py-9 sm:border-t-0 sm:border-l sm:px-7 sm:py-2 sm:first:border-l-0">
      <span className="font-display text-5xl tabular-nums text-gold-400 sm:text-6xl">
        {count}
        {suffix}
      </span>
      <span className="mt-3 text-[11px] font-medium uppercase tracking-widest text-cream-200/55">{label}</span>
    </div>
  )
}

export function AboutStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section className="relative bg-ink-900/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-12 border-y border-white/10 py-2 sm:grid-cols-4">
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} active={inView} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
