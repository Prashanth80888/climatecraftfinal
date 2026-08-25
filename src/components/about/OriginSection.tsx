import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function OriginSection() {
  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>The Origin</SectionLabel>
              <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl lg:text-[2.6rem]">
                A mechanism, <span className="italic text-gold-400">then a chair.</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/65">
                Climate Craft was founded in 2009 in Antwerp, Belgium — still the address every piece is engineered
                from today. The company was built on a simple ordering of priorities: the mechanism comes first, and
                everything else is built to honour it.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {[
                  'A silent motor and hand-crank glide, chosen and tested before anything is built around them.',
                  'A hardwood frame, hand-jointed to carry that motion for the life of the piece.',
                  'Hand-tied, zone-tensioned suspension, upholstered from a curated fabric archive — made to order, not off a shelf.',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[14px] leading-relaxed text-cream-200/65">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold-400" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-[28px] border border-white/[0.06] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
                <img
                  src="/images/about/motion.png"
                  alt="The motorized mechanism at the centre of a Climate Craft piece"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[4/3]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
