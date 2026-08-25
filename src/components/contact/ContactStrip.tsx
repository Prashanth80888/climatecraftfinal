import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { contact, whatsappHref } from '../../lib/assets'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const ITEMS = [
  {
    icon: Phone,
    label: 'Call',
    value: contact.phoneDisplay,
    href: `tel:+${contact.phoneHref}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: contact.phoneDisplay,
    href: whatsappHref("Hi Climate Craft, I'd like to talk about a project."),
    external: true,
  },
  {
    icon: MapPin,
    label: 'Studio',
    value: contact.address,
    href: undefined,
  },
]

export function ContactStrip() {
  return (
    <section className="relative border-y border-white/10 bg-ink-900/30 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal amount={0.3}>
          <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {ITEMS.map((item) => {
              const content = (
                <>
                  <item.icon className="h-4 w-4 flex-none text-gold-400" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-cream-200/45">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[13.5px] leading-snug text-cream-100">{item.value}</p>
                  </div>
                </>
              )

              return (
                <RevealItem key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      className="group flex items-start gap-3 transition-colors duration-300 hover:text-gold-400"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-start gap-3">{content}</div>
                  )}
                </RevealItem>
              )
            })}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  )
}
