import { Link } from 'react-router-dom'
import { LegalPageLayout, LegalList, type LegalSection } from '../components/legal/LegalPageLayout'
import { business, registeredAddress } from '../data/siteConfig'
import { contact } from '../lib/assets'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const SECTIONS: LegalSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    body: (
      <p>
        Climate Craft ("we", "us", "our") operates this website to present our motion furniture collection and to
        let visitors request a quotation for a project. This Privacy Policy explains what information this website
        collects, why, and how it is used. It applies only to this website — not to any conversation you have with
        us over WhatsApp, phone or email, which are each covered by their own respective policies.
      </p>
    ),
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: (
      <>
        <p>
          The only personal information this website actively collects is what you choose to submit through the
          "Request a Quote" form on the Contact page. Depending on what you fill in, that may include:
        </p>
        <LegalList
          items={[
            'Full Name',
            'Email address',
            'Company (optional)',
            'Phone number (optional)',
            'Project Type',
            'Product / Collection of interest',
            'Estimated Quantity',
            'Preferred Timeline (optional)',
            'Any project details you choose to describe',
          ]}
        />
        <p>
          This website does not require you to create an account, does not process payments, and does not collect
          any information beyond what you voluntarily enter into that form.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How We Use Your Information',
    body: (
      <>
        <p>Information submitted through the Request a Quote form is used only to:</p>
        <LegalList
          items={[
            'Understand your project and respond to your enquiry',
            'Help you choose the right Climate Craft configuration, quantity and finish',
            'Contact you back using the details you provided',
          ]}
        />
        <p>We do not use this information for advertising, and we do not sell or rent it to third parties.</p>
      </>
    ),
  },
  {
    id: 'whatsapp',
    title: 'How Your Enquiry Reaches Us',
    body: (
      <>
        <p>
          The Request a Quote form does not submit to a server or database that Climate Craft operates. When you
          submit it, your browser prepares a message from the details you entered and opens WhatsApp so you can
          review and send it directly to Climate Craft's WhatsApp number ({contact.phoneDisplay}). The same applies
          to the "Message us on WhatsApp" links used elsewhere on the site.
        </p>
        <p>
          Once you send that message, it is handled by WhatsApp, a service operated by WhatsApp/Meta, and is subject
          to WhatsApp's own privacy policy — Climate Craft does not control how WhatsApp itself processes or stores
          messages. Similarly, the phone and email links on this site (tel: and mailto: links) simply open your own
          device's phone or email app; nothing is transmitted through this website in either case.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    body: (
      <p>
        This website does not use analytics, advertising or tracking cookies. See our{' '}
        <Link to="/cookie-policy" className="text-gold-400 hover:underline">
          Cookie Policy
        </Link>{' '}
        for full details on what this site does and does not use.
      </p>
    ),
  },
  {
    id: 'data-security',
    title: 'Data Security',
    body: (
      <p>
        Because this website does not store the information you enter into the Request a Quote form on any server
        or database it operates, there is no Climate Craft–maintained database of enquiries to secure. Information
        only leaves your device once you choose to send it — either as a WhatsApp message to our WhatsApp number, or
        as an email if you use one of the email links on this site — and from that point is handled under that
        platform's own security practices.
      </p>
    ),
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    body: (
      <p>
        As Climate Craft does not maintain a separate marketing database for this website, any enquiry you send us
        is retained as ordinary business correspondence — within WhatsApp or your email, according to your own
        settings on those platforms, and within whatever record Climate Craft keeps of the resulting conversation or
        order. We do not hold a fixed, published retention period for website enquiries beyond this.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    body: (
      <p>
        You may have rights to access, correct or request deletion of personal information you've shared with us,
        depending on your location. Since anything you send us arrives via WhatsApp or email rather than a database
        we maintain, exercising these rights is straightforward — contact us at{' '}
        <a href={`mailto:${contact.email}`} className="text-gold-400 hover:underline">
          {contact.email}
        </a>{' '}
        and let us know what you'd like us to do.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes to this website or how it works. The
        "Last updated" date at the top of this page always reflects the most recent version.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    body: (
      <>
        <p>Questions about this Privacy Policy or how your information is handled can be sent to:</p>
        <p className="text-cream-100">
          {business.legalName}
          <br />
          {registeredAddress.floorNo}, {registeredAddress.buildingFlatNo}
          <br />
          {registeredAddress.premisesName}
          <br />
          {registeredAddress.roadStreet}, {registeredAddress.localitySubLocality}
          <br />
          {registeredAddress.city}, {registeredAddress.district}, {registeredAddress.state} {registeredAddress.pin}
        </p>
        <p>
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

export function PrivacyPolicyPage() {
  useDocumentMeta(
    'Privacy Policy — Climate Craft',
    'How Climate Craft collects, uses and protects information submitted through this website.',
  )

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="What this website collects when you get in touch, why, and how it's used."
      sections={SECTIONS}
    />
  )
}
