import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function BrandPhilosophy() {
  return (
    <section className="relative bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Our Philosophy</SectionLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-normal leading-[1.1] text-cream-100 sm:text-5xl lg:text-[3.4rem]">
            Furniture should do more <span className="italic text-gold-400">than fill a room.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-1" />
          <div className="lg:col-span-8">
            <Reveal delay={0.16}>
              <p className="max-w-2xl text-[17px] leading-relaxed text-cream-200/70 sm:text-xl">
                At Climate Craft, a piece of furniture is where comfort, movement, technology and design meet — not
                separate features bolted together, but one considered experience.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream-200/55">
                We start with how a body actually sits, rests and moves. Everything else — the motor, the
                upholstery, the interface — is built around that, not the other way around.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
