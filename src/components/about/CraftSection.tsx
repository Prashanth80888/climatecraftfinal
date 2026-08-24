import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function CraftSection() {
  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>Material &amp; Form</SectionLabel>
              <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl lg:text-[2.6rem]">
                Where material, form <span className="italic text-gold-400">and movement meet.</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/65">
                Premium upholstery, generous cushioning and a refined silhouette are the foundation every Climate
                Craft piece is built on — the same standard whether a piece moves or stays still.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[28px] border border-white/[0.06] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
                <img
                  src="/images/about/craft.png"
                  alt="Premium upholstery and finish on a Climate Craft sofa"
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
