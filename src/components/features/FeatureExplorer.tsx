import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { getProductBySlug, PRODUCT_FAMILIES, type HomeProduct, type ProductHotspot } from '../../data/homeProducts'
import { homeProductImages } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

// One representative product per family drives the explorer — its own real
// specifications and hotspot data (already verified on the Product Detail
// page) are reused directly, never redefined here.
const FAMILY_REPS: Record<HomeProduct['familyId'], string> = {
  'climate-smart': 'climate-craft-signature',
  'motorised-comfort': 'craft-motion',
  classic: 'craft-classic-grand',
}

// A short, literal "why it matters" line for each representative hotspot — grounded
// directly in that same hotspot's real spec-backed description, never a new claim.
const BENEFITS: Record<string, string> = {
  'climate-craft-signature:control': 'Every adjustment happens without ever breaking your comfort.',
  'climate-craft-signature:backrest': 'Consistent comfort through every season, with no separate appliance.',
  'climate-craft-signature:seat': 'Reclining and leg support that move exactly when you do.',
  'craft-motion:control': 'One motion, precisely controlled, the same way every time.',
  'craft-motion:cupholder': 'Comfort that keeps everything you need within reach.',
  'craft-motion:headrest': 'Support engineered around how the body actually rests.',
  'craft-classic-grand:upholstery': 'Built to feel as good in ten years as it does today.',
  'craft-classic-grand:configuration': 'Room enough for the whole family, without compromise.',
  'craft-classic-grand:silhouette': 'Furniture that anchors a room instead of competing with it.',
}

export function FeatureExplorer() {
  const [familyId, setFamilyId] = useState<HomeProduct['familyId']>('climate-smart')
  const [activeId, setActiveId] = useState<string | null>(null)

  const product = getProductBySlug(FAMILY_REPS[familyId])!
  const family = PRODUCT_FAMILIES.find((f) => f.id === familyId)!
  const images = homeProductImages(product.slug, product.imageCount)
  const hotspots = product.hotspots
  const active = hotspots.find((h) => h.id === activeId) ?? null
  const activeIndex = active ? hotspots.findIndex((h) => h.id === active.id) : -1
  const displayImage = active?.imageIndex !== undefined ? images[active.imageIndex] ?? images[0] : images[0]

  const selectFamily = (id: HomeProduct['familyId']) => {
    setFamilyId(id)
    setActiveId(null)
  }

  return (
    <section id="feature-explorer" className="relative overflow-hidden bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[560px] w-[560px] -translate-y-1/2 rounded-full opacity-[0.1] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Feature Discovery</SectionLabel>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl lg:text-[2.75rem]">
            Every detail, <span className="italic text-gold-400">explained.</span>
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-cream-200/65">
            Select a collection, then choose a point on the product to explore the engineering behind it.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Technology collection"
            className="mt-9 inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-ink-900/50 p-1 backdrop-blur-md"
          >
            {PRODUCT_FAMILIES.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={familyId === f.id}
                onClick={() => selectFamily(f.id)}
                className={`relative rounded-full px-5 py-2.5 text-[11.5px] font-medium uppercase tracking-widest transition-colors duration-300 ${
                  familyId === f.id ? 'text-ink-950' : 'text-cream-200/60 hover:text-cream-100'
                }`}
              >
                {familyId === f.id && (
                  <motion.span
                    layoutId="family-pill"
                    transition={{ duration: 0.45, ease: easeOut }}
                    className="absolute inset-0 rounded-full bg-gold-400 shadow-[0_8px_20px_-8px_rgba(212,175,86,0.6)]"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Image stage */}
          <div className="lg:col-span-7">
            <motion.div
              animate={{ scale: active ? 1.015 : 1 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-900 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]"
            >
              <div className="relative aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[16/12]">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={`${product.slug}-${displayImage}`}
                    src={displayImage}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: easeOut }}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                  />
                </AnimatePresence>

                {/* Cinematic dim when a feature is selected */}
                <motion.div
                  animate={{ opacity: active ? 0.55 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="pointer-events-none absolute inset-0 bg-ink-950"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent" />

                <span className="absolute left-5 top-5 z-10 rounded-full border border-gold-400/30 bg-ink-950/60 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-gold-300/90 backdrop-blur-md">
                  {product.name}
                </span>

                {hotspots.map((h, i) => {
                  const isActive = h.id === activeId
                  return (
                    <button
                      key={h.id}
                      type="button"
                      aria-label={`Explore feature ${i + 1}: ${h.title}`}
                      aria-expanded={isActive}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      onClick={() => setActiveId((cur) => (cur === h.id ? null : h.id))}
                      onMouseEnter={() => setActiveId(h.id)}
                      onFocus={() => setActiveId(h.id)}
                      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
                    >
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                          animate={{ opacity: 1, scale: 1, rotate: 40 }}
                          transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.4, ease: easeOut }, rotate: { duration: 6, repeat: Infinity, ease: 'linear' } }}
                          className="absolute inset-0 -m-4 rounded-full border border-dashed border-gold-300/40"
                        />
                      )}
                      <span
                        className={`absolute inset-0 -m-2.5 rounded-full transition-opacity duration-300 motion-reduce:animate-none ${
                          isActive ? 'opacity-0' : 'animate-ping opacity-30'
                        }`}
                        style={{ background: 'radial-gradient(circle, rgba(212,175,86,0.55) 0%, transparent 70%)' }}
                      />
                      <span
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border font-display text-[11px] italic backdrop-blur-md transition-all duration-300 ${
                          isActive
                            ? 'scale-110 border-gold-300 bg-gold-400 text-ink-950'
                            : 'border-gold-300/50 bg-ink-950/60 text-gold-300 group-hover:border-gold-300 group-hover:bg-ink-950/85'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* Mobile: tap hint */}
            <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-cream-200/35 lg:hidden">
              Tap a number to explore
            </p>
          </div>

          {/* Info panel */}
          <div className="lg:col-span-5 lg:pt-4">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="rounded-[24px] border border-white/10 bg-ink-900/50 p-7 backdrop-blur-md sm:p-8"
                >
                  <span className="font-display text-sm italic tabular-nums text-gold-400/80">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(hotspots.length).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-cream-100 sm:text-[1.75rem]">
                    {active.title}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-cream-200/70">{active.description}</p>
                  <div className="mt-5 border-t border-white/10 pt-5">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-teal-300/70">Why it matters</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-cream-200/60">
                      {BENEFITS[`${product.slug}:${active.id}`]}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="rounded-[24px] border border-white/10 bg-ink-900/30 p-7 sm:p-8"
                >
                  <p className="font-display text-sm italic text-gold-400/80">{family.label}</p>
                  <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-cream-200/60">{family.blurb}</p>
                  <ul className="mt-6 space-y-2.5">
                    {hotspots.map((h: ProductHotspot, i) => (
                      <li key={h.id} className="flex items-center gap-3 text-[13px] text-cream-200/55">
                        <span className="font-display text-xs italic text-gold-400/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {h.title}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-widest text-cream-200/35">
                    <Plus className="h-3 w-3" /> Hover or tap a number to begin
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
