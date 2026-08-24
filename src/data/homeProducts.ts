// The 9 real Climate Craft products shown on the HOME PAGE Collections section.
// This is intentionally separate from data/products.json, which still powers the
// standalone /collections page (out of scope for this update) — the two pages
// are allowed to use different datasets until /collections is migrated later.
//
// Product photography lives at /images/products/{slug}/01.png, 02.png, etc.
// `imageCount` is the number of verified real angle photographs available for
// that product (0 = none confirmed yet — the card/page shows an honest
// "photography pending" state instead of a wrong or placeholder image).
export interface HomeProduct {
  id: string
  slug: string
  number: number
  familyId: 'climate-smart' | 'motorised-comfort' | 'classic'
  name: string
  category: string
  operation: string
  seats: 1 | 2 | 3
  /** First sentence of the full description — used on the compact Home card. */
  teaser: string
  /** Full editorial description — used on the Product Detail page. */
  description: string
  /** 3–4 curated highlights shown on the Home card. */
  highlights: string[]
  /** Complete spec list — shown on the Product Detail page. */
  specifications: string[]
  /** Number of verified real angle photos at /images/products/{slug}/0N.png. */
  imageCount: number
  /** Interactive part callouts for the DETAILS explorer — copy is always sourced from `specifications`. */
  hotspots: ProductHotspot[]
}

export interface ProductHotspot {
  id: string
  /** Position as a percentage of the image, 0–100. */
  x: number
  y: number
  title: string
  description: string
  /** 0-indexed angle to switch the viewer to when this hotspot is opened, if a better view exists. */
  imageIndex?: number
}

export interface ProductFamily {
  id: HomeProduct['familyId']
  number: number
  label: string
  blurb: string
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    id: 'climate-smart',
    number: 1,
    label: 'Climate Smart',
    blurb: 'Intelligent temperature control, smart technology and motorized comfort.',
  },
  {
    id: 'motorised-comfort',
    number: 2,
    label: 'Motorised Comfort',
    blurb: 'Motorized reclining comfort, without the climate technology.',
  },
  {
    id: 'classic',
    number: 3,
    label: 'Classic',
    blurb: 'Premium static seating — no mechanical or climate technology.',
  },
]

