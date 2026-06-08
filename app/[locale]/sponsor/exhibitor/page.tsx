"use client"

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Search, MapPin, Building2, Layers3, ShieldAlert } from "lucide-react"
import { Input } from "@/components/ui/input"
import { resolveApiAssetUrl } from "@/lib/api-asset"
import { cn } from "@/lib/utils"
import { exhibitionService, type PublicExhibitor } from "@/services/exhibition.service"

const tierColors = {
  diamond: "border-l-primary",
  gold: "border-l-yellow-500",
  silver: "border-l-slate-400",
  bronze: "border-l-bronze",
  standard: "border-l-border",
} as const

const normalizeText = (value?: string | null) => value?.toLowerCase().trim() || ""

const getTier = (rankName?: string | null) => {
  const normalizedRank = normalizeText(rankName)
  if (normalizedRank.includes("diamond") || normalizedRank.includes("kim cương")) return "diamond"
  if (normalizedRank.includes("gold") || normalizedRank.includes("vàng")) return "gold"
  if (normalizedRank.includes("silver") || normalizedRank.includes("bạc")) return "silver"
  if (normalizedRank.includes("bronze") || normalizedRank.includes("đồng")) return "bronze"
  return "standard"
}

export default function ExhibitorsPage() {
  const t = useTranslations("sponsor.exhibitor")
  const locale = useLocale()
  const [exhibitors, setExhibitors] = useState<PublicExhibitor[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tất cả")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const legend = t.raw("legend") as Record<string, string>
  const fallbacks = t.raw("fallbacks") as Record<string, string>

  useEffect(() => {
    exhibitionService
      .getExhibitors()
      .then((data) => {
        setExhibitors(data)
        setError("")
      })
      .catch((err: unknown) => {
        console.error(err)
        setError(t("error"))
      })
      .finally(() => setLoading(false))
  }, [t])

  const categories = useMemo(() => {
    const exhibitionNames = exhibitors.flatMap((exhibitor) =>
      exhibitor.exhibitions?.map((exhibition) =>
        locale === "vi" ? exhibition.name_vn : exhibition.name_en
      ).filter(Boolean) || []
    )
    return [t("category_all"), ...Array.from(new Set(exhibitionNames))]
  }, [exhibitors, locale, t])

  const filteredExhibitors = useMemo(() => {
    const query = normalizeText(searchQuery)

    return exhibitors.filter((exhibitor) => {
      const exhibitionNames = exhibitor.exhibitions?.map((item) =>
        (locale === "vi" ? item.name_vn : item.name_en) || ""
      ).join(" ") || ""
      const matchesSearch =
        !query ||
        normalizeText(exhibitor.name).includes(query) ||
        normalizeText(locale === "vi" ? exhibitor.sumary_vn : exhibitor.sumary_en).includes(query) ||
        normalizeText(locale === "vi" ? exhibitor.rank?.name_vn : exhibitor.rank?.name_en).includes(query) ||
        normalizeText(exhibitor.booth?.name).includes(query) ||
        normalizeText(exhibitor.web?.name).includes(query) ||
        normalizeText(exhibitionNames).includes(query)

      const matchesCategory =
        activeCategory === t("category_all") ||
        exhibitor.exhibitions?.some((exhibition) =>
          (locale === "vi" ? exhibition.name_vn : exhibition.name_en) === activeCategory
        )

      return matchesSearch && matchesCategory
    })
  }, [activeCategory, exhibitors, searchQuery, locale, t])

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

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category as any)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-all",
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {t("showing_label")} <span className="font-semibold text-foreground">{filteredExhibitors.length}</span> {t("showing_suffix")}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pr-4">
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-primary" />
                  {legend.diamond}
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  {legend.gold}
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-slate-400" />
                  {legend.silver}
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-amber-600" />
                  {legend.bronze}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-48 animate-pulse rounded-xl bg-muted" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ) : filteredExhibitors.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">{t("not_found")}</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredExhibitors.map((exhibitor) => {
                  const tier = getTier(locale === "vi" ? exhibitor.rank?.name_vn : exhibitor.rank?.name_en)
                  const imageUrl = resolveApiAssetUrl(exhibitor.img)

                  return (
                    <div
                      key={exhibitor.id}
                      className={cn(
                        "group rounded-xl border border-border border-l-4 bg-card p-6 transition-all hover:shadow-md",
                        tierColors[tier]
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={exhibitor.name}
                              width={64}
                              height={64}
                              className="h-full w-full object-contain p-2"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                              <Building2 className="h-7 w-7" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="mb-1 text-lg font-semibold text-card-foreground group-hover:text-primary">
                                {exhibitor.name}
                              </h3>
                            </div>
                          </div>

                          <div className="mb-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Layers3 className="h-4 w-4" />
                              {(locale === "vi" ? exhibitor.rank?.name_vn : exhibitor.rank?.name_en) || fallbacks.no_rank}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {exhibitor.booth?.name || fallbacks.no_booth}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {exhibitor.web?.name || fallbacks.no_website}
                            </span>
                          </div>

                          <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {(locale === "vi" ? exhibitor.sumary_vn : exhibitor.sumary_en) || fallbacks.no_description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {exhibitor.exhibitions?.length ? (
                              exhibitor.exhibitions.map((exhibition) => (
                                <Link
                                  key={exhibition.id}
                                  href={`/${locale}/sponsor/categories/${exhibition.id}`}
                                  className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-2.5 py-1 pr-3 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                                >
                                  {resolveApiAssetUrl(exhibition.img) ? (
                                    <span className="flex h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/70 bg-white">
                                      <Image
                                        src={resolveApiAssetUrl(exhibition.img)!}
                                        alt={(locale === "vi" ? exhibition.name_vn : exhibition.name_en) || exhibition.name_vn}
                                        width={24}
                                        height={24}
                                        className="h-full w-full object-cover"
                                      />
                                    </span>
                                  ) : null}
                                  <span>
                                    {(locale === "vi" ? exhibition.name_vn : exhibition.name_en) || exhibition.name_vn}
                                  </span>
                                </Link>
                              ))
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                                <ShieldAlert className="h-3.5 w-3.5" />
                                {fallbacks.not_linked}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
