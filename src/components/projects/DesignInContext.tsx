import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { DESIGN_CONTEXT } from '../../data/projects'
import { projectImageAt } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function DesignInContext() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1, 1.05])
  const imageY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute left-[10%] top-1/2 h-[400px] w-[500px] -translate-y-1/2 opacity-[0.035] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Design in Context</SectionLabel>
        </Reveal>

        <div ref={ref} className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Content — left */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
                {DESIGN_CONTEXT.title.split('disappear into the experience').map((part, i) => (
                  <span key={part}>
                    {i > 0 && <span className="italic text-gold-400">disappear into the experience.</span>}
                    {i === 0 && part}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-[15px] leading-relaxed text-cream-200/60">
                {DESIGN_CONTEXT.description}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {['Motorised movement', 'Climate control', 'Intuitive interaction'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-[11px] text-cream-200/45"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold-400/50" />
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Image — right */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="group relative overflow-hidden rounded-[28px] border border-white/[0.06] shadow-[0_60px_160px_-50px_rgba(0,0,0,0.9)]">
                <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                  <motion.div style={{ scale: imageScale, y: imageY }} className="h-full w-full">
                    <img
                      src={projectImageAt('quiet-study', 2)}
                      alt="Technology integrated into the seating experience"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </motion.div>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-ink-950/20 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent" />
                <div className="grain-overlay absolute inset-0 opacity-[0.06]" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
