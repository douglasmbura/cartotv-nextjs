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
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `https://cartotv.com/${l}/terms` })
  hreflang['x-default'] = 'https://cartotv.com/en/terms'
  return {
    title: 'Terms of Service – Carto TV',
    description: 'Read CartoTV\'s terms of service. Free live TV streaming platform — no registration, no subscription, content from third-party providers.',
    alternates: { canonical: `https://cartotv.com/${lang}/terms`, languages: hreflang },
  }
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service – Carto TV',
    url: `https://cartotv.com/${lang}/terms`,
    datePublished: '2024-01-01',
    dateModified: '2025-01-01',
    publisher: { '@type': 'Organization', name: 'Carto TV' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://cartotv.com/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: `https://cartotv.com/${lang}/terms` },
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
              <h1 className="text-3xl font-bold gradient-text mb-2">Terms of Service</h1>
              <p className="text-muted-foreground text-sm">Last updated: January 2025</p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">By accessing and using Carto TV, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Service Description</h2>
              <p className="text-muted-foreground leading-relaxed">Carto TV is a free online platform that aggregates and provides access to live TV channel streams from around the world. We do not host any content ourselves — all streams are sourced from third-party providers and public IPTV sources.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Content and Copyright</h2>
              <p className="text-muted-foreground leading-relaxed">The TV channels and streams available on Carto TV are provided by third-party broadcasters. We do not claim ownership of any broadcast content. Users are responsible for ensuring their use of the service complies with applicable laws in their jurisdiction.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. No Registration Required</h2>
              <p className="text-muted-foreground leading-relaxed">Carto TV does not require registration or account creation. We collect no personal information beyond standard web analytics.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">Carto TV is provided "as is" without warranties of any kind. Stream availability depends on third-party providers and may vary. We do not guarantee continuous, uninterrupted access to any particular channel or stream.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">Carto TV and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these terms, contact us at{' '}
                <a href="mailto:hello@cartotv.com" className="text-primary hover:underline">hello@cartotv.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
