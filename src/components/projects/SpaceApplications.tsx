import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SPACE_APPLICATIONS } from '../../data/projects'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function SpaceApplications() {
  const [activeId, setActiveId] = useState(SPACE_APPLICATIONS[0].id)
  const active = SPACE_APPLICATIONS.find((s) => s.id === activeId)!

  return (
    <section id="space-applications" className="relative overflow-hidden bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Space Applications</SectionLabel>
          <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            One design, <span className="italic text-gold-400">shaped by the room.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Space application"
            className="mt-9 inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-ink-900/50 p-1 backdrop-blur-md"
          >
            {SPACE_APPLICATIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={activeId === s.id}
                onClick={() => setActiveId(s.id)}
                className={`relative rounded-full px-5 py-2.5 text-[11.5px] font-medium uppercase tracking-widest transition-colors duration-300 ${
                  activeId === s.id ? 'text-ink-950' : 'text-cream-200/60 hover:text-cream-100'
                }`}
              >
                {activeId === s.id && (
                  <motion.span
                    layoutId="space-app-pill"
                    transition={{ duration: 0.45, ease: easeOut }}
                    className="absolute inset-0 rounded-full bg-gold-400 shadow-[0_8px_20px_-8px_rgba(212,175,86,0.6)]"
                  />
                )}
                <span className="relative z-10">{s.category}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.06] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/12]">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={active.title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: easeOut }}
              >
                <h3 className="font-display text-2xl font-normal leading-tight text-cream-100 sm:text-[1.75rem]">
                  {active.title}
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-cream-200/70">{active.intro}</p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-teal-300/70">
                    Comfort Experience
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-cream-200/60">{active.comfort}</p>
                </div>

                {active.engineering && (
                  <div className="mt-5 border-t border-white/10 pt-5">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-teal-300/70">Engineering</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-cream-200/60">{active.engineering}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
