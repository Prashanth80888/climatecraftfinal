import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function VisionMission() {
  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionLabel>Vision</SectionLabel>
              <h2 className="mt-5 max-w-sm font-display text-3xl font-normal leading-[1.15] text-cream-100 sm:text-4xl">
                Motion, made to <span className="italic text-gold-400">last a generation.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-cream-200/65">
                Powered furniture shouldn't be disposable. A mechanism should be engineered, serviced and trusted —
                and a seat should adapt to the body silently, without ever announcing the technology inside it.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.12}>
              <SectionLabel>Mission</SectionLabel>
              <h2 className="mt-5 max-w-sm font-display text-3xl font-normal leading-[1.15] text-cream-100 sm:text-4xl">
                Engineer the quiet, <span className="italic text-gold-400">wrap it beautifully.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-cream-200/65">
                We build reliable motion mechanisms and dress them in upholstery worthy of the engineering
                underneath — while supplying the manufacturers, galleries and architecture practices that specify us
                to stand behind that promise.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
