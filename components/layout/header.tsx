'use client'

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"

function HeaderMenuPanel({
  items,
}: {
  items: Array<{ label: string; href: string }>
}) {
  return (
    <div className="w-[320px] rounded-2xl border border-primary/10 bg-[rgba(255,250,245,0.96)] p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <ul className="grid gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 text-lg font-medium text-foreground transition-colors hover:bg-primary/6 hover:text-primary focus:bg-primary/6 focus:text-primary"
            >
              <span>{item.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:rotate-45 group-hover/item:text-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HoverMenu({
  label,
  items,
}: {
  label: string
  items: Array<{ label: string; href: string }>
}) {
  return (
    <div className="group/menu relative">
      <button
        type="button"
        className="inline-flex h-10 items-center px-4 text-lg font-medium text-foreground transition-colors hover:text-primary focus:outline-none"
      >
        {label}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover/menu:pointer-events-auto group-hover/menu:opacity-100 group-focus-within/menu:pointer-events-auto group-focus-within/menu:opacity-100">
        <HeaderMenuPanel items={items} />
      </div>
    </div>
  )
}

export function Header() {
  const t = useTranslations("header")
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const aboutItems = t.raw("subnav.about") as Array<{ key: string; label: string; href: string }>
  const sponsorItems = t.raw("subnav.sponsor") as Array<{ key: string; label: string; href: string }>

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-warm-card-strong backdrop-blur supports-[backdrop-filter]:bg-[rgba(255,250,245,0.78)]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
        {/* Logo */}
        <Link href={`/${locale}/`} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary shadow-[0_10px_30px_rgba(234,88,12,0.18)]">
            <span className="text-xl font-bold text-primary-foreground">VN</span>
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-lg font-bold uppercase tracking-wider text-foreground">
              {t("logo")}
            </span>
            <span className="text-xs text-muted-foreground">{t("logo_year")}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex">
          <div className="flex items-center gap-1">
            <div>
              <Link
                href={`/${locale}/`}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium text-foreground transition-colors hover:bg-primary/6 hover:text-primary focus:text-primary focus:outline-none"
              >
                {t("nav.0.label")}
              </Link>
            </div>

            <HoverMenu label={t("nav.1.label")} items={aboutItems} />

            <HoverMenu label={t("nav.2.label")} items={sponsorItems} />

            <div>
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium text-foreground transition-colors hover:bg-primary/6 hover:text-primary focus:text-primary focus:outline-none"
              >
                {t("nav.3.label")}
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Button + Language Switcher */}
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href={`/${locale}/register`}>
              {t("cta_register")}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="h-6 w-6" />
              <span className="sr-only">{t("mobile.toggle_label")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm bg-warm-surface p-0">
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b border-primary/10 p-4">
                <span className="text-lg font-bold text-foreground">{t("mobile.menu_label")}</span>
                <LanguageSwitcher />
              </div>
              <nav className="flex flex-col p-4">
                <Link
                  href={`/${locale}/`}
                  className="py-3 text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.0.label")}
                </Link>

                <div className="border-t border-primary/10 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("nav.1.label")}
                  </span>
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 pl-4 text-lg text-foreground hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-primary/10 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("nav.2.label")}
                  </span>
                  {sponsorItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 pl-4 text-lg text-foreground hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/${locale}/contact`}
                  className="border-t border-primary/10 py-3 text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.3.label")}
                </Link>

                <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
                  <Link href={`/${locale}/register`} onClick={() => setIsOpen(false)}>
                    {t("cta_register")}
                  </Link>
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
