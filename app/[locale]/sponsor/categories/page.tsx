"use client"

import { useTranslations, useLocale } from "next-intl"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ExhibitionCategory, exhibitionService } from "@/services/exhibition.service"
import { LucideIconByName } from "@/components/ui/lucide-icon"

export function ExhibitionCategories() {
  const t = useTranslations("sponsor.categories")
  const locale = useLocale()
  const [categories, setCategories] = useState<ExhibitionCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    exhibitionService.getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              {t("page_badge")}
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
              {t("page_title")}
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("page_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-52 animate-pulse rounded-2xl bg-muted" />
                ))
              : categories.map((category) => (
                  <div
                    key={category.id}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                        <LucideIconByName name={category.logo} className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        +
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                      {locale === "vi" ? category.name_vn : category.name_en}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {locale === "vi" ? category.sumary_vn : category.sumary_en}
                    </p>
                  </div>
                ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="mb-4 text-muted-foreground">
              {t("cta_question")}
            </p>
            <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
              <Link href={`/${locale}/sponsor/register`}>
                {t("cta_button")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default function CategoriesPage() {
  return <ExhibitionCategories />
}
