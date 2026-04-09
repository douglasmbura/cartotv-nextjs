import type { Metadata } from 'next'
import Link from 'next/link'
import { countries } from '@/data/countries'
import { toSlug } from '@/utils/countrySlug'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params
  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `https://cartotv.com/${l}/watch` })
  hreflang['x-default'] = 'https://cartotv.com/en/watch'

  return {
    title: 'Watch Live TV Free Online – All 179 Countries | CartoTV',
    description: 'Browse and stream free live TV channels from 179 countries. Select any country to watch local news, sports, and entertainment online — no sign-up required.',
    alternates: { canonical: `https://cartotv.com/${lang}/watch`, languages: hreflang },
    openGraph: {
      title: 'Watch Live TV Free Online – All 179 Countries | CartoTV',
      description: 'Browse 179 countries and stream free live TV channels. No registration required.',
      url: `https://cartotv.com/${lang}/watch`,
      siteName: 'CartoTV',
      images: [{ url: 'https://cartotv.com/og-image.png', width: 1200, height: 630 }],
    },
  }
}

export default async function WatchPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Watch Live TV by Country – 179 Countries',
    description: 'Browse free live TV channels from 179 countries. Stream news, sports, and entertainment with no registration.',
    url: `https://cartotv.com/${lang}/watch`,
    numberOfItems: countries.length,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://cartotv.com/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Watch by Country', item: `https://cartotv.com/${lang}/watch` },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <ol className="flex items-center gap-2">
              <li><Link href={`/${lang}`} className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-foreground">Watch by Country</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-foreground mb-3">
            Watch Live TV Free – <span className="gradient-text">179 Countries</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Select any country below to browse and stream free live TV channels. No sign-up. No subscription.
          </p>

          {/* Country Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {countries.map(country => (
              <Link
                key={country.name}
                href={`/${lang}/watch/${toSlug(country.name)}`}
                className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary border border-border/30 hover:border-primary/40 transition-all group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-8 h-6 object-cover rounded shadow-sm flex-shrink-0"
                  loading="lazy"
                />
                <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {country.name}
                </span>
              </Link>
            ))}
          </div>

          {/* SEO text */}
          <section className="mt-16 prose prose-invert max-w-none">
            <h2>Watch Free Live TV from Around the World</h2>
            <p>
              CartoTV gives you instant access to live television channels from {countries.length} countries — completely free, with no registration or subscription required. From breaking news to live sports, entertainment, kids shows, and documentaries, there's something for everyone.
            </p>
            <h3>How to Watch</h3>
            <ol>
              <li>Select a country from the list above</li>
              <li>Browse the available live channels</li>
              <li>Click any channel to start streaming instantly</li>
            </ol>
            <h3>Popular Countries</h3>
            <p>
              Some of our most-watched countries include{' '}
              {['United States','United Kingdom','India','Brazil','Nigeria','Kenya','France','Germany','Japan','Australia']
                .map((name, i, arr) => (
                  <span key={name}>
                    <Link href={`/${lang}/watch/${toSlug(name)}`}>{name}</Link>
                    {i < arr.length - 1 ? ', ' : '.'}
                  </span>
                ))}
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
