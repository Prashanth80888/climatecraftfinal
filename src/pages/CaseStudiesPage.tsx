import { CaseStudiesHero } from '../components/case-studies/CaseStudiesHero'
import { CaseStudyCollection } from '../components/case-studies/CaseStudyCollection'
import { CaseStudyExplorer } from '../components/case-studies/CaseStudyExplorer'
import { CaseStudyCTA } from '../components/case-studies/CaseStudyCTA'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function CaseStudiesPage() {
  useDocumentMeta(
    'Case Studies — Climate Craft',
    'Eight real interiors exploring how Climate Craft seating, motion and comfort are applied to residential, workspace, media and hospitality rooms.',
  )

  return (
    <>
      <main>
        <CaseStudiesHero />
        <CaseStudyCollection />
        <CaseStudyExplorer />
        <CaseStudyCTA />
      </main>
      <Footer />
    </>
  )
}
