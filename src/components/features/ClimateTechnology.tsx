import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Snowflake, Flame } from 'lucide-react'
import { getProductBySlug } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function ClimateTechnology() {
  const product = getProductBySlug('climate-craft-signature')!
  const range = product.specifications.find((s) => /temperature range/i.test(s))?.split(':')[1]?.trim() ?? '15°C–35°C'
  const [low, high] = range.split(/[–-]/).map((v) => v.trim())

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section className="relative overflow-hidden bg-teal-950/20 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-teal-950/15 to-ink-950" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 opacity-[0.12] blur-[130px]"
        style={{ background: 'linear-gradient(90deg, #2b9587 0%, transparent 50%, #f0a92c 100%)' }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel>Climate Technology</SectionLabel>
            <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
              Patented liquid cooling <span className="italic text-gold-400">& heating.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/65">
              Climate Smart pieces regulate their own temperature through the seat and back — precise, personal,
              and controlled entirely through the smart interface, remote or a voice command.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div ref={ref} className="mt-12 max-w-md">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-teal-300">
                  <Snowflake className="h-3.5 w-3.5" /> {low}
                </span>
                <span className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-gold-400">
                  {high} <Flame className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: inView ? 1 : 0 }}
                  transition={{ duration: 1.6, ease: easeOut }}
                  style={{ transformOrigin: 'left' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-cream-200 to-gold-400"
                />
                <motion.div
                  initial={{ left: '0%' }}
                  animate={{ left: inView ? '100%' : '0%' }}
                  transition={{ duration: 1.6, ease: easeOut }}
                  className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink-950 bg-cream-100 shadow-[0_0_0_4px_rgba(212,175,86,0.25)]"
                />
              </div>

              <p className="mt-4 text-[12.5px] leading-relaxed text-cream-200/45">
                A single continuous range — cooling on one end, heating on the other, adjusted in real time to suit
                the room and the moment.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
              <img
                src={homeProductImage(product.slug)}
                alt={product.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover sm:aspect-[4/3]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
