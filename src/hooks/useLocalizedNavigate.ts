'use client'

import { useRouter, useParams } from 'next/navigation'

export const useLocalizedNavigate = () => {
  const router = useRouter()
  const params = useParams()
  const lang = (params?.lang as string) || 'en'

  return (path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`
    router.push(`/${lang}${normalized === '/' ? '' : normalized}`)
  }
}
