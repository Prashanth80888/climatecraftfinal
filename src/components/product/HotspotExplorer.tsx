import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { ProductHotspot } from '../../data/homeProducts'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface HotspotExplorerProps {
  images: string[]
  hotspots: ProductHotspot[]
  alt: string
}

export function HotspotExplorer({ images, hotspots, alt }: HotspotExplorerProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activeId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveId(null)
      }
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [])

  const active = hotspots.find((h) => h.id === activeId) ?? null
  const src = images[imageIndex] ?? images[0]

  const openHotspot = (hotspot: ProductHotspot) => {
    setActiveId(hotspot.id)
    if (typeof hotspot.imageIndex === 'number' && images[hotspot.imageIndex]) {
      setImageIndex(hotspot.imageIndex)
    }
  }

  // Card flips to the opposite side near the edges so it never clips out of view.
  const cardSide = active ? (active.x > 55 ? 'left' : 'right') : 'right'
  const cardVertical = active ? (active.y > 65 ? 'up' : 'down') : 'down'

  return (
    <div
      ref={containerRef}
      className="relative overflow-visible rounded-[28px] border border-white/10 bg-ink-900 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] sm:aspect-[4/3] lg:aspect-[5/4]">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={src}
            src={src}
            alt={alt}
            draggable={false}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="absolute inset-0 h-full w-full select-none object-cover"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 z-10 rounded-full border border-gold-400/30 bg-ink-950/60 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-gold-300/90 backdrop-blur-md">
          Explore the Details
        </span>
      </div>

      {/* Overlay sits outside the image's overflow-hidden clip so cards near the edge can bleed past the frame. */}
      <div className="pointer-events-none absolute inset-0">
        {hotspots.map((hotspot) => {
          const isActive = hotspot.id === activeId
          return (
            <button
              key={hotspot.id}
              type="button"
              aria-label={`View detail: ${hotspot.title}`}
              aria-expanded={isActive}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onClick={(e) => {
                e.stopPropagation()
                openHotspot(hotspot)
              }}
              onMouseEnter={() => setActiveId(hotspot.id)}
              onFocus={() => setActiveId(hotspot.id)}
              className="group pointer-events-auto absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
            >
              <span
                className={`absolute inset-0 -m-2.5 rounded-full transition-opacity duration-300 motion-reduce:animate-none ${
                  isActive ? 'opacity-0' : 'animate-ping opacity-40'
                }`}
                style={{ background: 'radial-gradient(circle, rgba(212,175,86,0.55) 0%, transparent 70%)' }}
              />
              <span
                className={`relative flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? 'scale-110 border-gold-300 bg-gold-400/90 text-ink-950'
                    : 'border-gold-300/50 bg-ink-950/60 text-gold-300 group-hover:border-gold-300 group-hover:bg-ink-950/80'
                }`}
              >
                <Plus className={`h-3.5 w-3.5 transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`} strokeWidth={2.5} />
              </span>
            </button>
          )
        })}

        <AnimatePresence>
          {active && (
            <>
              <motion.svg
                key={`line-${active.id}`}
                className="absolute inset-0 h-full w-full overflow-visible"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <line
                  x1={`${active.x}%`}
                  y1={`${active.y}%`}
                  x2={`${active.x + (cardSide === 'right' ? 12 : -12)}%`}
                  y2={`${active.y + (cardVertical === 'up' ? -10 : 10)}%`}
                  stroke="rgba(212,175,86,0.5)"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
              </motion.svg>

              <div
                key={`card-wrap-${active.id}`}
                style={{
                  ...(cardSide === 'right'
                    ? { left: `calc(${active.x}% + 18px)` }
                    : { right: `calc(${100 - active.x}% + 18px)` }),
                  ...(cardVertical === 'up'
                    ? { bottom: `calc(${100 - active.y}% + 10px)` }
                    : { top: `calc(${active.y}% + 10px)` }),
                }}
                className="pointer-events-auto absolute z-30 w-[calc(100vw-4rem)] max-w-[260px] sm:w-64"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: cardVertical === 'up' ? 8 : -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="rounded-2xl border border-gold-300/25 bg-ink-950/90 p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                >
                  <p className="font-display text-sm italic text-gold-300">{active.title}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-cream-200/75">{active.description}</p>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
