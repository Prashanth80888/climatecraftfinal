import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { getProductBySlug } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const CONCEPTS = [
  { id: 'ergonomics', label: 'Ergonomics', x: 50, y: 4 },
  { id: 'motion', label: 'Motion', x: 90, y: 26 },
  { id: 'climate', label: 'Climate', x: 90, y: 74 },
  { id: 'control', label: 'Control', x: 50, y: 96 },
  { id: 'material', label: 'Material', x: 10, y: 74 },
  { id: 'craft', label: 'Craft', x: 10, y: 26 },
]

export function EngineeredComfort() {
  const [active, setActive] = useState<string | null>(null)
  // Craft Classic's cream, diamond-quilted silhouette — deliberately distinct from
  // the taupe/blue imagery already used in the Climate and Motion sections above.
  const product = getProductBySlug('craft-classic')!

  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { once: true, amount: 0.4 })
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1])

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <SectionLabel>Engineered Comfort</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Six disciplines, <span className="italic text-gold-400">one piece.</span>
          </h2>
        </Reveal>

        <motion.div ref={stageRef} style={{ scale }} className="relative mx-auto mt-16 aspect-square max-w-[560px]">
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {CONCEPTS.map((c, i) => (
              <motion.line
                key={c.id}
                x1={c.x}
                y1={c.y}
                x2={50}
                y2={50}
                vectorEffect="non-scaling-stroke"
                stroke={active === c.id ? 'rgba(212,175,86,0.75)' : 'rgba(255,255,255,0.12)'}
                strokeWidth={active === c.id ? 1.25 : 0.75}
                strokeDasharray="2 2"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: easeOut }}
              />
            ))}
          </svg>

          <div className="absolute inset-[16%] overflow-hidden rounded-full border border-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
            <img src={homeProductImage(product.slug)} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
            <motion.div
              animate={{ opacity: active ? 0.35 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gold-400 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
          </div>

          {CONCEPTS.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: easeOut }}
              onMouseEnter={() => setActive(c.id)}
              onFocus={() => setActive(c.id)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              aria-label={c.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
            >
              <span
                className={`block rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-widest backdrop-blur-md transition-all duration-300 ${
                  active === c.id
                    ? 'scale-110 border-gold-300 bg-gold-400 text-ink-950'
                    : 'border-white/15 bg-ink-950/70 text-cream-200/75 hover:border-white/30'
                }`}
              >
                {c.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
