import { Link } from 'react-router-dom'
import { LegalPageLayout, type LegalSection } from '../components/legal/LegalPageLayout'
import { business } from '../data/siteConfig'
import { contact } from '../lib/assets'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const SECTIONS: LegalSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    body: (
      <p>
        These Terms and Conditions govern your use of the Climate Craft website. By accessing or using this website,
        you agree to be bound by these terms. If you do not agree, please do not use this website.
      </p>
    ),
  },
  {
    id: 'website-use',
    title: 'Use of This Website',
    body: (
      <>
        <p>
          This website is intended to present Climate Craft's motion furniture collection, share information about
          our products and technology, and let visitors request a quotation. You may browse the website for
          informational purposes.
        </p>
        <p>
          You agree not to use this website for any unlawful purpose, to attempt to gain unauthorised access to any
          part of the website, or to interfere with its normal operation.
        </p>
      </>
    ),
  },
  {
    id: 'product-information',
    title: 'Product Information',
    body: (
      <>
        <p>
          We make every effort to present our products accurately, including specifications, features, materials and
          imagery. However, the visual appearance of products on screen may differ from the physical product due to
          monitor settings, screen calibration and other factors beyond our control.
        </p>
        <p>
          Product specifications — including temperature ranges (15°C–35°C), upholstery weight (460 GSM), warranty
          periods and feature sets — are based on verified product data and may vary between product families and
          configurations. Specific specifications are listed on each product's detail page and within any formal
          quotation we provide.
        </p>
      </>
    ),
  },
  {
    id: 'availability',
    title: 'Product Availability',
    body: (
      <p>
        Climate Craft products are made to order. The information on this website does not constitute an offer to
        sell or a guarantee of availability. Product availability, configurations and finishes may change without
        notice. A formal quotation, once issued, will confirm availability and lead times for the specific
        configuration requested.
      </p>
    ),
  },
  {
    id: 'pricing',
    title: 'Pricing & Quotations',
    body: (
      <>
        <p>
          Climate Craft does not publish fixed prices on this website. Each project is individually assessed and
          quoted based on the product configuration, quantity, finish and logistics involved.
        </p>
        <p>
          Any pricing shared in a formal quotation is valid for the period stated in that quotation. Quoted prices
          may be subject to change if an order is not placed within the stated validity window.
        </p>
        <p>
          Prices quoted are exclusive of applicable taxes, duties and shipping unless explicitly stated otherwise
          in the quotation.
        </p>
      </>
    ),
  },
  {
    id: 'orders',
    title: 'Orders',
    body: (
      <>
        <p>
          Submitting an enquiry or request for a quote through this website does not constitute a binding order.
          An order is only confirmed once Climate Craft issues a formal order confirmation following your
          acceptance of a quotation.
        </p>
        <p>
          Payment terms, delivery timelines and other order-specific conditions will be outlined in the formal
          quotation and order confirmation.
        </p>
      </>
    ),
  },
  {
    id: 'custom-products',
    title: 'Custom & Made-to-Order Products',
    body: (
      <p>
        Climate Craft products are manufactured to order and may include custom configurations, upholstery
        selections and finishes. Because products are made to your specifications, returns or exchanges of
        custom-configured products are not available unless there is a manufacturing defect or an error on
        our part. Any such concerns should be raised by contacting{' '}
        <a href={`mailto:${contact.email}`} className="text-gold-400 hover:underline">
          {contact.email}
        </a>
        .
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    body: (
      <>
        <p>
          All content on this website — including text, images, videos, graphics, logos, product names, layout
          and design — is the property of {business.legalName} or its licensors and is protected by applicable
          intellectual property laws.
        </p>
        <p>
          You may not reproduce, distribute, modify, create derivative works from, publicly display or
          commercially exploit any content from this website without prior written permission from Climate
          Craft.
        </p>
      </>
    ),
  },
  {
    id: 'user-submissions',
    title: 'User Submissions',
    body: (
      <>
        <p>
          Any information you submit through the Request a Quote form or via WhatsApp, email or phone is
          treated in accordance with our{' '}
          <Link to="/privacy-policy" className="text-gold-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          By submitting information, you confirm that the details you provide are accurate and that you have
          the authority to share them.
        </p>
      </>
    ),
  },
  {
    id: 'website-availability',
    title: 'Website Availability',
    body: (
      <p>
        We aim to keep this website available at all times, but we do not guarantee uninterrupted access.
        We may suspend or restrict access to the website for maintenance, updates or circumstances beyond
        our reasonable control. We are not liable for any loss or inconvenience caused by website
        unavailability.
      </p>
    ),
  },
  {
    id: 'third-party-links',
    title: 'Third-Party Links',
    body: (
      <p>
        This website may contain links to third-party platforms such as WhatsApp, Instagram, LinkedIn or
        YouTube. These links are provided for convenience. Climate Craft does not control or endorse the
        content of third-party websites and is not responsible for their practices or availability.
      </p>
    ),
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    body: (
      <>
        <p>
          To the fullest extent permitted by law, {business.legalName} shall not be liable for any indirect,
          incidental, special or consequential loss or damage arising from your use of this website, including
          but not limited to loss of data, revenue or business opportunity.
        </p>
        <p>
          Our total liability for any claim arising from or related to this website shall not exceed the
          amount you paid to us, if anything, for accessing this website.
        </p>
      </>
    ),
  },
  {
    id: 'warranty',
    title: 'Product Warranty',
    body: (
      <p>
        Specific warranty terms are provided with each product's formal quotation and documentation. Climate
        Craft's standard warranty covers motorized and climate mechanisms as detailed in the applicable
        product documentation. Warranty terms vary between product families. Please refer to your product's
        specification sheet or contact us for the specific warranty applicable to your purchase.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    body: (
      <p>
        We may update these Terms and Conditions from time to time. The "Last updated" date at the top of
        this page always reflects the most recent version. Continued use of the website after changes
        constitutes acceptance of the updated terms.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    body: (
      <>
        <p>If you have questions about these Terms and Conditions, please contact us:</p>
        <p className="text-cream-100">
          {business.legalName}
          <br />
          Email:{' '}
          <a href={`mailto:${contact.email}`} className="text-gold-400 hover:underline">
            {contact.email}
          </a>
          <br />
          Phone:{' '}
          <a href={`tel:+${contact.phoneHref}`} className="text-gold-400 hover:underline">
            {contact.phoneDisplay}
          </a>
        </p>
      </>
    ),
  },
]

export function TermsAndConditionsPage() {
  useDocumentMeta(
    'Terms & Conditions — Climate Craft',
    'Terms and conditions governing your use of the Climate Craft website and request-for-quote services.',
  )

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="The terms that govern your use of this website, our products, quotations and services."
      sections={SECTIONS}
    />
  )
}
