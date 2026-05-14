"use client"

import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { agendaService } from "@/services/agenda.service"
import { buildAgendaViewModel } from "@/lib/agenda"
import type { AgendaViewModel } from "@/types/agenda"
import { cn } from "@/lib/utils"
import { Clock, MapPin } from "lucide-react"

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

export default function AgendaPage() {
  const t = useTranslations("about.agenda")
  const typeLabels = useTranslations("home.agenda.typeLabels")

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

  const activeItems = agendaView.itemsByDay[activeDay ?? 0] ?? []

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
                <div className="space-y-4">
                  {activeItems.length > 0 ? (
                    activeItems.map((item) => (
                      <div
                        key={item.id}
                        className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className={cn("rounded-full px-3 py-1 text-xs font-medium", typeStyles[item.type] || "bg-muted text-muted-foreground")}>
                                {typeLabels(item.type)}
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
          </div>
        </div>
      </section>
    </>
  )
}
