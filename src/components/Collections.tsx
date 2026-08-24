import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Camera } from 'lucide-react'
import { HOME_PRODUCTS, PRODUCT_FAMILIES, type HomeProduct } from '../data/homeProducts'
import { homeProductImage } from '../lib/assets'
import { SectionLabel } from './ui/SectionLabel'
import { Reveal } from './ui/Reveal'

const TOTAL = HOME_PRODUCTS.length
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const ROW_CONFIG: Record<string, { dur: number; dir: 'ltr' | 'rtl' }> = {
  'climate-smart': { dur: 26, dir: 'ltr' },
  'motorised-comfort': { dur: 30, dir: 'rtl' },
  classic: { dur: 34, dir: 'ltr' },
}

function ProductCard({ product }: { product: HomeProduct }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <Link
      ref={cardRef}
      to={`/products/${product.slug}`}
      draggable={false}
      onMouseMove={onMouseMove}
      className="group relative w-[270px] flex-none overflow-hidden rounded-[20px] border border-white/10 bg-ink-900/40 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gold-400/40 hover:bg-ink-900/70 hover:shadow-[0_35px_80px_-28px_rgba(0,0,0,0.8)] sm:w-[310px]"
    >
      {/* cursor-follow spotlight — subtle, gold-tinted, opacity-gated so it only exists on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(180px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(240,169,44,0.16), transparent 70%)',
        }}
      />

      <div className="relative aspect-[4/5] overflow-hidden bg-ink-900">
        {product.imageCount > 0 ? (
          <img
            src={homeProductImage(product.slug)}
            alt={product.name}
            draggable={false}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-900 to-ink-950 px-6 text-center">
            <Camera className="h-6 w-6 text-cream-200/25" strokeWidth={1.5} />
            <span className="text-[10.5px] font-medium uppercase tracking-widest text-cream-200/35">
              Photography Pending
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent transition-opacity duration-500 group-hover:via-ink-950/25" />

        <span className="absolute left-4 top-4 font-display text-xs italic text-cream-100/60 tabular-nums transition-colors duration-500 group-hover:text-gold-300/80">
          {String(product.number).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>
        <span className="absolute right-4 top-4 text-[10px] font-medium uppercase tracking-widest text-cream-100/50">
          {product.operation}
        </span>
      </div>

      <div className="relative border-t border-white/[0.06] p-5 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
        <h4 className="font-display text-lg text-cream-100 transition-colors duration-500 group-hover:text-gold-100">
          {product.name}
        </h4>
        <p className="mt-0.5 text-[11px] uppercase tracking-widest text-cream-200/40">{product.category}</p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-cream-200/55">{product.teaser}</p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-gold-400/90 transition-all duration-500 group-hover:gap-2.5 group-hover:text-gold-300">
          View Product
          <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

function MarqueeRow({ products, dur, dir: direction }: { products: HomeProduct[]; dur: number; dir: 'ltr' | 'rtl' }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef({
    position: 0,
    hovered: false,
    visible: true,
    dragging: false,
    startX: 0,
    startPosition: 0,
    setWidth: 0,
  })

  // Small families (e.g. the 3-product Motorised Comfort row) need more repeated
  // copies than a 2x duplicate to stay seamless on very wide/ultrawide viewports —
  // otherwise the track can run out of content before the loop wraps, producing a
  // visible blank gap. Larger families (6-10 items) are already wide enough at 2x.
  const [repeat, setRepeat] = useState(products.length <= 4 ? 4 : 2)
  const dir = direction === 'rtl' ? -1 : 1

  useEffect(() => {
    const track = trackRef.current
    const row = rowRef.current
    if (!track || !row) return
    const state = stateRef.current

    const measure = () => {
      state.setWidth = track.scrollWidth / repeat
      // Guarantee at least ~2.2x the viewport width of content per copy-cycle so
      // the wrap point is always off-screen, regardless of monitor width.
      if (row.clientWidth > 0 && state.setWidth * 1.8 < row.clientWidth && repeat < 8) {
        setRepeat((r) => r + 2)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    ro.observe(row)

    const io = new IntersectionObserver(([entry]) => (state.visible = entry.isIntersecting), { threshold: 0.01 })
    io.observe(row)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (!state.hovered && !state.dragging && state.visible && !prefersReduced && state.setWidth > 0) {
        const speed = state.setWidth / dur
        state.position -= dir * speed * dt

        if (state.position <= -state.setWidth) state.position += state.setWidth
        if (state.position >= 0) state.position -= state.setWidth

        track.style.transform = `translate3d(${state.position}px,0,0)`
      }
      raf = requestAnimationFrame(tick)
    }

    if (dir === -1) state.position = -state.setWidth

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [dur, dir, repeat])

  const onPointerDown = (e: React.PointerEvent) => {
    const state = stateRef.current
    state.dragging = true
    state.startX = e.clientX
    state.startPosition = state.position
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const state = stateRef.current
    if (!state.dragging) return
    const delta = e.clientX - state.startX
    state.position = state.startPosition + delta
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${state.position}px,0,0)`
  }

  const endDrag = () => {
    stateRef.current.dragging = false
  }

  const sequence = Array.from({ length: repeat }, () => products).flat()

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easeOut }}
      className="relative touch-pan-y overflow-hidden"
      onMouseEnter={() => (stateRef.current.hovered = true)}
      onMouseLeave={() => (stateRef.current.hovered = false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink-950 via-ink-950/70 to-transparent sm:w-32" />

      <div ref={trackRef} className="flex w-max cursor-grab select-none gap-6 pb-2 active:cursor-grabbing sm:gap-7">
        {sequence.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} product={product} />
        ))}
      </div>
    </motion.div>
  )
}

export function Collections() {
  return (
    <section id="collections" className="relative overflow-hidden bg-ink-950 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>
            <span className="mx-auto">Curated for Every Space</span>
          </SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-5 max-w-xl font-display text-4xl font-normal text-cream-100 sm:text-5xl">
            Explore our collections
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-cream-200/70">
            Three families of motion furniture — Climate Smart, Motorised Comfort and Classic.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 flex flex-col gap-14 sm:mt-20 sm:gap-16">
        {PRODUCT_FAMILIES.map((family) => {
          const products = HOME_PRODUCTS.filter((p) => p.familyId === family.id)
          const config = ROW_CONFIG[family.id]

          return (
            <div key={family.id}>
              <Reveal amount={0.15}>
                <div className="mx-auto mb-6 flex max-w-7xl flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-white/[0.07] px-5 pb-4 sm:px-6 lg:px-8">
                  <div>
                    <h3 className="font-display text-xl text-cream-100 sm:text-2xl">{family.label}</h3>
                    <p className="mt-1 max-w-md text-[12.5px] leading-relaxed text-cream-200/45">{family.blurb}</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-cream-200/40 tabular-nums">
                    {String(family.number).padStart(2, '0')} / {String(PRODUCT_FAMILIES.length).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>
              <MarqueeRow products={products} dur={config.dur} dir={config.dir} />
            </div>
          )
        })}
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-6 lg:px-8 sm:mt-16">
        <Reveal>
          <a
            href="#final-cta"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#final-cta')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-ghost group"
          >
            Request a bespoke configuration
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
