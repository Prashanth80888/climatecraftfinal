import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function BrandStatement() {
  return (
    <section className="relative bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Since 2009</SectionLabel>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-1" />
          <div className="lg:col-span-10">
            <Reveal delay={0.1}>
              <h2 className="max-w-4xl font-display text-4xl font-normal leading-[1.15] text-cream-100 sm:text-5xl lg:text-[3.4rem]">
                We've built seating around a single idea: that a piece should{' '}
                <span className="italic text-gold-400">move</span> as beautifully as it sits still.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-cream-200/55">
                The mechanism comes first. The frame and upholstery are built to honour it — never the other way
                around.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
