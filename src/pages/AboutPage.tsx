import { AboutHero } from '../components/about/AboutHero'
import { BrandPhilosophy } from '../components/about/BrandPhilosophy'
import { ScrollStory } from '../components/about/ScrollStory'
import { BrandPrinciples } from '../components/about/BrandPrinciples'
import { TechHumanSplit } from '../components/about/TechHumanSplit'
import { CraftSection } from '../components/about/CraftSection'
import { AboutCTA } from '../components/about/AboutCTA'
import { Footer } from '../components/Footer'

export function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <BrandPhilosophy />
        <ScrollStory />
        <BrandPrinciples />
        <TechHumanSplit />
        <CraftSection />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
