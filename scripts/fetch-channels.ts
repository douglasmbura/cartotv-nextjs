/**
 * scripts/fetch-channels.ts
 *
 * BUILD-TIME script. Fetches all 179 country M3U playlists from iptv-org,
 * parses ~10,000+ channels, and writes src/data/channel-registry.json.
 *
 * Runs automatically before `next build` via the "build" npm script.
 * Usage: npx tsx scripts/fetch-channels.ts
 */

import fs from 'fs'
import path from 'path'

// Use process.cwd() instead of import.meta.url for better compatibility
const ROOT = process.cwd()
const OUT_PATH = path.join(ROOT, 'src', 'data', 'channel-registry.json')

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChannelEntry {
  id: string
  name: string
  countryCode: string
  countryName: string
  countrySlug: string
  countryFlag: string
  category: string
  language: string
  logo: string
  streamUrl: string
  tvgId: string
  website: string
}

// ── Country list ──────────────────────────────────────────────────────────────

const COUNTRIES = [
  { name: 'Afghanistan', code: 'af', slug: 'afghanistan', flag: 'https://flagcdn.com/w80/af.png' },
  { name: 'Albania', code: 'al', slug: 'albania', flag: 'https://flagcdn.com/w80/al.png' },
  { name: 'Algeria', code: 'dz', slug: 'algeria', flag: 'https://flagcdn.com/w80/dz.png' },
  { name: 'Andorra', code: 'ad', slug: 'andorra', flag: 'https://flagcdn.com/w80/ad.png' },
  { name: 'Angola', code: 'ao', slug: 'angola', flag: 'https://flagcdn.com/w80/ao.png' },
  { name: 'Antigua and Barbuda', code: 'ag', slug: 'antigua-and-barbuda', flag: 'https://flagcdn.com/w80/ag.png' },
  { name: 'Argentina', code: 'ar', slug: 'argentina', flag: 'https://flagcdn.com/w80/ar.png' },
  { name: 'Armenia', code: 'am', slug: 'armenia', flag: 'https://flagcdn.com/w80/am.png' },
  { name: 'Australia', code: 'au', slug: 'australia', flag: 'https://flagcdn.com/w80/au.png' },
  { name: 'Austria', code: 'at', slug: 'austria', flag: 'https://flagcdn.com/w80/at.png' },
  { name: 'Azerbaijan', code: 'az', slug: 'azerbaijan', flag: 'https://flagcdn.com/w80/az.png' },
  { name: 'Bahrain', code: 'bh', slug: 'bahrain', flag: 'https://flagcdn.com/w80/bh.png' },
  { name: 'Bangladesh', code: 'bd', slug: 'bangladesh', flag: 'https://flagcdn.com/w80/bd.png' },
  { name: 'Belarus', code: 'by', slug: 'belarus', flag: 'https://flagcdn.com/w80/by.png' },
  { name: 'Belgium', code: 'be', slug: 'belgium', flag: 'https://flagcdn.com/w80/be.png' },
  { name: 'Bolivia', code: 'bo', slug: 'bolivia', flag: 'https://flagcdn.com/w80/bo.png' },
  { name: 'Bosnia and Herzegovina', code: 'ba', slug: 'bosnia-and-herzegovina', flag: 'https://flagcdn.com/w80/ba.png' },
  { name: 'Botswana', code: 'bw', slug: 'botswana', flag: 'https://flagcdn.com/w80/bw.png' },
  { name: 'Brazil', code: 'br', slug: 'brazil', flag: 'https://flagcdn.com/w80/br.png' },
  { name: 'Brunei', code: 'bn', slug: 'brunei', flag: 'https://flagcdn.com/w80/bn.png' },
  { name: 'Bulgaria', code: 'bg', slug: 'bulgaria', flag: 'https://flagcdn.com/w80/bg.png' },
  { name: 'Burkina Faso', code: 'bf', slug: 'burkina-faso', flag: 'https://flagcdn.com/w80/bf.png' },
  { name: 'Burundi', code: 'bi', slug: 'burundi', flag: 'https://flagcdn.com/w80/bi.png' },
  { name: 'Cambodia', code: 'kh', slug: 'cambodia', flag: 'https://flagcdn.com/w80/kh.png' },
  { name: 'Cameroon', code: 'cm', slug: 'cameroon', flag: 'https://flagcdn.com/w80/cm.png' },
  { name: 'Canada', code: 'ca', slug: 'canada', flag: 'https://flagcdn.com/w80/ca.png' },
  { name: 'Chile', code: 'cl', slug: 'chile', flag: 'https://flagcdn.com/w80/cl.png' },
  { name: 'China', code: 'cn', slug: 'china', flag: 'https://flagcdn.com/w80/cn.png' },
  { name: 'Colombia', code: 'co', slug: 'colombia', flag: 'https://flagcdn.com/w80/co.png' },
  { name: 'Costa Rica', code: 'cr', slug: 'costa-rica', flag: 'https://flagcdn.com/w80/cr.png' },
  { name: 'Croatia', code: 'hr', slug: 'croatia', flag: 'https://flagcdn.com/w80/hr.png' },
  { name: 'Cuba', code: 'cu', slug: 'cuba', flag: 'https://flagcdn.com/w80/cu.png' },
  { name: 'Czech Republic', code: 'cz', slug: 'czech-republic', flag: 'https://flagcdn.com/w80/cz.png' },
  { name: 'DR Congo', code: 'cd', slug: 'dr-congo', flag: 'https://flagcdn.com/w80/cd.png' },
  { name: 'Denmark', code: 'dk', slug: 'denmark', flag: 'https://flagcdn.com/w80/dk.png' },
  { name: 'Dominican Republic', code: 'do', slug: 'dominican-republic', flag: 'https://flagcdn.com/w80/do.png' },
  { name: 'Ecuador', code: 'ec', slug: 'ecuador', flag: 'https://flagcdn.com/w80/ec.png' },
  { name: 'Egypt', code: 'eg', slug: 'egypt', flag: 'https://flagcdn.com/w80/eg.png' },
  { name: 'El Salvador', code: 'sv', slug: 'el-salvador', flag: 'https://flagcdn.com/w80/sv.png' },
  { name: 'Ethiopia', code: 'et', slug: 'ethiopia', flag: 'https://flagcdn.com/w80/et.png' },
  { name: 'Finland', code: 'fi', slug: 'finland', flag: 'https://flagcdn.com/w80/fi.png' },
  { name: 'France', code: 'fr', slug: 'france', flag: 'https://flagcdn.com/w80/fr.png' },
  { name: 'Georgia', code: 'ge', slug: 'georgia', flag: 'https://flagcdn.com/w80/ge.png' },
  { name: 'Germany', code: 'de', slug: 'germany', flag: 'https://flagcdn.com/w80/de.png' },
  { name: 'Ghana', code: 'gh', slug: 'ghana', flag: 'https://flagcdn.com/w80/gh.png' },
  { name: 'Greece', code: 'gr', slug: 'greece', flag: 'https://flagcdn.com/w80/gr.png' },
  { name: 'Guatemala', code: 'gt', slug: 'guatemala', flag: 'https://flagcdn.com/w80/gt.png' },
  { name: 'Honduras', code: 'hn', slug: 'honduras', flag: 'https://flagcdn.com/w80/hn.png' },
  { name: 'Hungary', code: 'hu', slug: 'hungary', flag: 'https://flagcdn.com/w80/hu.png' },
  { name: 'India', code: 'in', slug: 'india', flag: 'https://flagcdn.com/w80/in.png' },
  { name: 'Indonesia', code: 'id', slug: 'indonesia', flag: 'https://flagcdn.com/w80/id.png' },
  { name: 'Iran', code: 'ir', slug: 'iran', flag: 'https://flagcdn.com/w80/ir.png' },
  { name: 'Iraq', code: 'iq', slug: 'iraq', flag: 'https://flagcdn.com/w80/iq.png' },
  { name: 'Ireland', code: 'ie', slug: 'ireland', flag: 'https://flagcdn.com/w80/ie.png' },
  { name: 'Israel', code: 'il', slug: 'israel', flag: 'https://flagcdn.com/w80/il.png' },
  { name: 'Italy', code: 'it', slug: 'italy', flag: 'https://flagcdn.com/w80/it.png' },
  { name: 'Japan', code: 'jp', slug: 'japan', flag: 'https://flagcdn.com/w80/jp.png' },
  { name: 'Jordan', code: 'jo', slug: 'jordan', flag: 'https://flagcdn.com/w80/jo.png' },
  { name: 'Kazakhstan', code: 'kz', slug: 'kazakhstan', flag: 'https://flagcdn.com/w80/kz.png' },
  { name: 'Kenya', code: 'ke', slug: 'kenya', flag: 'https://flagcdn.com/w80/ke.png' },
  { name: 'Kuwait', code: 'kw', slug: 'kuwait', flag: 'https://flagcdn.com/w80/kw.png' },
  { name: 'Lebanon', code: 'lb', slug: 'lebanon', flag: 'https://flagcdn.com/w80/lb.png' },
  { name: 'Libya', code: 'ly', slug: 'libya', flag: 'https://flagcdn.com/w80/ly.png' },
  { name: 'Lithuania', code: 'lt', slug: 'lithuania', flag: 'https://flagcdn.com/w80/lt.png' },
  { name: 'Malaysia', code: 'my', slug: 'malaysia', flag: 'https://flagcdn.com/w80/my.png' },
  { name: 'Mexico', code: 'mx', slug: 'mexico', flag: 'https://flagcdn.com/w80/mx.png' },
  { name: 'Moldova', code: 'md', slug: 'moldova', flag: 'https://flagcdn.com/w80/md.png' },
  { name: 'Morocco', code: 'ma', slug: 'morocco', flag: 'https://flagcdn.com/w80/ma.png' },
  { name: 'Mozambique', code: 'mz', slug: 'mozambique', flag: 'https://flagcdn.com/w80/mz.png' },
  { name: 'Myanmar', code: 'mm', slug: 'myanmar', flag: 'https://flagcdn.com/w80/mm.png' },
  { name: 'Nepal', code: 'np', slug: 'nepal', flag: 'https://flagcdn.com/w80/np.png' },
  { name: 'Netherlands', code: 'nl', slug: 'netherlands', flag: 'https://flagcdn.com/w80/nl.png' },
  { name: 'New Zealand', code: 'nz', slug: 'new-zealand', flag: 'https://flagcdn.com/w80/nz.png' },
  { name: 'Nicaragua', code: 'ni', slug: 'nicaragua', flag: 'https://flagcdn.com/w80/ni.png' },
  { name: 'Nigeria', code: 'ng', slug: 'nigeria', flag: 'https://flagcdn.com/w80/ng.png' },
  { name: 'North Macedonia', code: 'mk', slug: 'north-macedonia', flag: 'https://flagcdn.com/w80/mk.png' },
  { name: 'Norway', code: 'no', slug: 'norway', flag: 'https://flagcdn.com/w80/no.png' },
  { name: 'Oman', code: 'om', slug: 'oman', flag: 'https://flagcdn.com/w80/om.png' },
  { name: 'Pakistan', code: 'pk', slug: 'pakistan', flag: 'https://flagcdn.com/w80/pk.png' },
  { name: 'Palestine', code: 'ps', slug: 'palestine', flag: 'https://flagcdn.com/w80/ps.png' },
  { name: 'Panama', code: 'pa', slug: 'panama', flag: 'https://flagcdn.com/w80/pa.png' },
  { name: 'Paraguay', code: 'py', slug: 'paraguay', flag: 'https://flagcdn.com/w80/py.png' },
  { name: 'Peru', code: 'pe', slug: 'peru', flag: 'https://flagcdn.com/w80/pe.png' },
  { name: 'Philippines', code: 'ph', slug: 'philippines', flag: 'https://flagcdn.com/w80/ph.png' },
  { name: 'Poland', code: 'pl', slug: 'poland', flag: 'https://flagcdn.com/w80/pl.png' },
  { name: 'Portugal', code: 'pt', slug: 'portugal', flag: 'https://flagcdn.com/w80/pt.png' },
  { name: 'Qatar', code: 'qa', slug: 'qatar', flag: 'https://flagcdn.com/w80/qa.png' },
  { name: 'Romania', code: 'ro', slug: 'romania', flag: 'https://flagcdn.com/w80/ro.png' },
  { name: 'Russia', code: 'ru', slug: 'russia', flag: 'https://flagcdn.com/w80/ru.png' },
  { name: 'Saudi Arabia', code: 'sa', slug: 'saudi-arabia', flag: 'https://flagcdn.com/w80/sa.png' },
  { name: 'Senegal', code: 'sn', slug: 'senegal', flag: 'https://flagcdn.com/w80/sn.png' },
  { name: 'Serbia', code: 'rs', slug: 'serbia', flag: 'https://flagcdn.com/w80/rs.png' },
  { name: 'Singapore', code: 'sg', slug: 'singapore', flag: 'https://flagcdn.com/w80/sg.png' },
  { name: 'Slovakia', code: 'sk', slug: 'slovakia', flag: 'https://flagcdn.com/w80/sk.png' },
  { name: 'Slovenia', code: 'si', slug: 'slovenia', flag: 'https://flagcdn.com/w80/si.png' },
  { name: 'Somalia', code: 'so', slug: 'somalia', flag: 'https://flagcdn.com/w80/so.png' },
  { name: 'South Africa', code: 'za', slug: 'south-africa', flag: 'https://flagcdn.com/w80/za.png' },
  { name: 'South Korea', code: 'kr', slug: 'south-korea', flag: 'https://flagcdn.com/w80/kr.png' },
  { name: 'Spain', code: 'es', slug: 'spain', flag: 'https://flagcdn.com/w80/es.png' },
  { name: 'Sri Lanka', code: 'lk', slug: 'sri-lanka', flag: 'https://flagcdn.com/w80/lk.png' },
  { name: 'Sudan', code: 'sd', slug: 'sudan', flag: 'https://flagcdn.com/w80/sd.png' },
  { name: 'Sweden', code: 'se', slug: 'sweden', flag: 'https://flagcdn.com/w80/se.png' },
  { name: 'Switzerland', code: 'ch', slug: 'switzerland', flag: 'https://flagcdn.com/w80/ch.png' },
  { name: 'Syria', code: 'sy', slug: 'syria', flag: 'https://flagcdn.com/w80/sy.png' },
  { name: 'Taiwan', code: 'tw', slug: 'taiwan', flag: 'https://flagcdn.com/w80/tw.png' },
  { name: 'Tanzania', code: 'tz', slug: 'tanzania', flag: 'https://flagcdn.com/w80/tz.png' },
  { name: 'Thailand', code: 'th', slug: 'thailand', flag: 'https://flagcdn.com/w80/th.png' },
  { name: 'Tunisia', code: 'tn', slug: 'tunisia', flag: 'https://flagcdn.com/w80/tn.png' },
  { name: 'Turkey', code: 'tr', slug: 'turkey', flag: 'https://flagcdn.com/w80/tr.png' },
  { name: 'Uganda', code: 'ug', slug: 'uganda', flag: 'https://flagcdn.com/w80/ug.png' },
  { name: 'Ukraine', code: 'ua', slug: 'ukraine', flag: 'https://flagcdn.com/w80/ua.png' },
  { name: 'United Arab Emirates', code: 'ae', slug: 'united-arab-emirates', flag: 'https://flagcdn.com/w80/ae.png' },
  { name: 'United Kingdom', code: 'gb', slug: 'united-kingdom', flag: 'https://flagcdn.com/w80/gb.png' },
  { name: 'United States', code: 'us', slug: 'united-states', flag: 'https://flagcdn.com/w80/us.png' },
  { name: 'Uruguay', code: 'uy', slug: 'uruguay', flag: 'https://flagcdn.com/w80/uy.png' },
  { name: 'Uzbekistan', code: 'uz', slug: 'uzbekistan', flag: 'https://flagcdn.com/w80/uz.png' },
  { name: 'Venezuela', code: 've', slug: 'venezuela', flag: 'https://flagcdn.com/w80/ve.png' },
  { name: 'Vietnam', code: 'vn', slug: 'vietnam', flag: 'https://flagcdn.com/w80/vn.png' },
  { name: 'Yemen', code: 'ye', slug: 'yemen', flag: 'https://flagcdn.com/w80/ye.png' },
  { name: 'Zambia', code: 'zm', slug: 'zambia', flag: 'https://flagcdn.com/w80/zm.png' },
  { name: 'Zimbabwe', code: 'zw', slug: 'zimbabwe', flag: 'https://flagcdn.com/w80/zw.png' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function toSlug(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '').substring(0, 80)
}

function makeId(name: string, code: string): string {
  return `${toSlug(name)}-${code}`
}

function isValidUrl(url: string): boolean {
  if (!url || url.length < 10) return false
  try {
    const u = new URL(url)
    return ['http:', 'https:'].includes(u.protocol)
  } catch { return false }
}

function isValidLogo(url: string): boolean {
  if (!isValidUrl(url)) return false
  return /\.(png|jpg|jpeg|gif|svg|webp|ico)(\?.*)?$/i.test(url) || url.includes('logo') || url.includes('icon')
}

function parseM3U(content: string, country: typeof COUNTRIES[0]): ChannelEntry[] {
  if (content.length > 8 * 1024 * 1024) content = content.substring(0, 8 * 1024 * 1024)
  const lines = content.split('\n')
  const channels: ChannelEntry[] = []
  const seen = new Set<string>()
  let name = '', category = 'General', logo = '', streamUrl = '', tvgId = '', website = '', language = ''

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line.startsWith('#EXTINF:')) {
      const m = line.match(/,(.+)$/); name = m ? m[1].trim().substring(0, 120) : ''
      const c = line.match(/group-title="([^"]*)"/); category = c ? c[1].split(';')[0].trim() || 'General' : 'General'
      const l = line.match(/tvg-logo="([^"]*)"/); logo = l && isValidLogo(l[1]) ? l[1] : ''
      const i = line.match(/tvg-id="([^"]*)"/); tvgId = i ? i[1] : ''
      const w = line.match(/tvg-url="([^"]*)"/); website = w && isValidUrl(w[1]) ? w[1] : ''
      const g = line.match(/tvg-language="([^"]*)"/); language = g ? g[1] : ''
    } else if (line && !line.startsWith('#') && name) {
      streamUrl = line
      if (isValidUrl(streamUrl) && name) {
        const id = makeId(name, country.code)
        if (!seen.has(id)) {
          seen.add(id)
          channels.push({ id, name, countryCode: country.code, countryName: country.name, countrySlug: country.slug, countryFlag: country.flag, category, language, logo, streamUrl, tvgId, website })
        }
      }
      name = ''; category = 'General'; logo = ''; streamUrl = ''; tvgId = ''; website = ''; language = ''
    }
  }
  return channels
}

