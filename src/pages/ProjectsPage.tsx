import { useEffect } from 'react'
import { ProjectsHero } from '../components/projects/ProjectsHero'
import { ProjectPhilosophy } from '../components/projects/ProjectPhilosophy'
import { SpaceExplorer } from '../components/projects/SpaceExplorer'
import { CinematicStickyStory } from '../components/projects/CinematicStickyStory'
import { DesignInContext } from '../components/projects/DesignInContext'
import { ProductFamilies } from '../components/projects/ProductFamilies'
import { SpaceProcess } from '../components/projects/SpaceProcess'
import { ProjectsCTA } from '../components/projects/ProjectsCTA'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function ProjectsPage() {
  useDocumentMeta(
    'Climate Craft Projects & Spaces | Motion Furniture Applications',
    'See how Climate Craft motion furniture is applied across residential, hospitality, healthcare and commercial spaces.',
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <main>
        <ProjectsHero />
        <ProjectPhilosophy />
        <SpaceExplorer />
        <CinematicStickyStory />
        <DesignInContext />
        <ProductFamilies />
        <SpaceProcess />
        <ProjectsCTA />
      </main>
      <Footer />
    </>
  )
}
