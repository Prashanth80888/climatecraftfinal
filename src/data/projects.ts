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

export interface SpaceExplorerEntry {
  id: string
  category: string
  title: string
  image: string
  imageCount: number
  description: string
  application: string
  designIntent: string
  features: string[]
}

export interface StoryChapter {
  id: string
  label: string
  title: string
  image: string
  copy: string
}

export interface ProcessStep {
  number: string
  title: string
  copy: string
}

export const SPACE_EXPLORER: SpaceExplorerEntry[] = [
  {
    id: 'quiet-study',
    category: 'Private Study',
    title: 'A chair that disappears into focus',
    image: '/images/projects/quiet-study/01.png',
    imageCount: 3,
    description:
      'Positioned at a writing desk beneath warm light — comfort engineered for the hours when concentration matters most, without drawing attention from the room.',
    application: 'Private living and focused-work space',
    designIntent:
      'Furniture that supports long focus sessions through ergonomic posture and personal climate control, while maintaining the visual stillness a study demands.',
    features: [
      'Patented liquid cooling & heating',
      'Ergonomic back, seat and leg support',
      'Whisper-quiet motorised reclining',
      'Smart touchscreen interface',
    ],
  },
  {
    id: 'morning-room',
    category: 'Residential',
    title: 'Daylight, comfort, and stillness',
    image: '/images/projects/morning-room/01.png',
    imageCount: 1,
    description:
      'A single reclining seat positioned to catch daylight — comfort built into a corner of the room rather than announced by it.',
    application: 'Residential living and relaxation',
    designIntent:
      'A seat that belongs in the architecture — positioned to work with natural light and room proportions rather than dominating them.',
    features: [
      'Smart touchscreen, remote and voice control',
      'Liquid cooling & heating (15°C–35°C)',
      'Ergonomic support across back, seat and leg rest',
      'Premium 460 GSM upholstery',
    ],
  },
  {
    id: 'screening-room',
    category: 'Media Room',
    title: 'One long, uninterrupted experience',
    image: '/images/projects/screening-room/01.png',
    imageCount: 3,
    description:
      'Set low and close to the wall, with an integrated cup holder and control within easy reach — built for extended viewing without leaving the seat.',
    application: 'Home cinema and screening environments',
    designIntent:
      'A seat that disappears into the viewing experience — motorised reclining adapts the position naturally over extended sessions without interrupting what is on screen.',
    features: [
      'Motorised reclining and leg-rest adjustment',
      'Built-in armrest control cluster',
      'Integrated cup holder',
      'Low-profile silhouette for sightline clarity',
    ],
  },
  {
    id: 'the-parlour',
    category: 'Formal Lounge',
    title: 'Timeless presence, quiet comfort',
    image: '/images/projects/the-parlour/01.png',
    imageCount: 3,
    description:
      'A three-seat silhouette in rich upholstery, set beneath an abstract canvas in a formal, symmetrical room — comfort that speaks through form, not motion.',
    application: 'Formal sitting rooms and reception areas',
    designIntent:
      'A static three-seat piece that holds its own against architecture and art — comfort through generous cushioning and refined proportions rather than mechanical adjustment.',
    features: [
      'Premium upholstery with rich finish',
      'Generous cushioning across three positions',
      'Refined contemporary silhouette',
      'Static seating — no mechanical technology',
    ],
  },
  {
    id: 'city-view-retreat',
    category: 'Residential Retreat',
    title: 'Comfort framed by the skyline',
    image: '/images/projects/city-view-retreat/01.png',
    imageCount: 3,
    description:
      'A single deep-teal recliner set against a full-height window — comfort positioned so the view stays part of the experience even while reclined.',
    application: 'Residential high-rise and retreat spaces',
    designIntent:
      'Deep, plush cushioning across the seat and back, positioned so the environment remains part of the experience even when the seat is fully reclined.',
    features: [
      'Motorised reclining and leg-rest adjustment',
      'Armrest-integrated control',
      'Deep plush cushioning',
      'Full-height window position',
    ],
  },
  {
    id: 'fireside-nook',
    category: 'Fireside',
    title: 'Warmth as context, not just temperature',
    image: '/images/projects/fireside-nook/01.png',
    imageCount: 1,
    description:
      'A seat positioned beside a fireplace where ambient warmth meets personal climate control — two temperature experiences working together.',
    application: 'Fireside and hearthside living spaces',
    designIntent:
      'Where a fireplace provides ambient warmth, personal cooling and heating technology lets the occupant fine-tune their own comfort independently of the room temperature.',
    features: [
      'Liquid cooling & heating technology',
      'Personal temperature control (15°C–35°C)',
      'Ergonomic seated posture support',
      'Premium upholstery',
    ],
  },
  {
    id: 'window-light-suite',
    category: 'Window Suite',
    title: 'Designed around natural light',
    image: '/images/projects/window-light-suite/01.png',
    imageCount: 2,
    description:
      'A recliner positioned within a window alcove — the furniture adapts to the light and the room, not the other way around.',
    application: 'Window-facing living and suite environments',
    designIntent:
      'A seat placed in a window-facing position where natural light changes throughout the day, supported by material and cushioning choices that respond to prolonged sunlight exposure.',
    features: [
      'Motorised reclining',
      'Premium fade-resistant upholstery',
      'Ergonomic cushioning',
      'Integrated cup holder',
    ],
  },
]

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'design',
    label: 'Design',
    title: 'Form follows the interior',
    image: '/images/projects/the-parlour/01.png',
    copy: 'Silhouette, proportion and material are chosen to belong in the room — never to overpower it. The furniture earns its place through restraint, matching the visual language of the space around it.',
  },
  {
    id: 'comfort',
    label: 'Comfort',
    title: 'Engineered for real bodies',
    image: '/images/projects/city-view-retreat/01.png',
    copy: 'Seat depth, back angle, leg-rest travel and cushion density are tuned to how people actually rest — not to a catalogue specification. Every angle is chosen for the posture the body naturally adopts.',
  },
  {
    id: 'movement',
    label: 'Movement',
    title: 'Motion that stays invisible',
    image: '/images/projects/screening-room/02.png',
    copy: 'Motorised reclining and leg-rest adjustment are built into the frame and controlled from the armrest — technology that serves the experience without becoming part of the visual language.',
  },
  {
    id: 'technology',
    label: 'Technology',
    title: 'Climate control as comfort, not feature',
    image: '/images/projects/quiet-study/02.png',
    copy: 'Patented liquid cooling and heating technology runs through the backrest at 15°C–35°C, controlled from a discreet smart interface. Personal temperature becomes part of the seating experience, not a separate system.',
  },
]

