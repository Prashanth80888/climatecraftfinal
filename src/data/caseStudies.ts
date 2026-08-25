// Case Studies draw on the same 8 verified, photographed spaces already used by
// the Projects page (see src/data/projects.ts and public/images/projects/), but
// go deeper: Challenge -> Approach -> Technology -> Outcome, instead of the
// lighter "space application" treatment on Projects. Same non-negotiable rule
// as Projects: no client names, locations, dates, budgets or statistics appear
// anywhere here, because none of that information exists for these rooms. Every
// claim below is either directly visible in the photography or a real,
// verified capability from the product catalogue (src/data/homeProducts.ts) —
// never invented.

import { getProductBySlug, type HomeProduct } from './homeProducts'

export interface TechCapability {
  label: string
  description: string
}

export interface CaseStudy {
  slug: string
  number: number
  category: string
  title: string
  /** One or two sentences — card teaser and detail-hero subhead. */
  summary: string
  /** All verified real angle photographs for this space, in order. Index 0 is the hero/card image. */
  gallery: string[]
  overview: string
  challenge: string
  approach: string
  technology: TechCapability[]
  outcome: string
  relatedProductSlugs: string[]
  relatedCaseStudySlugs: string[]
}

const imageAt = (slug: string, index: number) => `/images/projects/${slug}/${String(index).padStart(2, '0')}.png`
const images = (slug: string, count: number) => Array.from({ length: count }, (_, i) => imageAt(slug, i + 1))

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'city-view-retreat',
    number: 1,
    category: 'Residential',
    title: 'City View Retreat',
    summary:
      'A single reclining seat set against a full-height window, positioned so the outside view stays part of the room.',
    gallery: images('city-view-retreat', 3),
    overview:
      'A single-seat recliner placed at the edge of a full-height window, in a room built around daylight and an open outlook. The seat’s profile deliberately doesn’t compete with the window or the sculptural piece on the wall behind it — comfort framed by the room, not the other way around.',
    challenge:
      'The chair needed to sit close enough to the glass to keep the view part of the experience, without blocking the light or interrupting the sightline — and it still had to recline fully into the room without meeting the curtain or the side table.',
    approach:
      'Deep, plush cushioning across the seat and back, with the recline motion directed inward, away from the window, so the chair can be used at any position without first being pulled further into the room.',
    technology: [
      {
        label: 'Motorized Reclining & Leg Rest',
        description:
          'A motorized mechanism extends the leg rest and reclines the backrest smoothly, controlled from the built-in armrest cluster.',
      },
      {
        label: 'Armrest Control & Cup Holder',
        description:
          'A low-profile control housing and an integrated cup holder are set into the armrest, within reach at any recline position.',
      },
    ],
    outcome:
      'At full recline, the leg rest clears the window ledge and the side table beside it, so the chair holds this exact placement rather than needing to be repositioned each time it’s used.',
    relatedProductSlugs: ['craft-motion', 'climate-craft-signature'],
    relatedCaseStudySlugs: ['quiet-study', 'morning-room'],
  },
  {
    slug: 'fireside-nook',
    number: 2,
    category: 'Residential',
    title: 'Fireside Nook',
    summary: 'A single recliner set into a quiet corner of the room, beside a console rather than facing a screen.',
    gallery: images('fireside-nook', 1),
    overview:
      'A compact reclining seat placed in a corner alongside a wooden console table — a spot for one person to sit rather than a room’s main seating arrangement.',
    challenge:
      'Fitting a full-recline chair into a comparatively tight corner without it reading as the largest, most dominant object in the room, and without its recline motion crowding the console beside it.',
    approach:
      'A restrained silhouette sized to sit comfortably next to the console, with the control housing and cup holder kept low on the armrest for a seated reach rather than a raised one.',
    technology: [
      {
        label: 'Motorized Reclining',
        description: 'A motorized mechanism reclines the seat and extends the leg rest from a low-profile armrest control.',
      },
    ],
    outcome:
      'The control housing sits low enough on the armrest that the console surface behind the chair stays fully usable, even with the seat fully reclined.',
    relatedProductSlugs: ['craft-motion', 'climate-craft-signature'],
    relatedCaseStudySlugs: ['morning-room', 'quiet-study'],
  },
  {
    slug: 'morning-room',
    number: 3,
    category: 'Residential',
    title: 'Morning Room',
    summary: 'A single recliner set in profile against a paneled wall, catching soft morning light through the window.',
    gallery: images('morning-room', 1),
    overview:
      'A single-seat recliner shown in side profile against a formally paneled, wainscoted wall — a room where every other piece is static, and the chair had to hold the same quiet register.',
    challenge:
      'Sitting comfortably in a formally detailed room without reading as mechanical equipment dropped into it — the seat needed a silhouette restrained enough to register as furniture first.',
    approach:
      'A clean side profile with no visible mechanism until the chair is actually reclined, and an ergonomic backrest curve that reads as considered design even at rest.',
    technology: [
      {
        label: 'Motorized Reclining',
        description:
          'The reclining mechanism and control cluster stay fully contained within the base and armrest, invisible until the seat is in use.',
      },
    ],
    outcome:
      'Upright, the chair’s profile holds its line against the paneled wall the same way the room’s other furniture does — the mechanism only becomes visible once the seat reclines.',
    relatedProductSlugs: ['craft-motion', 'climate-craft-signature'],
    relatedCaseStudySlugs: ['city-view-retreat', 'the-parlour'],
  },
  {
    slug: 'quiet-study',
    number: 4,
    category: 'Workspace',
    title: 'Quiet Study',
    summary:
      'A single recliner with diamond-quilted detailing, set up as a considered break from the desk rather than the room’s main seat.',
    gallery: images('quiet-study', 3),
    overview:
      'A single-seat recliner finished with quilted stitching across the armrest and footrest and a slim metal-accented headrest strip — a chair designed to sit beside a desk without looking purely functional.',
    challenge:
      'A study needs a seat that reads as tailored and considered, not just a recliner parked in the corner — the detailing had to hold up under close, direct daylight where every seam is visible.',
    approach:
      'Quilted panelling across the armrest and footrest, and a slim headrest accent, chosen because they stay legible as design details at every recline position, not only when the chair is upright.',
    technology: [
      {
        label: 'Motorized Reclining & Leg Rest',
        description:
          'Motorized reclining and leg-rest extension, operated from the armrest control panel beside an integrated cup holder.',
      },
    ],
    outcome:
      'The quilted stitching and headrest accent read clearly whether the chair is upright at a desk-adjacent position or fully reclined — the detailing doesn’t disappear into the fabric at any stage.',
    relatedProductSlugs: ['craft-motion', 'climate-craft-signature'],
    relatedCaseStudySlugs: ['fireside-nook', 'screening-room'],
  },
  {
    slug: 'reading-corner',
    number: 5,
    category: 'Residential',
    title: 'Reading Corner',
    summary: 'Two recliners set side by side, each reclining independently, in front of framed portrait artwork.',
    gallery: images('reading-corner', 1),
    overview:
      'A pair of single-seat recliners placed close together for two people sharing the same corner of a room — not a single sofa, but two independent seats.',
    challenge:
      'Two people in the same space need to recline on their own schedule, without one person’s seat position affecting their neighbour’s — the seats had to work as a pair without being mechanically linked.',
    approach:
      'Two identical seats positioned close together, each with its own armrest control, so one can recline fully while the other stays upright beside it.',
    technology: [
      {
        label: 'Independent Reclining',
        description: 'Each seat reclines and extends its leg rest independently, from its own armrest-mounted control.',
      },
    ],
    outcome:
      'One seat is shown fully reclined while the other stays upright — that independence is the point of placing two single recliners together, rather than a shared reclining sofa.',
    relatedProductSlugs: ['craft-motion-duo', 'climate-craft-duo'],
    relatedCaseStudySlugs: ['morning-room', 'window-light-suite'],
  },
  {
    slug: 'screening-room',
    number: 6,
    category: 'Media & Entertainment',
    title: 'Screening Room',
    summary:
      'A single recliner set against a plain, warm-toned wall with almost no visual competition — built for one long, uninterrupted watch.',
    gallery: images('screening-room', 3),
    overview:
      'A single-seat recliner photographed against a deliberately plain backdrop, with dried pampas grass as the only other object in the room — a seat meant to hold attention on a screen, not on itself.',
    challenge:
      'A media seat needs to disappear into a dim room once attention is on a screen, so its design has to hold up under plain, low-distraction lighting rather than a styled setting.',
    approach:
      'Deep side bolsters lock the seated position in place, with an integrated cup holder within easy reach and a low two-button armrest control usable without looking away from the screen.',
    technology: [
      {
        label: 'Motorized Reclining & Leg Rest',
        description: 'A motorized mechanism reclines the seat and extends the leg rest, controlled from a two-button cluster on the armrest.',
      },
      {
        label: 'Integrated Cup Holder',
        description: 'A cup holder is built into the armrest at arm’s reach, positioned for a long, single sitting.',
      },
    ],
    outcome:
      'The side bolsters keep their shape at full recline, so the chair’s silhouette reads the same reclined as it does upright — nothing about its presence changes once it’s in use.',
    relatedProductSlugs: ['craft-motion', 'climate-craft-signature'],
    relatedCaseStudySlugs: ['quiet-study', 'reading-corner'],
  },
  {
    slug: 'the-parlour',
    number: 7,
    category: 'Hospitality',
    title: 'The Parlour',
    summary: 'A three-seat sofa with brass-finished cup holders, set as the centrepiece of a formal, symmetrical room.',
    gallery: images('the-parlour', 3),
    overview:
      'A three-seat reclining sofa in a formally arranged room, where the piece itself functions as the room’s centrepiece rather than one item among several.',
    challenge:
      'A formal reception-style room needed reclining comfort without giving up a tailored silhouette — and with three seats sharing one frame, one position had to keep working normally while another was reclined.',
    approach:
      'Brass-finished cup-holder inserts and a squared-off frame keep the piece reading as formal furniture even at rest, while the two outer seats recline independently and the centre seat stays fixed.',
    technology: [
      {
        label: 'Independent Reclining (Outer Seats)',
        description: 'The two outer seats recline and extend their leg rests independently of each other and of the fixed centre seat.',
      },
      {
        label: 'Central Fixed Seating',
        description: 'The centre seat carries no reclining mechanism, keeping one stable position available at all times.',
      },
    ],
    outcome:
      'With one seat shown fully reclined and the others upright, the sofa still reads as a single, symmetrical piece from across the room — the recline doesn’t break the formality of the frame.',
    relatedProductSlugs: ['craft-motion-grand', 'climate-craft-grand'],
    relatedCaseStudySlugs: ['window-light-suite', 'morning-room'],
  },
  {
    slug: 'window-light-suite',
    number: 8,
    category: 'Hospitality',
    title: 'Window Light Suite',
    summary: 'A three-seat sofa in a bright, light-filled suite, photographed with one seat reclined to show its full range of motion.',
    gallery: images('window-light-suite', 2),
    overview:
      'A three-seat reclining sofa placed in a bright suite-style room with sheer curtains — photographed with one seat reclined and the others upright, showing the range of positions available in everyday use.',
    challenge:
      'In a room this bright, every seam and cushion is visible at once, so the piece needed to hold its shape and upholstery tone under strong, direct natural light rather than a controlled studio setting.',
    approach:
      'Generous cushioning and a light upholstery tone were chosen to sit comfortably in a bright, neutral room, with the armrest control kept compact against the sheer curtains and clean walls behind it.',
    technology: [
      {
        label: 'Independent Reclining',
        description: 'Each seat reclines and extends its leg rest independently, from its own armrest control.',
      },
    ],
    outcome:
      'The reclined seat’s leg rest extends fully without reaching the window behind it, so the sofa can be used at any position in this exact placement, without rearranging the room.',
    relatedProductSlugs: ['craft-motion-grand', 'climate-craft-grand'],
    relatedCaseStudySlugs: ['the-parlour', 'reading-corner'],
  },
]

