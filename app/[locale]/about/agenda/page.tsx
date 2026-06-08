"use client"

import { useLocale, useTranslations } from "next-intl"
import { Clock, Download, MapPin, Sunrise, Sunset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { agendaService } from "@/services/agenda.service"
import { buildAgendaViewModel, splitAgendaItemsByPeriod } from "@/lib/agenda"
import type { AgendaViewModel } from "@/types/agenda"
import { cn } from "@/lib/utils"

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

  useEffect(() => {
    let isMounted = true

    const fetchAgenda = async () => {
      try {
        setIsLoading(true)
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
        if (isMounted) {
          setAgendaView(
            buildAgendaViewModel([], {
              locale,
              dayLabelPrefix: t("dayLabelPrefix"),
              locationFallback: t("locationUpdating"),
            })
          )
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchAgenda()

    return () => {
      isMounted = false
    }
  }, [locale, t])

  const activeItems = agendaView.itemsByDay[activeDay ?? 0] ?? []
  const groupedItems = useMemo(
    () => splitAgendaItemsByPeriod(activeItems),
    [activeItems]
  )

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

      {/* Agenda Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {isLoading && (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                {t("loading")}
              </div>
            )}

            {!isLoading && agendaView.days.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                {t("updating")}
              </div>
            )}

            {!isLoading && agendaView.days.length > 0 && (
              <>
                {/* Day Tabs */}
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                  {agendaView.days.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => setActiveDay(day.id)}
                      className={cn(
                        "rounded-full px-6 py-3 text-sm font-medium transition-all",
                        activeDay === day.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      <span className="hidden sm:inline">{day.label} - </span>
                      {day.shortDate}
                    </button>
                  ))}
                </div>

                {/* Items */}
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
                    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                      {t("dayContentUpdating")}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Download Button */}
            <div className="flex justify-center mt-8">
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
        </div>
      </section>
    </>
  )
}
