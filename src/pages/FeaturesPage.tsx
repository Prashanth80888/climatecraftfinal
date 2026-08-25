import { FeaturesHero } from '../components/features/FeaturesHero'
import { FeatureExplorer } from '../components/features/FeatureExplorer'
import { HowItWorks } from '../components/features/HowItWorks'
import { ClimateTechnology } from '../components/features/ClimateTechnology'
import { MotionExperience } from '../components/features/MotionExperience'
import { Craftsmanship } from '../components/features/Craftsmanship'
import { EngineeredComfort } from '../components/features/EngineeredComfort'
import { SpecificationStrips } from '../components/features/SpecificationStrips'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function FeaturesPage() {
  useDocumentMeta(
    'Smart Comfort & Climate Technology | Climate Craft',
    'Discover the engineering behind Climate Craft — patented liquid cooling and heating, motorized precision reclining, smart control and premium handcrafted comfort.',
  )
  return (
    <>
      <main>
        <FeaturesHero />
        <FeatureExplorer />
        <HowItWorks />
        <ClimateTechnology />
        <MotionExperience />
        <Craftsmanship />
        <EngineeredComfort />
        <SpecificationStrips />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
