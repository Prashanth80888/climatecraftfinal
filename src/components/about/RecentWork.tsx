import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getCaseStudyBySlug } from '../../data/caseStudies'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

// Three real, photographed spaces from the verified Case Studies dataset —
// never a separate, invented "commissions" list. No client, location or date
// claims are made here, matching the standing rule on that data (see
// src/data/caseStudies.ts).
const FEATURED_SLUGS = ['the-parlour', 'quiet-study', 'screening-room']

export function RecentWork() {
  const studies = FEATURED_SLUGS.map(getCaseStudyBySlug).filter((c): c is NonNullable<typeof c> => Boolean(c))

  if (studies.length === 0) return null

  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionLabel>Recent Work</SectionLabel>
            <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
              A few rooms, <span className="italic text-gold-400">applied.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/case-studies" className="group btn-ghost">
              All Case Studies
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {studies.map((study) => (
            <RevealItem key={study.slug}>
              <Link to={`/case-studies/${study.slug}`} className="group block">
                <div className="overflow-hidden rounded-[24px] border border-white/[0.06] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)]">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={study.gallery[0]}
                      alt={study.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <p className="mt-4 text-[11px] font-medium uppercase tracking-widest text-gold-400/80">
                  {study.category}
                </p>
                <h3 className="mt-1.5 font-display text-xl text-cream-100">{study.title}</h3>
                <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-cream-200/55">{study.summary}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-widest text-cream-200/70 transition-colors duration-300 group-hover:text-gold-400">
                  View Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
