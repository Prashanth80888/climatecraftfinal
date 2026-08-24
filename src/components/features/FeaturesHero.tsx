import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { getProductBySlug } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE = ['Engineered for', 'how you live.']

// Five real, spec-backed technologies — all confirmed on Climate Craft | Grand,
// the three-seat flagship carrying every one of these categories at once. Marker
// coordinates sit along the frame's right edge; targets reuse the same product-area
// coordinates already verified on this exact image via the Product Detail page's
// own hotspot data (control, headrests, center).
interface HeroFeature {
  id: string
  number: string
  title: string
  points: string[]
  markerX: number
  markerY: number
  targetX: number
  targetY: number
}

const HERO_FEATURES: HeroFeature[] = [
  {
    id: 'climate',
    number: '01',
    title: 'Intelligent Climate',
    points: ['15°C – 35°C temperature range', 'Patented liquid cooling & heating'],
    markerX: 91,
    markerY: 14,
    targetX: 50,
    targetY: 38,
  },
  {
    id: 'motion',
    number: '02',
    title: 'Motorized Precision',
    points: ['2 motorized reclining seats', 'Motorized leg-rest adjustment'],
    markerX: 91,
    markerY: 34,
    targetX: 30,
    targetY: 78,
  },
  {
    id: 'control',
    number: '03',
    title: 'Smart & Voice Control',
    points: ['Smart touchscreen interface', 'Remote control', 'Voice control'],
    markerX: 91,
    markerY: 54,
    targetX: 19,
    targetY: 44,
  },
  {
    id: 'comfort',
    number: '04',
    title: 'Premium Comfort',
    points: ['Ergonomic cushioning and support', 'Premium 460 GSM upholstery', 'Integrated cup holders'],
    markerX: 91,
    markerY: 74,
    targetX: 50,
    targetY: 55,
  },
  {
    id: 'warranty',
    number: '05',
    title: '2-Year Warranty',
    points: ['Built for long-term everyday use'],
    markerX: 91,
    markerY: 92,
    targetX: 70,
    targetY: 85,
  },
]

const AUTO_CYCLE_MS = 3800
const RESUME_DELAY_MS = 4200

