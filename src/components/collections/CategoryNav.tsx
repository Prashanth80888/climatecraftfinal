import { motion } from 'framer-motion'
import { HOME_PRODUCTS, PRODUCT_FAMILIES } from '../../data/homeProducts'
import { Reveal } from '../ui/Reveal'

interface CategoryNavProps {
  active: number
  onChange: (index: number) => void
}

export function CategoryNav({ active, onChange }: CategoryNavProps) {
  return (
    <Reveal amount={0.4}>
      <div className="sticky top-[76px] z-30 bg-ink-950/95 py-3 backdrop-blur-xl sm:top-[92px]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Collection categories"
            className="scrollbar-none flex items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.02] p-1.5 sm:justify-center"
          >
            {PRODUCT_FAMILIES.map((family, i) => {
              const count = HOME_PRODUCTS.filter((p) => p.familyId === family.id).length
              return (
                <button
                  key={family.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => onChange(i)}
                  className={`relative flex-none whitespace-nowrap rounded-full px-5 py-2.5 text-[12px] font-medium uppercase tracking-widest transition-colors duration-300 sm:px-6 ${
                    active === i ? 'text-ink-950' : 'text-cream-200/70 hover:text-cream-100'
                  }`}
                >
                  {active === i && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-gold-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    {family.label}
                    <span className={`ml-2 tabular-nums ${active === i ? 'text-ink-950/60' : 'text-cream-200/40'}`}>
                      {String(count).padStart(2, '0')}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
