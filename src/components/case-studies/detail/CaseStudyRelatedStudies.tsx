import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { CaseStudy } from '../../../data/caseStudies'
import { SectionLabel } from '../../ui/SectionLabel'
import { RevealGroup, RevealItem } from '../../ui/Reveal'

export function CaseStudyRelatedStudies({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (caseStudies.length === 0) return null

  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionLabel>Continue Exploring</SectionLabel>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {caseStudies.map((cs) => (
            <RevealItem key={cs.slug}>
              <Link
                to={`/case-studies/${cs.slug}`}
                className="group relative block overflow-hidden rounded-[20px] border border-white/10 bg-ink-900/40 transition-colors duration-300 hover:border-gold-400/35"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-900">
                  <img
                    src={cs.gallery[0]}
                    alt={cs.summary}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink-950/40 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-cream-100/70 backdrop-blur-md">
                    {cs.category}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <div>
                      <h4 className="font-display text-lg text-cream-100">{cs.title}</h4>
                      <p className="mt-1 max-w-xs text-[12.5px] leading-relaxed text-cream-200/55">{cs.summary}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 flex-none -translate-x-1 translate-y-1 text-gold-400 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
