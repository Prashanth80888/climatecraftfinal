import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Camera } from 'lucide-react'
import { HOME_PRODUCTS, type HomeProduct } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { RevealGroup, RevealItem } from '../ui/Reveal'

const MAX_TILT = 4

function RelatedCard({ product }: { product: HomeProduct }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    card.style.setProperty('--tilt-x', `${((0.5 - py) * MAX_TILT * 2).toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${((px - 0.5) * MAX_TILT * 2).toFixed(2)}deg`)
  }

  const onMouseLeave = () => {
    cardRef.current?.style.setProperty('--tilt-x', '0deg')
    cardRef.current?.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Link
      ref={cardRef}
      to={`/products/${product.slug}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transform: 'perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' }}
      className="group relative block overflow-hidden rounded-[20px] border border-white/10 bg-ink-900/40 transition-[border-color,box-shadow] duration-300 ease-out will-change-transform hover:border-gold-400/35 hover:shadow-[0_35px_80px_-30px_rgba(0,0,0,0.8)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-900">
        {product.imageCount > 0 ? (
          <img
            src={homeProductImage(product.slug)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-900 to-ink-950 text-center">
            <Camera className="h-6 w-6 text-cream-200/25" strokeWidth={1.5} />
            <span className="text-[10.5px] font-medium uppercase tracking-widest text-cream-200/35">
              Photography Pending
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

        <span className="absolute left-4 top-4 font-display text-xs italic tabular-nums text-cream-100/60">
          {String(product.number).padStart(2, '0')} / {String(HOME_PRODUCTS.length).padStart(2, '0')}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-lg text-cream-100">{product.name}</h4>
            <ArrowUpRight className="mt-1 h-4 w-4 flex-none -translate-x-1 translate-y-1 text-gold-400 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-cream-200/45">{product.category}</p>
        </div>
      </div>
    </Link>
  )
}

export function RelatedProducts({ products }: { products: HomeProduct[] }) {
  if (products.length === 0) return null

  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionLabel>You May Also Like</SectionLabel>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7">
          {products.map((product) => (
            <RevealItem key={product.id}>
              <RelatedCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
