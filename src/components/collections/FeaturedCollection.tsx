import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { HOME_PRODUCTS, PRODUCT_FAMILIES, type ProductFamily } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FAMILY_DESCRIPTIONS: Record<ProductFamily['id'], string> = {
  'climate-smart':
    'Patented liquid cooling and heating, motorized reclining and full smart-interface control — from a single considered seat up to a three-seat sofa with dual reclining.',
  'motorised-comfort':
    'Motorized reclining comfort, from a single armchair to a three-seat sofa with two reclining positions — without the climate technology.',
  classic:
    'Premium static seating, generously cushioned and upholstered by hand — no mechanical or climate technology, just timeless comfort.',
}

interface FeaturedCollectionProps {
  family: ProductFamily
  onExplore: () => void
}

export function FeaturedCollection({ family, onExplore }: FeaturedCollectionProps) {
  const products = HOME_PRODUCTS.filter((p) => p.familyId === family.id)
  const featured = products[0]

  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={family.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[9rem] font-normal leading-none text-cream-100/[0.03] sm:text-[13rem] lg:right-[38%]"
            >
              {String(family.number).padStart(2, '0')}
            </span>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_50px_120px_-45px_rgba(0,0,0,0.85)] lg:col-span-7">
              <div className="aspect-[4/3] w-full sm:aspect-[16/10]">
                <motion.img
                  key={featured.slug}
                  initial={{ scale: 1.06, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: easeOut }}
                  src={homeProductImage(featured.slug)}
                  alt={featured.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <span className="absolute left-6 top-6 section-label text-cream-100/90">Featured Collection</span>
            </div>

            <div className="relative lg:col-span-5">
              <div className="flex items-center gap-4">
                <span className="font-display text-sm italic tabular-nums text-gold-400/70">
                  {String(family.number).padStart(2, '0')} / {String(PRODUCT_FAMILIES.length).padStart(2, '0')}
                </span>
                <SectionLabel>{String(products.length).padStart(2, '0')} Pieces</SectionLabel>
              </div>
              <h2 className="mt-5 font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl lg:text-[2.75rem]">
                {family.label}
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/70">
                {FAMILY_DESCRIPTIONS[family.id]}
              </p>
              <button type="button" onClick={onExplore} className="btn-ghost group mt-8">
                Explore the Collection
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
