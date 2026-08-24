import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const STEPS = [
  {
    id: 'design',
    label: 'Design',
    image: '/images/about/design.png',
    copy: 'Every silhouette starts with proportion and material — the diamond-quilted upholstery and walnut detailing here are chosen, not defaulted to.',
  },
  {
    id: 'comfort',
    label: 'Comfort',
    image: '/images/about/comfort.png',
    copy: 'Ergonomic support across the back, seat and leg rest, built around how a body actually settles into a chair.',
  },
  {
    id: 'motion',
    label: 'Motion',
    image: '/images/about/motion.png',
    copy: 'A motorized mechanism that moves quietly and consistently — precision that stays out of the way of the experience.',
  },
  {
    id: 'technology',
    label: 'Technology',
    image: '/images/about/technology.png',
    copy: 'On Climate Smart pieces, intelligent temperature control and smart interface, remote or voice command — technology that disappears into the furniture.',
  },
]

function StoryStep({ step, index, onActive }: { step: (typeof STEPS)[number]; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.6, margin: '-20% 0px -20% 0px' })

  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <div ref={ref} className="flex min-h-[58vh] flex-col justify-center py-10 sm:min-h-[64vh]">
      <motion.div animate={{ opacity: inView ? 1 : 0.35 }} transition={{ duration: 0.5 }}>
        <span className="font-display text-sm italic tabular-nums text-gold-400/80">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-2 font-display text-4xl font-normal text-cream-100 sm:text-5xl">{step.label}</h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream-200/65">{step.copy}</p>
      </motion.div>
    </div>
  )
}

export function ScrollStory() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>How It Comes Together</SectionLabel>
          <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            One experience, <span className="italic text-gold-400">four disciplines.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            {STEPS.map((step, i) => (
              <StoryStep key={step.id} step={step} index={i} onActive={setActive} />
            ))}
          </div>

          <div className="lg:col-span-6">
            <div className="sticky top-32 overflow-hidden rounded-[28px] border border-white/[0.06] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[4/5] w-full sm:aspect-[4/3]">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={STEPS[active].id}
                    src={STEPS[active].image}
                    alt={STEPS[active].label}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: easeOut }}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
