import type { HomeProduct } from '../../data/homeProducts'
import { homeProductImages } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function ProductCraftsmanship({ product }: { product: HomeProduct }) {
  if (product.imageCount === 0) return null

  const images = homeProductImages(product.slug, product.imageCount)
  const detailImage = images[images.length - 1]

  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>The Details</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.12] text-cream-100 sm:text-4xl">
                Finished by hand, <span className="italic text-gold-400">seat to frame.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/70">
                {product.category} — every {product.name} is upholstered by hand over a hardwood frame, with the
                cushioning, stitching and silhouette shown here true to the piece you'll receive.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)]">
                <div className="aspect-[16/10] w-full">
                  <img
                    src={detailImage}
                    alt={`${product.name} detail`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
