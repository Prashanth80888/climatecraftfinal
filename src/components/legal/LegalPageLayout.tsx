import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { Footer } from '../Footer'
import { LAST_UPDATED } from '../../data/siteConfig'

export interface LegalSection {
  id: string
  title: string
  body: ReactNode
}

/** Shared bullet-list treatment, matching the small gold-dot pattern used elsewhere on the site. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

interface LegalPageLayoutProps {
  eyebrow: string
  title: string
  intro: string
  sections: LegalSection[]
}

// Shared scaffold for Privacy Policy / Terms & Conditions / Cookie Policy —
// editorial hero, a table of contents (sticky on desktop, a collapsible
// <details> on mobile, same accordion convention as AboutFAQ), and the
// sections themselves. Deliberately restrained on animation: readability
// matters more than motion for legal content.
export function LegalPageLayout({ eyebrow, title, intro, sections }: LegalPageLayoutProps) {
  return (
    <>
      <main>
        <section className="relative w-full overflow-hidden bg-ink-950 pb-10 pt-36 sm:pb-12 sm:pt-40 lg:pt-48">
          <div
            className="pointer-events-none absolute -top-16 left-1/2 h-[360px] w-[720px] -translate-x-1/2 opacity-[0.1] blur-[130px]"
            style={{ background: 'radial-gradient(ellipse, #1d7a6f 0%, transparent 65%)' }}
          />
          <div className="grain-overlay opacity-[0.06]" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Reveal>
                <span className="section-label">{eyebrow}</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-6 font-display text-4xl font-normal leading-[1.06] text-cream-100 sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 text-[11px] uppercase tracking-widest text-cream-200/45">
                  Climate Craft · Last updated {LAST_UPDATED}
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream-200/65">{intro}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative bg-ink-950 pb-20 sm:pb-24 lg:pb-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-10 lg:hidden">
              <details className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 outline-none">
                  <span className="section-label !mb-0">On This Page</span>
                  <ChevronDown className="h-4 w-4 flex-none text-gold-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <ul className="mt-4 space-y-3">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-[13.5px] text-cream-200/65 hover:text-gold-400">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
              <aside className="hidden lg:col-span-3 lg:block">
                <div className="sticky top-32">
                  <p className="section-label !mb-0">On This Page</p>
                  <ul className="mt-5 space-y-3 border-l border-white/10 pl-5">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="block text-[13px] leading-snug text-cream-200/55 transition-colors duration-300 hover:text-gold-400"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="space-y-14 lg:col-span-9">
                {sections.map((s) => (
                  <div key={s.id} id={s.id} className="scroll-mt-32">
                    <h2 className="font-display text-2xl text-cream-100 sm:text-[1.75rem]">{s.title}</h2>
                    <div className="mt-4 max-w-2xl space-y-4 text-[14.5px] leading-relaxed text-cream-200/70">
                      {s.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
