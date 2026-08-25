import { LegalPageLayout, LegalList, type LegalSection } from '../components/legal/LegalPageLayout'
import { business } from '../data/siteConfig'
import { contact } from '../lib/assets'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const SECTIONS: LegalSection[] = [
  {
    id: 'overview',
    title: 'What Cookies Are',
    body: (
      <>
        <p>
          Cookies are small text files that websites place on your device to store information. They are
          widely used to make websites work properly, improve the user experience and provide reporting
          information to website operators.
        </p>
        <p>
          This Cookie Policy explains what cookies the Climate Craft website uses, why, and how you can
          manage them.
        </p>
      </>
    ),
  },
  {
    id: 'cookies-we-use',
    title: 'Cookies This Website Uses',
    body: (
      <>
        <p>
          The Climate Craft website is designed to be simple and privacy-conscious. We have structured our
          cookie usage as follows:
        </p>
        <LegalList
          items={[
            'Necessary cookies: These are required for the website to function — for example, maintaining your session as you navigate between pages. These cannot be turned off.',
            'No analytics cookies: This website does not use Google Analytics, Plausible, Hotjar, or any other analytics or tracking tool that sets cookies.',
            'No advertising cookies: This website does not use any advertising, remarketing or third-party marketing cookies.',
            'No preference cookies: This website does not use cookies to remember your preferences, settings or display choices.',
          ]}
        />
        <p>
          In summary, this website uses only the minimal cookies necessary for its basic operation and
          does not track your browsing behaviour.
        </p>
      </>
    ),
  },
  {
    id: 'third-party-cookies',
    title: 'Third-Party Cookies',
    body: (
      <>
        <p>
          This website itself does not place third-party advertising or analytics cookies. However, some
          third-party services integrated into the website — such as embedded videos or social media links
          — may set their own cookies when you interact with them.
        </p>
        <p>
          For example, if you click on a YouTube video embedded on this site, YouTube may set cookies in
          accordance with its own privacy policy. Similarly, social media links (Instagram, LinkedIn,
          YouTube) will direct you to external platforms that use their own cookies.
        </p>
        <p>
          We do not control the cookies set by these third-party services. Please refer to their respective
          privacy and cookie policies for more information.
        </p>
      </>
    ),
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp & External Communication',
    body: (
      <p>
        When you use the Request a Quote form, your browser opens WhatsApp with a prepared message. This
        action is initiated entirely by your browser and does not involve any cookies or tracking on the
        Climate Craft website itself. Once on WhatsApp, WhatsApp's own cookies and privacy policies
        apply.
      </p>
    ),
  },
  {
    id: 'managing-cookies',
    title: 'Managing Cookies',
    body: (
      <>
        <p>
          You can control and manage cookies through your browser settings. Most browsers allow you to:
        </p>
        <LegalList
          items={[
            'View what cookies are set and delete them individually',
            'Block cookies from specific websites',
            'Block all cookies',
            'Delete all cookies when you close your browser',
          ]}
        />
        <p>
          Please note that blocking or deleting cookies may affect the basic functionality of this website.
          Since this website uses only necessary cookies, the impact of disabling them should be minimal.
        </p>
        <p>
          Instructions for managing cookies are typically found in your browser's "Help" or "Preferences"
          menu. Common browsers include Chrome, Firefox, Safari and Edge.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    body: (
      <p>
        We may update this Cookie Policy from time to time to reflect changes to this website or
        applicable regulations. The "Last updated" date at the top of this page always reflects the most
        recent version.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    body: (
      <>
        <p>If you have questions about this Cookie Policy, please contact us:</p>
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

export function CookiePolicyPage() {
  useDocumentMeta(
    'Cookie Policy — Climate Craft',
    'How the Climate Craft website uses cookies — and why it uses far fewer than most.',
  )

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Cookie Policy"
      intro="A transparent summary of what cookies this website uses and — more importantly — what it doesn't."
      sections={SECTIONS}
    />
  )
}
