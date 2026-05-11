export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export interface PaginationResponse<T> {
  records: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface AgendaTimeline {
  id: number
  STime: string
  ETime: string
  name_vn: string
  name_en?: string
  short_name_vn: string
  short_name_en?: string
  locate_vn: string
  locate_en?: string
}

export interface AgendaDate {
  id: number
  date: string
  description?: string
  timelines: AgendaTimeline[]
}

export interface Agenda {
  id: number
  name_vn: string
  name_en?: string
  file_url?: string
  web_id: number
  SDate: string
  EDate: string
  agendaDates: AgendaDate[]
}

export interface AgendaQueryParams {
  page?: number
  limit?: number
  orderBy?: string
  sortBy?: "asc" | "desc"
  search?: string
  searchBy?: string
  web_id?: number
  startDate?: string
  endDate?: string
}

export interface AgendaDayTab {
  id: number
  date: string
  shortDate: string
  day: string
  label: string
  description?: string
}

export interface AgendaItem {
  id: number
  time: string
  title: string
  location: string
  type: string
  speakers?: string
}

export interface AgendaViewModel {
  agenda?: Agenda
  days: AgendaDayTab[]
  itemsByDay: Record<number, AgendaItem[]>
  downloadUrl?: string
}
