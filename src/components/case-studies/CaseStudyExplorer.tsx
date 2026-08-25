import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getCaseStudyBySlug } from '../../data/caseStudies'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

// The one "memorable" interaction on the overview page (see master brief §10/§24):
// a sticky visual with a scroll-driven narrative running through it. Built for a
// single case study — The Parlour — chosen because its 3 verified photographs
// (upright / mid-recline with mechanism visible / one seat reclined) map cleanly
// onto a Space -> Comfort -> Motion -> Technology -> Outcome story without any
// fabricated before/after imagery. Desktop gets the sticky scroll version;
// mobile/tablet gets a plain sequential version (see §25) — no scroll-linked
// stickiness, since that pattern doesn't translate to a touch viewport.
const FEATURED_SLUG = 'the-parlour'

const STAGES = [
  {
    label: 'Space',
    heading: 'A room built for arrival.',
    body: 'The Parlour is a formally arranged, symmetrical room — abstract art, tall curtains, a piece meant to read as the room’s centrepiece rather than one item among several.',
  },
  {
    label: 'Comfort',
    heading: 'Comfort with a tailored frame.',
    body: 'Brass-finished cup-holder inserts and a squared-off silhouette keep the sofa formal at rest — generous cushioning across all three seats, without softening the frame.',
  },
  {
    label: 'Motion',
    heading: 'One seat moves. The room still works.',
    body: 'The two outer seats recline and extend their leg rests independently — shown here mid-recline, mechanism visible along the base, while the neighbouring seat stays upright.',
  },
  {
    label: 'Technology',
    heading: 'A fixed centre, by design.',
    body: 'The centre seat carries no reclining mechanism at all — a stable position that’s always available, whichever of the outer two seats is in use.',
  },
  {
    label: 'Outcome',
    heading: 'Reclined or upright, still one piece.',
    body: 'With one seat reclined and the others upright, the sofa still reads as a single, symmetrical piece from across the room — the point of engineering the recline to disappear into the frame.',
  },
] as const

