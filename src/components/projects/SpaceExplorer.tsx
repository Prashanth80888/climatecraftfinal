import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SPACE_EXPLORER } from '../../data/projects'
import { projectImageAt } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const CATEGORIES = Array.from(new Set(SPACE_EXPLORER.map((s) => s.category)))

function ExplorerCard({
  entry,
  index,
}: {
  entry: (typeof SPACE_EXPLORER)[0]
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const isEven = index % 2 === 0

  return (
    <div
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
        isEven ? '' : 'lg:[direction:rtl]'
      }`}
    >
      {/* Image side */}
      <Reveal delay={0.05} className="lg:col-span-7 lg:[direction:ltr]">
        <div
          className={`group relative overflow-hidden rounded-[24px] border border-white/[0.06] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] transition-shadow duration-500 hover:shadow-[0_50px_140px_-35px_rgba(0,0,0,0.9)] ${
            !prefersReducedMotion ? 'card-tilt' : ''
          }`}
        >
          <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
            <img
              src={projectImageAt(entry.id, 1)}
              alt={entry.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
          <div className="grain-overlay absolute inset-0 opacity-[0.06]" />

          {/* Category badge */}
          <div className="absolute left-5 top-5">
            <span className="inline-block rounded-full border border-white/10 bg-ink-950/60 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-cream-100/70 backdrop-blur-md">
              {entry.category}
            </span>
          </div>
        </div>
      </Reveal>

      {/* Content side */}
      <Reveal delay={0.15} className="flex flex-col gap-5 lg:col-span-5 lg:[direction:ltr]">
        <div>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold-400/75">
            {entry.category}
          </p>
          <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-cream-100 sm:text-[1.65rem]">
            {entry.title}
          </h3>
          <p className="mt-4 text-[14.5px] leading-relaxed text-cream-200/60">
            {entry.description}
          </p>
        </div>

        <div className="space-y-4 border-t border-white/[0.06] pt-5">
          <div>
            <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-teal-300/60">Application</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-cream-200/50">{entry.application}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-teal-300/60">Design Intent</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-cream-200/50">{entry.designIntent}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {entry.features.map((f) => (
            <span
              key={f}
              className="inline-block rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[11px] text-cream-200/45"
            >
              {f}
            </span>
          ))}
        </div>

        <motion.div
          className="group/link mt-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-400/80 transition-colors duration-300 hover:text-gold-300"
          whileHover={{ x: 4 }}
        >
          <span>Explore Space</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </motion.div>
      </Reveal>
    </div>
  )
}

export function SpaceExplorer() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0])
  const filtered = SPACE_EXPLORER.filter((s) => s.category === activeCategory)

  return (
    <section id="space-explorer" className="relative overflow-hidden bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute right-[8%] top-[12%] h-[400px] w-[500px] opacity-[0.035] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Explore Spaces</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Where comfort meets{' '}
            <span className="italic text-gold-400">considered environments.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-cream-200/55">
            Each project begins with the room. The furniture follows.
          </p>
        </Reveal>

        {/* Category filter pills */}
        <Reveal delay={0.18}>
          <div
            role="tablist"
            aria-label="Space category"
            className="mt-10 inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-ink-900/50 p-1 backdrop-blur-md"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full px-5 py-2.5 text-[11.5px] font-medium uppercase tracking-widest transition-colors duration-300 ${
                  activeCategory === cat ? 'text-ink-950' : 'text-cream-200/55 hover:text-cream-100'
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="space-cat-pill"
                    transition={{ duration: 0.45, ease: easeOut }}
                    className="absolute inset-0 rounded-full bg-gold-400 shadow-[0_8px_20px_-8px_rgba(212,175,86,0.55)]"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Explorer cards */}
        <div className="mt-16 flex flex-col gap-20 sm:mt-24 sm:gap-28 lg:mt-32 lg:gap-36">
          {filtered.map((entry, i) => (
            <ExplorerCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* Full-range grid for "All" feel — show remaining spaces not in current category */}
        {activeCategory === CATEGORIES[0] && (
          <RevealGroup className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-28">
            {SPACE_EXPLORER.filter((s) => s.category !== activeCategory)
              .slice(0, 3)
              .map((entry) => (
                <RevealItem key={entry.id}>
                  <div className="group relative overflow-hidden rounded-[20px] border border-white/[0.06] bg-ink-900/30 transition-all duration-500 hover:border-gold-400/25 hover:bg-ink-900/50">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={projectImageAt(entry.id, 1)}
                        alt={entry.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold-400/65">{entry.category}</p>
                      <h4 className="mt-2 font-display text-lg text-cream-100 transition-colors duration-300 group-hover:text-gold-100">
                        {entry.title}
                      </h4>
                      <p className="mt-2 text-[13px] leading-relaxed text-cream-200/45 line-clamp-2">{entry.description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
          </RevealGroup>
        )}
      </div>
    </section>
  )
}
