import { useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
  amount?: number
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

/**
 * Fail-safe reveal wrapper: starts at opacity: 0 and animates to visible
 * when the element enters the viewport via framer-motion's whileInView.
 *
 * A mount-time timeout acts as a safety net — if the IntersectionObserver
 * hasn't fired within 600 ms (e.g. due to a route transition race condition
 * or the element already being in the viewport), the component switches to
 * its visible state so content is never permanently hidden.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const [fallback, setFallback] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fallback) return

    // If the element is already visible in the viewport on mount, the
    // IntersectionObserver may never fire its callback (race condition during
    // fast navigation). Check eagerly and skip straight to visible.
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setFallback(true)
        return
      }
    }

    // Otherwise, keep a safety-net timer. If the observer still hasn't fired
    // by the time the delay + animation duration would have elapsed, force
    // visibility rather than leaving content permanently invisible.
    const id = window.setTimeout(() => setFallback(true), 600 + delay * 1000)
    return () => clearTimeout(id)
  }, [delay, fallback])

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay, ease: easeOut },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={fallback ? 'visible' : 'hidden'}
      animate={fallback ? 'visible' : undefined}
      whileInView={fallback ? undefined : 'visible'}
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
  once?: boolean
  amount?: number
}

export function RevealGroup({ children, className, stagger = 0.12, once = true, amount = 0.3 }: RevealGroupProps) {
  const [fallback, setFallback] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fallback) return

    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setFallback(true)
        return
      }
    }

    const id = window.setTimeout(() => setFallback(true), 700)
    return () => clearTimeout(id)
  }, [fallback])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={fallback ? 'visible' : 'hidden'}
      animate={fallback ? 'visible' : undefined}
      whileInView={fallback ? undefined : 'visible'}
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
      }}
    >
      {children}
    </motion.div>
  )
}
