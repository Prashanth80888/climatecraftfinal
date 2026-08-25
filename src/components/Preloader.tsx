import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { brand } from '../lib/assets'
import { IntroContext } from '../context/IntroContext'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Climate Craft's own established brand line — used as a real SectionLabel
// on the Features page (see src/components/features/EngineeredComfort.tsx),
// never invented for this screen.
const BRAND_STATEMENT = 'Engineered Comfort'

/**
 * A one-time cinematic brand reveal that masks the whole app until the first
 * paint is ready. The app underneath is already mounted and rendering while
 * this overlay is up (see main.tsx) — this component only controls when it's
 * visible. Runs once per full page load; client-side route changes never
 * remount it, so it never replays during normal navigation.
 */
export function Preloader({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const minDuration = prefersReducedMotion ? 500 : 2400
    const fontsReady = document.fonts?.ready ?? Promise.resolve()

    let cancelled = false
    Promise.all([
      new Promise((resolve) => setTimeout(resolve, minDuration)),
      Promise.race([fontsReady, new Promise((resolve) => setTimeout(resolve, 1500))]),
    ]).then(() => {
      if (cancelled) return
      // Flip the gate and start dissolving the mask in the same moment, so
      // the Home hero's own entrance plays out AS the mask clears rather
      // than after — one continuous reveal, not two sequential intros.
      setIntroComplete(true)
      setVisible(false)
    })

    return () => {
      cancelled = true
    }
  }, [prefersReducedMotion])

  // Same lock-scroll-while-covering-the-viewport convention already used by
  // the mobile nav drawer (see Navbar.tsx).
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [visible])

  return (
    <IntroContext.Provider value={introComplete}>
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            key="preloader"
            data-testid="preloader"
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.03 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, ease: easeOut }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink-950"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.14 }}
              transition={{ duration: 1.6, ease: easeOut }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
              style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 70%)' }}
            />
            <div className="grain-overlay opacity-[0.05]" />

            <motion.img
              src={brand.logo}
              alt="Climate Craft"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{
                duration: prefersReducedMotion ? 0.35 : 0.7,
                delay: prefersReducedMotion ? 0 : 0.3,
                ease: easeOut,
              }}
              className="relative h-20 w-20 object-contain sm:h-24 sm:w-24"
            />

            <div className="relative mt-6 overflow-hidden">
              <motion.p
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.7,
                  delay: prefersReducedMotion ? 0.1 : 1.05,
                  ease: easeOut,
                }}
                className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-400"
              >
                {BRAND_STATEMENT}
              </motion.p>
            </div>

            <div className="relative mt-9 h-px w-16 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 1.1,
                  delay: prefersReducedMotion ? 0.15 : 1.35,
                  ease: easeOut,
                }}
                style={{ transformOrigin: '0% 50%' }}
                className="h-full bg-gold-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  )
}