export const CASE_STUDY_CATEGORIES: string[] = Array.from(new Set(CASE_STUDIES.map((c) => c.category)))

export function getCaseStudyBySlug(slug: string | undefined): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}

export function getRelatedCaseStudies(caseStudy: CaseStudy): CaseStudy[] {
  return caseStudy.relatedCaseStudySlugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((c): c is CaseStudy => Boolean(c))
}

export function getCaseStudyRelatedProducts(caseStudy: CaseStudy): HomeProduct[] {
  return caseStudy.relatedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is HomeProduct => Boolean(p))
}

/** The product this case study is built around — first entry in relatedProductSlugs. */
export function getCaseStudyPrimaryProduct(caseStudy: CaseStudy): HomeProduct | undefined {
  return getProductBySlug(caseStudy.relatedProductSlugs[0])
}

export interface ProjectDetailField {
  label: string
  value: string
}

function findSpec(specs: string[], pattern: RegExp) {
  const match = specs.find((s) => pattern.test(s))
  return match?.includes(':') ? match.split(':')[1]?.trim() : match
}

/**
 * A clean "Project Details" panel, built only from fields verified on the
 * related product (src/data/homeProducts.ts) plus the case study's own
 * category — never a fabricated per-project statistic. Climate Control and
 * Warranty are omitted entirely for product families that don't carry them
 * (Motorised Comfort, Classic), rather than showing a false or blank value.
 */
export function getCaseStudyProjectDetails(caseStudy: CaseStudy): ProjectDetailField[] {
  const product = getCaseStudyPrimaryProduct(caseStudy)
  if (!product) return []

  const climateControl = findSpec(product.specifications, /temperature range/i)
  const warrantyYears = findSpec(product.specifications, /-year warranty/i)?.match(/^\d+/)?.[0]

  return [
    { label: 'Application', value: caseStudy.category },
    { label: 'Product', value: product.name },
    { label: 'Operation', value: product.operation },
    { label: 'Seating', value: `${product.seats} Seat${product.seats > 1 ? 's' : ''}` },
    ...(climateControl ? [{ label: 'Climate Control', value: climateControl }] : []),
    ...(warrantyYears ? [{ label: 'Warranty', value: `${warrantyYears} Years` }] : []),
  ]
}
