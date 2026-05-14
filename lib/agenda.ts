import type { Agenda, AgendaItem, AgendaViewModel } from "@/types/agenda"
import { resolveApiAssetUrl } from "@/lib/api-asset"

type BuildAgendaViewModelOptions = {
  locale?: string
  dayLabelPrefix?: string
  locationFallback?: string
}

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

const resolveAgendaLocale = (locale?: string) =>
  locale === "en" ? "en-US" : "vi-VN"

const createFormatters = (locale?: string) => {
  const resolvedLocale = resolveAgendaLocale(locale)

  return {
    time: new Intl.DateTimeFormat(resolvedLocale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }),
    date: new Intl.DateTimeFormat(resolvedLocale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    shortDate: new Intl.DateTimeFormat(resolvedLocale, {
      day: "2-digit",
      month: "2-digit",
    }),
    weekday: new Intl.DateTimeFormat(resolvedLocale, {
      weekday: "long",
    }),
  }
}

const formatTime = (value: string, formatter: Intl.DateTimeFormat) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "" : formatter.format(date)
}

const formatDate = (value: string, formatter: Intl.DateTimeFormat) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "" : formatter.format(date)
}

const extractHour = (value: string) => {
  const directMatch = value.match(/(?:T|^)(\d{2}):(\d{2})/)
  if (directMatch) {
    return Number(directMatch[1])
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.getUTCHours()
}

const resolveAgendaType = (title: string, shortName: string) => {
  const text = normalizeText(`${shortName} ${title}`)
  const match = typeKeywords.find(([keyword]) => text.includes(normalizeText(keyword)))
  return match?.[1] || "seminar"
}

const pickLocalizedText = (
  locale: string | undefined,
  vietnamese?: string,
  english?: string
) => {
  if (locale === "en") {
    return english || vietnamese || ""
  }

  return vietnamese || english || ""
}

export const resolveAgendaPeriod = (value: string): "morning" | "afternoon" => {
  const hour = extractHour(value)
  return hour !== null && hour < 12 ? "morning" : "afternoon"
}

export const splitAgendaItemsByPeriod = (items: AgendaItem[]) =>
  items.reduce(
    (groups, item) => {
      groups[item.period].push(item)
      return groups
    },
    {
      morning: [] as AgendaItem[],
      afternoon: [] as AgendaItem[],
    }
  )

export const buildAgendaViewModel = (
  agendas: Agenda[],
  options: BuildAgendaViewModelOptions = {}
): AgendaViewModel => {
  const { locale, dayLabelPrefix, locationFallback } = options
  const formatters = createFormatters(locale)
  const agenda = agendas[0]
  const days = agenda?.agendaDates || []
  const itemsByDay: Record<number, AgendaItem[]> = {}

  days.forEach((day, index) => {
    itemsByDay[day.id] = day.timelines.map((timeline) => {
      const title = pickLocalizedText(locale, timeline.name_vn, timeline.name_en)
        || pickLocalizedText(locale, timeline.short_name_vn, timeline.short_name_en)
      const shortName = pickLocalizedText(locale, timeline.short_name_vn, timeline.short_name_en)
        || title

      return {
        id: timeline.id,
        time: `${formatTime(timeline.STime, formatters.time)} - ${formatTime(timeline.ETime, formatters.time)}`,
        title,
        location: pickLocalizedText(locale, timeline.locate_vn, timeline.locate_en) || locationFallback || "Updating",
        type: resolveAgendaType(title, shortName),
        period: resolveAgendaPeriod(timeline.STime),
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
      date: formatDate(day.date, formatters.date),
      shortDate: formatDate(day.date, formatters.shortDate),
      day: formatDate(day.date, formatters.weekday),
      label: `${dayLabelPrefix || "Day"} ${index + 1}`,
      description: day.description,
    })),
    itemsByDay,
    downloadUrl: resolveApiAssetUrl(agenda?.file_url),
  }
}
