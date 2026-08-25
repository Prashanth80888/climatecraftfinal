import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AboutHero } from '../components/about/AboutHero'
import { BrandStatement } from '../components/about/BrandStatement'
import { AboutStats } from '../components/about/AboutStats'
import { OriginSection } from '../components/about/OriginSection'
import { FabricArchive } from '../components/about/FabricArchive'
import { VisionMission } from '../components/about/VisionMission'
import { BrandPrinciples } from '../components/about/BrandPrinciples'
import { AboutProcess } from '../components/about/AboutProcess'
import { RecentWork } from '../components/about/RecentWork'
import { PartnerQuote } from '../components/about/PartnerQuote'
import { AboutFAQ } from '../components/about/AboutFAQ'
import { AboutCTA } from '../components/about/AboutCTA'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function AboutPage() {
  const location = useLocation()

  useDocumentMeta(
    'About Climate Craft | Comfort Engineered With Intention',
    'Since 2009, Climate Craft has been engineering premium motion furniture in Europe — combining patented climate technology with handcrafted comfort.',
  )

  useEffect(() => {
    if (!location.hash) return
    const id = requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(id)
  }, [location.hash])
  return (
    <>
      <main>
        <AboutHero />
        <BrandStatement />
        <AboutStats />
        <OriginSection />
        <FabricArchive />
        <VisionMission />
        <BrandPrinciples />
        <AboutProcess />
        <RecentWork />
        <PartnerQuote />
        <AboutFAQ />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