export const HOME_PRODUCTS: HomeProduct[] = [
  {
    id: 'signature',
    slug: 'climate-craft-signature',
    number: 1,
    familyId: 'climate-smart',
    name: 'Climate Craft | Signature',
    category: 'Smart Recliner · Single Seater',
    operation: 'SMART & Motorized',
    seats: 1,
    teaser: 'A refined single-seater smart recliner engineered for personalized comfort.',
    description:
      'A refined single-seater smart recliner engineered for personalized comfort. Signature combines premium upholstery, motorized reclining and Climate Craft’s intelligent liquid cooling and heating technology, with seamless control through the smart interface, remote and voice commands.',
    highlights: ['1 Seat', 'Smart & Motorized', '15°C–35°C Cooling & Heating', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 1',
      'Motorized reclining and leg-rest adjustment',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Integrated cup holder',
      'Premium 460 GSM upholstery',
      'Ergonomic back, seat and leg support',
      '2-year warranty',
    ],
    imageCount: 1,
    hotspots: [
      {
        id: 'control',
        x: 67,
        y: 47,
        title: 'Smart Interface Control',
        description: 'A discreet touch control panel built into the armrest — full smart touchscreen, remote and voice control over recline and temperature.',
      },
      {
        id: 'backrest',
        x: 36,
        y: 26,
        title: 'Liquid Cooling & Heating',
        description: 'Patented liquid cooling and heating technology runs through the backrest, holding a temperature range of 15°C–35°C.',
      },
      {
        id: 'seat',
        x: 55,
        y: 68,
        title: 'Motorized Reclining & Leg Rest',
        description: 'Motorized reclining and leg-rest adjustment, finished in premium 460 GSM upholstery for ergonomic back, seat and leg support.',
      },
    ],
  },
  {
    id: 'duo',
    slug: 'climate-craft-duo',
    number: 2,
    familyId: 'climate-smart',
    name: 'Climate Craft | Duo',
    category: 'Smart Recliner · Two Seater',
    operation: 'SMART & Motorized',
    seats: 2,
    teaser: 'A sophisticated two-seater designed to bring personalized smart comfort to shared spaces.',
    description:
      'A sophisticated two-seater designed to bring personalized smart comfort to shared spaces. Each reclining position combines premium seating with intelligent temperature control, motorized adjustment and multiple control options for a more refined everyday experience.',
    highlights: ['2 Seats', 'Smart & Motorized', 'Individual Reclining', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 2',
      'Motorized reclining',
      'Motorized leg-rest adjustment',
      'Individual reclining comfort',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Premium 460 GSM upholstery',
      'Ergonomic cushioning and lumbar/back support',
      'Integrated cup holders',
      '2-year warranty',
    ],
    imageCount: 1,
    hotspots: [
      {
        id: 'console',
        x: 49,
        y: 44,
        title: 'Individual Reclining Console',
        description: 'Each seat reclines independently, controlled from the shared centre console for individual reclining comfort.',
      },
      {
        id: 'headrests',
        x: 45,
        y: 27,
        title: 'Dual Smart Headrests',
        description: 'Ergonomic cushioning and lumbar support behind Climate Craft’s liquid cooling & heating technology, tuned across 15°C–35°C.',
      },
      {
        id: 'mechanism',
        x: 79,
        y: 73,
        title: 'Motorized Reclining & Leg Rest',
        description: 'Motorized reclining and motorized leg-rest adjustment, controlled by smart interface, remote or voice command.',
      },
    ],
  },
  {
    id: 'grand',
    slug: 'climate-craft-grand',
    number: 3,
    familyId: 'climate-smart',
    name: 'Climate Craft | Grand',
    category: 'Smart Sofa · Three Seater',
    operation: 'Motorized · SMART & Dual Reclining',
    seats: 3,
    teaser: 'A statement three-seater that brings the Climate Craft experience into a larger living space.',
    description:
      'A statement three-seater that brings the Climate Craft experience into a larger living space. With two motorized reclining seats and a comfortable central seat, Grand combines spacious premium seating with intelligent cooling, heating and smart controls.',
    highlights: ['3 Seats', 'Dual Motorized Reclining', '15°C–35°C Cooling & Heating', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 3',
      '2 motorized reclining seats',
      'Central fixed seating position',
      'Motorized leg-rest adjustment',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Premium 460 GSM upholstery',
      'Ergonomic cushioning and support',
      'Integrated cup holders',
      '2-year warranty',
    ],
    imageCount: 2,
    hotspots: [
      {
        id: 'control',
        x: 19,
        y: 44,
        title: 'Smart Touch Control',
        description: 'Smart touchscreen interface control on the armrest, with remote and voice control as well — this is where the 2 motorized reclining seats are commanded.',
      },
      {
        id: 'center',
        x: 50,
        y: 56,
        title: 'Central Fixed Seating',
        description: 'A comfortable central fixed seating position sits between the two motorized reclining seats, in premium 460 GSM upholstery.',
      },
      {
        id: 'headrests',
        x: 50,
        y: 30,
        title: 'Three-Across Ergonomic Cushioning',
        description: 'Ergonomic cushioning and support across all three seats, paired with liquid cooling & heating technology (15°C–35°C).',
      },
    ],
  },
  {
    id: 'motion',
    slug: 'craft-motion',
    number: 4,
    familyId: 'motorised-comfort',
    name: 'Craft Motion',
    category: 'Motorized Recliner · 1 Seater',
    operation: 'Motorized',
    seats: 1,
    teaser: 'A premium single-seater designed for effortless relaxation.',
    description:
      'A premium single-seater designed for effortless relaxation. Craft Motion combines plush cushioning and smooth motorized reclining, giving you a comfortable way to sit back, stretch out and unwind.',
    highlights: ['1 Seat', 'Motorized Reclining', 'Integrated Cup Holder'],
    specifications: [
      '1 seating position',
      'Motorized reclining',
      'Motorized leg rest',
      'Premium upholstery',
      'Plush cushioning',
      'Ergonomic seating',
      'Integrated cup holder',
      'No climate-control technology',
    ],
    imageCount: 4,
    hotspots: [
      {
        id: 'control',
        x: 26,
        y: 66,
        title: 'Motorized Recline Control',
        description: 'Motorized reclining and motorized leg rest, operated from the built-in control cluster on the left armrest.',
      },
      {
        id: 'cupholder',
        x: 85,
        y: 60,
        title: 'Integrated Cup Holder',
        description: 'A built-in cup holder set into the right armrest, finished in the same plush, premium upholstery as the rest of the chair.',
      },
      {
        id: 'headrest',
        x: 48,
        y: 28,
        title: 'Plush Ergonomic Cushioning',
        description: 'Deep, plush cushioning across the backrest and headrest for ergonomic seating — no climate-control technology, just comfort.',
      },
    ],
  },
  {
    id: 'motion-duo',
    slug: 'craft-motion-duo',
    number: 5,
    familyId: 'motorised-comfort',
    name: 'Craft Motion Duo',
    category: 'Motorized Reclining Sofa · 2 Seater',
    operation: 'Motorized',
    seats: 2,
    teaser: 'A refined two-seater that brings effortless motorized relaxation into a shared living space.',
    description:
      'A refined two-seater that brings effortless motorized relaxation into a shared living space. Designed with generous cushioning and smooth reclining, Motion Duo delivers everyday comfort with a clean, premium presence.',
    highlights: ['2 Seats', 'Motorized Reclining', 'Plush Cushioning'],
    specifications: [
      '2 seating positions',
      'Motorized reclining',
      'Motorized leg rests',
      'Premium upholstery',
      'Plush cushioning',
      'Ergonomic seating',
      'Integrated cup holders',
      'No climate-control technology',
    ],
    imageCount: 2,
    hotspots: [
      {
        id: 'cupholders',
        x: 39,
        y: 46,
        title: 'Integrated Cup Holders',
        description: 'A pair of cup holders set into the shared centre console between the two reclining seats.',
      },
      {
        id: 'control',
        x: 93,
        y: 57,
        title: 'Motorized Recline Control',
        description: 'Motorized reclining and motorized leg rests, each seat commanded independently from its own armrest control.',
      },
      {
        id: 'headrests',
        x: 45,
        y: 28,
        title: 'Plush Dual Headrests',
        description: 'Generous, plush cushioning across both headrests for ergonomic seating in premium upholstery.',
      },
    ],
  },
  {
    id: 'motion-grand',
    slug: 'craft-motion-grand',
    number: 6,
    familyId: 'motorised-comfort',
    name: 'Craft Motion Grand',
    category: 'Motorized Reclining Sofa · 3 Seater',
    operation: 'Motorized · Dual Reclining',
    seats: 3,
    teaser: 'A spacious three-seater designed for elevated everyday relaxation.',
    description:
      'A spacious three-seater designed for elevated everyday relaxation. Craft Motion Grand combines a refined sofa silhouette with two motorized reclining positions, giving the living room both generous seating and effortless personal comfort.',
    highlights: ['3 Seats', 'Dual Reclining Seats', 'Central Fixed Seat'],
    specifications: [
      '3 seating positions',
      '2 motorized reclining seats',
      'Motorized leg rests',
      'Central fixed seat',
      'Premium upholstery',
      'Plush cushioning',
      'Ergonomic seating',
      'Integrated cup holders',
      'No climate-control technology',
    ],
    imageCount: 2,
    hotspots: [
      {
        id: 'control',
        x: 22,
        y: 60,
        title: 'Motorized Recline Control',
        description: 'The built-in control for the 2 motorized reclining seats, mounted on the armrest for easy reach.',
      },
      {
        id: 'legrest',
        x: 38,
        y: 78,
        title: 'Motorized Leg Rest',
        description: 'A motorized leg rest extends smoothly with each reclining seat, shown here at full extension.',
      },
      {
        id: 'center',
        x: 58,
        y: 45,
        title: 'Central Fixed Seat',
        description: 'A central fixed seat sits between the two reclining positions, in the same premium upholstery and plush cushioning.',
      },
    ],
  },
  {
    id: 'classic',
    slug: 'craft-classic',
    number: 7,
    familyId: 'classic',
    name: 'Craft Classic',
    category: 'Premium Sofa · 1 Seater',
    operation: 'Static',
    seats: 1,
    teaser: 'A refined single-seater designed for timeless everyday comfort.',
    description:
      'A refined single-seater designed for timeless everyday comfort. Craft Classic combines premium upholstery, generous cushioning and a clean contemporary silhouette without reclining or climate-control technology.',
    highlights: ['1 Seat', 'Static Seating', 'Premium Upholstery'],
    specifications: [
      'Seating capacity: 1',
      'Static seating',
      'Premium upholstery',
      'Generous cushioning',
      'Ergonomic seating design',
      'Contemporary silhouette',
      'No reclining mechanism',
      'No climate-control technology',
    ],
    imageCount: 7,
    hotspots: [
      {
        id: 'quilting',
        x: 30,
        y: 36,
        title: 'Premium Upholstery',
        description: 'Diamond-quilted premium upholstery across the headrest and armrest — static seating, with no reclining or climate-control mechanism.',
        imageIndex: 5,
      },
      {
        id: 'seat',
        x: 55,
        y: 58,
        title: 'Generous Cushioning',
        description: 'Generous, ergonomic cushioning built for timeless everyday comfort in a single-seater silhouette.',
      },
      {
        id: 'silhouette',
        x: 78,
        y: 72,
        title: 'Contemporary Silhouette',
        description: 'A clean, contemporary silhouette designed for lasting comfort rather than mechanical adjustment.',
      },
    ],
  },
  {
    id: 'classic-duo',
    slug: 'craft-classic-duo',
    number: 8,
    familyId: 'classic',
    name: 'Craft Classic Duo',
    category: 'Premium Sofa · 2 Seater',
    operation: 'Static',
    seats: 2,
    teaser: 'A sophisticated two-seater created for relaxed, everyday living.',
    description:
      'A sophisticated two-seater created for relaxed, everyday living. Classic Duo pairs generous cushioning and premium upholstery with a balanced silhouette that complements modern interiors without mechanical features.',
    highlights: ['2 Seats', 'Static Seating', 'Generous Cushioning'],
    specifications: [
      'Seating capacity: 2',
      'Static seating',
      'Premium upholstery',
      'Generous cushioning',
      'Ergonomic seating design',
      'Refined contemporary silhouette',
      'No reclining mechanism',
      'No climate-control technology',
    ],
    imageCount: 3,
    hotspots: [
      {
        id: 'upholstery',
        x: 30,
        y: 32,
        title: 'Premium Upholstery',
        description: 'Rich, premium upholstery across the headrest and backrest — static seating, built with no reclining or climate-control mechanism.',
      },
      {
        id: 'seat',
        x: 50,
        y: 62,
        title: 'Ergonomic Cushioning',
        description: 'Generous cushioning with an ergonomic seating design, made for relaxed, everyday living.',
      },
      {
        id: 'silhouette',
        x: 78,
        y: 74,
        title: 'Refined Contemporary Silhouette',
        description: 'A balanced, refined silhouette that complements modern interiors without mechanical features.',
      },
    ],
  },
  {
    id: 'classic-grand',
    slug: 'craft-classic-grand',
    number: 9,
    familyId: 'classic',
    name: 'Craft Classic Grand',
    category: 'Premium Sofa · 3 Seater',
    operation: 'Static',
    seats: 3,
    teaser: 'A spacious three-seater that brings understated elegance and lasting comfort to the living room.',
    description:
      'A spacious three-seater that brings understated elegance and lasting comfort to the living room. Classic Grand is designed around generous seating, premium materials and timeless proportions, keeping the experience beautifully simple.',
    highlights: ['3 Seats', 'Static Seating', 'Spacious 3-Seat Configuration'],
    specifications: [
      'Seating capacity: 3',
      'Static seating',
      'Premium upholstery',
      'Generous cushioning',
      'Ergonomic seating design',
      'Spacious three-seat configuration',
      'Refined contemporary silhouette',
      'No reclining mechanism',
      'No climate-control technology',
    ],
    imageCount: 6,
    hotspots: [
      {
        id: 'upholstery',
        x: 35,
        y: 32,
        title: 'Premium Upholstery',
        description: 'Rich velvet-finish premium upholstery across the backrest — static seating, with no reclining or climate-control mechanism.',
        imageIndex: 3,
      },
      {
        id: 'configuration',
        x: 55,
        y: 56,
        title: 'Spacious Three-Seat Configuration',
        description: 'A spacious three-seat configuration with generous cushioning and an ergonomic seating design throughout.',
      },
      {
        id: 'silhouette',
        x: 80,
        y: 82,
        title: 'Refined Contemporary Silhouette',
        description: 'Timeless proportions and a refined contemporary silhouette, built to keep the living room experience beautifully simple.',
      },
    ],
  },
]

