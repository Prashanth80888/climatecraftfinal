import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE_LINES = [
  { text: 'Spaces designed around', accent: false },
  { text: 'how comfort is experienced.', accent: true },
]

const INDICATORS = [
  'Residential',
  'Media Room',
  'Formal Lounge',
  'Fireside',
  'Window Suite',
]

export function ProjectsHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return
      const rect = e.currentTarget.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(px * 24)
      mouseY.set(py * 16)
    },
    [prefersReducedMotion, mouseX, mouseY],
  )

  const onMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink-950 pt-40 sm:pt-44 lg:pt-48"
    >
      {/* Ambient background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[12%] top-[15%] h-[600px] w-[700px] opacity-[0.05] blur-[180px]"
          style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-[8%] right-[8%] h-[450px] w-[550px] opacity-[0.035] blur-[150px]"
          style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 65%)' }}
        />
      </div>

      {/* Cursor-following spotlight */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ x: mouseX, y: mouseY }}
        >
          <div
            className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.02] blur-[120px]"
            style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 60%)' }}
          />
        </motion.div>
      )}

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 sm:px-6 lg:px-8"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: easeOut }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold-400/70" />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-400">
            Projects &amp; Spaces
          </span>
        </motion.div>

        {/* Headline — line-by-line reveal */}
        <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5rem)] font-normal leading-[1.03] tracking-[-0.01em] text-cream-100">
          {HEADLINE_LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden">
              <motion.span
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.55 + i * 0.15, ease: easeOut }}
                className={`block ${line.accent ? 'italic text-gold-400' : ''}`}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Supporting paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: easeOut }}
          className="mt-8 max-w-lg text-[16px] leading-relaxed text-cream-200/60 sm:text-[17px]"
        >
          Explore how Climate Craft furniture shapes residential, media, formal and lounge environments —
          combining intelligent movement, climate technology and considered design.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: easeOut }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#space-explorer"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold-500 px-7 py-4 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-ink-950 shadow-[0_20px_50px_-16px_rgba(240,169,44,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-14px_rgba(240,169,44,0.6)] active:scale-[0.97]"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#space-explorer')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/40 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
            <span className="relative z-10">Explore Spaces</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-cream-200/70 transition-all duration-300 hover:border-white/25 hover:text-cream-100"
          >
            <span>Discuss a Project</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Space application indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/[0.06] pt-7 sm:mt-20"
        >
          {INDICATORS.map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.1 + i * 0.07, ease: easeOut }}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-cream-200/35"
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream-100/35"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
