'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { locales } from '@/i18n/settings'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function switchLocale(newLocale: string) {
    if (newLocale === locale) return

    startTransition(() => {
      router.replace(`/${newLocale}`)
    })
  }

  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => (
        <Button
          key={l}
          variant="ghost"
          size="sm"
          onClick={() => switchLocale(l)}
          className={`h-9 px-2 text-sm font-medium uppercase ${
            locale === l ? 'text-primary' : 'text-muted-foreground'
          }`}
          disabled={isPending}
        >
          {l}
        </Button>
      ))}
      <Globe className="ml-1 h-4 w-4 text-muted-foreground" />
    </div>
  )
}
