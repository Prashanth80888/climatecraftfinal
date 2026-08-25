import { STORY_CHAPTERS } from '../../data/projects'
import { projectImageAt } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const CHAPTER_IMAGE_MAP: Record<string, string> = {
  design: 'the-parlour',
  comfort: 'city-view-retreat',
  movement: 'screening-room',
  technology: 'quiet-study',
}

export function CinematicStickyStory() {
  return (
    <section className="relative bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute right-[8%] top-[20%] h-[400px] w-[500px] opacity-[0.03] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>The Journey</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            From form to feeling.{' '}
            <span className="italic text-gold-400">Step by step.</span>
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 sm:mt-24 sm:gap-28 lg:mt-32 lg:gap-36">
          {STORY_CHAPTERS.map((chapter, i) => {
            const imageSlug = CHAPTER_IMAGE_MAP[chapter.id] ?? chapter.id
            const isEven = i % 2 === 0

            return (
              <div
                key={chapter.id}
                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
                  isEven ? '' : 'lg:[direction:rtl]'
                }`}
              >
                {/* Content */}
                <div className={`flex flex-col gap-5 lg:col-span-5 lg:[direction:ltr]`}>
                  <Reveal delay={0.05}>
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold-400/25 font-display text-sm tabular-nums text-gold-400/75">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400/65">
                        {chapter.label}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.12}>
                    <h3 className="font-display text-2xl font-normal leading-tight text-cream-100 sm:text-[1.65rem]">
                      {chapter.title}
                    </h3>
                  </Reveal>

                  <Reveal delay={0.18}>
                    <p className="text-[14.5px] leading-relaxed text-cream-200/55">
                      {chapter.copy}
                    </p>
                  </Reveal>

                  <Reveal delay={0.24}>
                    <span className="h-px w-8 bg-gold-400/25" />
                  </Reveal>
                </div>

                {/* Image */}
                <div className={`lg:col-span-7 lg:[direction:ltr]`}>
                  <Reveal delay={0.1} y={20}>
                    <div className="group relative overflow-hidden rounded-[28px] border border-white/[0.06] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.85)]">
                      <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                        <img
                          src={projectImageAt(imageSlug, chapter.id === 'movement' ? 2 : 1)}
                          alt={chapter.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
                      <div className="grain-overlay absolute inset-0 opacity-[0.06]" />
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
