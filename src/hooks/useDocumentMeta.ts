import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, OG_IMAGE } from '../data/siteConfig'

interface MetaOptions {
  title: string
  description: string
  /** Override the canonical URL. Defaults to SITE_URL + current pathname. */
  canonical?: string
  /** Override the OG image. Defaults to the brand logo. */
  image?: string
  /** Override the OG type. Defaults to "website". */
  type?: string
}

/**
 * Sets document title, meta description, Open Graph tags, Twitter card tags,
 * and canonical URL for the current page. Cleans up on unmount so
 * navigating away never leaves stale metadata from the previous route.
 */
export function useDocumentMeta(title: string, description: string, options?: Partial<MetaOptions>) {
  const location = useLocation()
  const url = options?.canonical ?? `${SITE_URL}${location.pathname}`
  const image = options?.image ?? OG_IMAGE
  const type = options?.type ?? 'website'

  useEffect(() => {
    const prevTitle = document.title

    // Title
    document.title = title

    // Description
    let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    const prevDescription = descMeta?.getAttribute('content') ?? null
    if (!descMeta) {
      descMeta = document.createElement('meta')
      descMeta.setAttribute('name', 'description')
      document.head.appendChild(descMeta)
    }
    descMeta.setAttribute('content', description)

    // Open Graph
    const ogTags: Array<[string, string]> = [
      ['og:title', title],
      ['og:description', description],
      ['og:url', url],
      ['og:type', type],
      ['og:image', image],
      ['og:site_name', 'Climate Craft'],
    ]

    const prevOg: Array<[string, string | null]> = []
    for (const [property, content] of ogTags) {
      const selector = `meta[property="${property}"]`
      let el = document.querySelector(selector) as HTMLMetaElement | null
      const prev = el?.getAttribute('content') ?? null
      prevOg.push([property, prev])
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Twitter Card
    const twitterTags: Array<[string, string]> = [
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', title],
      ['twitter:description', description],
      ['twitter:image', image],
    ]

    const prevTwitter: Array<[string, string | null]> = []
    for (const [name, content] of twitterTags) {
      const selector = `meta[name="${name}"]`
      let el = document.querySelector(selector) as HTMLMetaElement | null
      const prev = el?.getAttribute('content') ?? null
      prevTwitter.push([name, prev])
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    const prevCanonical = canonical?.getAttribute('href') ?? null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    return () => {
      document.title = prevTitle
      if (prevDescription !== null) descMeta?.setAttribute('content', prevDescription)
      for (const [property, prev] of prevOg) {
        if (prev !== null) {
          document.querySelector(`meta[property="${property}"]`)?.setAttribute('content', prev)
        }
      }
      for (const [name, prev] of prevTwitter) {
        if (prev !== null) {
          document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', prev)
        }
      }
      if (prevCanonical !== null) canonical?.setAttribute('href', prevCanonical)
    }
  }, [title, description, url, image, type, location.pathname])
}
