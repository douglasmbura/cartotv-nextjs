'use client'

import { Globe } from 'lucide-react'
import { useRouter, useParams, usePathname } from 'next/navigation'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const languages = [
  { code: 'en', nativeName: 'English', name: 'English' },
  { code: 'es', nativeName: 'Español', name: 'Spanish' },
  { code: 'fr', nativeName: 'Français', name: 'French' },
  { code: 'pt', nativeName: 'Português', name: 'Portuguese' },
  { code: 'ar', nativeName: 'العربية', name: 'Arabic' },
  { code: 'de', nativeName: 'Deutsch', name: 'German' },
  { code: 'hi', nativeName: 'हिन्दी', name: 'Hindi' },
  { code: 'zh', nativeName: '中文', name: 'Chinese' },
  { code: 'sw', nativeName: 'Kiswahili', name: 'Swahili' },
  { code: 'id', nativeName: 'Bahasa Indonesia', name: 'Indonesian' },
  { code: 'ru', nativeName: 'Русский', name: 'Russian' },
]

export const LanguageSelector = () => {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const currentLang = (params?.lang as string) || 'en'
  const current = languages.find(l => l.code === currentLang) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    // Replace current lang prefix in pathname
    const newPath = pathname.replace(`/${currentLang}`, `/${langCode}`)
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="glass-panel border-0 gap-2 px-3">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{current.nativeName}</span>
          <span className="sm:hidden">{current.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-border/50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center justify-between cursor-pointer ${currentLang === lang.code ? 'bg-primary/20 text-primary' : ''}`}
          >
            <span>{lang.nativeName}</span>
            <span className="text-xs text-muted-foreground">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
