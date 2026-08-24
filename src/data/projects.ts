// The Projects page is an editorial space-storytelling experience, not a product
// catalogue and not an image gallery. It draws on the same verified real
// photography used elsewhere in the project, curated down to a handful of
// purposeful images — never eight cards repeating a grid.
//
// No client names, locations, years or statistics appear anywhere here — none of
// that information exists for these rooms, and this project's standing rule is
// never to invent it. Everything below is a design-application description
// grounded in what's actually visible in the photograph and in that product
// family's real, verified specifications.

export interface SpaceApplication {
  id: string
  category: string
  title: string
  image: string
  intro: string
  comfort: string
  /** Present only for families with real motorised/smart capabilities — omitted for Classic. */
  engineering?: string
}

export const HERO_IMAGE = '/images/projects/quiet-study/01.png'

export const SPACE_APPLICATIONS: SpaceApplication[] = [
  {
    id: 'residential',
    category: 'Residential',
    title: 'Designed for everyday comfort',
    image: '/images/projects/morning-room/01.png',
    intro:
      'A single reclining seat positioned to catch daylight — comfort built into a corner of the room rather than announced by it.',
    comfort: 'Ergonomic support across the back, seat and leg rest, shaped around how a body actually settles in.',
    engineering: 'Smart touchscreen interface, remote and voice control, with liquid cooling & heating built in.',
  },
  {
    id: 'media-room',
    category: 'Media Room',
    title: 'Designed for long-form comfort',
    image: '/images/projects/screening-room/01.png',
    intro:
      'Set low and close to the wall, with an integrated cup holder and control within easy reach — built for one long, uninterrupted watch.',
    comfort: 'Motorized reclining lets the seating position adapt naturally over an extended session.',
    engineering: 'Motorized reclining and leg-rest adjustment, controlled from a cluster built into the armrest.',
  },
  {
    id: 'formal-lounge',
    category: 'Formal Lounge',
    title: 'Designed for timeless presence',
    image: '/images/projects/the-parlour/01.png',
    intro:
      'A three-seat silhouette in rich upholstery, set beneath an abstract canvas in a formal, symmetrical room.',
    comfort: 'Generous cushioning and a refined silhouette — comfort that doesn’t rely on movement.',
    // No engineering field: this family is static, and this page never implies a
    // capability the seated product doesn't actually have.
  },
]

export const FEATURED_SPACE = {
  title: 'City View Retreat',
  label: 'Featured Space Study',
  image: '/images/projects/city-view-retreat/01.png',
  designIntent:
    'A single deep-teal recliner set against a full-height window — comfort framed by the skyline rather than shut away from it.',
  comfortExperience:
    'Deep, plush cushioning across the seat and back, positioned so the view stays part of the experience even while reclined.',
  engineering: 'Motorized reclining and leg-rest adjustment, operated from a control built into the armrest.',
}
