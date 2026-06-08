"use client"

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { ArrowRight, Expand } from "lucide-react"
import Link from "next/link"
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

  const getCategoryImageUrl = (category: ExhibitionCategory) =>
    resolveApiAssetUrl(category.img)

  const displayZones = zones.map((zone) => ({
    ...zone,
    exhibitions: zone.exhibitions?.filter(Boolean) || [],
  }))

  const emptyZoneText =
    locale === "vi"
      ? "Đang cập nhật lĩnh vực trưng bày"
      : "Exhibition categories are being updated"

  const exploreText = locale === "vi" ? "Xem chi tiết" : "Details"

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              {t("page_badge")}
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold uppercase tracking-tight text-secondary-foreground sm:text-5xl">
              {t("page_title")}
            </h1>
            <p className="mt-6 text-center text-sm leading-8 text-secondary-foreground/78">
              {t("page_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl bg-white/80">
                  <div className="aspect-[4/3] animate-pulse bg-muted" />
                  <div className="space-y-2 px-1 py-3">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayZones.length > 0 ? (
            <div className="space-y-14">
              {displayZones.map((zone) => (
                <section key={zone.id} className="space-y-6">
                  <div>
                    <h3 className="mt-2 mb-2 text-5xl font-extrabold leading-tight text-foreground">
                      {getZoneName(zone)}
                    </h3>
                    <p className="text-xl font-semibold leading-relaxed text-primary">
                      {getLocalizedZoneField(zone, locale)}
                    </p>
                  </div>

                  {zone.exhibitions.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {zone.exhibitions.map((category) => {
                        const imageUrl = getCategoryImageUrl(category)

                        return (
                          <div
                            key={`${zone.id}-${category.id}`}
                            className="group flex h-full flex-col"
                          >
                            <Link
                              href={`/${locale}/sponsor/categories/${category.id}`}
                              className="relative w-full overflow-hidden rounded-2xl bg-white text-left shadow-[0_16px_32px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                              aria-label={`${exploreText} ${getCategoryName(category)}`}
                            >
                              {imageUrl ? (
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                                  <Image
                                    src={imageUrl}
                                    alt={getCategoryName(category)}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                                </div>
                              ) : (
                                <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 text-primary">
                                  <LucideIconByName name={category.logo} className="h-10 w-10" />
                                </div>
                              )}
                              <div className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-primary shadow-lg backdrop-blur">
                                <Expand className="h-3.5 w-3.5" />
                              </div>
                            </Link>
                            <div className="flex min-h-[88px] flex-1 flex-col pt-3">
                              <h3 className="text-lg font-semibold leading-snug text-foreground">
                                {getCategoryName(category)}
                              </h3>
                              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                {getCategorySummary(category)}
                              </p>
                              <Link
                                href={`/${locale}/sponsor/categories/${category.id}`}
                                className="mt-4 inline-flex w-fit items-center rounded-full border border-primary/35 px-4 py-2 text-sm font-semibold leading-none text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                              >
                                {exploreText}
                                <ArrowRight className="ml-1.5 h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="rounded-[1.75rem] border border-primary/10 bg-white/70 p-8 text-center text-sm font-semibold text-muted-foreground">
                      {emptyZoneText}
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-primary/10 bg-white/70 p-8 text-center text-sm font-semibold text-muted-foreground">
              {emptyZoneText}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 flex justify-end">
            <p className="text-right text-base leading-relaxed text-muted-foreground">
              {t("cta_question")}{" "}
              <Link
                href={`/${locale}/sponsor/register`}
                className="font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {locale === "vi" ? "Đăng ký gian hàng ngay" : "Register booth now"}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default function CategoriesPage() {
  return <ExhibitionCategories />
}
