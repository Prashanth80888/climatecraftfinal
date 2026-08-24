import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Armchair, Smartphone, Zap, Thermometer, Sparkles } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const STEPS = [
  {
    number: '01',
    title: 'Sense',
    icon: Armchair,
    copy: 'Comfort begins with understanding how the body actually sits — ergonomic cushioning and support built around the seat, back and legs.',
  },
  {
    number: '02',
    title: 'Control',
    icon: Smartphone,
    copy: 'A smart touch interface, remote or a simple voice command puts every setting within easy reach.',
  },
  {
    number: '03',
    title: 'Adjust',
    icon: Zap,
    copy: 'Precision motors move the recline and leg rest smoothly and quietly, exactly as far as you take them.',
  },
  {
    number: '04',
    title: 'Climate',
    icon: Thermometer,
    copy: 'On Climate Smart pieces, patented liquid cooling & heating technology regulates temperature across a 15°C–35°C range.',
  },
  {
    number: '05',
    title: 'Relax',
    icon: Sparkles,
    copy: 'Everything recedes into the background except the experience — comfort, engineered rather than assembled.',
  },
]

function Step({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.6, margin: '-15% 0px -15% 0px' })
  const Icon = step.icon

  return (
    <div ref={ref} className="relative flex items-start gap-6 py-8 sm:gap-8 sm:py-10">
      <div className="relative flex flex-none flex-col items-center">
        <motion.span
          animate={{
            borderColor: inView ? 'rgba(212,175,86,0.7)' : 'rgba(255,255,255,0.12)',
            backgroundColor: inView ? 'rgba(212,175,86,0.12)' : 'rgba(255,255,255,0.02)',
            scale: inView ? 1.08 : 1,
          }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex h-14 w-14 items-center justify-center rounded-full border sm:h-16 sm:w-16"
        >
          <Icon className={`h-5 w-5 transition-colors duration-500 ${inView ? 'text-gold-400' : 'text-cream-200/35'}`} strokeWidth={1.5} />
        </motion.span>
        {index < STEPS.length - 1 && (
          <span className="mt-2 h-full w-px flex-1 bg-gradient-to-b from-white/15 to-transparent" />
        )}
      </div>

      <motion.div
        animate={{ opacity: inView ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg pb-2"
      >
        <span className="font-display text-sm italic tabular-nums text-gold-400/80">{step.number}</span>
        <h3 className="mt-1 font-display text-2xl font-normal text-cream-100 sm:text-3xl">{step.title}</h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-cream-200/65">{step.copy}</p>
      </motion.div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="relative bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="mt-5 font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            From sitting down <span className="italic text-gold-400">to disappearing into it.</span>
          </h2>
        </Reveal>

        <div className="mt-10">
          {STEPS.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
