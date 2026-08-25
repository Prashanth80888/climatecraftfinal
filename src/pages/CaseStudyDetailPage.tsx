import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  getCaseStudyBySlug,
  getCaseStudyRelatedProducts,
  getRelatedCaseStudies,
} from '../data/caseStudies'
import { CaseStudyDetailHero } from '../components/case-studies/detail/CaseStudyDetailHero'
import { CaseStudyOverview } from '../components/case-studies/detail/CaseStudyOverview'
import { CaseStudyChallengeApproach } from '../components/case-studies/detail/CaseStudyChallengeApproach'
import { CaseStudyTechnology } from '../components/case-studies/detail/CaseStudyTechnology'
import { CaseStudySpecs } from '../components/case-studies/detail/CaseStudySpecs'
import { CaseStudyOutcome } from '../components/case-studies/detail/CaseStudyOutcome'
import { CaseStudyRelatedStudies } from '../components/case-studies/detail/CaseStudyRelatedStudies'
import { RelatedProducts } from '../components/product/RelatedProducts'
import { CaseStudyCTA } from '../components/case-studies/CaseStudyCTA'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { ComingSoon } from './ComingSoon'

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = getCaseStudyBySlug(slug)

  // Every case study gets a clean arrival, same convention as ProductDetailPage.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  useDocumentMeta(
    caseStudy ? `${caseStudy.title} — Case Study — Climate Craft` : 'Case Study — Climate Craft',
    caseStudy?.summary ?? 'A Climate Craft case study.',
  )

  if (!caseStudy) {
    return <ComingSoon title="Case Study" />
  }

  const relatedProducts = getCaseStudyRelatedProducts(caseStudy)
  const relatedCaseStudies = getRelatedCaseStudies(caseStudy)

  return (
    <>
      <main>
        <CaseStudyDetailHero caseStudy={caseStudy} />
        <CaseStudyOverview caseStudy={caseStudy} />
        <CaseStudyChallengeApproach caseStudy={caseStudy} />
        <CaseStudyTechnology caseStudy={caseStudy} />
        <CaseStudySpecs caseStudy={caseStudy} />
        <CaseStudyOutcome caseStudy={caseStudy} />
        <RelatedProducts products={relatedProducts} />
        <CaseStudyRelatedStudies caseStudies={relatedCaseStudies} />
        <CaseStudyCTA />
      </main>
      <Footer />
    </>
  )
}
