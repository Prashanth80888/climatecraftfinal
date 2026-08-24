import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HOME_PRODUCTS, type ProductFamily } from '../../data/homeProducts'
import { ProductCard } from './ProductCard'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: easeOut } },
}

interface ProductGridProps {
  family: ProductFamily
}

export const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(function ProductGrid({ family }, ref) {
  const products = HOME_PRODUCTS.filter((p) => p.familyId === family.id)

  return (
    <section ref={ref} className="relative bg-ink-950 pb-24 pt-4 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionLabel>All Pieces in {family.label}</SectionLabel>

        <AnimatePresence mode="wait">
          <motion.div
            key={family.id}
            variants={container}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7 lg:gap-8"
          >
            {products.map((product, i) => (
              <motion.div key={product.id} variants={item} className="h-full">
                {/* Middle card sits slightly raised for editorial rhythm, not a plain uniform row. */}
                <div className={`h-full ${i === 1 ? 'lg:-translate-y-6' : ''}`}>
                  <ProductCard product={product} total={HOME_PRODUCTS.length} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
})
