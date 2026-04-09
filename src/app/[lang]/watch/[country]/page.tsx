import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { countries } from '@/data/countries'
import { getCountryBySlug, getAllCountrySlugs, toSlug } from '@/utils/countrySlug'
import { getCountrySEO } from '@/data/seo'
import CountryWatchClient from '@/components/CountryWatchClient'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']

// Generate all country × language combos at build time
export async function generateStaticParams() {
  const slugs = getAllCountrySlugs()
  return SUPPORTED_LANGS.flatMap(lang =>
    slugs.map(country => ({ lang, country }))
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; country: string }> }
): Promise<Metadata> {
  const { lang, country: slug } = await params
  const countryData = getCountryBySlug(slug)
  if (!countryData) return {}

  const title = `Watch ${countryData.name} TV Channels Free Online | CartoTV`
  const description = `Watch ${countryData.name} live TV channels free online. Stream news, sports, entertainment and more from ${countryData.name} — no sign-up required.`
  const path = `/watch/${slug}`

  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `https://cartotv.com/${l}${path}` })
  hreflang['x-default'] = `https://cartotv.com/en${path}`

  return {
    title,
    description,
    alternates: { canonical: `https://cartotv.com/${lang}${path}`, languages: hreflang },
    openGraph: {
      title, description,
      url: `https://cartotv.com/${lang}${path}`,
      siteName: 'CartoTV',
      images: [{ url: 'https://cartotv.com/og-image.png', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: ['https://cartotv.com/og-image.png'] },
  }
}

export default async function CountryWatchPage({
  params,
}: {
  params: Promise<{ lang: string; country: string }>
}) {
  const { lang, country: slug } = await params
  const countryData = getCountryBySlug(slug)

  if (!countryData) notFound()

  const seoHtml = getCountrySEO(countryData.name)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${countryData.name} Live TV Channels`,
    description: `Watch ${countryData.name} TV channels free online. Stream live news, sports, entertainment and more from ${countryData.name}.`,
    url: `https://cartotv.com/${lang}/watch/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://cartotv.com/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Watch by Country', item: `https://cartotv.com/${lang}/watch` },
        { '@type': 'ListItem', position: 3, name: countryData.name, item: `https://cartotv.com/${lang}/watch/${slug}` },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-4 py-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href={`/${lang}`} className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href={`/${lang}/watch`} className="hover:text-primary transition-colors">Countries</Link></li>
              <li>/</li>
              <li className="text-foreground">{countryData.name}</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={countryData.flag}
              alt={`${countryData.name} flag`}
              className="w-16 h-11 object-cover rounded-lg shadow-md flex-shrink-0"
            />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Watch {countryData.name} TV Channels – Free Live Stream
              </h1>
              <p className="text-muted-foreground mt-1">
                Free live TV from {countryData.name} · No sign-up required
              </p>
            </div>
          </div>

          {/* Interactive channel browser — client component (fetches M3U, plays HLS) */}
          <CountryWatchClient country={countryData} lang={lang} />

          {/* SEO content — server-rendered, Google sees this */}
          <section className="mt-12 prose prose-invert max-w-none">
            {seoHtml ? (
              <div dangerouslySetInnerHTML={{ __html: seoHtml }} />
            ) : (
              <>
                <h2>Watch {countryData.name} TV Online Free</h2>
                <p>
                  CartoTV provides free access to live television channels from {countryData.name}.
                  Stream news, sports, entertainment, and more without any registration or subscription.
                  Simply select a channel and start watching instantly.
                </p>
                <h3>How to Watch {countryData.name} TV Channels</h3>
                <ol>
                  <li>Browse the channel list above</li>
                  <li>Use the search bar to find a specific channel</li>
                  <li>Filter by category (News, Sports, Entertainment, etc.)</li>
                  <li>Click the play button to start streaming</li>
                </ol>
                <h3>About {countryData.name} Television</h3>
                <p>
                  {countryData.name} has a diverse television landscape with channels covering local news,
                  national sports, entertainment, and international programming. CartoTV aggregates these
                  channels so you can access them from anywhere in the world for free.
                </p>
              </>
            )}
          </section>

          {/* Related countries */}
          <aside className="mt-12">
            <h3 className="text-lg font-semibold text-foreground mb-4">Browse More Countries</h3>
            <div className="flex flex-wrap gap-2">
              {countries.slice(0, 20).filter(c => c.name !== countryData.name).slice(0, 12).map(c => (
                <Link
                  key={c.name}
                  href={`/${lang}/watch/${toSlug(c.name)}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary border border-border/30 hover:border-primary/40 text-sm transition-all"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.flag} alt="" className="w-4 h-3 object-cover rounded" loading="lazy" />
                  {c.name}
                </Link>
              ))}
              <Link
                href={`/${lang}/watch`}
                className="px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-sm transition-all"
              >
                View all 179 countries →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
