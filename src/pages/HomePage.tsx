import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Mechanics } from '../components/Mechanics'
import { Collections } from '../components/Collections'
import { WhyClimateCraft } from '../components/WhyClimateCraft'
import { Statistics } from '../components/Statistics'
import { Testimonials } from '../components/Testimonials'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function HomePage() {
  const location = useLocation()

  useDocumentMeta(
    'Premium Temperature-Controlled Recliners & Smart Comfort | Climate Craft',
    'Climate Craft engineers precision motion furniture with patented liquid cooling and heating technology. Handcrafted in Europe for the world\'s most discerning spaces.',
  )

  // Supports deep links like "/#final-cta" (e.g. Request Quote navigating in from
  // a future placeholder page) by scrolling to the target section once the Home
  // page itself has mounted and laid out.
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
        <Hero />
        <Mechanics />
        <Collections />
        <WhyClimateCraft />
        <Statistics />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
