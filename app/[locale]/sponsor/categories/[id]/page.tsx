"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { useLocale } from "next-intl"
import { ArrowLeft, Building2, CalendarDays, Download, MapPin, Sparkles } from "lucide-react"
import { LucideIconByName } from "@/components/ui/lucide-icon"
import { resolveApiAssetUrl } from "@/lib/api-asset"
import {
  exhibitionService,
  getLocalizedZoneField,
  type ExhibitionCategory,
  type ExhibitionZone,
  type PublicConference,
  type PublicExhibitor,
} from "@/services/exhibition.service"

function formatZoneLabel(label?: string | null) {
  return (label || "")
    .replace(/\bCyber Security\b/gi, "Cybersecurity")
    .replace(/\s*,\s*/g, " / ")
}

type RelatedCardVariant = "exhibitor" | "conference"

function ShowcaseCard({
  title,
  description,
  image,
  badge,
  meta,
  variant,
}: {
  title: string
  description?: string | null
  image?: string | null
  badge: string
  meta?: string | null
  variant: RelatedCardVariant
}) {
  const imageUrl = resolveApiAssetUrl(image)
  const Icon = variant === "exhibitor" ? Building2 : CalendarDays

  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary/10 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_28px_65px_rgba(15,23,42,0.12)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
      <div className="p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/10 bg-primary/5">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                width={96}
                height={96}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-primary">
                <Icon className="h-9 w-9" />
              </div>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
          </span>
        </div>

        <h3 className="text-xl font-extrabold leading-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        {description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}

        {meta ? (
          <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-2 text-xs font-semibold text-muted-foreground">
            {variant === "exhibitor" ? <MapPin className="h-3.5 w-3.5 text-primary" /> : <CalendarDays className="h-3.5 w-3.5 text-primary" />}
            <span className="truncate">{meta}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ShowcaseSection<T extends { id: number; name: string; img?: string | null }>({
  title,
  eyebrow,
  description,
  items,
  variant,
  emptyText,
  renderDescription,
  renderMeta,
}: {
  title: string
  eyebrow: string
  description: string
  items: T[]
  variant: RelatedCardVariant
  emptyText: string
  renderDescription: (item: T) => string | null | undefined
  renderMeta?: (item: T) => string | null | undefined
}) {
  return (
    <section className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</p> */}
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {/* <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            {description}
          </p> */}
        </div>
        <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
          {items.length}
        </span>
      </div>

      {items.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ShowcaseCard
              key={item.id}
              title={item.name}
              description={renderDescription(item)}
              image={item.img}
              badge={eyebrow}
              meta={renderMeta?.(item)}
              variant={variant}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-primary/25 bg-warm-card p-8 text-center">
          <p className="text-sm leading-7 text-muted-foreground">{emptyText}</p>
        </div>
      )}
    </section>
  )
}

function DetailCardsSkeleton() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl space-y-14">
          {[0, 1].map((sectionIndex) => (
            <div key={sectionIndex} className="space-y-7">
              <div className="space-y-3">
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                <div className="h-9 w-64 animate-pulse rounded bg-muted" />
                <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-muted" />
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[0, 1, 2].map((itemIndex) => (
                  <div
                    key={itemIndex}
                    className="rounded-xl border border-primary/10 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                  >
                    <div className="mb-5 h-20 w-20 animate-pulse rounded-xl bg-muted" />
                    <div className="h-6 w-4/5 animate-pulse rounded bg-muted" />
                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-4 w-10/12 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function getExhibitorMeta(exhibitor: PublicExhibitor, locale: string) {
  const rank = locale === "vi" ? exhibitor.rank?.name_vn : exhibitor.rank?.name_en || exhibitor.rank?.name_vn
  const booth = exhibitor.booth?.name
  return [rank, booth].filter(Boolean).join(" / ")
}

function getLocalizedSummary(
  item: Pick<PublicExhibitor | PublicConference, "sumary_vn" | "sumary_en">,
  locale: string
) {
  return locale === "vi" ? item.sumary_vn : item.sumary_en || item.sumary_vn
}

export default function ExhibitionCategoryDetailPage() {
  const params = useParams<{ id: string }>()
  const locale = useLocale()
  const [category, setCategory] = useState<ExhibitionCategory | null>(null)
  const [categoryZones, setCategoryZones] = useState<ExhibitionZone[]>([])
  const [exhibitors, setExhibitors] = useState<PublicExhibitor[]>([])
  const [conferences, setConferences] = useState<PublicConference[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const categoryId = Number(params?.id)

    if (!Number.isFinite(categoryId)) {
      setError(locale === "vi" ? "Lĩnh vực triển lãm không hợp lệ." : "Invalid exhibition category.")
      setCategory(null)
      setCategoryZones([])
      setExhibitors([])
      setConferences([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError("")

    Promise.all([
      exhibitionService.getCategoryWithZonesById(categoryId),
      exhibitionService.getExhibitorsByCategoryId(categoryId).catch((err: unknown) => {
        console.error(err)
        return []
      }),
      exhibitionService.getConferencesByCategoryId(categoryId).catch((err: unknown) => {
        console.error(err)
        return []
      }),
    ])
      .then(([data, exhibitorData, conferenceData]) => {
        if (!data) {
          setError(locale === "vi" ? "Không tìm thấy lĩnh vực triển lãm." : "Exhibition category not found.")
          setCategory(null)
          setCategoryZones([])
          setExhibitors([])
          setConferences([])
          return
        }

        setCategory(data.category)
        setCategoryZones(data.zones)
        setExhibitors(exhibitorData)
        setConferences(conferenceData)
        setError("")
      })
      .catch((err: unknown) => {
        console.error(err)
        setError(
          locale === "vi"
            ? "Không thể tải nội dung lĩnh vực triển lãm."
            : "Unable to load exhibition category content."
        )
        setCategory(null)
        setCategoryZones([])
        setExhibitors([])
        setConferences([])
      })
      .finally(() => setLoading(false))
  }, [locale, params?.id])

  const imageUrl = useMemo(() => resolveApiAssetUrl(category?.img), [category?.img])
  const documentPdfUrl = useMemo(() => resolveApiAssetUrl(category?.document_pdf), [category?.document_pdf])
  const categoryName = locale === "vi" ? category?.name_vn : category?.name_en || category?.name_vn
  const categorySummary = locale === "vi" ? category?.sumary_vn : category?.sumary_en || category?.sumary_vn
  const categoryTitle = locale === "vi" ? category?.title_vn : category?.title_en || category?.title_vn
  const zoneFields = useMemo(
    () => Array.from(new Set(categoryZones.map((zone) => getLocalizedZoneField(zone, locale)).filter(Boolean))),
    [categoryZones, locale]
  )
  const primaryLabel = zoneFields[0] || categoryTitle || (locale === "vi" ? "Lĩnh vực triển lãm" : "Exhibition Category")

  return (
    <main className="flex-1">
      <section className="bg-secondary py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {loading ? (
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_360px]">
                <div className="space-y-4">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  <div className="h-12 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-24 w-full animate-pulse rounded bg-muted" />
                </div>
                <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-muted" />
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ) : category ? (
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_360px] lg:items-start">
                <div>
                  <div className="flex flex-col items-start gap-5">
                    <Link
                      href={`/${locale}/sponsor/categories`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-foreground/85 transition-colors hover:text-primary"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {locale === "vi" ? "Quay lại danh mục" : "Back to categories"}
                    </Link>

                    <span className="inline-flex max-w-full items-center gap-3 rounded-full border border-primary/55 bg-primary/10 px-4 py-2.5 text-sm font-semibold leading-6 text-secondary-foreground shadow-[0_0_24px_rgba(234,88,12,0.16)] backdrop-blur sm:text-[15px]">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_22px_rgba(234,88,12,0.24)]">
                        <LucideIconByName name={category.logo} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 whitespace-normal text-left">{formatZoneLabel(primaryLabel)}</span>
                    </span>
                    {zoneFields.length > 1 ? (
                      <div className="flex flex-wrap gap-2">
                        {zoneFields.map((field) => (
                          <span
                            key={field}
                            className="inline-flex rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold text-secondary-foreground/85"
                          >
                            {formatZoneLabel(field)}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-12 lg:mt-16">
                    <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-secondary-foreground sm:text-6xl lg:text-7xl">
                      {categoryName}
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-secondary-foreground/78">
                      {categorySummary}
                    </p>
                    {documentPdfUrl ? (
                      <a
                        href={documentPdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-5 py-3 text-sm font-bold text-primary shadow-[0_14px_34px_rgba(15,23,42,0.10)] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Download className="h-4 w-4" />
                        {locale === "vi" ? "Tải PDF" : "Download PDF"}
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="lg:sticky lg:top-28">
                  <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                    {imageUrl ? (
                      <div className="relative aspect-[4/5] w-full bg-muted">
                        <Image
                          src={imageUrl}
                          alt={categoryName || ""}
                          fill
                          sizes="(max-width: 1024px) 100vw, 360px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 text-primary">
                        <LucideIconByName name={category.logo} className="h-24 w-24" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {loading ? <DetailCardsSkeleton /> : null}

      {category && !loading && !error ? (
        <section className="bg-background py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl space-y-16">
              <ShowcaseSection
                title={locale === "vi" ? "Đơn vị triển lãm" : "Exhibitors"}
                eyebrow={locale === "vi" ? "Exhibitors" : "Exhibitors"}
                description={
                  locale === "vi"
                    ? "Các đơn vị đang trưng bày giải pháp, sản phẩm và công nghệ trong lĩnh vực này."
                    : "Organizations showcasing solutions, products, and technologies in this exhibition category."
                }
                items={exhibitors}
                variant="exhibitor"
                emptyText={
                  locale === "vi"
                    ? "Danh sách đơn vị triển lãm đang được cập nhật."
                    : "The exhibitor list is being updated."
                }
                renderDescription={(item) => getLocalizedSummary(item, locale)}
                renderMeta={(item) => getExhibitorMeta(item, locale)}
              />

              <ShowcaseSection
                title={locale === "vi" ? "Hội thảo chuyên đề" : "Conferences"}
                eyebrow={locale === "vi" ? "Hội thảo" : "Conferences"}
                description={
                  locale === "vi"
                    ? "Các phiên hội thảo, tọa đàm và hoạt động chuyên môn liên quan trực tiếp đến lĩnh vực này."
                    : "Conference sessions, discussions, and focused activities connected to this category."
                }
                items={conferences}
                variant="conference"
                emptyText={
                  locale === "vi"
                    ? "Danh sách hội thảo đang được cập nhật."
                    : "The conference list is being updated."
                }
                renderDescription={(item) => getLocalizedSummary(item, locale)}
                renderMeta={(item) => item.web?.name}
              />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}
