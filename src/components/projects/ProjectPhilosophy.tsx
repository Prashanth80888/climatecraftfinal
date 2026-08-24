import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function ProjectPhilosophy() {
  return (
    <section className="relative bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>The Idea</SectionLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-normal leading-[1.1] text-cream-100 sm:text-5xl lg:text-[3.2rem]">
            Furniture should belong <span className="italic text-gold-400">to the room.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-1" />
          <div className="lg:col-span-8">
            <Reveal delay={0.16}>
              <p className="max-w-2xl text-[17px] leading-relaxed text-cream-200/70 sm:text-xl">
                Climate Craft seating is designed to work as part of an interior, rather than sit inside it as an
                isolated object. Every piece is considered against how a room is actually used.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream-200/55">
                Posture, movement, comfort, technology and visual balance are treated as one design problem — not a
                seat, then a motor, then a control, added on in sequence.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
