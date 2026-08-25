import { useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import { brand, contact } from '../lib/assets'
import { socialLinks } from '../data/siteConfig'
import { Reveal } from './ui/Reveal'

// Legal pages are real routes, not hash links — they need React Router <Link>
// so client-side navigation works and the browser never falls back to the
// wildcard → HomePage catch-all.

// Real routes where the destination is its own page, "/#hash" where it's a
// specific Home-page section (works from any page — Home scrolls to the hash
// once it mounts). This mirrors how the Navbar's own links are wired.
const FOOTER_LINKS: Record<string, { label: string; to: string }[]> = {
  Explore: [
    { label: 'Home', to: '/' },
    { label: 'Collections', to: '/collections' },
    { label: 'Features', to: '/features' },
    { label: 'Case Studies', to: '/case-studies' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Process', to: '/#mechanics' },
    { label: 'Request a Quote', to: '/contact' },
  ],
  Support: [
    { label: 'FAQs', to: '/about#faq' },
    { label: 'Care & Warranty', to: '/#why-climate-craft' },
  ],
}

const SOCIAL = [
  { icon: Instagram, href: socialLinks.instagram, label: 'Instagram' },
  { icon: Facebook, href: socialLinks.facebook, label: 'Facebook' },
  { icon: Twitter, href: socialLinks.twitter, label: 'Twitter' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const navigate = useNavigate()

  const handleHashLink = useCallback(
    (to: string) => (e: React.MouseEvent) => {
      const hashIndex = to.indexOf('#')
      if (hashIndex === -1) return
      const path = to.slice(0, hashIndex) || '/'
      const hash = to.slice(hashIndex)

      e.preventDefault()
      if (location.pathname === path) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate(to)
      }
    },
    [location.pathname, navigate],
  )

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.1] blur-[110px]"
        style={{ background: 'radial-gradient(ellipse, #1d7a6f 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal amount={0.2}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
            <div className="col-span-2 sm:col-span-4 lg:col-span-3">
              <Link to="/" className="group inline-flex items-center gap-2.5">
                <img
                  src={brand.logo}
                  alt="Climate Craft"
                  className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <span className="font-display text-xl text-cream-100">Climate Craft</span>
              </Link>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-cream-200/55">
                Precision-engineered motion furniture, handcrafted in Europe for the world's most discerning spaces.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:text-gold-400"
                  >
                    <s.icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="lg:col-span-2">
                <h4 className="text-[11px] font-semibold uppercase tracking-widest text-cream-100/80">{title}</h4>
                <ul className="mt-5 flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.to.includes('#') ? (
                        <a
                          href={link.to}
                          onClick={handleHashLink(link.to)}
                          className="inline-block text-[13px] text-cream-200/55 transition-all duration-300 hover:translate-x-1 hover:text-gold-400"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="inline-block text-[13px] text-cream-200/55 transition-all duration-300 hover:translate-x-1 hover:text-gold-400"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-cream-100/80">Connect</h4>
              <ul className="mt-5 flex flex-col gap-3 text-[13px] text-cream-200/55">
                <li>
                  <a
                    href={`tel:+${contact.phoneHref}`}
                    className="transition-colors duration-300 hover:text-gold-400"
                  >
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="transition-colors duration-300 hover:text-gold-400">
                    {contact.email}
                  </a>
                </li>
                <li className="leading-relaxed">{contact.address}</li>
                <li className="text-cream-200/40">Showrooms · {contact.showrooms}</li>
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row sm:mt-16">
          <p className="text-[12px] text-cream-200/40">© 2009–{year} Climate Craft. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[12px] text-cream-200/40">
            <Link to="/privacy-policy" className="transition-colors duration-300 hover:text-cream-200/70">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="transition-colors duration-300 hover:text-cream-200/70">
              Terms &amp; Conditions
            </Link>
            <Link to="/cookie-policy" className="transition-colors duration-300 hover:text-cream-200/70">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
