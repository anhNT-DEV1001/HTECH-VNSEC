'use client'

import { useLocale } from 'next-intl'
import { useParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const locale = useLocale()
  const params = useParams()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale(newLocale: string) {
    if (newLocale === locale) return

    // Replace the locale segment in the pathname
    // e.g. /vi/about/general-info -> /en/about/general-info
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    startTransition(() => {
      window.location.href = newPath
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('vi')}
        className={`h-9 px-2 text-sm font-medium ${
          locale === 'vi' ? 'text-primary' : 'text-muted-foreground'
        }`}
        disabled={isPending}
      >
        VI
      </Button>
      <span className="text-muted-foreground">/</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('en')}
        className={`h-9 px-2 text-sm font-medium ${
          locale === 'en' ? 'text-primary' : 'text-muted-foreground'
        }`}
        disabled={isPending}
      >
        EN
      </Button>
      <Globe className="ml-1 h-4 w-4 text-muted-foreground" />
    </div>
  )
}
