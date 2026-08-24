import { getProductBySlug } from '../../data/homeProducts'
import { homeProductImageAt } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const POINTS = [
  { title: 'Premium Upholstery', copy: 'Every panel is finished in premium fabric, chosen for how it wears as much as how it looks.' },
  { title: 'Generous Cushioning', copy: 'Deep, considered cushioning across the seat and back, built to hold its shape.' },
  { title: 'Ergonomic Design', copy: 'Every seating surface is shaped around the body, not the other way around.' },
  { title: 'Contemporary Silhouette', copy: 'A clean, restrained profile that sits comfortably in any interior.' },
]

export function Craftsmanship() {
  const product = getProductBySlug('craft-classic')!
  // 06.png (DSC05492) is a genuine close-up detail shot of this product's diamond-quilted upholstery.
  const detailImage = homeProductImageAt(product.slug, 6)

  return (
    <section className="relative bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <div
                className="overflow-hidden rounded-[28px] border border-white/10 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]"
                style={{ clipPath: 'inset(0% round 28px)' }}
              >
                <img
                  src={detailImage}
                  alt={`${product.name} — upholstery detail`}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>Craftsmanship</SectionLabel>
              <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl lg:text-[2.6rem]">
                Every surface <span className="italic text-gold-400">has a reason.</span>
              </h2>
            </Reveal>

            <RevealGroup className="mt-10 divide-y divide-white/10 border-t border-white/10">
              {POINTS.map((p) => (
                <RevealItem key={p.title} className="py-5">
                  <h3 className="font-display text-lg text-cream-100">{p.title}</h3>
                  <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-cream-200/60">{p.copy}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
