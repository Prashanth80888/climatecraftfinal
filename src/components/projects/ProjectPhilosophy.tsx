import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const SPACE_NEEDS = [
  {
    title: 'A private residence',
    copy: 'may prioritise quiet relaxation — a seat that disappears into the room, supporting rest without drawing attention.',
  },
  {
    title: 'A media environment',
    copy: 'may require comfort that adapts over long sessions — motorised reclining that changes position without interrupting what is on screen.',
  },
  {
    title: 'A formal lounge',
    copy: 'may need a stronger visual presence — furniture that holds its own against architecture and art, comfort through form rather than movement.',
  },
  {
    title: 'A personal retreat',
    copy: 'may demand climate control as part of the experience — liquid cooling and heating that responds to how the body actually settles in a space.',
  },
]

export function ProjectPhilosophy() {
  return (
    <section className="relative bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>The Approach</SectionLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-4xl font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl lg:text-[3rem]">
            Every space asks for a different kind of{' '}
            <span className="italic text-gold-400">comfort.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-cream-200/65 sm:text-[17px]">
            Climate Craft approaches each environment by considering how people actually sit, move, relax
            and interact with the space around them — not by applying a single solution to every room.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:mt-20">
          {SPACE_NEEDS.map((need) => (
            <RevealItem key={need.title}>
              <div className="group">
                <h3 className="font-display text-lg text-cream-100">{need.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-cream-200/55">{need.copy}</p>
                <span className="mt-4 block h-px w-6 bg-gold-400/25 transition-all duration-500 group-hover:w-10 group-hover:bg-gold-400/60" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
