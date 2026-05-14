"use client"

import { useEffect, useMemo, useState } from "react"
import { Clock, MapPin, Users, Download, Sunrise, Sunset } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buildAgendaViewModel, splitAgendaItemsByPeriod } from "@/lib/agenda"
import { agendaService } from "@/services/agenda.service"
import type { AgendaViewModel } from "@/types/agenda"

const periodStyles = {
  morning: {
    icon: Sunrise,
    headerClass: "text-amber-700",
    badgeClass: "border-amber-200 bg-amber-50 text-amber-700",
  },
  afternoon: {
    icon: Sunset,
    headerClass: "text-sky-700",
    badgeClass: "border-sky-200 bg-sky-50 text-sky-700",
  },
}

const agendaWebId = process.env.NEXT_PUBLIC_AGENDA_WEB_ID
  ? Number(process.env.NEXT_PUBLIC_AGENDA_WEB_ID)
  : undefined

const downloadButtonClass =
  "border border-primary/20 bg-background/92 text-foreground shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:border-primary/35 hover:bg-white hover:text-primary"

export default function AgendaPage() {
  const t = useTranslations("about.agenda")
  const locale = useLocale()
  const [agendaView, setAgendaView] = useState<AgendaViewModel>(() =>
    buildAgendaViewModel([], {
      locale,
      dayLabelPrefix: t("dayLabelPrefix"),
      locationFallback: t("locationUpdating"),
    })
  )
  const [activeDay, setActiveDay] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    const fetchAgenda = async () => {
      try {
        setIsLoading(true)
        setError("")

        const response = await agendaService.getPublicAgendas({
          page: 1,
          limit: 100,
          orderBy: "SDate",
          sortBy: "asc",
          ...(Number.isFinite(agendaWebId) ? { web_id: agendaWebId } : {}),
        })
        const viewModel = buildAgendaViewModel(response.data.records, {
          locale,
          dayLabelPrefix: t("dayLabelPrefix"),
          locationFallback: t("locationUpdating"),
        })

        if (!isMounted) return
        setAgendaView(viewModel)
        setActiveDay(viewModel.days[0]?.id)
      } catch {
        if (!isMounted) return
        setError(t("error"))
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchAgenda()

    return () => {
      isMounted = false
    }
  }, [locale, t])

  const activeItems = useMemo(
    () => (activeDay ? agendaView.itemsByDay[activeDay] || [] : []),
    [activeDay, agendaView.itemsByDay]
  )

  const groupedItems = useMemo(
    () => splitAgendaItemsByPeriod(activeItems),
    [activeItems]
  )

  return (
    <>
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              {t("page_badge")}
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
              {(locale === "en" ? agendaView.agenda?.name_en : agendaView.agenda?.name_vn) || t("page_title")}
            </h1>
            <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("page_description")}
            </p>
            {agendaView.downloadUrl ? (
              <Button
                asChild
                variant="outline"
                className={downloadButtonClass}
              >
                <a href={agendaView.downloadUrl} target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  {t("download_pdf")}
                </a>
              </Button>
            ) : (
              <Button
                variant="outline"
                className={downloadButtonClass}
                disabled
              >
                <Download className="mr-2 h-4 w-4" />
                {t("download_pdf")}
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {isLoading && (
              <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                {t("loading")}
              </div>
            )}

            {!isLoading && error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center text-destructive">
                {error}
              </div>
            )}

            {!isLoading && !error && !agendaView.days.length && (
              <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                {t("updating")}
              </div>
            )}

            {!isLoading && !error && agendaView.days.length > 0 && (
              <>
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                  {agendaView.days.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => setActiveDay(day.id)}
                      className={cn(
                        "flex flex-col items-center rounded-xl px-6 py-4 text-center transition-all",
                        activeDay === day.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <span className="text-xs font-medium uppercase">{day.label}</span>
                      <span className="text-lg font-bold">{day.date}</span>
                      <span className="text-xs capitalize">{day.day}</span>
                    </button>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {activeItems.length > 0 ? (
                    (["morning", "afternoon"] as const).map((period) => {
                      const items = groupedItems[period]
                      const periodStyle = periodStyles[period]
                      const PeriodIcon = periodStyle.icon

                      return (
                        <div
                          key={period}
                          className="rounded-2xl border border-border bg-card/70 p-5 sm:p-6"
                        >
                          <div className={cn("mb-4 flex items-center gap-2 text-lg font-semibold", periodStyle.headerClass)}>
                            <PeriodIcon className="h-5 w-5" />
                            {t(`periodLabels.${period}` as any)}
                          </div>

                          {items.length > 0 ? (
                            <div className="space-y-4">
                              {items.map((item) => (
                                <div
                                  key={item.id}
                                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                                >
                                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium", periodStyle.badgeClass)}>
                                      <PeriodIcon className="h-3.5 w-3.5" />
                                      {t(`periodLabels.${period}` as any)}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                                      <Clock className="h-4 w-4 text-primary" />
                                      {item.time}
                                    </span>
                                  </div>
                                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                                    {item.title}
                                  </h3>
                                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {item.location}
                                    </span>
                                    {item.speakers && (
                                      <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {item.speakers}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="rounded-xl border border-dashed border-border bg-background/70 p-6 text-center text-sm text-muted-foreground">
                              {t(`periodEmpty.${period}` as any)}
                            </div>
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                      {t("dayContentUpdating")}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
