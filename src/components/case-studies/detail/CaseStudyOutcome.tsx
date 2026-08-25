import type { CaseStudy } from '../../../data/caseStudies'
import { SectionLabel } from '../../ui/SectionLabel'
import { Reveal } from '../../ui/Reveal'

// No completed-installation statistics exist for these design-application studies,
// so the outcome is presented qualitatively — a genuine design-fit observation
// grounded in the photography, never an invented number or client result.
export function CaseStudyOutcome({ caseStudy }: { caseStudy: CaseStudy }) {
  const image = caseStudy.gallery[2]

  if (!image) {
    return (
      <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Design Outcome</SectionLabel>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-1" />
            <div className="lg:col-span-8">
              <Reveal delay={0.08}>
                <p className="max-w-2xl text-[17px] leading-relaxed text-cream-100/85 sm:text-xl">
                  {caseStudy.outcome}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Design Outcome</SectionLabel>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.08}>
              <p className="text-[17px] leading-relaxed text-cream-100/85 sm:text-xl">{caseStudy.outcome}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.14}>
              <div className="overflow-hidden rounded-[24px] border border-white/[0.06] shadow-[0_50px_120px_-50px_rgba(0,0,0,0.85)]">
                <div className="aspect-[4/5] w-full">
                  <img
                    src={image}
                    alt={`${caseStudy.title} — the completed placement`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
