import { Mail, MessageCircle, Phone } from 'lucide-react'
import { contact, whatsappHref } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function ContactPanel() {
  return (
    <div className="space-y-6">
      <Reveal>
        <div className="rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-teal-900/40 via-ink-900/60 to-ink-950 p-8">
          <SectionLabel>Prefer to talk directly?</SectionLabel>
          <h3 className="mt-4 font-display text-2xl text-cream-100">Message us on WhatsApp.</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-cream-200/65">
            Skip the form and speak with our team directly — the fastest way to reach us.
          </p>
          <a
            href={whatsappHref("Hi Climate Craft, I'd like to talk about a project.")}
            target="_blank"
            rel="noreferrer"
            className="group btn-primary mt-6 w-full justify-center"
          >
            Message Us on WhatsApp
            <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-8">
          <SectionLabel>Direct Contact</SectionLabel>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={`tel:+${contact.phoneHref}`}
                className="group flex items-center gap-3 text-[14.5px] text-cream-100 transition-colors duration-300 hover:text-gold-400"
              >
                <Phone className="h-4 w-4 flex-none text-gold-400" strokeWidth={1.5} />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-3 text-[14.5px] text-cream-100 transition-colors duration-300 hover:text-gold-400"
              >
                <Mail className="h-4 w-4 flex-none text-gold-400" strokeWidth={1.5} />
                {contact.email}
              </a>
            </li>
          </ul>

          <p className="mt-6 border-t border-white/10 pt-5 text-[13px] leading-relaxed text-cream-200/50">
            {contact.address}
          </p>
        </div>
      </Reveal>
    </div>
  )
}
