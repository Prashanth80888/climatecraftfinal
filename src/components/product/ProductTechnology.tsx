import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { HomeProduct } from '../../data/homeProducts'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

function TemperatureBanner({ product }: { product: HomeProduct }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const match = product.specifications.find((s) => /temperature range/i.test(s))
  const range = match?.split(':')[1]?.trim() ?? '15°C–35°C'

  return (
    <>
      <SectionLabel>Intelligent Temperature Control</SectionLabel>
      <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
        Patented liquid cooling <span className="italic text-gold-400">& heating.</span>
      </h2>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/70">
        {product.name} regulates its own temperature through the seat and back, controlled entirely through the
        smart interface, remote or a voice command.
      </p>

      <div ref={ref} className="mt-10 max-w-md">
        <div className="flex items-baseline justify-between font-display text-2xl text-gold-400">
          <span>{range.split(/[–-]/)[0]?.trim()}</span>
          <span>{range.split(/[–-]/)[1]?.trim()}</span>
        </div>
        <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-cream-200 to-gold-400"
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[10.5px] uppercase tracking-widest text-cream-200/45">
          <span>Cooling</span>
          <span>Heating</span>
        </div>
      </div>
    </>
  )
}

function MotorisedBanner({ product }: { product: HomeProduct }) {
  return (
    <>
      <SectionLabel>Motorised Comfort</SectionLabel>
      <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
        Reclining, <span className="italic text-gold-400">without a sound.</span>
      </h2>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/70">
        {product.name} moves on a smooth motorized mechanism — no climate technology, no smart interface, just
        effortless, quiet reclining exactly when you want it.
      </p>
    </>
  )
}

function ClassicBanner({ product }: { product: HomeProduct }) {
  return (
    <>
      <SectionLabel>Timeless Craftsmanship</SectionLabel>
      <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
        Built to <span className="italic text-gold-400">last, not to move.</span>
      </h2>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/70">
        {product.name} carries no motor and no mechanism — just premium upholstery, generous cushioning and a
        contemporary silhouette, built for the long term.
      </p>
    </>
  )
}

export function ProductTechnology({ product }: { product: HomeProduct }) {
  return (
    <section className="relative overflow-hidden bg-teal-950/25 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-teal-950/20 to-ink-950" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          {product.familyId === 'climate-smart' && <TemperatureBanner product={product} />}
          {product.familyId === 'motorised-comfort' && <MotorisedBanner product={product} />}
          {product.familyId === 'classic' && <ClassicBanner product={product} />}
        </Reveal>
      </div>
    </section>
  )
}
