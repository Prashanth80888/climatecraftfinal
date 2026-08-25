import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE = ['Makers of', 'motion.']

// Deliberately typography-led — no large photograph. The hero has to
// communicate the brand in the first few seconds through voice and
// hierarchy alone, the same discipline already used on Case Studies.
export function AboutHero() {
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
              The Atelier · Climate Craft
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-normal leading-[1.04] text-cream-100 sm:text-6xl lg:text-7xl">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.35 + i * 0.13, ease: easeOut }}
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
            transition={{ duration: 0.8, delay: 0.7, ease: easeOut }}
            className="mt-7 max-w-xl text-[16px] leading-relaxed text-cream-200/70 sm:text-[17px]"
          >
            Precision-engineered motion furniture — designed around the mechanics of comfort.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: easeOut }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream-200/55"
          >
            Climate Craft engineers motorized and manually operated recliners, sofas and modular seating, built
            around movement, comfort and craftsmanship rather than any one of them alone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: easeOut }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#process" className="group btn-primary">
              Explore Our Process
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <Link to="/collections" className="group btn-outline">
              View Collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: easeOut }}
          className="mt-16 flex items-center gap-2.5 border-t border-white/10 pt-6 sm:mt-20"
        >
          <span className="text-[11px] uppercase tracking-widest text-cream-200/45">
            Est. 2009 · Antwerp, Belgium
          </span>
        </motion.div>
      </div>
    </section>
  )
}
