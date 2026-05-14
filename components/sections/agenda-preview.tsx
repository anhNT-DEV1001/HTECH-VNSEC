"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { ArrowRight, Clock, MapPin, Sunrise, Sunset, Users } from "lucide-react"
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

export function AgendaPreview() {
  const t = useTranslations("home.agenda")
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

  const activeItems = useMemo(
    () => (activeDay ? agendaView.itemsByDay[activeDay] || [] : []),
    [activeDay, agendaView.itemsByDay]
  )

  const groupedItems = useMemo(
    () => splitAgendaItemsByPeriod(activeItems),
    [activeItems]
  )

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-5xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            {t("section_badge")}
          </span>
          <h2 className="homepage-section-title mx-auto mb-6 max-w-5xl text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-3xl text-pretty text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {isLoading && (
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
            {t("loading")}
          </div>
        )}

        {!isLoading && agendaView.days.length === 0 && (
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
            {t("updating")}
          </div>
        )}

        {!isLoading && agendaView.days.length > 0 && (
          <>
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {agendaView.days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={cn(
                    "rounded-full px-6 py-3 text-sm font-medium transition-all",
                    activeDay === day.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <span className="hidden sm:inline">{day.label} - </span>
                  {day.shortDate}
                </button>
              ))}
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
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
                              {item.speakers && (
                                <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  {item.speakers}
                                </div>
                              )}
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

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
            <Link href={`/${locale}/agenda`}>
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
