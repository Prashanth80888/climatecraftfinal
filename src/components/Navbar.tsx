import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { brand } from '../lib/assets'

// Only "/" (Home) is an implemented page right now. The rest are real routes —
// ready for their own pages later — but today they render a minimal placeholder.
// Active state is driven purely by the current route (useLocation), never by
// scroll position, so scrolling through Home's sections can never make the
// navbar think the user is on "Collections" or "Case Studies", etc.
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Features', to: '/features' },
  { label: 'Projects', to: '/projects' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About Us', to: '/about' },
]

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]
const MotionLink = motion(Link)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [open])

  // Close the mobile drawer on every route change (including same-page hash jumps).
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-500 sm:px-7 sm:py-3.5 ${
            scrolled
              ? 'border-white/10 bg-ink-950/85 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl'
              : 'border-white/10 bg-ink-950/40 shadow-[0_10px_35px_-20px_rgba(0,0,0,0.6)] backdrop-blur-lg'
          }`}
        >
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <img
              src={brand.logo}
              alt="Climate Craft"
              className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-105 sm:h-10 sm:w-10"
            />
            <span className="font-display text-[18px] tracking-[0.01em] text-cream-100 sm:text-xl">
              Climate Craft
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="relative rounded-full px-4 py-2.5 text-[12px] font-medium uppercase tracking-widest text-cream-200/75 transition-colors duration-300 hover:text-cream-100"
              >
                {location.pathname === link.to && (
                  <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-widest text-ink-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-300 hover:bg-gold-400 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_28px_-10px_rgba(240,169,44,0.65)] active:scale-[0.97]"
            >
              Request Quote
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-cream-100 transition-colors duration-300 hover:border-white/25 lg:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="flex items-center justify-center"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-ink-950/95 p-3 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:hidden"
            >
              <nav className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <MotionLink
                    key={link.label}
                    to={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className={`border-b border-white/5 px-4 py-3.5 text-sm uppercase tracking-widest transition-colors duration-300 last:border-b-0 hover:text-gold-400 ${
                      location.pathname === link.to ? 'text-gold-400' : 'text-cream-200/85'
                    }`}
                  >
                    {link.label}
                  </MotionLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-gold-500 px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink-950"
                >
                  Request Quote
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 cursor-default bg-ink-950/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
