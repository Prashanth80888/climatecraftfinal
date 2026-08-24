import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import testimonialsData from '../data/testimonials.json'
import type { Testimonial } from '../types'
import { SectionLabel } from './ui/SectionLabel'
import { Reveal } from './ui/Reveal'

const testimonials = testimonialsData as Testimonial[]
const AUTOPLAY_MS = 5000
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/50 p-8 transition-colors duration-500 hover:border-gold-400/25 sm:min-h-[260px] sm:p-10">
      <Quote className="h-6 w-6 flex-none text-gold-500/60" strokeWidth={1.5} />

      <p className="mt-5 font-display text-lg font-normal italic leading-relaxed text-cream-100 sm:text-xl">
        {testimonial.q}
      </p>

      <div className="mt-auto flex items-center gap-4 pt-7">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-gold-400/30 bg-gradient-to-br from-gold-500/15 via-teal-600/15 to-transparent font-display text-sm text-gold-300">
          {testimonial.mono}
        </div>
        <div>
          <p className="text-sm font-medium text-cream-100">{testimonial.n}</p>
          <p className="text-[12.5px] text-cream-200/55">{testimonial.r}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pausedRef = useRef(false)

  const goTo = useCallback((next: number) => {
    setDirection(next > index || (index === testimonials.length - 1 && next === 0) ? 1 : -1)
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length)
  }, [index])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next()
    }, AUTOPLAY_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [next])

  const restart = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next()
    }, AUTOPLAY_MS)
  }

  return (
    <section id="testimonials" className="relative overflow-hidden bg-ink-950 py-16 sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 opacity-[0.12] blur-[110px]"
        style={{ background: 'radial-gradient(ellipse, #f0a92c 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>What They Say</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Trusted by designers. Chosen for a reason.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="mt-12 max-w-2xl"
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
          >
            <div className="relative">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={index}
                  layout
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                >
                  <TestimonialCard testimonial={testimonials[index]} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.n}
                    type="button"
                    onClick={() => {
                      goTo(i)
                      restart()
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? 'w-8 bg-gold-400' : 'w-1.5 bg-cream-100/25 hover:bg-cream-100/45'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    prev()
                    restart()
                  }}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-all duration-300 hover:border-gold-400/60 hover:bg-white/[0.04] hover:text-gold-400"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    next()
                    restart()
                  }}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 transition-all duration-300 hover:border-gold-400/60 hover:bg-white/[0.04] hover:text-gold-400"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
