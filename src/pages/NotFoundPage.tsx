import { Link } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Footer } from '../components/Footer'

export function NotFoundPage() {
  useDocumentMeta(
    'Page Not Found — Climate Craft',
    'The page you are looking for does not exist. Return to Climate Craft home or explore our collections.',
  )

  return (
    <>
      <main className="relative flex min-h-[80vh] flex-col items-center justify-center bg-ink-950 px-5 pt-32 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[360px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] blur-[130px]"
          style={{ background: 'radial-gradient(ellipse, #1d7a6f 0%, transparent 65%)' }}
        />
        <div className="grain-overlay opacity-[0.06]" />

        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-cream-200/40">
            <Search className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <p className="mt-6 text-[11px] uppercase tracking-widest text-gold-400/70">404</p>
          <h1 className="mt-4 font-display text-4xl font-normal text-cream-100 sm:text-5xl">
            Page not found.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/60">
            The page you are looking for does not exist or has been moved. Explore our collection or get in touch.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="group btn-primary">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <Link to="/collections" className="group btn-outline">
              View Collections
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
