import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight, Maximize2, Move, X, ZoomIn, ZoomOut } from 'lucide-react'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Pixels of horizontal drag per angle step — lower = more sensitive rotation.
const DRAG_STEP_PX = 45

const ANGLE_LABELS = ['Front', '3/4', 'Side', 'Rear', 'Detail', 'Reclined']

interface ProductViewerProps {
  images: string[]
  alt: string
}

export function ProductViewer({ images, alt }: ProductViewerProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [expanded, setExpanded] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%')
  const [hasInteracted, setHasInteracted] = useState(false)
  const indexRef = useRef(0)
  const panAccum = useRef(0)
  const hasMultiple = images.length > 1

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const goTo = (next: number) => {
    const wrapped = ((next % images.length) + images.length) % images.length
    setDirection(next > indexRef.current ? 1 : -1)
    indexRef.current = wrapped
    setIndex(wrapped)
  }

  const onSwipeEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x
    if (swipe < -60) goTo(indexRef.current + 1)
    else if (swipe > 60) goTo(indexRef.current - 1)
  }

  const onPanStart = () => {
    if (!hasMultiple || zoomed) return
    panAccum.current = 0
    setHasInteracted(true)
  }

  const onPan = (_: unknown, info: PanInfo) => {
    if (!hasMultiple || zoomed) return
    panAccum.current += info.delta.x
    if (panAccum.current > DRAG_STEP_PX) {
      panAccum.current -= DRAG_STEP_PX
      goTo(indexRef.current - 1)
    } else if (panAccum.current < -DRAG_STEP_PX) {
      panAccum.current += DRAG_STEP_PX
      goTo(indexRef.current + 1)
    }
  }

  const onZoomMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomOrigin(`${x}% ${y}%`)
  }

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomed) setZoomed(false)
        else setExpanded(false)
      }
      if (e.key === 'ArrowRight') goTo(indexRef.current + 1)
      if (e.key === 'ArrowLeft') goTo(indexRef.current - 1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.removeProperty('overflow')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, zoomed])

  const frame = (fullscreen: boolean) => (
    <div
      className={
        fullscreen
          ? 'relative aspect-auto h-[80vh] w-full max-w-5xl overflow-hidden rounded-2xl'
          : 'relative aspect-[4/5] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[5/4]'
      }
    >
      {images.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-900 to-ink-950 text-center">
          <Camera className="h-7 w-7 text-cream-200/25" strokeWidth={1.5} />
          <span className="text-[11px] font-medium uppercase tracking-widest text-cream-200/35">
            Photography Pending
          </span>
        </div>
      ) : (
        <motion.div
          className={`absolute inset-0 touch-none ${
            zoomed ? 'cursor-zoom-out' : hasMultiple ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
          onPanStart={onPanStart}
          onPan={onPan}
          drag={hasMultiple && !zoomed ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={onSwipeEnd}
          onClick={() => zoomed && setZoomed(false)}
          onMouseMove={zoomed ? onZoomMouseMove : undefined}
        >
          <div
            style={{ transform: zoomed ? 'scale(2.1)' : 'scale(1)', transformOrigin: zoomOrigin }}
            className="h-full w-full transition-transform duration-500 ease-out"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={index}
                custom={direction}
                src={images[index]}
                alt={alt}
                draggable={false}
                initial={{ opacity: 0, scale: 1.03, x: direction * 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: direction * -24 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className={fullscreen ? 'h-full w-full select-none object-contain' : 'h-full w-full select-none object-cover'}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {!fullscreen && !zoomed && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
      )}

      <AnimatePresence>
        {hasMultiple && !hasInteracted && !zoomed && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center"
          >
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/60 px-4 py-2 text-[10.5px] font-medium uppercase tracking-widest text-cream-100/80 backdrop-blur-md">
              <Move className="h-3.5 w-3.5 animate-pulse text-gold-300" strokeWidth={2} />
              Drag to explore
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous angle"
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-950/50 text-cream-100 backdrop-blur-md transition-all duration-300 hover:border-gold-400/50 hover:bg-ink-950/80"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next angle"
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-950/50 text-cream-100 backdrop-blur-md transition-all duration-300 hover:border-gold-400/50 hover:bg-ink-950/80"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <span className="absolute bottom-4 right-4 z-10 rounded-full border border-white/10 bg-ink-950/60 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-cream-100/70 backdrop-blur-md">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </>
      )}

      {images.length > 0 && (
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          {!fullscreen && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="Expand view"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-950/50 text-cream-100 backdrop-blur-md transition-all duration-300 hover:border-gold-400/50 hover:bg-ink-950/80"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-950/50 text-cream-100 backdrop-blur-md transition-all duration-300 hover:border-gold-400/50 hover:bg-ink-950/80"
          >
            {zoomed ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div>
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-900 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
        {frame(false)}
      </div>

      {hasMultiple && (
        <div className="scrollbar-none mt-4 flex items-center gap-2.5 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View ${ANGLE_LABELS[i] ?? `angle ${i + 1}`}`}
              className={`group relative flex-none overflow-hidden rounded-xl border transition-all duration-300 ${
                i === index ? 'border-gold-400/60' : 'border-white/10 hover:border-white/25'
              }`}
            >
              <div className="h-16 w-14 overflow-hidden sm:h-20 sm:w-16">
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className={`h-full w-full object-cover transition-opacity duration-300 ${
                    i === index ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'
                  }`}
                />
              </div>
              <span
                className={`absolute inset-x-0 bottom-0 py-1 text-center text-[8.5px] font-medium uppercase tracking-wider transition-colors duration-300 ${
                  i === index ? 'bg-gold-500 text-ink-950' : 'bg-ink-950/70 text-cream-100/70'
                }`}
              >
                {ANGLE_LABELS[i] ?? String(i + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-lg sm:p-8"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              {frame(true)}
            </motion.div>

            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close expanded view"
              className="absolute right-5 top-5 z-[110] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink-950/60 text-cream-100 backdrop-blur-md transition-all duration-300 hover:border-gold-400/50"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
