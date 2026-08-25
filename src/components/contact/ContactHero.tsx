import { motion } from 'framer-motion'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE = ["Let's create", 'your comfort space.']

// Text-led, no photography — the form and information below carry the page,
// not a hero image. Mirrors the typographic hero pattern already established
// on About and Case Studies.
export function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden bg-ink-950 pb-14 pt-36 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-48">
      <div
        className="pointer-events-none absolute -top-16 left-1/2 h-[420px] w-[780px] -translate-x-1/2 opacity-[0.12] blur-[140px]"
        style={{ background: 'radial-gradient(ellipse, #1d7a6f 0%, transparent 65%)' }}
      />
      <div className="grain-overlay opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="flex items-center gap-2.5"
          >
            <span className="h-px w-6 bg-gold-400" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400">Request a Quote</span>
          </motion.div>

          <h1 className="mt-6 font-display text-4xl font-normal leading-[1.06] text-cream-100 sm:text-5xl lg:text-6xl">
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
            transition={{ duration: 0.8, delay: 0.75, ease: easeOut }}
            className="mt-6 max-w-lg text-[16px] leading-relaxed text-cream-200/70"
          >
            Tell us what you're planning. We'll help you choose the right Climate Craft configuration, quantity and
            finish for your space.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
