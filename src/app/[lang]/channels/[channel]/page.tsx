import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllChannelIds, getChannelEntryById, getChannelEntriesByCountry, getCategoryIcon } from '@/data/channelRegistry'
import { getAllChannels as getStaticChannels, getChannelById as getStaticById } from '@/data/staticChannels'
import ChannelPageClient from '@/components/ChannelPageClient'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']
const BASE_URL = 'https://cartotv.com'

// ISR: revalidate every 24 hours instead of SSG at build time
// This avoids OOM building 110,000 pages — pages render on first request
// and are then cached. Same SEO result, build completes in minutes.
export const revalidate = 86400 // 24 hours

// Only pre-build the static hand-coded channels at build time.
// Registry channels (10,000+) use ISR — rendered on first request.
export async function generateStaticParams() {
  const staticIds = getStaticChannels().map(c => c.id)
  return SUPPORTED_LANGS.flatMap(lang =>
    staticIds.map(channel => ({ lang, channel }))
  )
}

// Combined lookup: registry first, static fallback
function getChannelData(id: string) {
  const reg = getChannelEntryById(id)
  if (reg) return { ...reg, description: undefined as string | undefined, isRegistry: true }

  const stat = getStaticById(id)
  if (stat) return {
    id: stat.id, name: stat.name, countryCode: stat.countryCode,
    countryName: stat.countryName, countrySlug: stat.countrySlug,
    countryFlag: stat.countryFlag, category: stat.category,
    language: stat.language ?? '', logo: stat.logo ?? '',
    streamUrl: stat.streamUrl, tvgId: '', website: stat.website ?? '',
    description: stat.description as string | undefined,
    isRegistry: false,
  }
  return null
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; channel: string }> }
): Promise<Metadata> {
  const { lang, channel: id } = await params
  const ch = getChannelData(id)
  if (!ch) return {}

  const title = `Watch ${ch.name} Live Stream Free Online | CartoTV`
  const desc = ch.description
    ? `${ch.description.slice(0, 130)}… Stream free — no sign-up.`
    : `Watch ${ch.name} live online free. ${ch.category} channel from ${ch.countryName}. No registration required.`
  const path = `/channels/${id}`

  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `${BASE_URL}/${l}${path}` })
  hreflang['x-default'] = `${BASE_URL}/en${path}`

  return {
    title,
    description: desc,
    alternates: { canonical: `${BASE_URL}/${lang}${path}`, languages: hreflang },
    openGraph: {
      title, description: desc,
      url: `${BASE_URL}/${lang}${path}`,
      siteName: 'CartoTV',
      images: ch.logo
        ? [{ url: ch.logo, width: 400, height: 400 }]
        : [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description: desc },
  }
}

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ lang: string; channel: string }>
}) {
  const { lang, channel: id } = await params
  const ch = getChannelData(id)
  if (!ch) notFound()

  const catIcon = getCategoryIcon(ch.category)
  const related = getChannelEntriesByCountry(ch.countrySlug)
    .filter(c => c.id !== ch.id)
    .slice(0, 8)

  const description = ch.description ??
    `${ch.name} is a free live ${ch.category.toLowerCase()} TV channel from ${ch.countryName}${ch.language ? `, broadcasting in ${ch.language}` : ''}. Watch ${ch.name} online for free on CartoTV — no registration, no subscription, and no download required.`

  const broadcastSchema = {
    '@context': 'https://schema.org',
    '@type': 'BroadcastService',
    name: ch.name,
    description,
    url: `${BASE_URL}/${lang}/channels/${ch.id}`,
    broadcastDisplayName: ch.name,
    ...(ch.language && { broadcastLanguage: ch.language }),
    ...(ch.logo && { logo: ch.logo }),
    ...(ch.website && { sameAs: ch.website }),
    areaServed: { '@type': 'Country', name: ch.countryName },
    potentialAction: { '@type': 'WatchAction', target: `${BASE_URL}/${lang}/channels/${ch.id}` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Channels', item: `${BASE_URL}/${lang}/channels` },
        { '@type': 'ListItem', position: 3, name: ch.countryName, item: `${BASE_URL}/${lang}/watch/${ch.countrySlug}` },
        { '@type': 'ListItem', position: 4, name: ch.name, item: `${BASE_URL}/${lang}/channels/${ch.id}` },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `Is ${ch.name} free to watch online?`, acceptedAnswer: { '@type': 'Answer', text: `Yes, ${ch.name} is completely free on CartoTV. No registration or subscription required.` } },
      { '@type': 'Question', name: `What language does ${ch.name} broadcast in?`, acceptedAnswer: { '@type': 'Answer', text: `${ch.name} ${ch.language ? `broadcasts in ${ch.language}` : 'broadcasts in its local language'}. It is a ${ch.category} channel from ${ch.countryName}.` } },
      { '@type': 'Question', name: `Can I watch ${ch.name} outside ${ch.countryName}?`, acceptedAnswer: { '@type': 'Answer', text: `Yes — CartoTV gives you access to ${ch.name} from anywhere in the world, on any browser, for free.` } },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(broadcastSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-4 py-8">

          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href={`/${lang}`} className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href={`/${lang}/channels`} className="hover:text-primary transition-colors">Channels</Link></li>
              <li>/</li>
              <li><Link href={`/${lang}/watch/${ch.countrySlug}`} className="hover:text-primary transition-colors">{ch.countryName}</Link></li>
              <li>/</li>
              <li className="text-foreground font-medium truncate max-w-[200px]">{ch.name}</li>
            </ol>
          </nav>

          <div className="flex items-start gap-5 mb-8">
            {ch.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={ch.logo} alt={`${ch.name} logo`}
                className="w-20 h-20 rounded-xl object-contain bg-white/5 p-2 flex-shrink-0 border border-border/30" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />LIVE
                </span>
                <Link href={`/${lang}/category/${ch.category.toLowerCase()}`}
                  className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  {catIcon} {ch.category}
                </Link>
                <Link href={`/${lang}/watch/${ch.countrySlug}`}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs hover:text-foreground transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ch.countryFlag} alt="" className="w-4 h-3 object-cover rounded" />
                  {ch.countryName}
                </Link>
                {ch.language && <span className="text-xs text-muted-foreground">{ch.language}</span>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Watch {ch.name} Live Stream Free
              </h1>
              <p className="text-muted-foreground">Stream {ch.name} online for free — no sign-up, no subscription.</p>
            </div>
          </div>

          <div className="mb-10">
            <ChannelPageClient channel={{ ...ch, description }} lang={lang} />
          </div>

          <section className="prose prose-invert max-w-none mb-12">
            <h2>About {ch.name}</h2>
            <p>{description}</p>
            <h3>How to Watch {ch.name} Online Free</h3>
            <ol>
              <li>Visit <strong>cartotv.com</strong> from any device</li>
              <li>Navigate to <strong>{ch.countryName}</strong> on the 3D globe or search for &quot;{ch.name}&quot;</li>
              <li>Click play — your live stream starts instantly</li>
              <li>No account, no subscription, no download required</li>
            </ol>
            <h3>Frequently Asked Questions</h3>
            <dl>
              <dt>Is {ch.name} free?</dt>
              <dd>Yes, completely free. No registration or payment needed on CartoTV.</dd>
              <dt>What category is {ch.name}?</dt>
              <dd>{ch.name} is a <strong>{ch.category}</strong> channel{ch.language ? ` in ${ch.language}` : ''} from {ch.countryName}.</dd>
              <dt>Can I watch from outside {ch.countryName}?</dt>
              <dd>Yes — CartoTV works from anywhere in the world, on any browser.</dd>
              {ch.website && (<><dt>Official website?</dt><dd><a href={ch.website} target="_blank" rel="noopener noreferrer">{ch.website}</a></dd></>)}
            </dl>
          </section>

          {related.length > 0 && (
            <aside className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">More {ch.countryName} Channels</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {related.map(rc => (
                  <Link key={rc.id} href={`/${lang}/channels/${rc.id}`}
                    className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary border border-border/30 hover:border-primary/30 transition-all">
                    {rc.logo
                      ? <img src={rc.logo} alt={rc.name} className="w-7 h-7 rounded object-contain bg-white/5" loading="lazy" />
                      : <span className="text-lg">{getCategoryIcon(rc.category)}</span>
                    }
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{rc.name}</p>
                      <p className="text-[10px] text-muted-foreground capitalize">{rc.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href={`/${lang}/watch/${ch.countrySlug}`} className="inline-block mt-4 text-sm text-primary hover:underline">
                View all {ch.countryName} channels →
              </Link>
            </aside>
          )}
        </div>
      </div>
    </>
  )
}
