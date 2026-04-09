import type { MetadataRoute } from 'next'
import { countries } from '@/data/countries'
import { toSlug } from '@/utils/countrySlug'
import { getAllChannelIds as getStaticChannelIds } from '@/data/staticChannels'
import { getAllChannelIds as getRegistryChannelIds } from '@/data/channelRegistry'
import { getAllSlugs } from '@/data/blog'
import { getAllCategories } from '@/data/channelRegistry'

const BASE_URL = 'https://cartotv.com'
const LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']

function getChannelIds(): string[] {
  // Try registry first (populated by fetch-channels at build time)
  const registryIds = getRegistryChannelIds()
  if (registryIds.length > 0) return registryIds
  // Fall back to static hand-coded channels
  return getStaticChannelIds()
}

export async function generateSitemaps() {
  return [
    { id: 0 }, // static + homepage pages
    { id: 1 }, // country watch pages
    { id: 2 }, // channel pages first half
    { id: 3 }, // channel pages second half
    { id: 4 }, // categories + blog
  ]
}

export default async function sitemap(
  { id }: { id: number }
): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const channelIds = getChannelIds()

  switch (id) {

    // ── 0: Static pages (11 langs × 7 = 77 URLs) ─────────────────────────────
    case 0: {
      const entries: MetadataRoute.Sitemap = []
      for (const lang of LANGS) {
        entries.push({ url: `${BASE_URL}/${lang}`,            lastModified: now, changeFrequency: 'daily',   priority: 1.0 })
        entries.push({ url: `${BASE_URL}/${lang}/watch`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 })
        entries.push({ url: `${BASE_URL}/${lang}/channels`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 })
        entries.push({ url: `${BASE_URL}/${lang}/blog`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 })
        entries.push({ url: `${BASE_URL}/${lang}/who-we-are`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 })
        entries.push({ url: `${BASE_URL}/${lang}/terms`,      lastModified: now, changeFrequency: 'monthly', priority: 0.4 })
        entries.push({ url: `${BASE_URL}/${lang}/privacy`,    lastModified: now, changeFrequency: 'monthly', priority: 0.4 })
      }
      return entries
    }

    // ── 1: Country watch pages (179 × 11 = 1,969 URLs) ───────────────────────
    case 1: {
      const entries: MetadataRoute.Sitemap = []
      for (const lang of LANGS) {
        for (const country of countries) {
          entries.push({
            url: `${BASE_URL}/${lang}/watch/${toSlug(country.name)}`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.85,
          })
        }
      }
      return entries
    }

    // ── 2: Channel pages — first half × 11 langs ─────────────────────────────
    case 2: {
      const half = Math.ceil(channelIds.length / 2)
      const firstHalf = channelIds.slice(0, half)
      const entries: MetadataRoute.Sitemap = []
      for (const lang of LANGS) {
        for (const channelId of firstHalf) {
          entries.push({
            url: `${BASE_URL}/${lang}/channels/${channelId}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
          })
        }
      }
      return entries
    }

    // ── 3: Channel pages — second half × 11 langs ────────────────────────────
    case 3: {
      const half = Math.ceil(channelIds.length / 2)
      const secondHalf = channelIds.slice(half)
      const entries: MetadataRoute.Sitemap = []
      for (const lang of LANGS) {
        for (const channelId of secondHalf) {
          entries.push({
            url: `${BASE_URL}/${lang}/channels/${channelId}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
          })
        }
      }
      return entries
    }

    // ── 4: Category pages + Blog posts ───────────────────────────────────────
    case 4: {
      const entries: MetadataRoute.Sitemap = []
      const categories = getAllCategories()
      const blogSlugs = getAllSlugs()
      for (const lang of LANGS) {
        for (const cat of categories) {
          entries.push({
            url: `${BASE_URL}/${lang}/category/${encodeURIComponent(cat.toLowerCase())}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
          })
        }
        for (const slug of blogSlugs) {
          entries.push({
            url: `${BASE_URL}/${lang}/blog/${slug}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.75,
          })
        }
      }
      return entries
    }

    default:
      return []
  }
}
