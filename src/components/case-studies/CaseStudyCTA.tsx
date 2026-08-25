import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { whatsappHref } from '../../lib/assets'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

// Same established Climate Craft CTA pattern as FinalCTA.tsx (/contact + WhatsApp)
// with case-study-specific copy, mirroring how ProjectsCTA.tsx carries its own
// copy on the Projects page.
export function CaseStudyCTA() {
  return (
    <section id="case-study-cta" className="relative overflow-hidden bg-teal-950">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-900 via-ink-950 to-ink-950" />
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 animate-shimmer rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full opacity-20 blur-[90px]"
        style={{ background: 'radial-gradient(circle, #2b9587 0%, transparent 70%)' }}
      />
      <div className="grain-overlay opacity-30" />

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionLabel>Let's Talk</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl lg:text-[2.9rem]">
            Let's design the right <span className="italic text-gold-400">comfort for your space.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-cream-200/70">
            Every Climate Craft piece is engineered to order and quoted for your space — tell us about the room, and
            we'll help you find the right fit.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="group btn-primary">
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappHref("Hi Climate Craft, I'd like to talk about a case study I saw on your site.")}
              target="_blank"
              rel="noreferrer"
              className="group btn-outline"
            >
              Message on WhatsApp
              <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
