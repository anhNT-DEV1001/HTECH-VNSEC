"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useState } from "react"
import { Clock, MapPin, Users, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const days = [
  { id: 1, date: "15/10/2026", day: "Thứ Năm", label: "Ngày 1" },
  { id: 2, date: "16/10/2026", day: "Thứ Sáu", label: "Ngày 2" },
  { id: 3, date: "17/10/2026", day: "Thứ Bảy", label: "Ngày 3" },
  { id: 4, date: "18/10/2026", day: "Chủ Nhật", label: "Ngày 4" },
]

const fullAgenda = {
  1: [
    { time: "07:00 - 08:00", title: "Đăng ký & Check-in", location: "Sảnh chính", type: "registration" },
    { time: "08:00 - 09:00", title: "Lễ Khai mạc VN Security 2026", location: "Hội trường A", type: "ceremony", speakers: "Ban tổ chức & Lãnh đạo cấp cao" },
    { time: "09:00 - 09:30", title: "Nghỉ giải lao & Networking", location: "Khu vực networking", type: "break" },
    { time: "09:30 - 11:00", title: "Keynote: Xu hướng An ninh Toàn cầu 2026", location: "Hội trường A", type: "keynote", speakers: "Dr. John Smith - CEO Security Global" },
    { time: "11:00 - 12:00", title: "Keynote: AI trong Hệ thống Giám sát Hiện đại", location: "Hội trường A", type: "keynote", speakers: "Prof. Sarah Johnson - MIT" },
    { time: "12:00 - 13:30", title: "Nghỉ trưa", location: "Khu ẩm thực", type: "break" },
    { time: "13:30 - 15:00", title: "Panel: Tương lai của An ninh Mạng", location: "Hội trường B", type: "panel", speakers: "Các chuyên gia từ Google, Microsoft, Kaspersky" },
    { time: "15:00 - 16:30", title: "Workshop: Triển khai Camera AI", location: "Phòng workshop 1", type: "workshop" },
    { time: "15:00 - 16:30", title: "Workshop: Bảo mật IoT", location: "Phòng workshop 2", type: "workshop" },
    { time: "17:00 - 19:00", title: "Welcome Reception", location: "Sảnh VIP", type: "networking" },
  ],
  2: [
    { time: "08:00 - 09:00", title: "Đăng ký & Check-in", location: "Sảnh chính", type: "registration" },
    { time: "09:00 - 10:30", title: "Seminar: Công nghệ Nhận diện Khuôn mặt", location: "Hội trường A", type: "seminar", speakers: "Các chuyên gia từ Hikvision, Dahua" },
    { time: "09:00 - 10:30", title: "Workshop: Access Control Systems", location: "Phòng workshop 1", type: "workshop" },
    { time: "10:30 - 11:00", title: "Nghỉ giải lao", location: "Khu vực networking", type: "break" },
    { time: "11:00 - 12:30", title: "Panel: Smart City & Giải pháp An ninh Đô thị", location: "Hội trường A", type: "panel" },
    { time: "12:30 - 14:00", title: "Nghỉ trưa", location: "Khu ẩm thực", type: "break" },
    { time: "14:00 - 15:30", title: "Seminar: Bảo mật Dữ liệu Doanh nghiệp", location: "Hội trường B", type: "seminar" },
    { time: "14:00 - 17:00", title: "B2B Matching Session", location: "Khu vực B2B", type: "networking" },
    { time: "15:30 - 17:00", title: "Demo: Công nghệ Sinh trắc học", location: "Khu demo", type: "demo" },
  ],
  3: [
    { time: "08:00 - 09:00", title: "Đăng ký & Check-in", location: "Sảnh chính", type: "registration" },
    { time: "09:00 - 12:00", title: "B2B Matching Session", location: "Khu vực B2B", type: "networking" },
    { time: "09:00 - 10:30", title: "Seminar: An ninh cho Ngân hàng & Tài chính", location: "Hội trường A", type: "seminar" },
    { time: "10:30 - 12:00", title: "Workshop: Tích hợp Hệ thống An ninh", location: "Phòng workshop 1", type: "workshop" },
    { time: "12:00 - 13:30", title: "Nghỉ trưa", location: "Khu ẩm thực", type: "break" },
    { time: "13:30 - 15:00", title: "Panel: Xu hướng An ninh cho Bán lẻ", location: "Hội trường B", type: "panel" },
    { time: "15:00 - 17:00", title: "Demo: Công nghệ Báo cháy Thông minh", location: "Khu demo", type: "demo" },
    { time: "18:00 - 21:00", title: "Gala Dinner", location: "Grand Ballroom - SECC", type: "networking" },
  ],
  4: [
    { time: "08:00 - 09:00", title: "Đăng ký & Check-in", location: "Sảnh chính", type: "registration" },
    { time: "09:00 - 10:30", title: "Seminar: Giải pháp An ninh cho Công nghiệp", location: "Hội trường A", type: "seminar" },
    { time: "09:00 - 11:00", title: "B2B Matching Session", location: "Khu vực B2B", type: "networking" },
    { time: "10:30 - 11:30", title: "Tổng kết & Trao giải Exhibitor Xuất sắc", location: "Hội trường chính", type: "ceremony" },
    { time: "11:30 - 12:00", title: "Lễ Bế mạc VN Security 2026", location: "Hội trường chính", type: "ceremony" },
  ],
}

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

export default function AgendaPage() {
  const [activeDay, setActiveDay] = useState(1)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Lịch trình
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
                Agenda Sự kiện
              </h1>
              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
                4 ngày với hàng trăm hoạt động từ hội nghị, workshop đến networking
              </p>
              <Button variant="outline" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                <Download className="mr-2 h-4 w-4" />
                Tải lịch trình PDF
              </Button>
            </div>
          </div>
        </section>

        {/* Agenda Content */}
        <section className="bg-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              {/* Day Tabs */}
              <div className="mb-8 flex flex-wrap gap-2">
                {days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day.id)}
                    className={cn(
                      "flex flex-col items-center rounded-xl px-6 py-4 text-center transition-all",
                      activeDay === day.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    <span className="text-xs font-medium uppercase">{day.label}</span>
                    <span className="text-lg font-bold">{day.date}</span>
                    <span className="text-xs">{day.day}</span>
                  </button>
                ))}
              </div>

              {/* Agenda Items */}
              <div className="space-y-4">
                {fullAgenda[activeDay as keyof typeof fullAgenda].map((item, index) => {
                  const style = typeStyles[item.type]
                  return (
                    <div
                      key={index}
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
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
