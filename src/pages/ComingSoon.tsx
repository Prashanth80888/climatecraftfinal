import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SectionLabel } from '../components/ui/SectionLabel'

interface ComingSoonProps {
  title: string
}

// Deliberately minimal — this route exists so the navbar has somewhere real to
// point to, but the page itself is intentionally NOT designed or built out yet.
export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-ink-950 px-5 pt-32 text-center">
      <SectionLabel>Coming Soon</SectionLabel>
      <h1 className="mt-5 font-display text-4xl font-normal text-cream-100 sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-cream-200/60">
        This part of the Climate Craft site is being crafted. In the meantime, explore the collection on the home
        page.
      </p>
      <Link
        to="/"
        className="btn-ghost group mt-8 inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to Home
      </Link>
    </main>
  )
}
