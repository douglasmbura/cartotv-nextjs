/**
 * Static channel registry for SEO pages.
 *
 * These are well-known, publicly broadcast channels sourced from the
 * iptv-org project (https://github.com/iptv-org/iptv).
 * Each channel gets its own indexable URL:
 *   /en/channels/bbc-news-uk
 *   /en/channels/cnn-usa
 *   /en/channels/al-jazeera-qatar
 * etc.
 *
 * Stream URLs use the iptv-org public playlist format.
 */

export interface StaticChannel {
  id: string          // unique slug, e.g. "bbc-news-uk"
  name: string        // display name, e.g. "BBC News"
  countryCode: string // ISO 3166-1 alpha-2, e.g. "GB"
  countryName: string
  countrySlug: string // matches countries.ts slug
  countryFlag: string
  category: ChannelCategory
  language: string
  description: string
  website?: string
  logo?: string
  streamUrl: string   // direct m3u8 or iptv-org country playlist
}

export type ChannelCategory =
  | 'news' | 'sports' | 'entertainment' | 'kids' | 'music'
  | 'documentary' | 'movies' | 'lifestyle' | 'business' | 'religious' | 'general'

export const CATEGORY_META: Record<ChannelCategory, { label: string; icon: string; description: string }> = {
  news:          { label: 'News',          icon: '📰', description: 'Live news channels from around the world — breaking news, politics, weather, and current affairs.' },
  sports:        { label: 'Sports',        icon: '⚽', description: 'Live sports TV channels — football, cricket, basketball, tennis, and more from every continent.' },
  entertainment: { label: 'Entertainment', icon: '🎬', description: 'Movies, drama, comedy, reality TV and entertainment channels from every continent.' },
  kids:          { label: 'Kids',          icon: '🧒', description: "Children's channels, cartoons, and educational TV from around the world." },
  music:         { label: 'Music',         icon: '🎵', description: 'Music TV channels, live concerts, and video channels worldwide.' },
  documentary:   { label: 'Documentary',   icon: '🎥', description: 'Nature, science, history, and true crime documentary channels.' },
  movies:        { label: 'Movies',        icon: '🎞️', description: 'Free live movie channels streaming 24/7 from around the world.' },
  lifestyle:     { label: 'Lifestyle',     icon: '🌿', description: 'Cooking, fashion, travel, and home lifestyle channels.' },
  business:      { label: 'Business',      icon: '📈', description: 'Business news, finance, and market channels including Bloomberg and CNBC.' },
  religious:     { label: 'Religious',     icon: '🕌', description: 'Faith and religious programming channels from all traditions worldwide.' },
  general:       { label: 'General',       icon: '📺', description: 'General interest and mixed programming channels.' },
}

