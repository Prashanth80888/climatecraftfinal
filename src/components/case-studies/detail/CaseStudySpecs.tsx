import type { CaseStudy } from '../../../data/caseStudies'
import { getCaseStudyProjectDetails } from '../../../data/caseStudies'
import { SectionLabel } from '../../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal'

// A clean specification panel — every field here is verified against the
// related product's real data (src/data/homeProducts.ts) via
// getCaseStudyProjectDetails, never a per-project statistic invented for this
// page (see master brief §6/§7). Fields that don't apply to a given product
// family (e.g. Climate Control on a non-climate piece) are simply absent.
export function CaseStudySpecs({ caseStudy }: { caseStudy: CaseStudy }) {
  const details = getCaseStudyProjectDetails(caseStudy)
  const image = caseStudy.gallery[1]

  if (details.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-teal-950/15 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-teal-950/15 to-ink-950" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Project Details</SectionLabel>
        </Reveal>

        <div className={`mt-8 grid grid-cols-1 gap-10 ${image ? 'lg:grid-cols-12 lg:gap-12' : ''}`}>
          <div className={image ? 'lg:col-span-6' : ''}>
            <RevealGroup
              className="grid grid-cols-2 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
              stagger={0.06}
            >
              {details.map((d) => (
                <RevealItem key={d.label} className="px-1 py-6 first:pl-0 sm:px-6 sm:first:pl-0">
                  <p className="text-[10.5px] uppercase tracking-widest text-cream-200/45">{d.label}</p>
                  <p className="mt-2 font-display text-lg text-gold-400 sm:text-xl">{d.value}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {image && (
            <div className="lg:col-span-6">
              <Reveal delay={0.14}>
                <div className="overflow-hidden rounded-[24px] border border-white/[0.06] shadow-[0_50px_120px_-50px_rgba(0,0,0,0.85)]">
                  <div className="aspect-[4/5] w-full sm:aspect-[16/12]">
                    <img
                      src={image}
                      alt={`${caseStudy.title} — a verified detail angle`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
