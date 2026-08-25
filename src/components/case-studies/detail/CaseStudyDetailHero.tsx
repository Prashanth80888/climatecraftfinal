import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { CaseStudy } from '../../../data/caseStudies'
import { CASE_STUDIES, getCaseStudyPrimaryProduct } from '../../../data/caseStudies'
import { SectionLabel } from '../../ui/SectionLabel'
import { Reveal } from '../../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

// No hero image — the detail page opens on typography alone (see master brief
// §9). What would otherwise be an image caption becomes a small, verified
// metadata row instead: category, operation and seating straight from the
// related product, nothing invented.
export function CaseStudyDetailHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const prefersReducedMotion = useReducedMotion()
  const product = getCaseStudyPrimaryProduct(caseStudy)

  return (
    <section className="relative overflow-hidden bg-ink-950 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full opacity-[0.12] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 70%)' }}
      />
      <div className="grain-overlay opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal amount={0.6}>
          <nav className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-cream-200/45">
            <Link to="/case-studies" className="transition-colors duration-300 hover:text-gold-400">
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-cream-200/70">{caseStudy.category}</span>
            <span>/</span>
            <span className="text-cream-100">{caseStudy.title}</span>
          </nav>
        </Reveal>

        <div className="mt-10 max-w-3xl">
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-display text-sm italic tabular-nums text-gold-400/80">
                {String(caseStudy.number).padStart(2, '0')} / {String(CASE_STUDIES.length).padStart(2, '0')}
              </span>
              <SectionLabel>{caseStudy.category}</SectionLabel>
            </div>
          </Reveal>

          <h1 className="mt-6 font-display text-5xl font-normal leading-[1.05] text-cream-100 sm:text-6xl lg:text-7xl">
            {caseStudy.title.split(' ').map((word, i) => (
              <span key={`${word}-${i}`} className="mr-3 inline-block overflow-hidden last:mr-0">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: easeOut }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <Reveal delay={0.3}>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-cream-200/70 sm:text-[17px]">
              {caseStudy.summary}
            </p>
          </Reveal>
        </div>

        {product && (
          <Reveal delay={0.4} className="mt-12 sm:mt-14">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-7">
              <div>
                <p className="text-[10.5px] uppercase tracking-widest text-cream-200/45">Product</p>
                <p className="mt-1.5 text-[13.5px] text-cream-100">{product.name}</p>
              </div>
              <div>
                <p className="text-[10.5px] uppercase tracking-widest text-cream-200/45">Operation</p>
                <p className="mt-1.5 text-[13.5px] text-cream-100">{product.operation}</p>
              </div>
              <div>
                <p className="text-[10.5px] uppercase tracking-widest text-cream-200/45">Seating</p>
                <p className="mt-1.5 text-[13.5px] text-cream-100">
                  {product.seats} Seat{product.seats > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </Reveal>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-14 flex sm:mt-16"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream-100/60"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
