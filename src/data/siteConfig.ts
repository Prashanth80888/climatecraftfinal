// Single source of truth for verified Climate Craft business, legal and social
// information. Every consumer (Footer, Contact page, legal pages) reads from
// here so a fact never needs correcting in five different files again.
//
// Every value below is either supplied directly by the business or already
// verified elsewhere in the app (phone/email/WhatsApp, reused from
// src/lib/assets.ts). Nothing here is invented — see the comments on
// `socialLinks` for the one category that is intentionally a placeholder.

export const business = {
  legalName: 'CLIMATE CRAFT',
  tradeName: 'CLIMATE CRAFT',
  additionalTradeNames: 'None provided.',
  /** Constitution of business, as registered. */
  constitution: 'Partnership',
}

/** Principal place of business, exactly as supplied by the business. */
export const registeredAddress = {
  floorNo: 'No 10 Ground Floor, Shop No 2',
  buildingFlatNo: 'Karthik Nagar',
  premisesName: 'Dr. APJ Abdul Kalam Enclave',
  roadStreet: 'Bangalore East, Marathahalli',
  localitySubLocality: 'Outer Ring Road, Shivajinagar',
  city: 'Bengaluru',
  district: 'Bengaluru Urban',
  state: 'Karnataka',
  pin: '560037',
}

/** The registered address, line-wrapped for readable display. */
export const addressLines = [
  `${registeredAddress.floorNo}, ${registeredAddress.buildingFlatNo}`,
  registeredAddress.premisesName,
  `${registeredAddress.roadStreet}, ${registeredAddress.localitySubLocality}`,
  `${registeredAddress.city}, ${registeredAddress.district}, ${registeredAddress.state} ${registeredAddress.pin}`,
]

export const addressSingleLine = addressLines.join(', ')

/**
 * No real profile URLs have been supplied for these platforms yet. Rather
 * than invent account handles, these stay as neutral, non-fabricated
 * placeholders (the same convention the previous Instagram link already
 * used) — centralized here so a real URL can be dropped in once in one
 * place, without touching the Footer or any other component.
 *
 * When the client provides real profile URLs, update only these values.
 * The Footer and any other consumer should import from here.
 */
export const socialLinks = {
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
}

/** Central constant for legal-page "Last updated" metadata — change once here. */
export const LAST_UPDATED = '25 August 2026'

/** Production site URL — used for canonical tags, Open Graph, sitemap, etc. */
export const SITE_URL = 'https://climatecraft.co'

/** Default brand image used for Open Graph / Twitter cards when no page-specific image exists. */
export const OG_IMAGE = '/images/brand/logo.png'
