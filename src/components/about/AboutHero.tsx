import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PRINCIPLES = [
  { label: 'Engineering', copy: 'Thoughtful movement and precision.' },
  { label: 'Comfort', copy: 'Designed around everyday experience.' },
  { label: 'Craft', copy: 'Considered materials and refined details.' },
  { label: 'Technology', copy: 'Intelligent features, naturally integrated.' },
]

export function AboutHero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.04])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 20, mass: 0.6 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 20, mass: 0.6 })
  const onStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(px * 10)
    mouseY.set(py * 8)
  }
  const onStageMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-ink-950 px-4 pb-10 pt-32 sm:px-6 sm:pb-14 sm:pt-36 lg:pt-40"
    >
      <div
        className="pointer-events-none absolute -top-10 left-1/2 h-[420px] w-[900px] -translate-x-1/2 opacity-[0.14] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 60%)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[320px] w-[320px] opacity-[0.1] blur-[110px]"
        style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Atmospheric, borderless stage — the photograph dissolves into the page on every edge. */}
        <div
          onMouseMove={onStageMouseMove}
          onMouseLeave={onStageMouseLeave}
          className="relative h-[68vh] min-h-[520px] w-full overflow-hidden sm:h-[72vh]"
        >
          <motion.div style={{ y: scrollY, scale: scrollScale }} className="absolute inset-[-3%]">
            <motion.div style={{ x: springX, y: springY }} className="absolute inset-[-3%]">
              <motion.img
                src="/images/about/hero.png"
                alt="A Climate Craft piece, finished by hand"
                initial={{ scale: 1.05, opacity: 0, filter: 'blur(16px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, ease: easeOut }}
                style={{ objectPosition: '60% 40%' }}
                className="h-full w-full object-cover transition-[filter] duration-[1400ms] ease-out hover:brightness-[1.04]"
              />
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-ink-950/55 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/35" />
          <div className="grain-overlay opacity-[0.12]" />

          <div className="relative flex h-full flex-col justify-end p-6 sm:p-10 lg:p-14">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
                className="flex items-center gap-2.5"
              >
                <span className="h-px w-6 bg-gold-400" />
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400">
                  About Climate Craft
                </span>
              </motion.div>

              <h1 className="mt-5 font-display text-4xl font-normal leading-[1.03] text-cream-100 sm:text-6xl lg:text-[4.2rem]">
                {['Comfort,', 'engineered', 'with intention.'].map((line, i) => (
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
                transition={{ duration: 0.8, delay: 1.28, ease: easeOut }}
                className="mt-6 max-w-md text-[15px] leading-relaxed text-cream-200/70"
              >
                Climate Craft brings thoughtful engineering, intelligent movement and considered design together to
                create furniture made around the way people live.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.65, ease: easeOut }}
                className="mt-9"
              >
                <a
                  href="/collections"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-500 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-widest text-ink-950 shadow-[0_18px_40px_-16px_rgba(240,169,44,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-14px_rgba(240,169,44,0.65)] active:scale-[0.97]"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/40 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
                  <span className="relative z-10">Explore Our Collections</span>
                  <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream-100/60 backdrop-blur-md"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Brand principles strip — a quiet editorial footer beneath the cinematic stage. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9, ease: easeOut }}
          className="mt-6 flex flex-wrap items-start divide-x divide-white/10 border-t border-white/10 pt-6 sm:mt-8 sm:pt-7"
        >
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.05 + i * 0.1, ease: easeOut }}
              className="flex-1 px-5 py-1 first:pl-0 sm:px-7"
            >
              <p className="text-[11px] font-medium uppercase tracking-widest text-gold-400/80">{p.label}</p>
              <p className="mt-1.5 text-[13px] leading-snug text-cream-200/55">{p.copy}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
