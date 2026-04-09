import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, getAllSlugs } from '@/data/blog'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']
const BASE_URL = 'https://cartotv.com'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return SUPPORTED_LANGS.flatMap(lang =>
    slugs.map(slug => ({ lang, slug }))
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; slug: string }> }
): Promise<Metadata> {
  const { lang, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const path = `/blog/${slug}`
  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `${BASE_URL}/${l}${path}` })
  hreflang['x-default'] = `${BASE_URL}/en${path}`

  return {
    title: `${post.title} | CartoTV Blog`,
    description: post.description,
    alternates: { canonical: `${BASE_URL}/${lang}${path}`, languages: hreflang },
    openGraph: {
      title: post.title, description: post.description,
      url: `${BASE_URL}/${lang}${path}`,
      siteName: 'CartoTV', type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts().filter(p => p.slug !== slug).slice(0, 3)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${BASE_URL}/${lang}/blog/${slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: 'CartoTV', url: BASE_URL },
    publisher: {
      '@type': 'Organization', name: 'CartoTV', url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.png` },
    },
    image: `${BASE_URL}/og-image.png`,
    keywords: post.tags.join(', '),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/${lang}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/${lang}/blog/${slug}` },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-4 py-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href={`/${lang}`} className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href={`/${lang}/blog`} className="hover:text-primary transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-foreground truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          <article>
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                  {post.category}
                </span>
                <time className="text-xs text-muted-foreground">{post.publishedAt}</time>
                <span className="text-xs text-muted-foreground">{post.readingTime} min read</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{post.title}</h1>
              <p className="text-xl text-muted-foreground">{post.description}</p>
            </header>

            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-strong:text-white
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-ol:text-muted-foreground prose-ul:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <footer className="mt-12 pt-8 border-t border-border/30">
              <p className="text-sm text-muted-foreground mb-3">Tagged:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          </article>

          {/* CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center">
            <p className="text-white font-bold text-lg mb-2">
              Watch Free Live TV from 179 Countries
            </p>
            <p className="text-muted-foreground text-sm mb-5">
              No sign-up, no subscription. Just open and stream.
            </p>
            <Link href={`/${lang}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Open CartoTV Globe →
            </Link>
          </div>

          {/* Related posts */}
          {allPosts.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-bold text-white mb-6">More from CartoTV Blog</h2>
              <div className="space-y-5">
                {allPosts.map(p => (
                  <article key={p.slug} className="flex gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/20">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">{p.publishedAt} · {p.readingTime} min</p>
                      <h3 className="font-semibold text-white hover:text-primary transition-colors">
                        <Link href={`/${lang}/blog/${p.slug}`}>{p.title}</Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