function DesktopExplorer({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Images: [0] establishing shot -> Space + Comfort, [1] mid-recline -> Motion, [2] one-seat-reclined -> Technology + Outcome.
  const image0Opacity = useTransform(scrollYProgress, [0, 0.34, 0.4], [1, 1, 0])
  const image1Opacity = useTransform(scrollYProgress, [0.34, 0.4, 0.54, 0.6], [0, 1, 1, 0])
  const image2Opacity = useTransform(scrollYProgress, [0.54, 0.6, 1], [0, 1, 1])
  const imageOpacities = [image0Opacity, image1Opacity, image2Opacity]

  const stage0 = useTransform(scrollYProgress, [0, 0.14, 0.2], [1, 1, 0])
  const stage1 = useTransform(scrollYProgress, [0.14, 0.2, 0.34, 0.4], [0, 1, 1, 0])
  const stage2 = useTransform(scrollYProgress, [0.34, 0.4, 0.54, 0.6], [0, 1, 1, 0])
  const stage3 = useTransform(scrollYProgress, [0.54, 0.6, 0.74, 0.8], [0, 1, 1, 0])
  const stage4 = useTransform(scrollYProgress, [0.8, 0.86, 1], [0, 1, 1])
  const stageOpacities = [stage0, stage1, stage2, stage3, stage4]

  const activeIndicator = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 1, 2, 3, 4, 4])
  const dot0Opacity = useTransform(activeIndicator, (v) => (Math.round(v) === 0 ? 1 : 0.25))
  const dot1Opacity = useTransform(activeIndicator, (v) => (Math.round(v) === 1 ? 1 : 0.25))
  const dot2Opacity = useTransform(activeIndicator, (v) => (Math.round(v) === 2 ? 1 : 0.25))
  const dot3Opacity = useTransform(activeIndicator, (v) => (Math.round(v) === 3 ? 1 : 0.25))
  const dot4Opacity = useTransform(activeIndicator, (v) => (Math.round(v) === 4 ? 1 : 0.25))
  const dotOpacities = [dot0Opacity, dot1Opacity, dot2Opacity, dot3Opacity, dot4Opacity]
  const dot0Scale = useTransform(activeIndicator, (v) => (Math.round(v) === 0 ? 1.4 : 1))
  const dot1Scale = useTransform(activeIndicator, (v) => (Math.round(v) === 1 ? 1.4 : 1))
  const dot2Scale = useTransform(activeIndicator, (v) => (Math.round(v) === 2 ? 1.4 : 1))
  const dot3Scale = useTransform(activeIndicator, (v) => (Math.round(v) === 3 ? 1.4 : 1))
  const dot4Scale = useTransform(activeIndicator, (v) => (Math.round(v) === 4 ? 1.4 : 1))
  const dotScales = [dot0Scale, dot1Scale, dot2Scale, dot3Scale, dot4Scale]

  return (
    <div ref={ref} className="relative hidden h-[480vh] lg:block">
      <div className="sticky top-24 grid h-[calc(100vh-9rem)] max-h-[760px] grid-cols-12 gap-8">
        <div className="relative col-span-6 overflow-hidden rounded-[28px] border border-white/[0.06] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
          {images.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt=""
              aria-hidden={i !== 0}
              style={{ opacity: imageOpacities[i] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
        </div>

        <div className="col-span-6 flex flex-col justify-center pl-4">
          <div className="flex items-center gap-3">
            {STAGES.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-gold-400"
                  style={{ opacity: dotOpacities[i], scale: dotScales[i] }}
                />
                {i < STAGES.length - 1 && <span className="h-px w-6 bg-white/10" />}
              </div>
            ))}
          </div>

          <div className="relative mt-8 h-[280px]">
            {STAGES.map((stage, i) => (
              <motion.div key={stage.label} style={{ opacity: stageOpacities[i] }} className="absolute inset-0">
                <span className="text-[11px] font-medium uppercase tracking-widest2 text-gold-400">
                  {stage.label}
                </span>
                <h3 className="mt-4 max-w-sm font-display text-[1.75rem] font-normal leading-[1.15] text-cream-100 sm:text-3xl">
                  {stage.heading}
                </h3>
                <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-cream-200/65">{stage.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileExplorer({ images }: { images: string[] }) {
  const imageForStage = [images[0], images[0], images[1], images[2], images[2]]

  return (
    <div className="flex flex-col gap-10 lg:hidden">
      {STAGES.map((stage, i) => (
        <Reveal key={stage.label} amount={0.4}>
          <div className="overflow-hidden rounded-[20px] border border-white/[0.06]">
            <div className="aspect-[4/3] w-full">
              <img src={imageForStage[i]} alt={stage.label} className="h-full w-full object-cover" />
            </div>
          </div>
          <span className="mt-5 inline-block text-[11px] font-medium uppercase tracking-widest2 text-gold-400">
            {stage.label}
          </span>
          <h3 className="mt-3 font-display text-2xl font-normal leading-[1.15] text-cream-100">{stage.heading}</h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-cream-200/65">{stage.body}</p>
        </Reveal>
      ))}
    </div>
  )
}

export function CaseStudyExplorer() {
  const featured = getCaseStudyBySlug(FEATURED_SLUG)
  if (!featured) return null

  return (
    <section className="relative bg-teal-950/15 py-20 sm:py-24 lg:py-28">
      {/* No overflow-hidden here: this section contains a position:sticky child
          (DesktopExplorer), and an overflow-hidden ancestor silently breaks sticky
          positioning. This gradient is inset-0, so nothing bleeds without it. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-teal-950/15 to-ink-950" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Case Study Explorer</SectionLabel>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            {featured.title} — <span className="italic text-gold-400">from space to solution.</span>
          </h2>
        </Reveal>

        <div className="mt-14">
          <DesktopExplorer images={featured.gallery} />
          <MobileExplorer images={featured.gallery} />
        </div>
      </div>
    </section>
  )
}
