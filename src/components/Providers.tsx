'use client'

import { ReactNode, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import '@/i18n/config'

const queryClient = new QueryClient()

export function Providers({ children, lang }: { children: ReactNode; lang: string }) {
  useEffect(() => {
    // Dynamically import i18n and set language on client
    import('@/i18n/config').then(({ default: i18n, languages }) => {
      const isValid = languages.some((l: { code: string }) => l.code === lang)
      if (isValid && i18n.language !== lang) {
        i18n.changeLanguage(lang)
      }
      // Set dir for RTL languages
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    })
  }, [lang])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