export const SPACE_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    copy: 'The space, its users and the intended experience — proportions, light, traffic flow and the posture the room asks of the people inside it.',
  },
  {
    number: '02',
    title: 'Configure',
    copy: 'Select the appropriate product family, movement type and comfort configuration — climate smart, motorised comfort or classic — matched to the environment.',
  },
  {
    number: '03',
    title: 'Integrate',
    copy: 'Ensure the furniture works naturally with the interior — upholstery, proportion and positioning chosen to make the piece feel like it was always part of the room.',
  },
  {
    number: '04',
    title: 'Experience',
    copy: 'A finished environment where comfort, motion and technology feel effortless — the furniture disappears into the experience it was designed to deliver.',
  },
]

export const DESIGN_CONTEXT = {
  title: 'Technology should disappear into the experience.',
  description:
    'Motorised movement, climate control and intuitive interaction should feel naturally integrated rather than appearing as separate technology components. Every Climate Craft piece is designed so the technology is present only in the experience — never in the sightline.',
  image: '/images/projects/quiet-study/02.png',
}

export const FEATURED_SPACE = {
  title: 'City View Retreat',
  label: 'Featured Space Study',
  image: '/images/projects/city-view-retreat/01.png',
  category: 'Residential Retreat',
  designIntent:
    'A single deep-teal recliner set against a full-height window — comfort framed by the skyline rather than shut away from it.',
  comfortExperience:
    'Deep, plush cushioning across the seat and back, positioned so the view stays part of the experience even while reclined.',
  engineering: 'Motorized reclining and leg-rest adjustment, operated from a control built into the armrest.',
}
