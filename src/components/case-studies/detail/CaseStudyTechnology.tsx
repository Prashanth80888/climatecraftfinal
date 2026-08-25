import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cog } from 'lucide-react'
import type { CaseStudy } from '../../../data/caseStudies'
import { SectionLabel } from '../../ui/SectionLabel'
import { Reveal } from '../../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function CaseStudyTechnology({ caseStudy }: { caseStudy: CaseStudy }) {
  const [active, setActive] = useState(0)
  const current = caseStudy.technology[active]

  if (caseStudy.technology.length === 0) return null

  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Engineering, Applied</SectionLabel>
          <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Technology that <span className="italic text-gold-400">disappears into comfort.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap gap-2.5" role="tablist" aria-label="Technology capabilities">
            {caseStudy.technology.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-medium uppercase tracking-widest transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${
                  active === i
                    ? 'border-gold-400/50 bg-gold-400/10 text-gold-300'
                    : 'border-white/10 bg-white/[0.02] text-cream-200/65 hover:border-white/25 hover:text-cream-100'
                }`}
              >
                <Cog className="h-3.5 w-3.5" strokeWidth={1.5} />
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-8 min-h-[110px] overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="max-w-2xl text-[15px] leading-relaxed text-cream-200/75"
            >
              {current.description}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
