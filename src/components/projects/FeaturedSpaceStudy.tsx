import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FEATURED_SPACE } from '../../data/projects'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function FeaturedSpaceStudy() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.05])
  const imageY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section className="relative bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>{FEATURED_SPACE.label}</SectionLabel>
        </Reveal>

        <div ref={ref} className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="overflow-hidden rounded-[24px]">
                <motion.div style={{ scale: imageScale, y: imageY }} className="aspect-[4/3] w-full sm:aspect-[16/10]">
                  <img
                    src={FEATURED_SPACE.image}
                    alt={FEATURED_SPACE.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-5">
            <Reveal delay={0.12}>
              <h3 className="font-display text-3xl font-normal leading-tight text-cream-100 sm:text-[2.2rem]">
                {FEATURED_SPACE.title}
              </h3>

              <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-gold-300/85">Design Intent</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-cream-200/65">{FEATURED_SPACE.designIntent}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-teal-300/70">
                    Comfort Experience
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-cream-200/65">
                    {FEATURED_SPACE.comfortExperience}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-teal-300/70">Engineering</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-cream-200/65">{FEATURED_SPACE.engineering}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
