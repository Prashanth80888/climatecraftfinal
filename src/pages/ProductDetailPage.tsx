import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, HOME_PRODUCTS, PRODUCT_FAMILIES } from '../data/homeProducts'
import { homeProductImages, whatsappHref } from '../lib/assets'
import { ProductViewer } from '../components/product/ProductViewer'
import { HotspotExplorer } from '../components/product/HotspotExplorer'
import { ViewerModeSwitcher, type ViewerMode } from '../components/product/ViewerModeSwitcher'
import { ProductFeatures } from '../components/product/ProductFeatures'
import { ProductTechnology } from '../components/product/ProductTechnology'
import { ProductSpecifications } from '../components/product/ProductSpecifications'
import { ProductCraftsmanship } from '../components/product/ProductCraftsmanship'
import { RelatedProducts } from '../components/product/RelatedProducts'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Reveal } from '../components/ui/Reveal'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { ComingSoon } from './ComingSoon'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = getProductBySlug(slug)
  const [mode, setMode] = useState<ViewerMode>('3d')

  useDocumentMeta(
    product ? `${product.name} | Climate Craft` : 'Product — Climate Craft',
    product?.description?.slice(0, 155) ?? 'Explore this Climate Craft motion furniture product — engineered and handcrafted in Europe.',
  )

  // Every product gets a clean arrival: back to the 360° hero view, scrolled to top —
  // never leaking the previous product's mode, image index or scroll position.
  useEffect(() => {
    setMode('3d')
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  if (!product) {
    return <ComingSoon title="Product" />
  }

  const family = PRODUCT_FAMILIES.find((f) => f.id === product.familyId)!
  const images = homeProductImages(product.slug, product.imageCount)
  const related = getRelatedProducts(product)
  const hasHotspots = product.hotspots.length > 0 && images.length > 0

  return (
    <>
      <main>
        <section className="relative overflow-hidden bg-ink-950 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
          <div
            className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full opacity-[0.12] blur-[130px]"
            style={{ background: 'radial-gradient(circle, #1d7a6f 0%, transparent 70%)' }}
          />
          <div className="grain-overlay opacity-20" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Reveal amount={0.6}>
              <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-cream-200/45">
                <Link to="/collections" className="transition-colors duration-300 hover:text-gold-400">
                  Collections
                </Link>
                <span>/</span>
                <span className="text-cream-200/70">{family.label}</span>
                <span>/</span>
                <span className="text-cream-100">{product.name}</span>
              </nav>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <Reveal delay={0.05}>
                  {hasHotspots && (
                    <div className="mb-4 flex justify-center lg:justify-start">
                      <ViewerModeSwitcher mode={mode} onChange={setMode} />
                    </div>
                  )}

                  <AnimatePresence mode="wait" initial={false}>
                    {mode === 'details' && hasHotspots ? (
                      <motion.div
                        key={`details-${product.slug}`}
                        initial={{ opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.985 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <HotspotExplorer images={images} hotspots={product.hotspots} alt={product.name} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`3d-${product.slug}`}
                        initial={{ opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.985 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ProductViewer images={images} alt={product.name} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              </div>

              <div className="lg:sticky lg:top-32 lg:col-span-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-display text-sm italic tabular-nums text-gold-400/80">
                        {String(product.number).padStart(2, '0')} / {String(HOME_PRODUCTS.length).padStart(2, '0')}
                      </span>
                      <SectionLabel>{family.label}</SectionLabel>
                    </div>

                    <h1 className="mt-5 font-display text-4xl font-normal leading-[1.05] text-cream-100 sm:text-5xl">
                      {product.name}
                    </h1>

                    <p className="mt-3 text-[13px] uppercase tracking-widest text-cream-200/50">{product.category}</p>

                    <span className="section-label mt-5 inline-flex">{product.operation}</span>

                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream-200/70">
                      {product.description}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link to={`/contact?product=${product.slug}`} className="group btn-primary">
                        Request a Quote
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <a
                        href={whatsappHref(`Hi Climate Craft, I'd like to ask about ${product.name}.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="group btn-outline"
                      >
                        WhatsApp
                        <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <ProductFeatures product={product} />
        <ProductTechnology product={product} />
        <ProductSpecifications product={product} />
        <ProductCraftsmanship product={product} />
        <RelatedProducts products={related} />
        <FinalCTA />
      </main>
      <Footer />

      <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
        <Link
          to="/collections"
          className="group flex h-11 items-center gap-2 rounded-full border border-white/10 bg-ink-950/80 px-4 text-[11px] font-medium uppercase tracking-widest text-cream-200/70 backdrop-blur-md transition-all duration-300 hover:border-gold-400/40 hover:text-cream-100"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          All Collections
        </Link>
      </div>
    </>
  )
}