export function FeaturesHero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.03])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  // Subtle mouse-follow parallax on the image layer only — springed for smoothness,
  // disabled entirely under prefers-reduced-motion.
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.6 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.6 })
  const onFrameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(px * 14)
    mouseY.set(py * 10)
  }
  const onFrameMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const [activeId, setActiveId] = useState(HERO_FEATURES[0].id)
  const [paused, setPaused] = useState(false)
  const resumeTimeout = useRef<number>()

  const activate = (id: string) => {
    setActiveId(id)
    setPaused(true)
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)
  }
  const scheduleResume = () => {
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)
    resumeTimeout.current = window.setTimeout(() => setPaused(false), RESUME_DELAY_MS)
  }

  useEffect(() => {
    if (paused || prefersReducedMotion) return
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const idx = HERO_FEATURES.findIndex((f) => f.id === current)
        return HERO_FEATURES[(idx + 1) % HERO_FEATURES.length].id
      })
    }, AUTO_CYCLE_MS)
    return () => window.clearInterval(id)
  }, [paused, prefersReducedMotion])

  const hero = getProductBySlug('climate-craft-grand')!
  const image = homeProductImage(hero.slug)
  const active = HERO_FEATURES.find((f) => f.id === activeId)!

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-ink-950 px-4 pb-10 pt-32 sm:px-6 sm:pb-14 sm:pt-36 lg:pt-40"
    >
      {/* Ambient depth behind the image — outside the photo, in the breathing space below the navbar. */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 h-[420px] w-[900px] -translate-x-1/2 opacity-[0.14] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 60%)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[320px] w-[320px] opacity-[0.1] blur-[110px]"
        style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 70%)' }}
      />

      {/* No self-padding here — matches the navbar's own pill exactly (padding lives on the section
          above, like the navbar's header wrapper), so this edge lines up with the floating pill. */}
      <div className="relative mx-auto max-w-7xl">
        {/* Cinematic image stage — atmospheric, not boxed: no border, shadow or rounded corners, and
            the photo dissolves into the page background on every edge, exactly like the Collections
            page hero's own product photograph treatment. */}
        <div
          onMouseMove={onFrameMouseMove}
          onMouseLeave={onFrameMouseLeave}
          className="relative h-[68vh] min-h-[520px] w-full overflow-hidden sm:h-[72vh]"
        >
          <motion.div style={{ y: scrollY, scale: scrollScale }} className="absolute inset-0">
            <motion.div style={{ x: springX, y: springY }} className="absolute inset-[-3%]">
              <motion.img
                src={image}
                alt={hero.name}
                initial={{ scale: 1.04, opacity: 0, filter: 'blur(16px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, ease: easeOut }}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Blend every edge into the page background — no visible photo boundary, front or edge. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-ink-950/55 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/35" />
          <div className="grain-overlay opacity-[0.12]" />

          {/* Smart control panel — a small, honest visualization of the product's real climate range
              (no fabricated live reading), reading like a physical furniture controller rather than a
              dashboard. */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 3.2, ease: easeOut }}
            className="pointer-events-none absolute left-[64%] top-[9%] hidden w-[188px] rounded-2xl border border-white/15 bg-ink-950/55 p-4 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium uppercase tracking-widest text-cream-200/50">Climate Range</span>
              {!prefersReducedMotion && (
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-1.5 w-1.5 flex-none rounded-full bg-teal-400"
                />
              )}
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-display text-2xl italic text-cream-100">15°</span>
              <span className="text-cream-200/30">—</span>
              <span className="font-display text-2xl italic text-gold-400">35°C</span>
            </div>
            <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-cream-200/70 to-gold-400" />
              {!prefersReducedMotion && (
                <motion.span
                  animate={{ left: ['4%', '92%', '4%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink-950 bg-cream-100"
                />
              )}
            </div>
            <div className="mt-2 flex items-center justify-between text-[8.5px] uppercase tracking-widest text-cream-200/40">
              <span>Cooling</span>
              <span>Heating</span>
            </div>
          </motion.div>

          {/* Interactive technology callouts — desktop only; the tap strip below covers mobile. */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {HERO_FEATURES.map((f, i) => {
                const isActive = f.id === activeId
                return (
                  <motion.line
                    key={f.id}
                    x1={f.markerX}
                    y1={f.markerY}
                    x2={f.targetX}
                    y2={f.targetY}
                    vectorEffect="non-scaling-stroke"
                    stroke={isActive ? 'rgba(232,187,90,0.85)' : 'rgba(255,255,255,0.14)'}
                    strokeWidth={isActive ? 0.35 : 0.18}
                    strokeDasharray="1.4 1.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.7 + i * 0.08, ease: easeOut }}
                  />
                )
              })}
            </svg>

            {!prefersReducedMotion && (
              <motion.div
                key={active.id}
                className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${active.targetX}%`,
                  top: `${active.targetY}%`,
                  background: 'radial-gradient(circle, rgba(232,187,90,0.32) 0%, transparent 72%)',
                }}
                animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.9, 1.05, 0.9] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {HERO_FEATURES.map((f, i) => {
              const isActive = f.id === activeId
              return (
                <button
                  key={f.id}
                  type="button"
                  style={{ left: `${f.markerX}%`, top: `${f.markerY}%` }}
                  onMouseEnter={() => activate(f.id)}
                  onFocus={() => activate(f.id)}
                  onMouseLeave={scheduleResume}
                  onBlur={scheduleResume}
                  aria-label={`Feature ${f.number}: ${f.title}`}
                  aria-pressed={isActive}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.9 + i * 0.08, ease: easeOut }}
                    className="relative flex items-center"
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 6 }}
                          transition={{ duration: 0.3, ease: easeOut }}
                          className="absolute right-full top-1/2 mr-2.5 -translate-y-1/2 whitespace-nowrap rounded-full border border-gold-300/30 bg-ink-950/75 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-widest text-gold-200 backdrop-blur-md"
                        >
                          {f.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <motion.span
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        borderColor: isActive ? 'rgba(232,187,90,0.9)' : 'rgba(255,255,255,0.25)',
                        backgroundColor: isActive ? 'rgba(232,187,90,0.95)' : 'rgba(6,17,15,0.55)',
                        color: isActive ? '#0a0f0d' : 'rgba(244,240,231,0.75)',
                      }}
                      transition={{ duration: 0.4, ease: easeOut }}
                      className="flex h-7 w-7 items-center justify-center rounded-full border font-display text-[11px] italic backdrop-blur-md"
                    >
                      {f.number}
                    </motion.span>
                  </motion.span>
                </button>
              )
            })}
          </div>

          {/* Content overlay — pointer-events-none on the box itself (it spans the full frame height via
              flex justify-end, which would otherwise block the hotspot markers behind it); re-enabled
              only on the actual interactive children below. */}
          <motion.div
            style={{ y: contentY }}
            className="pointer-events-none relative flex h-full flex-col justify-end p-6 sm:p-10 lg:p-14"
          >
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
                className="flex items-center gap-2.5"
              >
                <span className="h-px w-6 bg-gold-400" />
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400">
                  Engineering &amp; Technology
                </span>
              </motion.div>

              <h1 className="mt-5 font-display text-4xl font-normal leading-[1.03] text-cream-100 sm:text-6xl lg:text-[4.2rem]">
                {HEADLINE.map((line, i) => (
                  <span key={line} className="block overflow-hidden">
                    <motion.span
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1, delay: 0.7 + i * 0.14, ease: easeOut }}
                      className={`block ${i === 1 ? 'italic text-gold-400' : ''}`}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1, ease: easeOut }}
                className="mt-6 max-w-md text-[15px] leading-relaxed text-cream-200/70"
              >
                Comfort, motorized precision, smart control and climate technology — brought together in a single
                piece of furniture, built to Climate Craft's own standard.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.55, ease: easeOut }}
                className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#feature-explorer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-500 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-widest text-ink-950 shadow-[0_18px_40px_-16px_rgba(240,169,44,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-14px_rgba(240,169,44,0.65)] active:scale-[0.97]"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/40 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
                  <span className="relative z-10">Explore Features</span>
                  <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cream-100/60 backdrop-blur-md"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.div>
            <span className="text-[9.5px] font-medium uppercase tracking-[0.2em] text-cream-200/40">
              Scroll to Discover
            </span>
          </motion.div>
        </div>

        {/* Feature tap strip — the shared, touch-friendly control surface for every breakpoint. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.85, ease: easeOut }}
          className="mt-6 border-t border-white/10 pt-6 sm:mt-8 sm:pt-7"
        >
          <div className="flex flex-wrap gap-2">
            {HERO_FEATURES.map((f, i) => {
              const isActive = f.id === activeId
              return (
                <motion.button
                  key={f.id}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2 + i * 0.08, ease: easeOut }}
                  onClick={() => {
                    activate(f.id)
                    scheduleResume()
                  }}
                  onMouseEnter={() => activate(f.id)}
                  onMouseLeave={scheduleResume}
                  onFocus={() => activate(f.id)}
                  onBlur={scheduleResume}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-medium uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'border-gold-400/60 bg-gold-400/10 text-gold-300'
                      : 'border-white/10 text-cream-200/55 hover:border-white/25 hover:text-cream-100'
                  }`}
                >
                  <span className="font-display text-[10px] italic">{f.number}</span>
                  {f.title}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5"
            >
              {active.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[13px] text-cream-200/65">
                  <span className="h-1 w-1 flex-none rounded-full bg-gold-400" />
                  {p}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
