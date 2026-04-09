import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllChannels as getStaticChannels, CATEGORY_META } from '@/data/staticChannels'
import { getAllChannelEntries, getTotalChannelCount } from '@/data/channelRegistry'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']
const BASE_URL = 'https://cartotv.com'

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params
  const totalRaw = getTotalChannelCount(); const total = totalRaw > 0 ? totalRaw.toLocaleString() : '10,000+'
  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `${BASE_URL}/${l}/channels` })
  hreflang['x-default'] = `${BASE_URL}/en/channels`
  return {
    title: `Watch ${total} Free Live TV Channels Online | CartoTV`,
    description: `Browse and stream ${total}+ free live TV channels from 179 countries. News, sports, entertainment, kids, music and more — no sign-up required.`,
    alternates: { canonical: `${BASE_URL}/${lang}/channels`, languages: hreflang },
    openGraph: {
      title: `Free Live TV Channels Online | CartoTV`,
      description: `Stream ${total}+ free live TV channels from 179 countries. No registration required.`,
      url: `${BASE_URL}/${lang}/channels`,
      siteName: 'CartoTV',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

export default async function ChannelsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // Use registry channels if available, else fall back to static
  const registryChannels = getAllChannelEntries()
  const featuredChannels = registryChannels.length > 0
    ? registryChannels.slice(0, 48)  // show first 48 from registry
    : getStaticChannels()            // fallback to hand-coded

  const totalCount = getTotalChannelCount() || featuredChannels.length
  const categories = Object.keys(CATEGORY_META)

  // Group featured channels by category for display
  const byCategory = categories.reduce<Record<string, typeof featuredChannels>>((acc, cat) => {
    acc[cat] = featuredChannels.filter(c => c.category.toLowerCase() === cat.toLowerCase())
    return acc
  }, {})

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Live TV Channels – Stream Online',
    description: `Browse ${totalCount.toLocaleString()}+ free live TV channels from 179 countries.`,
    url: `${BASE_URL}/${lang}/channels`,
    numberOfItems: totalCount,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 py-10">

          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <ol className="flex items-center gap-2">
              <li><Link href={`/${lang}`} className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-foreground">Channels</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-white mb-3">
            Free Live TV Channels Online
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Stream <strong className="text-white">{totalCount.toLocaleString()}+</strong> live TV channels from 179 countries — free, no sign-up.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => {
              const meta = CATEGORY_META[cat as keyof typeof CATEGORY_META]
              if (!meta) return null
              const count = byCategory[cat]?.length ?? 0
              return (
                <Link key={cat} href={`/${lang}/category/${cat}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary/50 hover:bg-primary/10 border border-border/30 hover:border-primary/40 text-sm transition-all group">
                  <span>{meta.icon}</span>
                  <span className="group-hover:text-primary transition-colors">{meta.label}</span>
                  {count > 0 && <span className="text-xs text-muted-foreground">({count}+)</span>}
                </Link>
              )
            })}
          </div>

          {/* Featured channels grid — shows what we have */}
          {categories.map(cat => {
            const list = byCategory[cat]
            if (!list?.length) return null
            const meta = CATEGORY_META[cat as keyof typeof CATEGORY_META]
            if (!meta) return null
            return (
              <section key={cat} className="mb-14">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span>{meta.icon}</span> {meta.label}
                  </h2>
                  <Link href={`/${lang}/category/${cat}`} className="text-sm text-primary hover:underline">View all →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {list.slice(0, 12).map(ch => (
                    <Link key={ch.id} href={`/${lang}/channels/${ch.id}`}
                      className="group flex flex-col items-center p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-border/20 hover:border-primary/40 transition-all text-center">
                      <div className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center flex-shrink-0 overflow-hidden bg-white/5">
                        {(ch as any).logo
                          ? <img src={(ch as any).logo} alt={ch.name} className="w-full h-full object-contain p-1" loading="lazy" />
                          : <span className="text-2xl">{meta.icon}</span>
                        }
                      </div>
                      <p className="text-xs font-medium truncate w-full group-hover:text-primary transition-colors">{ch.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <img src={(ch as any).countryFlag || ''} alt="" className="w-3 h-2 object-cover rounded" loading="lazy" />
                        <p className="text-[10px] text-muted-foreground truncate">{(ch as any).countryName || ''}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}

          {/* SEO content */}
          <section className="mt-8 prose prose-invert max-w-none">
            <h2>About Free Live TV Channels on CartoTV</h2>
            <p>
              CartoTV gives you instant access to {totalCount.toLocaleString()}+ live TV channels from 179 countries around the world —
              completely free, with no registration, no subscription, and no software to download.
              Our channel library covers every major genre: news, sports, entertainment, kids, music, documentaries, movies, lifestyle, business, and religious programming.
            </p>
            <h3>How It Works</h3>
            <p>
              Every channel on CartoTV streams live from its original broadcaster.
              We aggregate public IPTV streams from licensed broadcasters around the world.
              Simply find a channel, click play, and start watching — from any device, anywhere in the world.
            </p>
            <h3>Browse by Category</h3>
            <p>
              Find the content you want:{' '}
              {categories.map((cat, i) => {
                const meta = CATEGORY_META[cat as keyof typeof CATEGORY_META]
                if (!meta) return null
                return (
                  <span key={cat}>
                    {i > 0 ? ', ' : ''}
                    <Link href={`/${lang}/category/${cat}`}>{meta.label}</Link>
                  </span>
                )
              })}.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
