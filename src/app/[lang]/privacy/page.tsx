import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params
  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `https://cartotv.com/${l}/privacy` })
  hreflang['x-default'] = 'https://cartotv.com/en/privacy'
  return {
    title: 'Privacy Policy – Carto TV',
    description: 'CartoTV Privacy Policy. We collect minimal data, require no registration, and are committed to protecting your privacy.',
    alternates: { canonical: `https://cartotv.com/${lang}/privacy`, languages: hreflang },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy – Carto TV',
    url: `https://cartotv.com/${lang}/privacy`,
    datePublished: '2024-01-01',
    dateModified: '2025-01-01',
    publisher: { '@type': 'Organization', name: 'Carto TV' },
    about: { '@type': 'Thing', name: 'Privacy Policy', description: 'How Carto TV protects user privacy with minimal data collection and no registration requirements' },
    mentions: [
      { '@type': 'Thing', name: 'Cookie Policy' },
      { '@type': 'Thing', name: 'GDPR' },
      { '@type': 'Thing', name: 'User Rights' },
    ],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://cartotv.com/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `https://cartotv.com/${lang}/privacy` },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Globe
          </Link>

          <div className="glass-panel p-8 space-y-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Privacy Policy</h1>
              <p className="text-muted-foreground text-sm">Last updated: January 2025</p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                Carto TV is committed to protecting your privacy. We operate a free TV streaming service that requires no registration or personal information to use. This policy explains what limited data we collect and how we use it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">We collect minimal information:</p>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                <li><strong className="text-foreground">Analytics data</strong> — via Google Analytics: page views, session duration, country of origin (anonymized). No personal identifiers.</li>
                <li><strong className="text-foreground">Local storage</strong> — Favorites you save are stored locally in your browser only. We never receive this data.</li>
                <li><strong className="text-foreground">Standard server logs</strong> — IP addresses, browser type, and access times stored temporarily by our hosting provider.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. No Registration Required</h2>
              <p className="text-muted-foreground leading-relaxed">
                Carto TV does not require you to create an account, provide an email address, or submit any personal information. You can use the full service anonymously.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies for Google Analytics and language preference storage. You can disable cookies in your browser settings without affecting your ability to use Carto TV. We do not use advertising cookies or sell data to advertisers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">We use the following third-party services:</p>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                <li><strong className="text-foreground">Google Analytics</strong> — for anonymized usage statistics</li>
                <li><strong className="text-foreground">Google AdSense</strong> — for serving ads (may use cookies)</li>
                <li><strong className="text-foreground">OneSignal</strong> — for optional push notifications</li>
                <li><strong className="text-foreground">Third-party IPTV providers</strong> — TV streams are served from external sources</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. GDPR &amp; Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you are located in the European Union, you have the right to access, correct, or delete any personal data we hold about you. Since we collect minimal data and no account information, there is typically no personal data to access. For any privacy requests, contact us at{' '}
                <a href="mailto:hello@cartotv.com" className="text-primary hover:underline">hello@cartotv.com</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                Analytics data is retained for 26 months as per Google Analytics defaults. Server logs are retained for 30 days. Favorites stored in your browser remain until you clear your browser data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Carto TV does not knowingly collect information from children under 13. The service is intended for general audiences.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">9. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will post the updated date at the top of this page. Continued use of the service constitutes acceptance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">10. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy questions or requests:{' '}
                <a href="mailto:hello@cartotv.com" className="text-primary hover:underline">hello@cartotv.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
