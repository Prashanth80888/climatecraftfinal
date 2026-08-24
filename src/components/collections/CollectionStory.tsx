import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function CollectionStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const mainY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const accentY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-teal-950/30 py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-teal-950/25 to-ink-950" />
      <div
        className="pointer-events-none absolute left-[8%] top-1/3 h-[420px] w-[420px] rounded-full opacity-[0.1] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 70%)' }}
      />
      <div className="grain-overlay opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>Engineered for How You Live</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-lg font-display text-4xl font-normal leading-[1.08] text-cream-100 sm:text-5xl lg:text-[3.4rem]">
                Every piece begins as <span className="italic text-gold-400">a mechanism.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream-200/70 sm:text-base">
                A motor, a hinge, a hand-crank glide tuned to move without a sound. Around it, a hardwood frame, a
                hand-tied suspension, and an upholstery chosen from a curated archive of fabrics — built by hand, to
                order, for every collection on this page.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-12 border-t border-white/10 pt-8 font-display text-3xl italic leading-[1.15] text-gold-400 sm:text-4xl">
                Comfort, refined.
              </p>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <motion.div
              style={{ y: mainY }}
              className="relative z-10 w-full overflow-hidden rounded-[28px] border border-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)] lg:ml-auto lg:w-[86%]"
            >
              <div className="aspect-[4/3] w-full">
                <img
                  src={homeProductImage('craft-classic-grand')}
                  alt="Detail of Climate Craft upholstery and frame construction"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              style={{ y: accentY }}
              className="absolute -left-6 bottom-[-8%] z-0 hidden w-[42%] overflow-hidden rounded-[20px] border border-white/10 shadow-[0_40px_90px_-35px_rgba(0,0,0,0.8)] lg:block"
            >
              <div className="aspect-[4/5] w-full">
                <img
                  src={homeProductImage('climate-craft-signature')}
                  alt="Climate Craft Signature detail"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-ink-950/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
