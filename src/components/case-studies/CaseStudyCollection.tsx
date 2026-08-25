import { useMemo, useState } from 'react'
import { CASE_STUDIES } from '../../data/caseStudies'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { CaseStudyFilter } from './CaseStudyFilter'
import { CaseStudyGrid } from './CaseStudyGrid'

const ALL = 'All'

export function CaseStudyCollection() {
  const [active, setActive] = useState(ALL)

  const filtered = useMemo(
    () => (active === ALL ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.category === active)),
    [active],
  )

  return (
    <section id="case-study-index" className="relative overflow-hidden bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>The Studies</SectionLabel>
          <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Eight rooms, <span className="italic text-gold-400">one design problem each.</span>
          </h2>
        </Reveal>

        <div className="mt-9">
          <CaseStudyFilter active={active} onChange={setActive} />
        </div>

        <div className="mt-14 sm:mt-16">
          <CaseStudyGrid caseStudies={filtered} />
        </div>
      </div>
    </section>
  )
}
