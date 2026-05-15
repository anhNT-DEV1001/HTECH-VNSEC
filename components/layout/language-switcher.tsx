'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { locales } from '@/i18n/settings'

function VietnamFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className={className}>
      <rect width="900" height="600" fill="#da251d" />
      <polygon
        points="450,120 352.58,420 570.81,228.54 329.19,228.54 547.42,420"
        fill="#ffff00"
      />
    </svg>
  )
}

function UKFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className}>
      <clipPath id="s"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
      <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const targetLocale = locale === 'vi' ? 'en' : 'vi'

  function switchLocale() {
    // Replace the locale prefix in the current path to stay on the same page
    const segments = pathname.split('/')
    // segments[0] is '' (before first /), segments[1] is the locale
    if (segments[1] && locales.includes(segments[1] as any)) {
      segments[1] = targetLocale
    } else {
      segments.splice(1, 0, targetLocale)
    }
    const newPath = segments.join('/') || `/${targetLocale}`

    startTransition(() => {
      router.replace(newPath)
    })
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      disabled={isPending}
      className="w-10 h-7 rounded-sm overflow-hidden border border-border shadow-sm cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50 disabled:pointer-events-none"
      title={locale === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      {locale === 'vi' ? (
        <VietnamFlag className="w-full h-full" />
      ) : (
        <UKFlag className="w-full h-full" />
      )}
    </button>
  )
}
