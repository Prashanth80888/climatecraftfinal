import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getProductBySlug } from '../../data/homeProducts'
import { homeProductImages } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const TRAITS = ['Smooth', 'Controlled', 'Effortless', 'Precise']

export function MotionExperience() {
  const product = getProductBySlug('craft-motion')!
  const images = homeProductImages(product.slug, product.imageCount)
  const [index, setIndex] = useState(0)

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
                <div className="relative aspect-[4/5] w-full sm:aspect-[4/3]">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={images[index]}
                      src={images[index]}
                      alt={product.name}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: easeOut }}
                      className="absolute inset-0 h-full w-full select-none object-cover"
                    />
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />

                  {images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
                      {images.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setIndex(i)}
                          aria-label={`View angle ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-400 ${
                            i === index ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <SectionLabel>Motion Experience</SectionLabel>
              <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
                Reclining, <span className="italic text-gold-400">without a sound.</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/65">
                A precision motor drives the reclining mechanism and leg rest on every Motorised Comfort piece —
                quiet, direct and consistent, whichever angle you view it from.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                {TRAITS.map((trait, i) => (
                  <button
                    key={trait}
                    type="button"
                    onClick={() => setIndex(i % images.length)}
                    className={`rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                      i === index
                        ? 'border-gold-400/50 bg-gold-400/[0.06]'
                        : 'border-white/10 bg-ink-900/40 hover:border-white/20'
                    }`}
                  >
                    <span className="font-display text-lg italic text-cream-100">{trait}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
