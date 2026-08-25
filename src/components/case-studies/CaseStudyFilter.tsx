import { motion } from 'framer-motion'
import { CASE_STUDIES, CASE_STUDY_CATEGORIES } from '../../data/caseStudies'
import { Reveal } from '../ui/Reveal'

const ALL = 'All'

interface CaseStudyFilterProps {
  active: string
  onChange: (category: string) => void
}

export function CaseStudyFilter({ active, onChange }: CaseStudyFilterProps) {
  const options = [ALL, ...CASE_STUDY_CATEGORIES]

  return (
    <Reveal delay={0.1}>
      <div
        role="tablist"
        aria-label="Filter case studies by category"
        className="scrollbar-none inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-ink-900/50 p-1 backdrop-blur-md"
      >
        {options.map((option) => {
          const count = option === ALL ? CASE_STUDIES.length : CASE_STUDIES.filter((c) => c.category === option).length
          const isActive = active === option
          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(option)}
              className={`relative flex-none whitespace-nowrap rounded-full px-5 py-2.5 text-[11.5px] font-medium uppercase tracking-widest transition-colors duration-300 ${
                isActive ? 'text-ink-950' : 'text-cream-200/60 hover:text-cream-100'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="case-study-filter-pill"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-full bg-gold-400 shadow-[0_8px_20px_-8px_rgba(212,175,86,0.6)]"
                />
              )}
              <span className="relative z-10">
                {option}
                <span className={`ml-2 tabular-nums ${isActive ? 'text-ink-950/60' : 'text-cream-200/40'}`}>
                  {String(count).padStart(2, '0')}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </Reveal>
  )
}
