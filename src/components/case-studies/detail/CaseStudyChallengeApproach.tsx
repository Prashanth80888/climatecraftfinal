import type { CaseStudy } from '../../../data/caseStudies'
import { SectionLabel } from '../../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal'

export function CaseStudyChallengeApproach({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section className="relative overflow-hidden bg-teal-950/15 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-teal-950/15 to-ink-950" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Space, Seating, Experience</SectionLabel>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-white/10 pt-10 lg:grid-cols-2">
          <RevealItem>
            <h2 className="font-display text-2xl font-normal leading-tight text-cream-100 sm:text-3xl">
              The <span className="italic text-gold-400">Challenge</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/70">{caseStudy.challenge}</p>
          </RevealItem>

          <RevealItem>
            <h2 className="font-display text-2xl font-normal leading-tight text-cream-100 sm:text-3xl">
              The <span className="italic text-gold-400">Approach</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/70">{caseStudy.approach}</p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