export const staticChannels: StaticChannel[] = [
  // ── UNITED KINGDOM ──────────────────────────────────────────────────────────
  {
    id: 'bbc-news-uk', name: 'BBC News', countryCode: 'GB', countryName: 'United Kingdom',
    countrySlug: 'united-kingdom', countryFlag: 'https://flagcdn.com/w80/gb.png',
    category: 'news', language: 'English',
    description: 'BBC News is the world\'s largest broadcast news organisation, delivering around-the-clock coverage of breaking news, analysis, and in-depth reports. Funded by the UK licence fee, BBC News has correspondents in every major country and is renowned for its impartial journalism. Watch live breaking news, weather, business, and international affairs from the most trusted name in broadcasting.',
    website: 'https://bbc.co.uk/news', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/120px-BBC_News_2019.svg.png',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/gb.m3u',
  },
  {
    id: 'sky-news-uk', name: 'Sky News', countryCode: 'GB', countryName: 'United Kingdom',
    countrySlug: 'united-kingdom', countryFlag: 'https://flagcdn.com/w80/gb.png',
    category: 'news', language: 'English',
    description: 'Sky News is a 24-hour British news channel covering breaking news, politics, business, sport, technology, entertainment, and world news. Part of Rupert Murdoch\'s News Corp empire, Sky News is known for its dramatic live coverage, award-winning journalists, and digital-first approach. It is available free-to-air across the UK and internationally via satellite and streaming.',
    website: 'https://news.sky.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/gb.m3u',
  },
  {
    id: 'itv-uk', name: 'ITV', countryCode: 'GB', countryName: 'United Kingdom',
    countrySlug: 'united-kingdom', countryFlag: 'https://flagcdn.com/w80/gb.png',
    category: 'entertainment', language: 'English',
    description: 'ITV is the UK\'s oldest and largest commercial free-to-air broadcaster. Home to iconic British shows including Coronation Street, Emmerdale, I\'m a Celebrity, and Britain\'s Got Talent. ITV also broadcasts major sporting events including the Rugby World Cup, FA Cup, and Six Nations. With over 70 years of broadcasting history, ITV is a cornerstone of British entertainment culture.',
    website: 'https://itv.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/gb.m3u',
  },

  // ── UNITED STATES ────────────────────────────────────────────────────────────
  {
    id: 'cnn-usa', name: 'CNN', countryCode: 'US', countryName: 'United States',
    countrySlug: 'united-states', countryFlag: 'https://flagcdn.com/w80/us.png',
    category: 'news', language: 'English',
    description: 'CNN (Cable News Network) is one of the world\'s most recognised news networks, founded in 1980 by Ted Turner as the first 24-hour cable news channel. CNN covers breaking news, politics, business, entertainment, health, and international affairs. Known for landmark coverage of historic events including the Gulf War, 9/11, and multiple US presidential elections, CNN reaches over 200 countries and territories worldwide.',
    website: 'https://cnn.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/us.m3u',
  },
  {
    id: 'fox-news-usa', name: 'Fox News', countryCode: 'US', countryName: 'United States',
    countrySlug: 'united-states', countryFlag: 'https://flagcdn.com/w80/us.png',
    category: 'news', language: 'English',
    description: 'Fox News Channel is an American conservative cable and satellite news television channel. Launched in 1996, Fox News is the most-watched cable news network in the United States. It covers US politics, breaking news, business, and opinion programming. Fox News is known for its primetime commentary shows and has been a dominant force in American political media for over two decades.',
    website: 'https://foxnews.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/us.m3u',
  },
  {
    id: 'espn-usa', name: 'ESPN', countryCode: 'US', countryName: 'United States',
    countrySlug: 'united-states', countryFlag: 'https://flagcdn.com/w80/us.png',
    category: 'sports', language: 'English',
    description: 'ESPN (Entertainment and Sports Programming Network) is America\'s premier sports network, broadcasting live NFL, NBA, MLB, college sports, soccer, tennis, boxing, and more. Founded in 1979, ESPN pioneered the 24-hour sports news format with SportsCenter. ESPN broadcasts major events including Monday Night Football, the NBA Finals, College Football Playoff, and the US Open.',
    website: 'https://espn.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/us.m3u',
  },
  {
    id: 'cartoon-network-usa', name: 'Cartoon Network', countryCode: 'US', countryName: 'United States',
    countrySlug: 'united-states', countryFlag: 'https://flagcdn.com/w80/us.png',
    category: 'kids', language: 'English',
    description: 'Cartoon Network is one of the world\'s most popular children\'s entertainment channels, home to iconic animated series including Adventure Time, Regular Show, The Amazing World of Gumball, Ben 10, and Steven Universe. Launched in 1992, Cartoon Network reaches hundreds of millions of households across 175+ countries and has shaped the childhoods of multiple generations worldwide.',
    website: 'https://cartoonnetwork.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/us.m3u',
  },

  // ── QATAR ─────────────────────────────────────────────────────────────────
  {
    id: 'al-jazeera-qatar', name: 'Al Jazeera English', countryCode: 'QA', countryName: 'Qatar',
    countrySlug: 'qatar', countryFlag: 'https://flagcdn.com/w80/qa.png',
    category: 'news', language: 'English',
    description: 'Al Jazeera English is a 24-hour global news channel headquartered in Doha, Qatar. Since its 2006 launch, it has transformed international news with its coverage of underreported stories from Africa, Asia, and the Middle East. Al Jazeera\'s in-depth documentaries, investigative journalism, and on-the-ground reporting from conflict zones have won numerous international awards and changed the global news landscape.',
    website: 'https://aljazeera.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/qa.m3u',
  },

  // ── INDIA ─────────────────────────────────────────────────────────────────
  {
    id: 'ndtv-india', name: 'NDTV 24x7', countryCode: 'IN', countryName: 'India',
    countrySlug: 'india', countryFlag: 'https://flagcdn.com/w80/in.png',
    category: 'news', language: 'English',
    description: 'NDTV 24x7 is India\'s premier English-language news channel, delivering round-the-clock coverage of Indian politics, business, sports, entertainment, and international affairs. Founded in 1988, NDTV is known for its investigative journalism, election coverage, and programmes like "We The People" that shaped Indian news culture. Watch live breaking news, prime-time debates, and in-depth analysis.',
    website: 'https://ndtv.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/in.m3u',
  },
  {
    id: 'zee-tv-india', name: 'Zee TV', countryCode: 'IN', countryName: 'India',
    countrySlug: 'india', countryFlag: 'https://flagcdn.com/w80/in.png',
    category: 'entertainment', language: 'Hindi',
    description: 'Zee TV is India\'s most popular Hindi general entertainment channel, home to top-rated reality shows, family dramas, and Bollywood entertainment. Launched in 1992, Zee TV was India\'s first private satellite channel and transformed Indian television. Popular shows include Dance India Dance, Kumkum Bhagya, Kundali Bhagya, and Sa Re Ga Ma Pa. Zee TV reaches over 600 million viewers across India and the Indian diaspora globally.',
    website: 'https://zee5.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/in.m3u',
  },
  {
    id: 'star-sports-india', name: 'Star Sports', countryCode: 'IN', countryName: 'India',
    countrySlug: 'india', countryFlag: 'https://flagcdn.com/w80/in.png',
    category: 'sports', language: 'Hindi',
    description: 'Star Sports is India\'s leading sports network, broadcasting live cricket, football, badminton, tennis, kabaddi, and more. Home to broadcast rights for the Indian Premier League (IPL), ICC tournaments, Pro Kabaddi League, and Indian Super League. Cricket, India\'s national obsession, makes Star Sports one of the most-watched channels in the country, with IPL matches drawing over 200 million viewers.',
    website: 'https://hotstar.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/in.m3u',
  },
  {
    id: 'aaj-tak-india', name: 'Aaj Tak', countryCode: 'IN', countryName: 'India',
    countrySlug: 'india', countryFlag: 'https://flagcdn.com/w80/in.png',
    category: 'news', language: 'Hindi',
    description: 'Aaj Tak is India\'s most-watched Hindi news channel, consistently ranking as the number-one news channel in India. Part of the India Today Group, Aaj Tak delivers fast-paced breaking news, political coverage, crime reporting, and entertainment news. Its bold headline style and rapid-fire news presentation revolutionised Hindi news broadcasting. Watch live coverage of Indian elections, major events, and daily news.',
    website: 'https://aajtak.in',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/in.m3u',
  },

  // ── FRANCE ───────────────────────────────────────────────────────────────
  {
    id: 'france-24-france', name: 'France 24', countryCode: 'FR', countryName: 'France',
    countrySlug: 'france', countryFlag: 'https://flagcdn.com/w80/fr.png',
    category: 'news', language: 'French',
    description: 'France 24 is France\'s international news channel, broadcasting in French, English, Arabic, and Spanish. Launched in 2006 with a mission to offer a French perspective on world events, France 24 covers breaking news, politics, business, sports, and culture. Modelled on BBC World and CNN, France 24 reaches 400 million homes in 180+ countries and is a key part of France\'s cultural diplomacy effort.',
    website: 'https://france24.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/fr.m3u',
  },
  {
    id: 'tf1-france', name: 'TF1', countryCode: 'FR', countryName: 'France',
    countrySlug: 'france', countryFlag: 'https://flagcdn.com/w80/fr.png',
    category: 'entertainment', language: 'French',
    description: 'TF1 is France\'s most-watched television channel and the leading private broadcaster in Europe. Since its privatisation in 1987, TF1 has dominated French entertainment with popular reality shows, blockbuster films, soap operas, and major sporting events including the Football World Cup and Roland Garros. With an average daily audience of millions, TF1 is central to French popular culture.',
    website: 'https://tf1.fr',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/fr.m3u',
  },

  // ── GERMANY ──────────────────────────────────────────────────────────────
  {
    id: 'dw-germany', name: 'Deutsche Welle (DW)', countryCode: 'DE', countryName: 'Germany',
    countrySlug: 'germany', countryFlag: 'https://flagcdn.com/w80/de.png',
    category: 'news', language: 'German',
    description: 'Deutsche Welle (DW) is Germany\'s international broadcaster, delivering news and information in 32 languages to over 250 million people weekly. Funded by German taxpayers, DW provides independent journalism covering international news, German politics, European affairs, and global culture. DW is known for its in-depth documentaries, current affairs shows, and digital-first content strategy across TV, radio, and online platforms.',
    website: 'https://dw.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/de.m3u',
  },
  {
    id: 'das-erste-germany', name: 'Das Erste (ARD)', countryCode: 'DE', countryName: 'Germany',
    countrySlug: 'germany', countryFlag: 'https://flagcdn.com/w80/de.png',
    category: 'general', language: 'German',
    description: 'Das Erste is Germany\'s flagship public television channel, operated by ARD (the consortium of public broadcasters). Broadcasting since 1954, Das Erste is known for quality journalism, the beloved crime series "Tatort", major sporting events, and political coverage. With over 35 million daily viewers, it is Germany\'s most-watched channel and a benchmark for public service broadcasting in Europe.',
    website: 'https://daserste.de',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/de.m3u',
  },

  // ── KENYA ─────────────────────────────────────────────────────────────────
  {
    id: 'citizen-tv-kenya', name: 'Citizen TV', countryCode: 'KE', countryName: 'Kenya',
    countrySlug: 'kenya', countryFlag: 'https://flagcdn.com/w80/ke.png',
    category: 'general', language: 'Swahili',
    description: 'Citizen TV is Kenya\'s most-watched television channel, owned by Royal Media Services. Broadcasting since 1999, Citizen TV leads in local Swahili-language programming, news, drama series, and reality shows. Popular shows include Tahidi High, Maria, and the news programme Citizen News. Citizen TV\'s political coverage and investigative journalism have made it the go-to channel for breaking Kenyan news and commentary.',
    website: 'https://citizentv.co.ke',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ke.m3u',
  },
  {
    id: 'kbc-kenya', name: 'KBC Channel 1', countryCode: 'KE', countryName: 'Kenya',
    countrySlug: 'kenya', countryFlag: 'https://flagcdn.com/w80/ke.png',
    category: 'general', language: 'Swahili',
    description: 'Kenya Broadcasting Corporation (KBC) Channel 1 is Kenya\'s national public broadcaster, established in 1928 as East Africa\'s first broadcasting service. KBC broadcasts national news in Swahili and English, educational programming, cultural shows, and parliamentary coverage. As the state broadcaster, KBC plays a vital role in public communication, civic education, and promoting Kenyan culture and languages.',
    website: 'https://kbc.co.ke',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ke.m3u',
  },
  {
    id: 'ntv-kenya', name: 'NTV Kenya', countryCode: 'KE', countryName: 'Kenya',
    countrySlug: 'kenya', countryFlag: 'https://flagcdn.com/w80/ke.png',
    category: 'news', language: 'English',
    description: 'NTV Kenya (Nation Television) is Kenya\'s premier English-language news channel, owned by Nation Media Group — East and Central Africa\'s largest media house. NTV is known for its hard-hitting investigative journalism, quality news bulletins, and programmes like "The Trend" and "Tukuza". The channel covers Kenyan politics, business, sports, and international news from an East African perspective.',
    website: 'https://ntv.co.ke',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ke.m3u',
  },

  // ── NIGERIA ───────────────────────────────────────────────────────────────
  {
    id: 'channels-tv-nigeria', name: 'Channels TV', countryCode: 'NG', countryName: 'Nigeria',
    countrySlug: 'nigeria', countryFlag: 'https://flagcdn.com/w80/ng.png',
    category: 'news', language: 'English',
    description: 'Channels TV is Nigeria\'s most-watched 24-hour news channel, renowned for its independent, unbiased journalism. Founded in 1995, it was Nigeria\'s first private television station and pioneered professional broadcast journalism in West Africa. Channels TV covers Nigerian politics, business, sports, and international news. Its flagship show "Sunrise Daily" is the most-watched morning news show in Nigeria.',
    website: 'https://channelstv.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ng.m3u',
  },
  {
    id: 'arise-tv-nigeria', name: 'Arise TV', countryCode: 'NG', countryName: 'Nigeria',
    countrySlug: 'nigeria', countryFlag: 'https://flagcdn.com/w80/ng.png',
    category: 'news', language: 'English',
    description: 'Arise TV is a pan-African news network based in Nigeria, delivering news and current affairs from an African perspective to audiences worldwide. Known for its bold political coverage, premium production quality, and flagship shows like "Morning Show" and "The Platform", Arise TV has become a leading voice in African journalism. The channel is broadcast across Africa and to the diaspora globally.',
    website: 'https://arise.tv',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ng.m3u',
  },

  // ── SOUTH AFRICA ─────────────────────────────────────────────────────────
  {
    id: 'sabc-news-south-africa', name: 'SABC News', countryCode: 'ZA', countryName: 'South Africa',
    countrySlug: 'south-africa', countryFlag: 'https://flagcdn.com/w80/za.png',
    category: 'news', language: 'English',
    description: 'SABC News is South Africa\'s public broadcasting news channel, delivering 24-hour coverage of South African and African news, politics, business, sports, and international affairs in 11 official languages. As the continent\'s largest broadcaster, SABC News covers South Africa\'s democratic processes, economic developments, and social issues with a commitment to public interest journalism.',
    website: 'https://sabcnews.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/za.m3u',
  },

  // ── BRAZIL ───────────────────────────────────────────────────────────────
  {
    id: 'globo-brazil', name: 'Globo', countryCode: 'BR', countryName: 'Brazil',
    countrySlug: 'brazil', countryFlag: 'https://flagcdn.com/w80/br.png',
    category: 'entertainment', language: 'Portuguese',
    description: 'TV Globo is Brazil\'s largest television network and one of the most-watched TV channels in the world. Since 1965, Globo has dominated Brazilian entertainment with iconic telenovelas (soap operas), news programmes, reality shows, and Carnival coverage. With over 100 million daily viewers, Globo broadcasts the most popular shows in Brazil including Big Brother Brasil, Jornal Nacional, and countless award-winning telenovelas.',
    website: 'https://globo.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/br.m3u',
  },

  // ── SPAIN ─────────────────────────────────────────────────────────────────
  {
    id: 'rtve-spain', name: 'RTVE La 1', countryCode: 'ES', countryName: 'Spain',
    countrySlug: 'spain', countryFlag: 'https://flagcdn.com/w80/es.png',
    category: 'general', language: 'Spanish',
    description: 'RTVE La 1 is Spain\'s national public television channel, broadcasting since 1956. La 1 is the flagship channel of Radio Televisión Española (RTVE), Spain\'s public broadcaster. It covers national news, sport (including La Liga, Copa del Rey, and Olympics), entertainment, and culture. La 1 is home to the beloved talent show "Operación Triunfo" and Spain\'s Eurovision Song Contest selection.',
    website: 'https://rtve.es',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/es.m3u',
  },

  // ── JAPAN ─────────────────────────────────────────────────────────────────
  {
    id: 'nhk-japan', name: 'NHK World', countryCode: 'JP', countryName: 'Japan',
    countrySlug: 'japan', countryFlag: 'https://flagcdn.com/w80/jp.png',
    category: 'news', language: 'Japanese',
    description: 'NHK World is Japan\'s international public broadcaster, providing news, documentaries, and cultural programming in English and other languages. Run by NHK (Nippon Hoso Kyokai), Japan\'s national broadcaster since 1925, NHK World offers unique insight into Japanese culture, technology, and society alongside Asia-Pacific news coverage. Known for exceptional documentary filmmaking and innovative television production.',
    website: 'https://nhk.or.jp/nhkworld',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/jp.m3u',
  },

  // ── CHINA ─────────────────────────────────────────────────────────────────
  {
    id: 'cgtn-china', name: 'CGTN', countryCode: 'CN', countryName: 'China',
    countrySlug: 'china', countryFlag: 'https://flagcdn.com/w80/cn.png',
    category: 'news', language: 'Chinese',
    description: 'CGTN (China Global Television Network) is China\'s international broadcast network, providing news and information from a Chinese perspective in English, Spanish, French, Arabic, Russian, and Chinese. Operated by China Media Group, CGTN reaches 1.5 billion viewers across 160+ countries. The network covers world news, business, science, culture, and Chinese affairs, offering an alternative perspective on global events.',
    website: 'https://cgtn.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/cn.m3u',
  },

  // ── RUSSIA ───────────────────────────────────────────────────────────────
  {
    id: 'rt-russia', name: 'RT (Russia Today)', countryCode: 'RU', countryName: 'Russia',
    countrySlug: 'russia', countryFlag: 'https://flagcdn.com/w80/ru.png',
    category: 'news', language: 'Russian',
    description: 'RT (formerly Russia Today) is Russia\'s state-funded international news network, broadcasting in English, Spanish, Arabic, French, German, and Russian. Launched in 2005, RT provides news, current affairs, and documentaries from a Russian governmental perspective. The channel covers international politics, economics, and society with a particular focus on Western policies and geopolitical developments.',
    website: 'https://rt.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ru.m3u',
  },

  // ── SAUDI ARABIA ─────────────────────────────────────────────────────────
  {
    id: 'mbc-saudi-arabia', name: 'MBC 1', countryCode: 'SA', countryName: 'Saudi Arabia',
    countrySlug: 'saudi-arabia', countryFlag: 'https://flagcdn.com/w80/sa.png',
    category: 'entertainment', language: 'Arabic',
    description: 'MBC 1 (Middle East Broadcasting Center) is the Arab world\'s most-watched free-to-air television channel, reaching over 150 million viewers across the Middle East and North Africa. Since 1991, MBC 1 has been the home of Arab entertainment, broadcasting blockbuster Arabic dramas, Ramadan programming, talent shows like Arab Idol and Arabs Got Talent, and international series. MBC is headquartered in Dubai and is the flagship of the MBC Group.',
    website: 'https://mbc.net',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/sa.m3u',
  },

  // ── TURKEY ──────────────────────────────────────────────────────────────
  {
    id: 'trt-turkey', name: 'TRT 1', countryCode: 'TR', countryName: 'Turkey',
    countrySlug: 'turkey', countryFlag: 'https://flagcdn.com/w80/tr.png',
    category: 'general', language: 'Turkish',
    description: 'TRT 1 is Turkey\'s national public television channel, operated by Türkiye Radyo ve Televizyon Kurumu (TRT). Broadcasting since 1968, TRT 1 is the most-watched channel in Turkey, offering news, Turkish drama series (diziler), sports coverage, and cultural programming. TRT\'s high-budget historical dramas like "Diriliş: Ertuğrul" and "Kuruluş: Osman" have become global phenomena, reaching audiences in over 150 countries.',
    website: 'https://trt.net.tr',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/tr.m3u',
  },
  {
    id: 'atv-turkey', name: 'ATV Turkey', countryCode: 'TR', countryName: 'Turkey',
    countrySlug: 'turkey', countryFlag: 'https://flagcdn.com/w80/tr.png',
    category: 'entertainment', language: 'Turkish',
    description: 'ATV is one of Turkey\'s leading private television channels, home to popular Turkish drama series, news programming, and entertainment shows. ATV has produced globally successful shows including "Kara Para Aşk" and many primetime dramas that have been exported across the Middle East, Balkans, and Latin America. Turkish drama (dizi) is one of Turkey\'s most successful cultural exports, with ATV at the forefront.',
    website: 'https://atv.com.tr',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/tr.m3u',
  },

  // ── EGYPT ────────────────────────────────────────────────────────────────
  {
    id: 'nile-tv-egypt', name: 'Nile TV International', countryCode: 'EG', countryName: 'Egypt',
    countrySlug: 'egypt', countryFlag: 'https://flagcdn.com/w80/eg.png',
    category: 'news', language: 'Arabic',
    description: 'Nile TV International is Egypt\'s state-owned international television channel, broadcasting news, culture, and entertainment from Cairo to audiences worldwide in Arabic, English, French, and Hebrew. Egypt\'s rich media heritage — Cairo has been the Arab world\'s entertainment capital for a century — is reflected in Nile TV\'s diverse programming covering Egyptian cinema, music, and current affairs.',
    website: 'https://ertu.tv',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/eg.m3u',
  },

  // ── MEXICO ───────────────────────────────────────────────────────────────
  {
    id: 'televisa-mexico', name: 'Televisa Canal de las Estrellas', countryCode: 'MX', countryName: 'Mexico',
    countrySlug: 'mexico', countryFlag: 'https://flagcdn.com/w80/mx.png',
    category: 'entertainment', language: 'Spanish',
    description: 'Televisa\'s Canal de las Estrellas is Mexico\'s most-watched television channel and one of the largest Spanish-language broadcasting networks in the world. For over 60 years, it has been the home of telenovelas, variety shows, news, and Mexican entertainment. Iconic Televisa telenovelas like "María de todos los Ángeles" and "Por Siempre Mi Amor" have captivated audiences across Latin America and the Spanish-speaking world.',
    website: 'https://televisa.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/mx.m3u',
  },

  // ── INDONESIA ────────────────────────────────────────────────────────────
  {
    id: 'metro-tv-indonesia', name: 'Metro TV', countryCode: 'ID', countryName: 'Indonesia',
    countrySlug: 'indonesia', countryFlag: 'https://flagcdn.com/w80/id.png',
    category: 'news', language: 'Indonesian',
    description: 'Metro TV is Indonesia\'s premier news television station, the first 24-hour news channel in the country. Broadcasting since 2000, Metro TV covers Indonesian politics, business, economics, and international news. As the world\'s fourth most populous nation, Indonesia\'s democratic processes and economic development are Metro TV\'s central focus. The channel played a pivotal role in shaping Indonesia\'s post-Reformasi media landscape.',
    website: 'https://metrotvnews.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/id.m3u',
  },

  // ── PAKISTAN ─────────────────────────────────────────────────────────────
  {
    id: 'geo-news-pakistan', name: 'Geo News', countryCode: 'PK', countryName: 'Pakistan',
    countrySlug: 'pakistan', countryFlag: 'https://flagcdn.com/w80/pk.png',
    category: 'news', language: 'Urdu',
    description: 'Geo News is Pakistan\'s most-watched private news channel, part of the Jang Media Group — Pakistan\'s largest media conglomerate. Broadcasting in Urdu since 2002, Geo News covers Pakistani politics, elections, security, business, sports (especially cricket), and international affairs. Its famous election night coverage, political talk shows, and breaking news programming have made it central to Pakistani public life.',
    website: 'https://geo.tv',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/pk.m3u',
  },

  // ── AUSTRALIA ─────────────────────────────────────────────────────────────
  {
    id: 'abc-news-australia', name: 'ABC News Australia', countryCode: 'AU', countryName: 'Australia',
    countrySlug: 'australia', countryFlag: 'https://flagcdn.com/w80/au.png',
    category: 'news', language: 'English',
    description: 'ABC News is Australia\'s national public broadcaster news channel, providing impartial, independent coverage of Australian and world events. Part of the Australian Broadcasting Corporation (ABC) — Australia\'s equivalent of the BBC — ABC News covers politics, business, sport, arts, and society from an Australian perspective. The channel\'s flagship programme "7.30" is one of Australia\'s most-watched current affairs shows.',
    website: 'https://abc.net.au',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/au.m3u',
  },

  // ── GHANA ────────────────────────────────────────────────────────────────
  {
    id: 'joy-news-ghana', name: 'Joy News', countryCode: 'GH', countryName: 'Ghana',
    countrySlug: 'ghana', countryFlag: 'https://flagcdn.com/w80/gh.png',
    category: 'news', language: 'English',
    description: 'Joy News is Ghana\'s most respected news channel, part of the Multimedia Group — West Africa\'s leading media company. Renowned for its independent journalism, election coverage, and investigative reporting, Joy News has shaped Ghana\'s democratic discourse. The channel covers Ghanaian politics, business, sports (especially football and boxing), and broader West African affairs, making it essential viewing for Ghanaians at home and in the diaspora.',
    website: 'https://myjoyonline.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/gh.m3u',
  },

  // ── ETHIOPIA ─────────────────────────────────────────────────────────────
  {
    id: 'ebc-ethiopia', name: 'EBC (Ethiopian Broadcasting Corporation)', countryCode: 'ET', countryName: 'Ethiopia',
    countrySlug: 'ethiopia', countryFlag: 'https://flagcdn.com/w80/et.png',
    category: 'general', language: 'Amharic',
    description: 'EBC (Ethiopian Broadcasting Corporation) is Ethiopia\'s national public broadcaster, delivering programming in Amharic, Oromiffa, Tigrigna, Somali, and other Ethiopian languages. As Africa\'s second most populous nation, Ethiopia\'s diverse ethnic and linguistic landscape makes EBC\'s multilingual programming uniquely important. EBC covers national news, cultural programming celebrating Ethiopia\'s ancient heritage, sports (especially athletics), and educational content.',
    website: 'https://ebc.et',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/et.m3u',
  },

  // ── TANZANIA ─────────────────────────────────────────────────────────────
  {
    id: 'iqtv-tanzania', name: 'IQ TV Tanzania', countryCode: 'TZ', countryName: 'Tanzania',
    countrySlug: 'tanzania', countryFlag: 'https://flagcdn.com/w80/tz.png',
    category: 'general', language: 'Swahili',
    description: 'IQ TV Tanzania is one of Tanzania\'s leading television channels, broadcasting in Swahili and English. Tanzanian television reflects the country\'s rich coastal Swahili culture, its wildlife heritage, and its status as East Africa\'s largest nation. Programming covers local news, Bongo Flava music (Tanzania\'s distinctive hip-hop genre), sports, Tanzanian drama, and coverage of the country\'s tourism sector — home to the Serengeti and Kilimanjaro.',
    website: 'https://iqtvtz.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/tz.m3u',
  },

  // ── CANADA ───────────────────────────────────────────────────────────────
  {
    id: 'cbc-canada', name: 'CBC News Network', countryCode: 'CA', countryName: 'Canada',
    countrySlug: 'canada', countryFlag: 'https://flagcdn.com/w80/ca.png',
    category: 'news', language: 'English',
    description: 'CBC News Network is Canada\'s national public broadcaster news channel, delivering 24-hour coverage of Canadian and world events. Part of the Canadian Broadcasting Corporation (CBC/Radio-Canada), the network covers Canadian politics, business, sport, arts, and Indigenous affairs. CBC is known for its election night coverage, flagship programmes like "The National", and comprehensive coverage of Canadian hockey and winter sports.',
    website: 'https://cbc.ca/news',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ca.m3u',
  },

  // ── ITALY ─────────────────────────────────────────────────────────────────
  {
    id: 'rai-uno-italy', name: 'Rai 1', countryCode: 'IT', countryName: 'Italy',
    countrySlug: 'italy', countryFlag: 'https://flagcdn.com/w80/it.png',
    category: 'general', language: 'Italian',
    description: 'Rai 1 is Italy\'s flagship public television channel, operated by RAI (Radiotelevisione italiana) since 1954. As Italy\'s most-watched channel, Rai 1 broadcasts news, drama series, sport (including Serie A football, Giro d\'Italia cycling, and the Olympics), variety shows, and the beloved San Remo Music Festival. Rai 1 reflects Italy\'s rich cultural heritage and remains central to Italian national identity.',
    website: 'https://rai.it',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/it.m3u',
  },

  // ── ARGENTINA ─────────────────────────────────────────────────────────────
  {
    id: 'canal-13-argentina', name: 'El Trece (Canal 13)', countryCode: 'AR', countryName: 'Argentina',
    countrySlug: 'argentina', countryFlag: 'https://flagcdn.com/w80/ar.png',
    category: 'entertainment', language: 'Spanish',
    description: 'El Trece (Canal 13) is one of Argentina\'s most iconic television channels, part of the Clarín Group — Argentina\'s largest media conglomerate. Broadcasting since 1960, El Trece is home to Argentina\'s top telenovelas, reality shows, news programmes, and coverage of Argentine football — the country that produced Diego Maradona and Lionel Messi. El Trece\'s nightly news "Telenoche" is Argentina\'s most-watched news programme.',
    website: 'https://eltrecetv.com.ar',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ar.m3u',
  },

  // ── PORTUGAL ─────────────────────────────────────────────────────────────
  {
    id: 'rtp-portugal', name: 'RTP 1', countryCode: 'PT', countryName: 'Portugal',
    countrySlug: 'portugal', countryFlag: 'https://flagcdn.com/w80/pt.png',
    category: 'general', language: 'Portuguese',
    description: 'RTP 1 is Portugal\'s national public television channel, operated by Rádio e Televisão de Portugal (RTP). Broadcasting since 1957, RTP 1 covers Portuguese news, cultural programming, sport (including Liga Portugal football, cycling\'s Volta a Portugal, and international competitions), entertainment, and Fado music — Portugal\'s soul-stirring musical tradition recognised by UNESCO. RTP also serves the large Portuguese diaspora across Europe, the Americas, and Africa.',
    website: 'https://rtp.pt',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/pt.m3u',
  },

  // ── IRAN ─────────────────────────────────────────────────────────────────
  {
    id: 'irib-iran', name: 'IRIB TV1', countryCode: 'IR', countryName: 'Iran',
    countrySlug: 'iran', countryFlag: 'https://flagcdn.com/w80/ir.png',
    category: 'general', language: 'Persian',
    description: 'IRIB TV1 is Iran\'s main state television channel, operated by the Islamic Republic of Iran Broadcasting (IRIB). Broadcasting in Persian (Farsi) since 1958, IRIB TV1 covers Iranian news, Islamic religious programming, drama series, sports (particularly football and wrestling), and cultural content. As the Islamic Republic\'s official broadcaster, IRIB TV1 plays a central role in Iran\'s information and cultural landscape.',
    website: 'https://irib.ir',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ir.m3u',
  },

  // ── UKRAINE ──────────────────────────────────────────────────────────────
  {
    id: 'ukraine-24', name: 'Ukraine 24', countryCode: 'UA', countryName: 'Ukraine',
    countrySlug: 'ukraine', countryFlag: 'https://flagcdn.com/w80/ua.png',
    category: 'news', language: 'Ukrainian',
    description: 'Ukraine 24 is Ukraine\'s round-the-clock news channel, providing continuous coverage of Ukrainian and international news in Ukrainian. Since Russia\'s full-scale invasion in 2022, Ukraine 24 has become essential viewing for Ukrainians at home and in the diaspora, broadcasting live coverage of the war, political developments, resilience stories, and international solidarity. The channel represents the courage and determination of Ukrainian journalism under fire.',
    website: 'https://ukraine24.com',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/ua.m3u',
  },

  // ── NETHERLANDS ──────────────────────────────────────────────────────────
  {
    id: 'nos-netherlands', name: 'NOS (Dutch Public Broadcasting)', countryCode: 'NL', countryName: 'Netherlands',
    countrySlug: 'netherlands', countryFlag: 'https://flagcdn.com/w80/nl.png',
    category: 'news', language: 'Dutch',
    description: 'NOS (Nederlandse Omroep Stichting) is the Netherlands\' public news organisation, providing television, radio, and digital news. NOS News is the most-watched news programme in the Netherlands, known for impartial, comprehensive reporting. NOS broadcasts major sporting events including World Cup football, Tour de France cycling (the Netherlands\' great passion), and Olympics, alongside daily news, political coverage, and cultural programming.',
    website: 'https://nos.nl',
    streamUrl: 'https://iptv-org.github.io/iptv/countries/nl.m3u',
  },
]

// ── Helper functions ─────────────────────────────────────────────────────────

export function getAllChannels(): StaticChannel[] {
  return staticChannels
}

export function getChannelById(id: string): StaticChannel | undefined {
  return staticChannels.find(c => c.id === id)
}

export function getChannelsByCountry(countrySlug: string): StaticChannel[] {
  return staticChannels.filter(c => c.countrySlug === countrySlug)
}

export function getChannelsByCategory(category: ChannelCategory): StaticChannel[] {
  return staticChannels.filter(c => c.category === category)
}

export function getAllChannelIds(): string[] {
  return staticChannels.map(c => c.id)
}

export function getAllCategories(): ChannelCategory[] {
  return Object.keys(CATEGORY_META) as ChannelCategory[]
}
