'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Tv, Play, Eye, Loader2, Heart, Share2, Filter } from 'lucide-react'
import { VideoPlayer } from '@/components/UI/VideoPlayer'
import { Country, Channel, parseM3U } from '@/data/countries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFavorites } from '@/hooks/useFavorites'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

interface CountryWatchClientProps {
  country: Country
  lang: string
}

export default function CountryWatchClient({ country, lang }: CountryWatchClientProps) {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(country.url)
        if (!res.ok) throw new Error('Failed to fetch')
        const parsed = parseM3U(await res.text())
        setChannels(parsed)
      } catch {
        setError('Unable to load channels. Please try again.')
        setChannels([])
      } finally {
        setLoading(false)
      }
    }
    fetchChannels()
    setSearchQuery('')
    setSelectedCategory('All')
  }, [country])

  const categories = useMemo(() => {
    const cats = new Set(channels.map(c => c.category || 'General'))
    return ['All', ...Array.from(cats)]
  }, [channels])

  const filteredChannels = useMemo(() => {
    return channels.filter(ch => {
      const matchesSearch = ch.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCat = selectedCategory === 'All' || ch.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      return matchesSearch && matchesCat
    })
  }, [channels, searchQuery, selectedCategory])

  const formatViews = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v.toString()

  const handleFavorite = (channel: Channel) => {
    toggleFavorite(channel, country.name, country.flag)
    toast({
      title: isFavorite(channel.url) ? 'Removed from favorites' : 'Added to favorites',
      description: channel.name,
    })
  }

  const handleShare = async (channel: Channel) => {
    const text = `Watch ${channel.name} from ${country.name} free on Carto TV!`
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: channel.name, text, url }) } catch {}
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`)
      toast({ title: 'Link copied!', description: 'Share link copied to clipboard.' })
    }
  }

  return (
    <>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search channels..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-4 scrollbar-thin">
        <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        {categories.slice(0, 8).map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'ghost'}
            size="sm"
            className="h-7 px-2 text-xs whitespace-nowrap flex-shrink-0"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Status text */}
      {!loading && !error && (
        <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
          <Tv className="w-3 h-3" />
          {filteredChannels.length} of {channels.length} channels
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-center py-12 text-muted-foreground">{error}</p>}

      {/* Empty state */}
      {!loading && !error && filteredChannels.length === 0 && (
        <p className="text-center py-12 text-muted-foreground">No channels found</p>
      )}

      {/* Channel list */}
      <div className="space-y-2">
        {filteredChannels.map((ch, i) => (
          <div
            key={`${ch.name}-${i}`}
            className="group flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {ch.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ch.logo}
                  alt={ch.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
              ) : (
                <Tv className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{ch.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span className="text-red-400">{formatViews(ch.liveViews)}</span>
                </span>
                {ch.category && (
                  <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] truncate max-w-[80px]">
                    {ch.category}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Button
                variant="ghost" size="icon"
                className="h-8 w-8 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() => handleFavorite(ch)}
              >
                <Heart className={`w-4 h-4 ${isFavorite(ch.url) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="ghost" size="icon"
                className="h-8 w-8 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() => handleShare(ch)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost" size="icon"
                className="h-8 w-8 text-primary"
                onClick={() => setSelectedChannel(ch)}
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <VideoPlayer channel={selectedChannel} onClose={() => setSelectedChannel(null)} />
      <Toaster />
    </>
  )
}
