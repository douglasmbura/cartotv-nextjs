import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { Providers } from '@/components/Providers'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params
  if (!SUPPORTED_LANGS.includes(lang)) return {}

  // Build hreflang for every sub-page in this language
  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `https://cartotv.com/${l}` })
  hreflang['x-default'] = 'https://cartotv.com/en'

  return {
    alternates: {
      canonical: `https://cartotv.com/${lang}`,
      languages: hreflang,
    },
  }
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CartoTV',
  url: 'https://cartotv.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://cartotv.com/en/watch/{search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Carto TV',
  url: 'https://cartotv.com',
  logo: { '@type': 'ImageObject', url: 'https://cartotv.com/favicon.png', width: 512, height: 512 },
  sameAs: ['https://x.com/CartoTv1', 'https://www.facebook.com/cartotv1'],
  contactPoint: { '@type': 'ContactPoint', email: 'hello@cartotv.com', contactType: 'customer service' },
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!SUPPORTED_LANGS.includes(lang)) notFound()

  return (
    <>
      {/* Global JSON-LD on every page */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <Providers lang={lang}>
        {children}
      </Providers>

      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2116450199889361"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      {/* OneSignal */}
      <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" strategy="afterInteractive" />
      <Script id="onesignal-init" strategy="afterInteractive">{`
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        OneSignalDeferred.push(async function(OneSignal) {
          await OneSignal.init({ appId: "4c598172-f798-4bd2-9483-90e2aefaf259" });
        });
      `}</Script>
      {/* Google Analytics */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-LVEWCM7QE2" strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LVEWCM7QE2');
      `}</Script>
    </>
  )
}
