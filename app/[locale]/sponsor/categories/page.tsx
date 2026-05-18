"use client"

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  ExhibitionCategory,
  ExhibitionZone,
  exhibitionService,
  getLocalizedZoneField,
} from "@/services/exhibition.service"
import { LucideIconByName } from "@/components/ui/lucide-icon"
import { resolveApiAssetUrl } from "@/lib/api-asset"

export function ExhibitionCategories() {
  const t = useTranslations("sponsor.categories")
  const locale = useLocale()
  const [zones, setZones] = useState<ExhibitionZone[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    exhibitionService.getZonesWithExhibitions()
      .then(setZones)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const getZoneName = (zone: ExhibitionZone) =>
    locale === "vi" ? zone.name_vn : zone.name_en || zone.name_vn

  const getCategoryName = (category: ExhibitionCategory) =>
    (locale === "vi" ? category.name_vn : category.name_en) || category.name_vn

  const getCategorySummary = (category: ExhibitionCategory) =>
    (locale === "vi" ? category.sumary_vn : category.sumary_en) || category.sumary_vn

  const displayZones = zones.map((zone) => ({
    ...zone,
    exhibitions: zone.exhibitions?.filter(Boolean) || [],
  }))

  const emptyZoneText =
    locale === "vi"
      ? "Đang cập nhật lĩnh vực trưng bày"
      : "Exhibition categories are being updated"

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
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <p className="mx-auto mb-16 max-w-4xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
              {t("page_description")}
          </p>
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          ) : displayZones.length > 0 ? (
            <div className="space-y-14">
              {displayZones.map((zone) => (
                <section key={zone.id} className="space-y-6">
                  <div className="text-center">
                    <p className="text-sm font-semibold leading-relaxed text-primary/70">
                      {getLocalizedZoneField(zone, locale)}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold leading-snug text-foreground">
                      {getZoneName(zone)}
                    </h3>
                  </div>

                  {zone.exhibitions.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      {zone.exhibitions.map((category) => (
                        <Link
                          key={`${zone.id}-${category.id}`}
                          href={`/${locale}/sponsor/categories/${category.id}`}
                          className="group rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
                        >
                          <div className="mb-3 flex items-start justify-between gap-3">
                            {resolveApiAssetUrl(category.img) ? (
                              <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-primary/10 bg-white">
                                <Image
                                  src={resolveApiAssetUrl(category.img)!}
                                  alt={getCategoryName(category)}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                                <LucideIconByName name={category.logo} className="h-6 w-6" />
                              </div>
                            )}
                            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
                              +
                            </span>
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                            {getCategoryName(category)}
                          </h3>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {getCategorySummary(category)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                      {emptyZoneText}
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              {emptyZoneText}
            </div>
          )}

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
