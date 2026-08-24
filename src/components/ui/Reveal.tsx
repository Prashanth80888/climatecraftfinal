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

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  amount = 0.3,
}: RevealProps) {
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
      className={className}
      initial="hidden"
      whileInView="visible"
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
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
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
