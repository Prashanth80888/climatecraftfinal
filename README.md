# Climate Craft

Premium motion furniture website — engineered in-house and upholstered by hand.

## Overview

Climate Craft is a premium motion furniture brand specialising in temperature-controlled recliners and seating with patented liquid cooling and heating technology. This website presents the product collection, shares engineering and feature details, and lets trade partners request quotations.

## Features

- 9-product catalogue across three families (Climate Smart, Motorised Comfort, Classic)
- Interactive product detail pages with 360° photo viewers and hotspot explorers
- Collections browsing with family-based navigation
- Features & technology showcase
- Project space applications and case studies
- About page with brand story, origin, FAQ
- Contact page with WhatsApp-integrated quote request form
- Legal pages (Privacy Policy, Terms & Conditions, Cookie Policy)
- Responsive design (mobile, tablet, desktop)
- Framer Motion animations with reduced-motion support
- SEO-optimised with page-specific metadata, Open Graph, and structured data
- Premium dark visual identity (ink/emerald, gold accents, ivory typography)

## Technology Stack

| Layer         | Technology         |
|---------------|--------------------|
| Framework     | React 18           |
| Language      | TypeScript 5.6     |
| Bundler       | Vite 5             |
| Routing       | React Router 6     |
| Animations    | Framer Motion 11   |
| Styling       | Tailwind CSS 3     |
| Icons         | Lucide React       |
| Fonts         | Fraunces + Inter (Google Fonts) |

## Project Structure

```
src/
  components/        # Reusable UI components
    about/           # About page sections
    case-studies/    # Case study pages and detail sections
    collections/     # Collections page sections
    contact/         # Contact page components (form, panel, etc.)
    features/        # Features page sections
    legal/           # Shared legal page layout
    product/         # Product detail page components
    projects/        # Projects page sections
    ui/              # Shared primitives (Reveal, SectionLabel, etc.)
  data/              # Static data and configuration
    siteConfig.ts    # Single source of truth for business/legal info
    homeProducts.ts  # Product catalogue
    projects.ts      # Project space data
    caseStudies.ts   # Case study data
  hooks/             # Custom React hooks
    useDocumentMeta.ts  # SEO metadata management
  lib/               # Utility functions and asset helpers
    assets.ts        # Image paths, contact info, WhatsApp helpers
  pages/             # Route-level page components
  context/           # React context providers
```

## Installation

```bash
git clone <repository-url>
cd premium-website
npm install
```

## Development

```bash
npm run dev
```

Opens the dev server at `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

The `build` script runs `tsc -b && vite build`, producing optimised output in `dist/`.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable         | Description                              | Default                     |
|------------------|------------------------------------------|-----------------------------|
| `VITE_SITE_URL`  | Production site URL for canonical/OG tags | `https://climatecraft.co`   |

## Available Routes

| Route                    | Page                 |
|--------------------------|----------------------|
| `/`                      | Home                 |
| `/collections`           | Collections          |
| `/features`              | Features & Technology|
| `/projects`              | Projects             |
| `/case-studies`          | Case Studies         |
| `/case-studies/:slug`    | Case Study Detail    |
| `/about`                 | About                |
| `/products/:slug`        | Product Detail       |
| `/contact`               | Contact / Request Quote |
| `/privacy-policy`        | Privacy Policy       |
| `/terms-and-conditions`  | Terms & Conditions   |
| `/cookie-policy`         | Cookie Policy        |

## Deployment

1. Run `npm run build` to produce the `dist/` folder
2. Deploy `dist/` to your hosting provider (Vercel, Netlify, Cloudflare Pages, etc.)
3. Configure SPA fallback (all routes → `index.html`) for client-side routing
4. Ensure HTTPS is enabled
5. Set up custom domain and DNS
6. Submit `sitemap.xml` to Google Search Console

## SEO

- Every page has a unique `<title>` and `<meta name="description">` set via `useDocumentMeta`
- Open Graph tags (title, description, image, URL, type) are generated per-page
- Twitter Card metadata is included
- Canonical URLs are set per-route
- `robots.txt` and `sitemap.xml` are included in `public/`
- Structured data can be added via JSON-LD where appropriate

## Contact / Business Configuration

All business information is centralised in `src/data/siteConfig.ts`:

- Legal name, trade name, constitution
- Registered address
- Social media links (placeholders until real URLs are provided)

Contact details (phone, email, WhatsApp, address) are in `src/lib/assets.ts`.

The quote form generates a WhatsApp message with all submitted details and opens it in the user's browser — no server-side processing required.

## Important Notes

- **Product data is verified**: The 9-product catalogue in `homeProducts.ts` contains accurate specifications. Do not modify product names, slugs, image counts, or specifications without verification.
- **Warranty**: Products carry a 2-year warranty. The `Highlights` and `Specifications` arrays in `homeProducts.ts` are the source of truth.
- **No secrets**: This repository contains no API keys, tokens or private credentials. All sensitive configuration belongs in `.env.local` (git-ignored).
- **Made-to-order**: Products are manufactured to order with custom configurations. The website presents information — orders are confirmed through direct communication.
- **SPA Routing**: A `public/_redirects` file is included for Cloudflare Pages. For other hosts, configure SPA fallback (`/* → /index.html 200`).
