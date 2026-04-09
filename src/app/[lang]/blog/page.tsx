import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/data/blog'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']
const BASE_URL = 'https://cartotv.com'

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params
  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `${BASE_URL}/${l}/blog` })
  hreflang['x-default'] = `${BASE_URL}/en/blog`
  return {
    title: 'Blog — Free Live TV Guides, Tips & Streaming Advice | CartoTV',
    description: 'Free live TV streaming guides, country channel directories, sports streaming tips, and cord-cutting advice from the CartoTV team.',
    alternates: { canonical: `${BASE_URL}/${lang}/blog`, languages: hreflang },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  guides: 'bg-blue-500/20 text-blue-400',
  comparison: 'bg-purple-500/20 text-purple-400',
  sports: 'bg-green-500/20 text-green-400',
  regional: 'bg-amber-500/20 text-amber-400',
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const posts = getAllPosts()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CartoTV Blog',
    description: 'Free live TV streaming guides, tips, and cord-cutting advice.',
    url: `${BASE_URL}/${lang}/blog`,
    publisher: { '@type': 'Organization', name: 'CartoTV', url: BASE_URL },
    blogPost: posts.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${BASE_URL}/${lang}/blog/${p.slug}`,
      datePublished: p.publishedAt,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-4 py-10">

          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <ol className="flex items-center gap-2">
              <li><Link href={`/${lang}`} className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-foreground">Blog</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-white mb-3">CartoTV Blog</h1>
          <p className="text-muted-foreground text-lg mb-12">
            Guides, tips, and country spotlights to help you get the most out of free live TV streaming worldwide.
          </p>

          <div className="space-y-8">
            {posts.map(post => (
              <article key={post.slug} className="group border-b border-border/30 pb-8 last:border-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${CATEGORY_COLORS[post.category] ?? 'bg-secondary text-muted-foreground'}`}>
                    {post.category}
                  </span>
                  <time className="text-xs text-muted-foreground">{post.publishedAt}</time>
                  <span className="text-xs text-muted-foreground">{post.readingTime} min read</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-secondary text-muted-foreground text-xs">#{tag}</span>
                    ))}
                  </div>
                  <Link href={`/${lang}/blog/${post.slug}`}
                    className="text-sm text-primary hover:underline flex-shrink-0">
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
