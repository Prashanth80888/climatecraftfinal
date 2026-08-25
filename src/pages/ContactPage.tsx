import { useEffect } from 'react'
import { ContactHero } from '../components/contact/ContactHero'
import { ContactStrip } from '../components/contact/ContactStrip'
import { QuoteForm } from '../components/contact/QuoteForm'
import { ContactPanel } from '../components/contact/ContactPanel'
import { BusinessHours } from '../components/contact/BusinessHours'
import { ContactCTA } from '../components/contact/ContactCTA'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Reveal } from '../components/ui/Reveal'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function ContactPage() {
  useDocumentMeta(
    'Request a Quote — Climate Craft',
    "Tell us what you're planning. We'll help you choose the right Climate Craft configuration, quantity and finish for your space.",
  )

  // Every arrival at /contact — including from a Product Detail "Request Quote"
  // click — starts scrolled to the top of the page, not wherever the previous
  // page left off.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <>
      <main>
        <ContactHero />
        <ContactStrip />

        <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Reveal>
                  <SectionLabel>Start Your Quote</SectionLabel>
                  <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
                    Tell us about <span className="italic text-gold-400">your project.</span>
                  </h2>
                </Reveal>
                <div className="mt-10">
                  <QuoteForm />
                </div>
              </div>

              <div className="lg:col-span-5">
                <ContactPanel />
              </div>
            </div>
          </div>
        </section>

        <BusinessHours />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}
