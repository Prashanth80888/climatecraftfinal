import { ChevronDown } from 'lucide-react'
import { contact } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

// Every answer here is scoped to what's actually verified elsewhere in the
// app (product warranty data, the real fabric archive, the Footer's "handcrafted
// in Europe" claim). Where a fact isn't confirmed anywhere — lead times — the
// answer says so honestly rather than inventing a number.
const FAQS = [
  {
    q: 'Do you offer white-label and OEM production?',
    a: 'Yes. We work with manufacturers on white-labelled ranges built to their specification, in addition to our own collection.',
  },
  {
    q: 'What are your lead times?',
    a: 'Every piece is engineered to order, so lead time depends on the specification. Get in touch and we\'ll confirm a timeline for your exact configuration.',
  },
  {
    q: 'Can we specify our own fabric?',
    a: 'Yes — every piece is upholstered from our curated, digitised fabric archive, so partners can specify with confidence before anything is cut.',
  },
  {
    q: 'How are the motorized mechanisms warrantied?',
    a: 'Motorized Climate Craft pieces carry a 2-year warranty, consistent across the collection.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes — pieces are handcrafted in Europe and shipped worldwide. Reach us directly to confirm delivery to your location.',
  },
]

export function AboutFAQ() {
  return (
    <section id="faq" className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Frequently Asked</SectionLabel>
        </Reveal>

        <RevealGroup className="mt-8 divide-y divide-white/10 border-t border-white/10">
          {FAQS.map((item) => (
            <RevealItem key={item.q}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 outline-none">
                  <span className="font-display text-lg text-cream-100 sm:text-xl">{item.q}</span>
                  <ChevronDown className="h-4 w-4 flex-none text-gold-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-cream-200/65">{item.a}</p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-8 text-[13px] text-cream-200/45">
          Still have a question? Reach us at{' '}
          <a href={`mailto:${contact.email}`} className="text-gold-400 hover:underline">
            {contact.email}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
