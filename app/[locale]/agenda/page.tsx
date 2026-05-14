"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useEffect, useMemo, useState } from "react"
import { Clock, MapPin, Users, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buildAgendaViewModel } from "@/lib/agenda"
import { agendaService } from "@/services/agenda.service"
import type { AgendaViewModel } from "@/types/agenda"

const typeStyles: Record<string, { bg: string; text: string; label: string }> = {
  ceremony: { bg: "bg-primary/10", text: "text-primary", label: "Lễ" },
  keynote: { bg: "bg-orange-500/10", text: "text-orange-600", label: "Keynote" },
  panel: { bg: "bg-blue-500/10", text: "text-blue-600", label: "Panel" },
  workshop: { bg: "bg-green-500/10", text: "text-green-600", label: "Workshop" },
  seminar: { bg: "bg-purple-500/10", text: "text-purple-600", label: "Seminar" },
  networking: { bg: "bg-yellow-500/10", text: "text-yellow-600", label: "Networking" },
  demo: { bg: "bg-pink-500/10", text: "text-pink-600", label: "Demo" },
  registration: { bg: "bg-gray-500/10", text: "text-gray-600", label: "Đăng ký" },
  break: { bg: "bg-gray-500/10", text: "text-gray-500", label: "Nghỉ" },
}

const agendaWebId = process.env.NEXT_PUBLIC_AGENDA_WEB_ID
  ? Number(process.env.NEXT_PUBLIC_AGENDA_WEB_ID)
  : undefined

export default function AgendaPage() {
  const [agendaView, setAgendaView] = useState<AgendaViewModel>(() =>
    buildAgendaViewModel([])
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
        const viewModel = buildAgendaViewModel(response.data.records)

        if (!isMounted) return
        setAgendaView(viewModel)
        setActiveDay(viewModel.days[0]?.id)
      } catch {
        if (!isMounted) return
        setError("Chưa thể tải lịch trình. Vui lòng thử lại sau.")
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Lịch trình
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                {agendaView.agenda?.name_vn || "Agenda Sự kiện"}
              </h1>
              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
                Theo dõi lịch trình hội nghị, workshop và các hoạt động networking mới nhất.
              </p>
              {agendaView.downloadUrl ? (
                <Button
                  asChild
                  variant="outline"
                  className="border-secondary-foreground/20 text-secondary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href={agendaView.downloadUrl} target="_blank" rel="noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Tải lịch trình PDF
                  </a>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="border-secondary-foreground/20 text-secondary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  disabled
                >
                  <Download className="mr-2 h-4 w-4" />
                  Tải lịch trình PDF
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
                  Đang tải lịch trình...
                </div>
              )}

              {!isLoading && error && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center text-destructive">
                  {error}
                </div>
              )}

              {!isLoading && !error && !agendaView.days.length && (
                <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                  Lịch trình đang được cập nhật.
                </div>
              )}

              {!isLoading && !error && agendaView.days.length > 0 && (
                <>
                  <div className="mb-8 flex flex-wrap gap-2">
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

                  <div className="space-y-4">
                    {activeItems.length > 0 ? (
                      activeItems.map((item) => {
                        const style = typeStyles[item.type] || typeStyles.seminar

                        return (
                          <div
                            key={item.id}
                            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                              <div className="shrink-0 sm:w-32">
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                  <Clock className="h-4 w-4 text-primary" />
                                  {item.time}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                  <span className={cn("rounded-full px-3 py-1 text-xs font-medium", style.bg, style.text)}>
                                    {style.label}
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
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                        Nội dung ngày này đang được cập nhật.
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
