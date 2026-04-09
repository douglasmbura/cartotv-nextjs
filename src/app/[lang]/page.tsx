import type { Metadata } from 'next'
import { countries } from '@/data/countries'
import { toSlug } from '@/utils/countrySlug'
import GlobeApp from '@/components/GlobeApp'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']

const SEO_TITLES: Record<string, string> = {
  en: 'CartoTV – Free Online Live TV Channels from Around the World',
  es: 'CartoTV – Canales de TV en Vivo Gratis de Todo el Mundo',
  fr: 'CartoTV – Chaînes TV en Direct Gratuites du Monde Entier',
  de: 'CartoTV – Kostenlose Live-TV-Sender aus aller Welt',
  pt: 'CartoTV – Canais de TV ao Vivo Grátis de Todo o Mundo',
  ar: 'CartoTV – قنوات تلفزيون مباشر مجانية من جميع أنحاء العالم',
  zh: 'CartoTV – 来自世界各地的免费直播电视频道',
  hi: 'CartoTV – दुनिया भर से मुफ्त लाइव टीवी चैनल',
  sw: 'CartoTV – Chaneli za TV Moja kwa Moja Bure kutoka Duniani Kote',
  id: 'CartoTV – Saluran TV Langsung Gratis dari Seluruh Dunia',
  ru: 'CartoTV – Бесплатные Прямые ТВ-Каналы со Всего Мира',
}

