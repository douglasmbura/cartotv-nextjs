'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Loader2, AlertCircle, ExternalLink, Globe } from 'lucide-react'
import Hls from 'hls.js'
import { Button } from '@/components/ui/button'

// Works with both ChannelEntry (registry) and StaticChannel shapes
interface ChannelShape {
  id: string
  name: string
  countryName: string
  countrySlug: string
  countryFlag: string
  category: string
  language?: string
  logo?: string
  streamUrl: string
  website?: string
  description?: string
}

interface Props {
  channel: ChannelShape
  lang: string
}

export default function ChannelPageClient({ channel, lang }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const loadStream = () => {
    const video = videoRef.current
    if (!video) return

    setStatus('loading')
    setErrorMsg('')

    if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null }

    const url = channel.streamUrl
    const isM3U8 = url.includes('.m3u8') || url.includes('m3u8')

    if (isM3U8 && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 90 })
      hlsRef.current = hls
      hls.loadSource(url)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStatus('playing')
        video.play().catch(() => {})
      })
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setStatus('error')
          setErrorMsg('Stream unavailable. The channel may be offline or geo-restricted.')
        }
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url
      video.oncanplay = () => { setStatus('playing'); video.play().catch(() => {}) }
      video.onerror = () => { setStatus('error'); setErrorMsg('Stream unavailable.') }
    } else {
      video.src = url
      video.load()
      video.oncanplay = () => setStatus('playing')
      video.onerror = () => { setStatus('error'); setErrorMsg('Stream format not supported.') }
    }
  }

  useEffect(() => () => { hlsRef.current?.destroy() }, [])

  return (
    <div className="rounded-2xl overflow-hidden border border-border/40 bg-black/40">
      <div className="relative aspect-video bg-black">
        <video ref={videoRef} className="w-full h-full object-contain"
          playsInline controls={status === 'playing'} />

        {/* Idle */}
        {status === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-black/20">
            {channel.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={channel.logo} alt={channel.name}
                className="w-20 h-20 object-contain rounded-xl mb-5 opacity-90"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none' }} />
            )}
            <h2 className="text-xl font-bold text-white mb-1">{channel.name}</h2>
            <p className="text-muted-foreground text-sm mb-6">Live · {channel.countryName}</p>
            <Button onClick={loadStream} size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
              <Play className="w-5 h-5" /> Watch Live — Free
            </Button>
          </div>
        )}

        {/* Loading */}
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center">
              <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
              <p className="text-white text-sm">Connecting to live stream…</p>
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-6">
            <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
            <p className="text-white text-center mb-2 font-medium">Stream Unavailable</p>
            <p className="text-muted-foreground text-sm text-center mb-6 max-w-sm">{errorMsg}</p>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap justify-center">
              <Button onClick={loadStream} variant="outline" className="gap-2">
                <Play className="w-4 h-4" /> Retry
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <a href={`/${lang}/watch/${channel.countrySlug}`}>
                  <Globe className="w-4 h-4" /> Browse {channel.countryName} channels
                </a>
              </Button>
              {channel.website && (
                <Button asChild variant="outline" className="gap-2">
                  <a href={channel.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" /> Official website
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-card/60 border-t border-border/30">
        <div className="flex items-center gap-3 min-w-0">
          {channel.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={channel.logo} alt="" className="w-7 h-7 rounded object-contain flex-shrink-0"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none' }} />
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{channel.name}</p>
            <p className="text-xs text-muted-foreground">{channel.countryName}{channel.language ? ` · ${channel.language}` : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {status === 'playing' && (
            <span className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" /> LIVE
            </span>
          )}
          {status === 'idle' && (
            <Button onClick={loadStream} size="sm" className="gap-1.5 h-8">
              <Play className="w-3.5 h-3.5" /> Play
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