// Each family cross-references one "hub" family for its 3rd related product,
// alongside its two same-family siblings — Motorised Comfort sits in the
// middle of the range, so both other families point to it; it in turn points
// back to Climate Smart, the flagship line.
const RELATED_CROSS_FAMILY: Record<HomeProduct['familyId'], HomeProduct['familyId']> = {
  'climate-smart': 'motorised-comfort',
  'motorised-comfort': 'climate-smart',
  classic: 'motorised-comfort',
}

export function getProductBySlug(slug: string | undefined): HomeProduct | undefined {
  return HOME_PRODUCTS.find((p) => p.slug === slug)
}

/** Same-family siblings first, then the same-position product from the cross-referenced family. */
export function getRelatedProducts(product: HomeProduct): HomeProduct[] {
  const siblings = HOME_PRODUCTS.filter((p) => p.familyId === product.familyId && p.id !== product.id)

  const familyMembers = HOME_PRODUCTS.filter((p) => p.familyId === product.familyId)
  const positionInFamily = familyMembers.findIndex((p) => p.id === product.id)

  const crossFamily = RELATED_CROSS_FAMILY[product.familyId]
  const crossMembers = HOME_PRODUCTS.filter((p) => p.familyId === crossFamily)
  const crossProduct = crossMembers[positionInFamily]

  return [...siblings, crossProduct].filter(Boolean)
}
