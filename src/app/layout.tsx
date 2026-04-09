import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://cartotv.com'),
  title: {
    default: 'CartoTV – Free Online Live TV Channels from Around the World',
    template: '%s | CartoTV',
  },
  description: 'Watch live TV channels from around the world with CartoTV. Stream news, sports, movies, kids and entertainment channels online by country — No sign-up required.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: { other: { 'msvalidate.01': '54877744799106B3304BF9074BD01A16' } },
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  applicationName: 'Carto TV',
  authors: [{ name: 'Carto TV', url: 'https://cartotv.com' }],
  openGraph: {
    type: 'website',
    siteName: 'CartoTV',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CartoTV – Free Live TV Channels' }],
  },
  twitter: { card: 'summary_large_image', site: '@CartoTV', creator: '@CartoTV' },
}

// Root layout: minimal html/body shell.
// Language-specific attributes (lang, dir) are set by [lang]/layout.tsx
// via Next.js metadata API which merges into this shell.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
