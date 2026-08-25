import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { CASE_STUDIES, CASE_STUDY_CATEGORIES } from '../../data/caseStudies'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE = ['Comfort, considered', 'room by', 'room.']

const totalPhotographs = CASE_STUDIES.reduce((sum, c) => sum + c.gallery.length, 0)

const METRICS = [
  { value: String(CASE_STUDIES.length).padStart(2, '0'), label: 'Case Studies' },
  { value: String(CASE_STUDY_CATEGORIES.length).padStart(2, '0'), label: 'Room Types' },
  { value: String(totalPhotographs).padStart(2, '0'), label: 'Verified Photographs' },
]

// Deliberately typography-led — no photograph. Every other hero on the site
// stages a large product/space image; Case Studies exists to make the reading
// experience itself the differentiator (see master brief §3), so the content
// carries the page instead of a photo carrying it.
export function CaseStudiesHero() {
  return (
    <section className="relative w-full overflow-hidden bg-ink-950 pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48">
      <div
        className="pointer-events-none absolute -top-16 left-1/2 h-[440px] w-[820px] -translate-x-1/2 opacity-[0.13] blur-[140px]"
        style={{ background: 'radial-gradient(ellipse, #1d7a6f 0%, transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-[320px] w-[320px] opacity-[0.1] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 70%)' }}
      />
      <div className="grain-overlay opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="flex items-center gap-2.5"
          >
            <span className="h-px w-6 bg-gold-400" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400">
              Climate Craft Case Studies
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-normal leading-[1.04] text-cream-100 sm:text-6xl lg:text-7xl">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.35 + i * 0.13, ease: easeOut }}
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
            transition={{ duration: 0.8, delay: 0.85, ease: easeOut }}
            className="mt-7 max-w-xl text-[16px] leading-relaxed text-cream-200/70 sm:text-[17px]"
          >
            From private interiors to media rooms and formal hospitality settings, explore how Climate Craft seating
            becomes part of the space — combining engineered motion, considered comfort and refined materials with
            the specific demands of each room.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: easeOut }}
            className="mt-9"
          >
            <a href="#case-study-index" className="group btn-primary">
              Explore the Case Studies
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: easeOut }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:mt-20"
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.65 + i * 0.1, ease: easeOut }}
            >
              <span className="block font-display text-3xl text-gold-400 sm:text-4xl">{m.value}</span>
              <span className="mt-1.5 block text-[11px] uppercase tracking-widest text-cream-200/50">{m.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
