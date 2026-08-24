import { ProjectsHero } from '../components/projects/ProjectsHero'
import { ProjectPhilosophy } from '../components/projects/ProjectPhilosophy'
import { SpaceApplications } from '../components/projects/SpaceApplications'
import { EngineeredExperience } from '../components/projects/EngineeredExperience'
import { FeaturedSpaceStudy } from '../components/projects/FeaturedSpaceStudy'
import { ProjectsCTA } from '../components/projects/ProjectsCTA'
import { Footer } from '../components/Footer'

export function ProjectsPage() {
  return (
    <>
      <main>
        <ProjectsHero />
        <ProjectPhilosophy />
        <SpaceApplications />
        <EngineeredExperience />
        <FeaturedSpaceStudy />
        <ProjectsCTA />
      </main>
      <Footer />
    </>
  )
}
