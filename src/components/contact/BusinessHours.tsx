import { MapPin } from 'lucide-react'
import { contact } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

// Sunday-first to match Date.getDay() (0 = Sunday), displayed Monday-first below.
const HOURS = [
  { day: 'Sunday', hours: 'Closed' },
  { day: 'Monday', hours: '09:00 — 18:00' },
  { day: 'Tuesday', hours: '09:00 — 18:00' },
  { day: 'Wednesday', hours: '09:00 — 18:00' },
  { day: 'Thursday', hours: '09:00 — 18:00' },
  { day: 'Friday', hours: '09:00 — 17:00' },
  { day: 'Saturday', hours: 'By appointment' },
]

const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0]

export function BusinessHours() {
  const today = new Date().getDay()

  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>Business Hours</SectionLabel>
            </Reveal>

            <RevealGroup className="mt-6 divide-y divide-white/10 border-t border-white/10">
              {DISPLAY_ORDER.map((index) => {
                const entry = HOURS[index]
                const isToday = index === today
                return (
                  <RevealItem key={entry.day}>
                    <div className="flex items-center justify-between py-3.5">
                      <span
                        className={`text-[14px] ${isToday ? 'font-medium text-gold-400' : 'text-cream-200/70'}`}
                      >
                        {entry.day}
                        {isToday && <span className="ml-2 text-[11px] uppercase tracking-widest">Today</span>}
                      </span>
                      <span className={`text-[14px] ${isToday ? 'text-cream-100' : 'text-cream-200/50'}`}>
                        {entry.hours}
                      </span>
                    </div>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <SectionLabel>The Studio</SectionLabel>
              <div className="mt-6 flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold-400" strokeWidth={1.5} />
                <div>
                  <p className="text-[15px] leading-relaxed text-cream-100">{contact.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-[12.5px] uppercase tracking-widest text-cream-200/50 transition-colors duration-300 hover:text-gold-400"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
              <p className="mt-6 max-w-sm border-t border-white/10 pt-6 text-[13.5px] leading-relaxed text-cream-200/50">
                Trade partners are also welcome at our showrooms in {contact.showrooms}, by appointment.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