const SEO_DESCS: Record<string, string> = {
  en: 'Watch live TV channels from around the world with CartoTV. Stream news, sports, movies, kids and entertainment channels online by country — No sign-up required.',
  es: 'Mira canales de TV en vivo de todo el mundo con CartoTV. Transmite noticias, deportes, películas y entretenimiento por país — Sin registro.',
  fr: 'Regardez des chaînes TV en direct du monde entier avec CartoTV. Diffusez des actualités, sports, films et divertissements par pays — Sans inscription.',
  de: 'Schaue Live-TV-Sender aus aller Welt mit CartoTV. Streame Nachrichten, Sport, Filme und Entertainment nach Land — Keine Anmeldung erforderlich.',
  pt: 'Assista canais de TV ao vivo de todo o mundo com CartoTV. Transmita notícias, esportes, filmes por país — Sem cadastro.',
  ar: 'شاهد قنوات التلفزيون المباشر من جميع أنحاء العالم مع CartoTV — لا يلزم التسجيل.',
  zh: '通过CartoTV观看来自世界各地的直播电视频道。按国家流式传输新闻、体育、电影 — 无需注册。',
  hi: 'CartoTV के साथ दुनिया भर से लाइव टीवी चैनल देखें। देश के अनुसार समाचार, खेल, फिल्में स्ट्रीम करें — कोई साइन-अप आवश्यक नहीं।',
  sw: 'Tazama chaneli za TV moja kwa moja kutoka duniani kote na CartoTV. Angalia habari, michezo, sinema kwa nchi — Hakuna usajili unaohitajika.',
  id: 'Tonton saluran TV langsung dari seluruh dunia dengan CartoTV. Streaming berita, olahraga, film per negara — Tanpa pendaftaran.',
  ru: 'Смотрите прямые ТВ-каналы со всего мира с CartoTV. Транслируйте новости, спорт, кино по странам — Регистрация не нужна.',
}

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params
  const title = SEO_TITLES[lang] ?? SEO_TITLES.en
  const description = SEO_DESCS[lang] ?? SEO_DESCS.en

  const hreflang: Record<string, string> = {}
  SUPPORTED_LANGS.forEach(l => { hreflang[l] = `https://cartotv.com/${l}` })
  hreflang['x-default'] = 'https://cartotv.com/en'

  return {
    title,
    description,
    alternates: { canonical: `https://cartotv.com/${lang}`, languages: hreflang },
    openGraph: {
      title, description,
      url: `https://cartotv.com/${lang}`,
      siteName: 'CartoTV',
      images: [{ url: 'https://cartotv.com/og-image.png', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: ['https://cartotv.com/og-image.png'] },
  }
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Carto TV',
    alternateName: 'CartoTV',
    url: 'https://cartotv.com',
    description: 'Watch free live world TV from anywhere. No account, no signup. CartoTV makes discovering global news, sports, and culture simple.',
    applicationCategory: 'Entertainment',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript, WebGL support',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1250', bestRating: '5', worstRating: '1' },
    featureList: ['10,000+ free TV channels','179 countries covered','Interactive 3D globe navigation','No registration required','11 languages supported'],
    inLanguage: SUPPORTED_LANGS,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Is Carto TV free to use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Carto TV is completely free. No registration, subscription, or payment is required to watch any of our 10,000+ live TV channels from 179 countries.' } },
      { '@type': 'Question', name: 'How does Carto TV work?', acceptedAnswer: { '@type': 'Answer', text: 'Carto TV uses an interactive 3D satellite globe. Click any country marker to browse and stream live TV channels from that location instantly.' } },
      { '@type': 'Question', name: 'Do I need to create an account?', acceptedAnswer: { '@type': 'Answer', text: 'No account or registration is needed. Visit Carto TV and start watching live TV channels immediately from any device with a web browser.' } },
      { '@type': 'Question', name: 'What types of channels are available?', acceptedAnswer: { '@type': 'Answer', text: 'We offer live streaming of News, Sports, Entertainment, Movies, Music, Kids content, Documentary and more from 179 countries.' } },
    ],
  }

  return (
    <>
      {/* JSON-LD — rendered server-side, Google sees this */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* The full interactive globe app — client component */}
      <GlobeApp lang={lang} />

      {/* SEO content block — visible to crawlers, visually hidden on the globe UI */}
      <div
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
        aria-hidden="true"
      >
        <main>
          <h1>CartoTV – Watch Free Live TV Channels Worldwide</h1>
          <p>Stream 10,000+ live TV channels from 179 countries on an interactive 3D satellite globe. No registration required.</p>

          <section>
            <h2>Watch Live TV by Category</h2>
            <ul>
              <li>News – Live news from BBC, Al Jazeera, CNN, France 24, DW and more</li>
              <li>Sports – Football, cricket, basketball, tennis channels worldwide</li>
              <li>Entertainment – Movies, comedy, drama, reality TV from every continent</li>
              <li>Kids – Children's channels and cartoons from around the world</li>
              <li>Music – Music TV channels and live concerts</li>
              <li>Documentary – Nature, science, history documentaries</li>
            </ul>
          </section>

          <section>
            <h2>Browse Live TV by Country</h2>
            <p>Click any country on our interactive 3D globe to discover local TV channels.</p>
            <nav aria-label="Countries">
              <ul>
                {countries.map(c => (
                  <li key={c.name}>
                    <a href={`/${lang}/watch/${toSlug(c.name)}`}>
                      Watch {c.name} TV channels free online
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section>
            <h2>Why Carto TV?</h2>
            <ul>
              <li>100% free – no subscription, no credit card</li>
              <li>No account or registration needed</li>
              <li>10,000+ channels from 179 countries</li>
              <li>Available in 11 languages</li>
              <li>Works on any device with a web browser</li>
            </ul>
          </section>

          <section>
            <h2>Frequently Asked Questions</h2>
            <dl>
              <dt>Is Carto TV free?</dt>
              <dd>Yes, completely free with no registration required.</dd>
              <dt>How many channels are available?</dt>
              <dd>Over 10,000 live TV channels from 179 countries.</dd>
              <dt>What languages are supported?</dt>
              <dd>English, Spanish, French, German, Portuguese, Arabic, Chinese, Hindi, Swahili, Indonesian, and Russian.</dd>
            </dl>
          </section>
        </main>
      </div>
    </>
  )
}
