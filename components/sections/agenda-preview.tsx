"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const days = [
  { id: 1, date: "15/10", day: "Ngày 1" },
  { id: 2, date: "16/10", day: "Ngày 2" },
  { id: 3, date: "17/10", day: "Ngày 3" },
  { id: 4, date: "18/10", day: "Ngày 4" },
]

const agendaItems = {
  1: [
    {
      time: "08:00 - 09:00",
      title: "Lễ Khai mạc",
      location: "Hội trường chính",
      type: "ceremony",
    },
    {
      time: "09:30 - 11:00",
      title: "Keynote: Xu hướng An ninh Toàn cầu 2026",
      location: "Hội trường A",
      speakers: "Dr. John Smith, CEO Security Global",
      type: "keynote",
    },
    {
      time: "14:00 - 16:00",
      title: "Panel: AI trong Hệ thống Giám sát",
      location: "Phòng hội thảo 1",
      speakers: "Các chuyên gia hàng đầu",
      type: "panel",
    },
  ],
  2: [
    {
      time: "09:00 - 11:00",
      title: "Workshop: Triển khai Camera AI",
      location: "Phòng workshop 1",
      type: "workshop",
    },
    {
      time: "14:00 - 15:30",
      title: "Hội thảo: Bảo mật Dữ liệu Doanh nghiệp",
      location: "Hội trường B",
      type: "seminar",
    },
  ],
  3: [
    {
      time: "09:00 - 12:00",
      title: "B2B Matching Session",
      location: "Khu vực networking",
      type: "networking",
    },
    {
      time: "14:00 - 16:00",
      title: "Demo: Công nghệ Nhận diện Khuôn mặt",
      location: "Khu demo",
      type: "demo",
    },
  ],
  4: [
    {
      time: "09:00 - 11:00",
      title: "Tổng kết & Trao giải Exhibitor xuất sắc",
      location: "Hội trường chính",
      type: "ceremony",
    },
    {
      time: "11:30 - 12:00",
      title: "Lễ Bế mạc",
      location: "Hội trường chính",
      type: "ceremony",
    },
  ],
}

const typeStyles: Record<string, string> = {
  ceremony: "bg-primary/10 text-primary",
  keynote: "bg-accent/20 text-accent-foreground",
  panel: "bg-blue-500/10 text-blue-600",
  workshop: "bg-green-500/10 text-green-600",
  seminar: "bg-purple-500/10 text-purple-600",
  networking: "bg-yellow-500/10 text-yellow-600",
  demo: "bg-pink-500/10 text-pink-600",
}

export function AgendaPreview() {
  const [activeDay, setActiveDay] = useState(1)

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Lịch trình
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Agenda Sự kiện
          </h2>
          <p className="text-pretty text-muted-foreground">
            4 ngày với hàng trăm hoạt động, từ hội nghị chuyên đề đến workshop thực hành và networking.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {days.map((day) => (
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
              <span className="hidden sm:inline">{day.day} - </span>
              {day.date}
            </button>
          ))}
        </div>

        {/* Agenda Items */}
        <div className="mx-auto max-w-3xl space-y-4">
          {agendaItems[activeDay as keyof typeof agendaItems].map((item, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-medium", typeStyles[item.type])}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
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
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
            <Link href="/about/agenda">
              Xem lịch trình đầy đủ
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
