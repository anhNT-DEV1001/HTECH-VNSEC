"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { ArrowRight, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buildAgendaViewModel } from "@/lib/agenda"
import { agendaService } from "@/services/agenda.service"
import type { AgendaViewModel } from "@/types/agenda"

const typeStyles: Record<string, string> = {
  ceremony: "bg-primary/10 text-primary",
  keynote: "bg-accent/20 text-accent-foreground",
  panel: "bg-blue-500/10 text-blue-600",
  workshop: "bg-green-500/10 text-green-600",
  seminar: "bg-purple-500/10 text-purple-600",
  networking: "bg-yellow-500/10 text-yellow-600",
  demo: "bg-pink-500/10 text-pink-600",
  registration: "bg-gray-500/10 text-gray-600",
  break: "bg-gray-500/10 text-gray-500",
}

const agendaWebId = process.env.NEXT_PUBLIC_AGENDA_WEB_ID
  ? Number(process.env.NEXT_PUBLIC_AGENDA_WEB_ID)
  : undefined

export function AgendaPreview() {
  const t = useTranslations("home.agenda")
  const locale = useLocale()
  const [agendaView, setAgendaView] = useState<AgendaViewModel>(() =>
    buildAgendaViewModel([])
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
        const viewModel = buildAgendaViewModel(response.data.records)

        if (!isMounted) return
        setAgendaView(viewModel)
        setActiveDay(viewModel.days[0]?.id)
      } catch {
        if (isMounted) setAgendaView(buildAgendaViewModel([]))
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchAgenda()

    return () => {
      isMounted = false
    }
  }, [])

  const activeItems = useMemo(
    () => (activeDay ? agendaView.itemsByDay[activeDay] || [] : []),
    [activeDay, agendaView.itemsByDay]
  )

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            {t("section_badge")}
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="text-pretty text-muted-foreground">
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
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <span className="hidden sm:inline">{day.label} - </span>
                  {day.shortDate}
                </button>
              ))}
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {activeItems.length > 0 ? (
                activeItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className={cn("rounded-full px-3 py-1 text-xs font-medium", typeStyles[item.type] || typeStyles.seminar)}>
                            {t(`typeLabels.${item.type}` as any) || "Seminar"}
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {item.time}
                          </span>
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
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                  {t("dayContentUpdating")}
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
            <Link href={`/${locale}/about/agenda`}>
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