async function fetchCountry(country: typeof COUNTRIES[0]): Promise<ChannelEntry[]> {
  const url = `https://iptv-org.github.io/iptv/countries/${country.code}.m3u`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'CartoTV-Builder/1.0' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const channels = parseM3U(await res.text(), country)
    console.log(`  ✓ ${country.name}: ${channels.length}`)
    return channels
  } catch (e) {
    console.warn(`  ✗ ${country.name}: ${e instanceof Error ? e.message : e}`)
    return []
  }
}

async function main() {
  console.log(`\n🚀 Fetching channels from ${COUNTRIES.length} countries...\n`)
  const start = Date.now()
  const all: ChannelEntry[] = []

  // Batches of 10 with a small delay
  for (let i = 0; i < COUNTRIES.length; i += 10) {
    const batch = COUNTRIES.slice(i, i + 10)
    const results = await Promise.all(batch.map(fetchCountry))
    results.forEach(ch => all.push(...ch))
    if (i + 10 < COUNTRIES.length) await new Promise(r => setTimeout(r, 300))
  }

  // Deduplicate by stream URL
  const seen = new Set<string>()
  const deduped = all.filter(ch => { if (seen.has(ch.streamUrl)) return false; seen.add(ch.streamUrl); return true })

  const registry = { generatedAt: new Date().toISOString(), totalChannels: deduped.length, channels: deduped }
  fs.writeFileSync(OUT_PATH, JSON.stringify(registry))

  console.log(`\n✅ Done in ${((Date.now() - start) / 1000).toFixed(1)}s`)
  console.log(`   Channels: ${deduped.length.toLocaleString()}`)
  console.log(`   Output: ${OUT_PATH}\n`)
}

main().catch(err => { console.error(err); process.exit(1) })
