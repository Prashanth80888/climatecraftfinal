import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const STEPS = [
  {
    step: '01',
    label: 'Consult',
    title: 'Specify',
    copy: 'We start with your brief — operation, dimensions, fabric direction from the archive, and volume.',
  },
  {
    step: '02',
    label: 'Frame',
    title: 'Build & test',
    copy: 'The motor and glide are assembled and proven, then the hand-jointed hardwood frame is built around them.',
  },
  {
    step: '03',
    label: 'Dress',
    title: 'Upholster',
    copy: 'Hand-tied, zone-tensioned suspension is dressed by hand in the fabric specified from the archive.',
  },
  {
    step: '04',
    label: 'Ship',
    title: 'Deliver',
    copy: 'Pieces are crated securely and shipped directly to site or receiving warehouse.',
  },
]

export function AboutProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.65', 'end 0.4'] })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(latest * STEPS.length)))
  })

  return (
    <section id="process" ref={ref} className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            From mechanism <span className="italic text-gold-400">to made.</span>
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-0 hidden h-px bg-white/10 sm:block" />
          <motion.div
            className="absolute left-0 top-0 hidden h-px origin-left bg-gold-400 sm:block"
            style={{ scaleX: scrollYProgress }}
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                animate={{ opacity: i <= active ? 1 : 0.4 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="border-l border-white/10 pl-5 pt-6 sm:border-l-0 sm:pl-0 sm:pt-8"
              >
                <span className="font-display text-sm italic tabular-nums text-gold-400/80">{s.step}</span>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-widest text-cream-200/45">{s.label}</p>
                <h3 className="mt-2 font-display text-2xl text-cream-100">{s.title}</h3>
                <p className="mt-3 max-w-[22ch] text-[14px] leading-relaxed text-cream-200/60">{s.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
