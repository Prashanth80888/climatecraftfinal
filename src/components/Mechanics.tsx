import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { brand } from '../lib/assets'
import { SectionLabel } from './ui/SectionLabel'
import { Reveal } from './ui/Reveal'

export function Mechanics() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({ target: visualRef, offset: ['start 90%', 'start 20%'] })
  const visualScale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const visualOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 1])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-15, 15])

  const { scrollYProgress: settleProgress } = useScroll({ target: visualRef, offset: ['start end', 'end start'] })
  const visualY = useTransform(settleProgress, [0, 0.5, 1], ['6%', '0%', '-6%'])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="mechanics" ref={sectionRef} className="relative overflow-hidden bg-ink-950 py-16 sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 70%)' }}
      />
      <div className="grain-overlay opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>How We Build</SectionLabel>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[2.4rem] font-normal leading-[1.08] text-cream-100 sm:text-5xl lg:text-[3.4rem]">
              <Reveal y={20}>
                <span className="block">We engineer the quiet mechanics of</span>
              </Reveal>
              <Reveal y={20} delay={0.12}>
                <span className="block italic text-gold-400">comfort —</span>
              </Reveal>
              <Reveal y={20} delay={0.24}>
                <span className="block">then wrap them in fabric.</span>
              </Reveal>
            </h2>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-[15px] leading-relaxed text-cream-200/75 sm:text-base">
                Every Climate Craft piece begins as a mechanism: a motor, a hinge, a hand-crank glide tuned to move
                without a sound. Around it we build a hardwood frame, a hand-tied suspension, and an upholstery you
                choose from a curated archive of fabrics.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-cream-200/75 sm:text-base">
                We supply manufacturers, galleries and interior houses who need seating that performs as beautifully
                as it sits.
              </p>
              <a
                href="#why-climate-craft"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#why-climate-craft')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-ghost group mt-6"
              >
                Learn About Our Process
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.3} y={0}>
          <div className="mx-auto mt-10 flex flex-col items-center gap-2 sm:mt-14">
            <span className="h-10 w-px bg-gradient-to-b from-transparent to-gold-400/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          </div>
        </Reveal>

        <motion.div
          ref={visualRef}
          style={{ scale: visualScale, opacity: visualOpacity, y: visualY }}
          className="relative mt-6 sm:mt-8"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)] sm:rounded-[36px]">
            <div className="aspect-[16/10] w-full sm:aspect-[16/9]">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={brand.mechanicsVideo}
                poster={brand.mechanicsPoster}
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-ink-950/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-transparent" />

            <motion.div
              style={{ rotate: ringRotate }}
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold-400/25 sm:h-52 sm:w-52"
            />
            <div className="pointer-events-none absolute -left-8 bottom-10 h-24 w-24 animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-teal-400/20" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 sm:p-10">
              <span className="section-label text-cream-100/90">Descent</span>
              <h3 className="mt-1 max-w-md font-display text-2xl italic text-cream-100 sm:text-3xl">
                It arrives from above.
              </h3>
              <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-cream-200/65 sm:text-sm">
                Every piece is lowered, positioned and set by hand — a choreography of frame, mechanism and fabric
                coming to rest in the room.
              </p>
            </div>

            <div className="absolute right-6 top-6 flex items-center gap-2 sm:right-10 sm:top-10">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
              <span className="text-[10px] uppercase tracking-widest2 text-cream-100/60">Scroll to witness</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
