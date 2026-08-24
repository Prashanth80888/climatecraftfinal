import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Armchair, Cog, Layers, CircleDot } from 'lucide-react'
import { HERO_IMAGE } from '../../data/projects'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PRINCIPLES = [
  { icon: Armchair, label: 'Real Spaces', copy: 'Captured in authentic rooms' },
  { icon: Cog, label: 'Engineered', copy: 'Precision motion and comfort' },
  { icon: Layers, label: 'Integrated', copy: 'Technology that disappears' },
  { icon: CircleDot, label: 'Considered', copy: 'Design that belongs' },
]

export function ProjectsHero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.04])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 20, mass: 0.6 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 20, mass: 0.6 })
  const onImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(px * 12)
    mouseY.set(py * 8)
  }
  const onImageMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-ink-950 pb-10 pt-32 sm:pb-14 sm:pt-36 lg:pt-40">
      <div
        className="pointer-events-none absolute -top-10 left-1/4 h-[420px] w-[700px] -translate-x-1/2 opacity-[0.12] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 60%)' }}
      />

      {/* One unified stage: solid dark ground on the left carries the text, the
          photograph bleeds to the right/bottom edges — no boxed image card,
          no gradient needed for legibility since text never sits on the photo. */}
      <div className="relative mx-auto flex min-h-[74vh] max-w-7xl flex-col lg:flex-row lg:items-stretch">
        <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:w-[46%] lg:flex-none lg:px-6 lg:py-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
            className="flex items-center gap-2.5"
          >
            <span className="h-px w-6 bg-gold-400" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400">
              Climate Craft Projects
            </span>
          </motion.div>

          <h1 className="mt-5 font-display text-4xl font-normal leading-[1.03] text-cream-100 sm:text-6xl lg:text-[3.9rem]">
            {['Spaces,', 'engineered for', 'comfort.'].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.65 + i * 0.13, ease: easeOut }}
                  className={`block ${i === 2 ? 'italic text-gold-400' : ''}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: easeOut }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-cream-200/70"
          >
            Explore spaces where Climate Craft seating becomes part of the room — balancing comfort, motion,
            technology and considered design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: easeOut }}
            className="mt-9"
          >
            <a
              href="#space-applications"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-500 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-widest text-ink-950 shadow-[0_18px_40px_-16px_rgba(240,169,44,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-14px_rgba(240,169,44,0.65)] active:scale-[0.97]"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/40 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
              <span className="relative z-10">Explore Projects</span>
              <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.85, ease: easeOut }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/10 pt-8 sm:mt-14"
          >
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2 + i * 0.08, ease: easeOut }}
              >
                <p.icon className="h-4 w-4 text-gold-400/80" strokeWidth={1.5} />
                <p className="mt-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-cream-100">{p.label}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-cream-200/50">{p.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div
          onMouseMove={onImageMouseMove}
          onMouseLeave={onImageMouseLeave}
          className="relative mt-8 h-[46vh] min-h-[380px] w-full overflow-hidden rounded-[24px] lg:mt-0 lg:h-auto lg:min-h-0 lg:flex-1 lg:rounded-[0_28px_28px_0]"
        >
          <motion.div style={{ y: scrollY, scale: scrollScale }} className="absolute inset-[-3%]">
            <motion.div style={{ x: springX, y: springY }} className="absolute inset-[-3%]">
              <motion.img
                src={HERO_IMAGE}
                alt="A Climate Craft recliner integrated into a real living space"
                initial={{ scale: 1.05, opacity: 0, filter: 'blur(16px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, ease: easeOut }}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/50 via-transparent to-transparent lg:from-ink-950/35" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent" />
          <div className="grain-overlay opacity-[0.1]" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.3 }}
        className="pointer-events-none mx-auto mt-2 flex max-w-7xl justify-center lg:justify-start lg:px-6"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream-100/60 backdrop-blur-md"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
