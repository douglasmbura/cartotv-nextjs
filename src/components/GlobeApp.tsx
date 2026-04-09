'use client'

import { useState, useRef } from 'react'
import { Scene, SceneHandle } from '@/components/Globe/Scene'
import { Header } from '@/components/UI/Header'
import { ChannelsPanel } from '@/components/UI/ChannelsPanel'
import { VideoPlayer } from '@/components/UI/VideoPlayer'
import { ZoomControls } from '@/components/UI/ZoomControls'
import { Instructions } from '@/components/UI/Instructions'
import { SideMenu } from '@/components/UI/SideMenu'
import { BuyMeCoffeeButton } from '@/components/UI/BuyMeCoffeeButton'
import { AffiliateButtons } from '@/components/UI/AffiliateButtons'
import { Country, Channel } from '@/data/countries'

interface GlobeAppProps {
  lang: string
}

export default function GlobeApp({ lang }: GlobeAppProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [playingChannel, setPlayingChannel] = useState<Channel | null>(null)
  const sceneRef = useRef<SceneHandle>(null)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(var(--space-dark))]" />

      <div className="absolute inset-0">
        <Scene
          ref={sceneRef}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
      </div>

      <SideMenu />
      <Header onPlayChannel={setPlayingChannel} />

      <ChannelsPanel
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
        onPlayChannel={setPlayingChannel}
      />

      <AffiliateButtons />
      <BuyMeCoffeeButton />

      <ZoomControls
        onZoomIn={() => sceneRef.current?.zoomIn()}
        onZoomOut={() => sceneRef.current?.zoomOut()}
        onReset={() => { sceneRef.current?.reset(); setSelectedCountry(null) }}
      />

      {!selectedCountry && <Instructions />}

      <VideoPlayer
        channel={playingChannel}
        onClose={() => setPlayingChannel(null)}
      />
    </div>
  )
}
