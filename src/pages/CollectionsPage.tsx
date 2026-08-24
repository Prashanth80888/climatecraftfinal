import { useRef, useState } from 'react'
import { PRODUCT_FAMILIES } from '../data/homeProducts'
import { CollectionsHero } from '../components/collections/CollectionsHero'
import { CategoryNav } from '../components/collections/CategoryNav'
import { FeaturedCollection } from '../components/collections/FeaturedCollection'
import { ProductGrid } from '../components/collections/ProductGrid'
import { CollectionStory } from '../components/collections/CollectionStory'
import { EngineeringDetail } from '../components/collections/EngineeringDetail'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'

export function CollectionsPage() {
  const [active, setActive] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  const activeFamily = PRODUCT_FAMILIES[active]

  return (
    <>
      <main>
        <CollectionsHero />
        <CategoryNav active={active} onChange={setActive} />
        <FeaturedCollection
          family={activeFamily}
          onExplore={() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        />
        <ProductGrid ref={gridRef} family={activeFamily} />
        <CollectionStory />
        <EngineeringDetail />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
