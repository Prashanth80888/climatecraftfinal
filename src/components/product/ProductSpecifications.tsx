import type { HomeProduct } from '../../data/homeProducts'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

function findSpec(specs: string[], pattern: RegExp) {
  const match = specs.find((s) => pattern.test(s))
  return match?.includes(':') ? match.split(':')[1]?.trim() : match
}

export function ProductSpecifications({ product }: { product: HomeProduct }) {
  const temperature = findSpec(product.specifications, /temperature range/i)
  const warranty = findSpec(product.specifications, /warranty/i)
  const upholstery = product.specifications.some((s) => /460 gsm/i.test(s)) ? '460 GSM' : 'Premium'

  const metrics = [
    { label: 'Seating', value: String(product.seats) },
    { label: 'Operation', value: product.operation },
    ...(temperature ? [{ label: 'Temperature', value: temperature }] : []),
    { label: 'Upholstery', value: upholstery },
    ...(warranty ? [{ label: 'Warranty', value: warranty }] : []),
  ]

  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Specifications</SectionLabel>
        </Reveal>

        <RevealGroup
          className="mt-8 grid grid-cols-2 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-5"
          stagger={0.08}
        >
          {metrics.map((m) => (
            <RevealItem key={m.label} className="px-1 py-6 first:pl-0 sm:px-6 sm:first:pl-0">
              <p className="text-[10.5px] uppercase tracking-widest text-cream-200/45">{m.label}</p>
              <p className="mt-2 font-display text-xl text-gold-400 sm:text-2xl">{m.value}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {product.specifications.map((spec) => (
              <li key={spec} className="flex items-start gap-3 text-[14px] leading-relaxed text-cream-200/70">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold-400/70" />
                {spec}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
