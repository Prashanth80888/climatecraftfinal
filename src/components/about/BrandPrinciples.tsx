import { motion } from 'framer-motion'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PRINCIPLES = [
  {
    number: '01',
    title: 'Mechanism First',
    copy: 'We engineer motion before form — the motor and glide are chosen and proven before the frame is built around them.',
  },
  {
    number: '02',
    title: 'Made to Order',
    copy: 'Every piece is engineered to order and quoted for the space it goes into — never held as stock, never sold off a shelf.',
  },
  {
    number: '03',
    title: 'Partner, Not Vendor',
    copy: 'From white-labelled ranges for manufacturers to galleries and architecture practices, we work as an extension of the specifying team.',
  },
]

export function BrandPrinciples() {
  return (
    <section className="relative overflow-hidden bg-ink-900/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>What We Hold To</SectionLabel>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-2 border-t border-white/10 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.number}>
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group relative border-white/10 px-1 py-9 sm:border-l sm:px-7 sm:first:border-l-0"
              >
                <motion.div
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full opacity-30 blur-[80px]"
                  style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 70%)' }}
                />
                <motion.span
                  variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="relative block font-display text-sm italic tabular-nums text-gold-400/80"
                >
                  {p.number}
                </motion.span>
                <motion.h3
                  variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.02 }}
                  className="relative mt-3 font-display text-2xl text-cream-100"
                >
                  {p.title}
                </motion.h3>
                <p className="relative mt-3 max-w-xs text-[14px] leading-relaxed text-cream-200/60">{p.copy}</p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
