import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORTED_LANGS = ['en','es','fr','de','pt','ar','zh','hi','sw','id','ru']
const DEFAULT_LANG = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip internal Next.js paths, API, static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next()
  }

  // Check if path starts with a supported lang
  const pathLang = pathname.split('/')[1]
  if (SUPPORTED_LANGS.includes(pathLang)) {
    return NextResponse.next()
  }

  // Redirect / to /en (or detected language)
  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferred = acceptLang.split(',')[0].split('-')[0].toLowerCase()
  const targetLang = SUPPORTED_LANGS.includes(preferred) ? preferred : DEFAULT_LANG

  return NextResponse.redirect(new URL(`/${targetLang}${pathname}`, request.url))
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|favicon.png|og-image.png|sitemap|robots.txt|OneSignal).*)',
  ],
}
