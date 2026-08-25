import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { CaseStudy } from '../../data/caseStudies'
import { CASE_STUDIES } from '../../data/caseStudies'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Editorial story rows, alternating image side each time — never a repeating
// photo grid (see master brief §2/§4). One image per case study; the category,
// title, description and CTA carry the visual hierarchy, not the photograph.
const CaseStudyRow = forwardRef<HTMLDivElement, { caseStudy: CaseStudy; reversed: boolean }>(function CaseStudyRow(
  { caseStudy, reversed },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      <Link
        to={`/case-studies/${caseStudy.slug}`}
        className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10"
      >
        <div
          className={`relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-white/[0.06] shadow-[0_50px_120px_-50px_rgba(0,0,0,0.85)] transition-colors duration-300 group-hover:border-gold-400/35 sm:aspect-[16/11] lg:col-span-6 ${
            reversed ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <img
            src={caseStudy.gallery[0]}
            alt={caseStudy.summary}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
        </div>

        <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <span className="font-display text-sm italic tabular-nums text-gold-400/80">
            Case Study {String(caseStudy.number).padStart(2, '0')} / {String(CASE_STUDIES.length).padStart(2, '0')}
          </span>

          <h3 className="mt-4 font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            {caseStudy.title}
          </h3>

          <p className="mt-2 text-[11px] font-medium uppercase tracking-widest text-teal-300/75">
            {caseStudy.category}
          </p>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/65">{caseStudy.summary}</p>

          <span className="mt-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-gold-400">
            View Case Study
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
})

export function CaseStudyGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
      <AnimatePresence mode="popLayout">
        {caseStudies.map((cs, i) => (
          <CaseStudyRow key={cs.slug} caseStudy={cs} reversed={i % 2 === 1} />
        ))}
      </AnimatePresence>
    </div>
  )
}
