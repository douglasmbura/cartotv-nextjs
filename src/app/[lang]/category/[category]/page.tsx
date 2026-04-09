import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllChannels, getChannelsByCategory, CATEGORY_META, getAllCategories, ChannelCategory } from '@/data/staticChannels'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']
const BASE_URL = 'https://cartotv.com'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return SUPPORTED_LANGS.flatMap(lang =>
    categories.map(category => ({ lang, category }))
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; category: string }> }
): Promise<Metadata> {
  const { lang, category } = await params
  const meta = CATEGORY_META[category as ChannelCategory]
  if (!meta) return {}

  const title = `Free Live ${meta.label} TV Channels Online | CartoTV`
  const path = `/category/${category}`
  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `${BASE_URL}/${l}${path}` })
  hreflang['x-default'] = `${BASE_URL}/en${path}`

  return {
    title,
    description: `${meta.description} Stream free online — no sign-up required.`,
    alternates: { canonical: `${BASE_URL}/${lang}${path}`, languages: hreflang },
    openGraph: {
      title, description: meta.description,
      url: `${BASE_URL}/${lang}${path}`,
      siteName: 'CartoTV',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; category: string }>
}) {
  const { lang, category } = await params
  const catMeta = CATEGORY_META[category as ChannelCategory]
  if (!catMeta) notFound()

  const channels = getChannelsByCategory(category as ChannelCategory)
  const allChannels = getAllChannels()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Free Live ${catMeta.label} TV Channels`,
    description: catMeta.description,
    url: `${BASE_URL}/${lang}/category/${category}`,
    numberOfItems: channels.length,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Channels', item: `${BASE_URL}/${lang}/channels` },
        { '@type': 'ListItem', position: 3, name: catMeta.label, item: `${BASE_URL}/${lang}/category/${category}` },
      ],
    },
  }

  // Other categories for sidebar
  const otherCategories = getAllCategories().filter(c => c !== category)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href={`/${lang}`} className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href={`/${lang}/channels`} className="hover:text-primary transition-colors">Channels</Link></li>
              <li>/</li>
              <li className="text-foreground">{catMeta.label}</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-5xl">{catMeta.icon}</span>
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Free Live {catMeta.label} TV Channels
                </h1>
                <p className="text-muted-foreground mt-1">
                  {channels.length} featured channels · Stream free online · No sign-up
                </p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-3xl">{catMeta.description}</p>
          </div>

          <div className="flex gap-8">
            {/* Main channel grid */}
            <div className="flex-1 min-w-0">
              {channels.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-lg">No featured channels in this category yet.</p>
                  <p className="mt-2">
                    <Link href={`/${lang}/watch`} className="text-primary hover:underline">
                      Browse all 179 countries →
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {channels.map(ch => (
                    <Link key={ch.id} href={`/${lang}/channels/${ch.id}`}
                      className="group flex flex-col p-5 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-border/30 hover:border-primary/40 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        {ch.logo
                          ? <img src={ch.logo} alt={`${ch.name} logo`} className="w-12 h-12 rounded-xl object-contain bg-white/5 p-1.5 flex-shrink-0" loading="lazy" />
                          : <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 text-xl">📺</div>
                        }
                        <div className="min-w-0">
                          <p className="font-bold truncate group-hover:text-primary transition-colors">{ch.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <img src={ch.countryFlag} alt="" className="w-4 h-3 object-cover rounded" loading="lazy" />
                            <span className="text-xs text-muted-foreground">{ch.countryName}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                        {ch.description.slice(0, 130)}…
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-red-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                          LIVE
                        </span>
                        <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Watch free →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* SEO content block */}
              <section className="mt-14 prose prose-invert max-w-none">
                <h2>Watch Free {catMeta.label} TV Online</h2>
                <p>
                  CartoTV gives you free access to {catMeta.label.toLowerCase()} channels from {new Set(channels.map(c => c.countryName)).size} countries,
                  with no registration, subscription, or download required. {catMeta.description}
                </p>
                <p>
                  Beyond our featured channels, CartoTV's interactive globe streams live {catMeta.label.toLowerCase()} content from 179 countries.{' '}
                  <Link href={`/${lang}`}>Open the globe</Link> and click any country to browse its local {catMeta.label.toLowerCase()} channels.
                </p>
                <h3>Browse {catMeta.label} by Country</h3>
                <ul>
                  {[...new Set(channels.map(c => ({ name: c.countryName, slug: c.countrySlug })))].map(c => (
                    <li key={c.slug}>
                      <Link href={`/${lang}/watch/${c.slug}`}>
                        Watch {c.name} {catMeta.label} channels free online
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar — other categories */}
            <aside className="w-56 flex-shrink-0 hidden lg:block">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Other Categories</h3>
              <div className="space-y-1">
                {otherCategories.map(cat => {
                  const meta = CATEGORY_META[cat]
                  const count = allChannels.filter(c => c.category === cat).length
                  if (count === 0) return null
                  return (
                    <Link key={cat} href={`/${lang}/category/${cat}`}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-secondary/50 text-sm text-muted-foreground hover:text-foreground transition-all">
                      <span>{meta.icon}</span>
                      <span>{meta.label}</span>
                      <span className="ml-auto text-xs text-muted-foreground/60">{count}</span>
                    </Link>
                  )
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
