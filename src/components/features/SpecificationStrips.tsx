import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const ROWS = [
  {
    number: '01',
    title: 'Smart Control',
    value: 'Touch. Remote. Voice.',
    copy: 'Every Climate Smart piece answers to a touch interface, a remote, or a simple voice command.',
  },
  {
    number: '02',
    title: 'Climate Range',
    value: '15°C — 35°C',
    copy: 'Patented liquid cooling & heating technology, regulated through the seat and back.',
  },
  {
    number: '03',
    title: 'Motor System',
    value: 'Precision Reclining',
    copy: 'A quiet, direct motorized mechanism drives reclining and leg-rest adjustment.',
  },
  {
    number: '04',
    title: 'Upholstery',
    value: '460 GSM Premium Fabric',
    copy: 'Weight and weave chosen to hold its shape and feel through years of daily use.',
  },
]

export function SpecificationStrips() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="relative bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>By the Numbers</SectionLabel>
          <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            The specification, <span className="italic text-gold-400">in short.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 border-t border-white/10">
            {ROWS.map((row) => {
              const isActive = active === row.number
              return (
                <div
                  key={row.number}
                  onMouseEnter={() => setActive(row.number)}
                  onMouseLeave={() => setActive(null)}
                  className="group relative border-b border-white/10 py-6 transition-all duration-300 sm:py-7"
                >
                  <motion.span
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute inset-x-0 top-0 h-px bg-gold-400"
                  />
                  <motion.div animate={{ x: isActive ? 10 : 0 }} transition={{ duration: 0.35 }} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`font-display text-sm italic tabular-nums transition-colors duration-300 ${
                          isActive ? 'text-gold-400' : 'text-cream-200/40'
                        }`}
                      >
                        {row.number}
                      </span>
                      <span className="font-display text-xl text-cream-100 sm:text-2xl">{row.title}</span>
                    </div>
                    <span className="text-[13px] font-medium uppercase tracking-widest text-cream-200/50">
                      {row.value}
                    </span>
                  </motion.div>

                  <motion.p
                    initial={false}
                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 10 : 0 }}
                    transition={{ duration: 0.35 }}
                    className="max-w-md overflow-hidden pl-[3.35rem] text-[13.5px] leading-relaxed text-cream-200/55"
                  >
                    {row.copy}
                  </motion.p>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
