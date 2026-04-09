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
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `https://cartotv.com/${l}/who-we-are` })
  hreflang['x-default'] = 'https://cartotv.com/en/who-we-are'
  return {
    title: 'Who We Are – Carto TV',
    description: 'Learn about Carto TV\'s mission to bring free global television to everyone through an interactive 3D globe.',
    alternates: { canonical: `https://cartotv.com/${lang}/who-we-are`, languages: hreflang },
    openGraph: {
      title: 'Who We Are – Carto TV',
      description: 'Learn about CartoTV\'s mission to bring free global television to everyone.',
      url: `https://cartotv.com/${lang}/who-we-are`,
      siteName: 'CartoTV',
    },
  }
}

export default async function WhoWeArePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Who We Are – Carto TV',
    description: 'Learn about CartoTV\'s mission to bring free global television to everyone.',
    url: `https://cartotv.com/${lang}/who-we-are`,
    publisher: { '@type': 'Organization', name: 'Carto TV', url: 'https://cartotv.com', logo: 'https://cartotv.com/favicon.png' },
    mainEntity: {
      '@type': 'Organization',
      name: 'Carto TV',
      description: 'A platform dedicated to providing free access to live television channels from around the world.',
      foundingDate: '2024',
      slogan: 'Live streaming worldwide',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://cartotv.com/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Who We Are', item: `https://cartotv.com/${lang}/who-we-are` },
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
            <div className="text-center">
              <h1 className="text-3xl font-bold gradient-text mb-4">Who We Are</h1>
              <p className="text-muted-foreground">Bringing the world's television to your fingertips</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Carto TV is dedicated to providing free access to live television channels from around the world. Our interactive 3D globe interface makes discovering international content an engaging and immersive experience. We believe that access to global media should be free and accessible to everyone.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">What We Offer</h2>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                <li>10,000+ free TV channels from 179 countries</li>
                <li>Interactive 3D satellite globe navigation in HD on any device</li>
                <li>Live streaming of News, Sports, Entertainment, Movies in genres like Action, Horror, Sci-Fi, Crime, Comedy and more</li>
                <li>No Registration, No Subscription Required, Ever – Completely Free</li>
                <li>Ad-free viewing experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Built by Geo-Appsmith</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>CartoTV is proudly built by Geo-Appsmith, a location-services consulting company powered by a dedicated team of GIS Developers and Engineers passionate about creating tools, applications, and geospatial systems that truly delight.</p>
                <p>We are driven by curiosity and innovation — constantly pushing boundaries and solving problems in creative, unconventional ways. We love understanding how things work, asking the tough questions, and designing smart solutions that make a real impact.</p>
                <p>At our core, we are especially committed to developing geospatial solutions that serve underserved communities around the world. We believe maps and location intelligence are powerful tools for inclusion, access, and opportunity.</p>
                <p>Whether you have a mapping task, a GIS project, or any idea involving maps — big or small — we'd love to collaborate.</p>
                <p>Feel free to reach out to us at{' '}
                  <a href="mailto:hello@cartotv.com" className="text-primary hover:underline font-medium">hello@cartotv.com</a>
                  {' '}and let's explore how we can work together to bring your vision to life.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
