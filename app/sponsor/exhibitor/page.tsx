"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useEffect, useMemo, useState } from "react"
import { Search, MapPin, Building2, Layers3, ShieldAlert } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { LucideIconByName } from "@/components/ui/lucide-icon"
import { exhibitionService, type PublicExhibitor } from "@/services/exhibition.service"

const tierColors = {
  diamond: "border-l-primary",
  gold: "border-l-yellow-500",
  silver: "border-l-slate-400",
  standard: "border-l-border",
} as const

const normalizeText = (value?: string | null) => value?.toLowerCase().trim() || ""

const getTier = (rankName?: string | null) => {
  const normalizedRank = normalizeText(rankName)
  if (normalizedRank.includes("diamond") || normalizedRank.includes("kim cương")) return "diamond"
  if (normalizedRank.includes("gold") || normalizedRank.includes("vàng")) return "gold"
  if (normalizedRank.includes("silver") || normalizedRank.includes("bạc")) return "silver"
  return "standard"
}

export default function ExhibitorsPage() {
  const [exhibitors, setExhibitors] = useState<PublicExhibitor[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tất cả")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    exhibitionService
      .getExhibitors()
      .then((data) => {
        setExhibitors(data)
        setError("")
      })
      .catch((err: unknown) => {
        console.error(err)
        setError("Không thể tải danh sách exhibitor")
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const exhibitionNames = exhibitors.flatMap((exhibitor) =>
      exhibitor.exhibitions?.map((exhibition) => exhibition.name_vn).filter(Boolean) || []
    )

    return ["Tất cả", ...Array.from(new Set(exhibitionNames))]
  }, [exhibitors])

  const filteredExhibitors = useMemo(() => {
    const query = normalizeText(searchQuery)

    return exhibitors.filter((exhibitor) => {
      const exhibitionNames = exhibitor.exhibitions?.map((item) => item.name_vn).join(" ") || ""
      const matchesSearch =
        !query ||
        normalizeText(exhibitor.name).includes(query) ||
        normalizeText(exhibitor.sumary_vn).includes(query) ||
        normalizeText(exhibitor.rank?.name_vn).includes(query) ||
        normalizeText(exhibitor.booth?.name).includes(query) ||
        normalizeText(exhibitor.web?.name).includes(query) ||
        normalizeText(exhibitionNames).includes(query)

      const matchesCategory =
        activeCategory === "Tất cả" ||
        exhibitor.exhibitions?.some((exhibition) => exhibition.name_vn === activeCategory)

      return matchesSearch && matchesCategory
    })
  }, [activeCategory, exhibitors, searchQuery])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Nhà triển lãm
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Danh sách Exhibitor
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Danh sách exhibitor được đồng bộ từ hệ thống quản trị VNSEC.
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
                    placeholder="Tìm theo tên, rank, booth, web-site..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all",
                        activeCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Hiển thị <span className="font-semibold text-foreground">{filteredExhibitors.length}</span> nhà triển lãm
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                    Kim cương
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    Vàng
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-slate-400" />
                    Bạc
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
                  <p className="text-muted-foreground">Không tìm thấy nhà triển lãm phù hợp</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredExhibitors.map((exhibitor) => {
                    const tier = getTier(exhibitor.rank?.name_vn)

                    return (
                      <div
                        key={exhibitor.id}
                        className={cn(
                          "group rounded-xl border border-border border-l-4 bg-card p-6 transition-all hover:shadow-md",
                          tierColors[tier]
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <LucideIconByName name={exhibitor.logo_url} className="h-7 w-7" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <h3 className="mb-1 text-lg font-semibold text-card-foreground group-hover:text-primary">
                                  {exhibitor.name}
                                </h3>
                                <div className="mb-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Layers3 className="h-4 w-4" />
                                    {exhibitor.rank?.name_vn || "Chưa có rank"}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {exhibitor.booth?.name || "Chưa có booth"}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Building2 className="h-4 w-4" />
                                    {exhibitor.web?.name || "Chưa gán web-site"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                              {exhibitor.sumary_vn || "Chưa có mô tả ngắn"}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {exhibitor.exhibitions?.length ? (
                                exhibitor.exhibitions.map((exhibition) => (
                                  <span
                                    key={exhibition.id}
                                    className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                                  >
                                    {exhibition.name_vn}
                                  </span>
                                ))
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                                  <ShieldAlert className="h-3.5 w-3.5" />
                                  Chưa liên kết exhibition
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
      </main>
      <Footer />
    </div>
  )
}
