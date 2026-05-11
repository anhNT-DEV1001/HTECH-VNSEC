import type { Agenda, AgendaItem, AgendaViewModel } from "@/types/agenda"

const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
})

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})

const shortDateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
})

const weekdayFormatter = new Intl.DateTimeFormat("vi-VN", {
  weekday: "long",
})

const typeKeywords: Array<[string, string]> = [
  ["keynote", "keynote"],
  ["panel", "panel"],
  ["workshop", "workshop"],
  ["seminar", "seminar"],
  ["b2b", "networking"],
  ["network", "networking"],
  ["demo", "demo"],
  ["check-in", "registration"],
  ["đăng ký", "registration"],
  ["dang ky", "registration"],
  ["khai mạc", "ceremony"],
  ["khai mac", "ceremony"],
  ["bế mạc", "ceremony"],
  ["be mac", "ceremony"],
  ["nghỉ", "break"],
  ["nghi", "break"],
  ["break", "break"],
]

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

const formatTime = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "" : timeFormatter.format(date)
}

const formatDate = (value: string, formatter: Intl.DateTimeFormat) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "" : formatter.format(date)
}

const resolveAgendaType = (title: string, shortName: string) => {
  const text = normalizeText(`${shortName} ${title}`)
  const match = typeKeywords.find(([keyword]) => text.includes(normalizeText(keyword)))
  return match?.[1] || "seminar"
}

const resolveApiAssetUrl = (path?: string) => {
  if (!path) return undefined
  if (/^https?:\/\//i.test(path)) return path

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
  const host = apiUrl.replace(/\/api\/v\d+\/?$/, "")

  return `${host}${path.startsWith("/") ? path : `/${path}`}`
}

export const buildAgendaViewModel = (agendas: Agenda[]): AgendaViewModel => {
  const agenda = agendas[0]
  const days = agenda?.agendaDates || []
  const itemsByDay: Record<number, AgendaItem[]> = {}

  days.forEach((day, index) => {
    itemsByDay[day.id] = day.timelines.map((timeline) => {
      const title = timeline.name_vn || timeline.name_en || timeline.short_name_vn
      const shortName = timeline.short_name_vn || timeline.short_name_en || title

      return {
        id: timeline.id,
        time: `${formatTime(timeline.STime)} - ${formatTime(timeline.ETime)}`,
        title,
        location: timeline.locate_vn || timeline.locate_en || "Đang cập nhật",
        type: resolveAgendaType(title, shortName),
      }
    })

    if (!itemsByDay[day.id].length) {
      itemsByDay[day.id] = []
    }
  })

  return {
    agenda,
    days: days.map((day, index) => ({
      id: day.id,
      date: formatDate(day.date, dateFormatter),
      shortDate: formatDate(day.date, shortDateFormatter),
      day: formatDate(day.date, weekdayFormatter),
      label: `Ngày ${index + 1}`,
      description: day.description,
    })),
    itemsByDay,
    downloadUrl: resolveApiAssetUrl(agenda?.file_url),
  }
}
