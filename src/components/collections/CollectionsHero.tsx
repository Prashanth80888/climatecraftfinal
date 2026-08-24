import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HOME_PRODUCTS, PRODUCT_FAMILIES } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function CollectionsHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const heroProduct = HOME_PRODUCTS[0]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-950 pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48"
    >
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 70%)' }}
      />

      {/* Large atmospheric product photograph — the collection's own photography as hero backdrop. */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block"
      >
        <div className="relative h-full w-full">
          <img
            src={homeProductImage(heroProduct.slug)}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />
        </div>
      </motion.div>

      <div className="grain-overlay opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Climate Craft Collections</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-2xl font-display text-[2.6rem] font-normal leading-[1.05] text-cream-100 sm:text-6xl lg:text-7xl">
            Engineered motion.
            <br />
            <span className="italic text-gold-400">Considered comfort.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream-200/70 sm:text-base">
            Precision mechanisms. Bespoke comfort. Timeless design — {PRODUCT_FAMILIES.length} collections of
            motorized and manually operated seating, each engineered in-house and upholstered by hand.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-6">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-gold-400">{PRODUCT_FAMILIES.length}</span>
              <span className="text-[11px] uppercase tracking-widest text-cream-200/50">Collections</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-gold-400">{HOME_PRODUCTS.length}</span>
              <span className="text-[11px] uppercase tracking-widest text-cream-200/50">Pieces</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl italic text-gold-400">MTO</span>
              <span className="text-[11px] uppercase tracking-widest text-cream-200/50">Made to Order</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
