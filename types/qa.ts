export interface QAItem {
  id: number
  category_id: number
  question_vn: string
  question_en?: string | null
  ans_vn?: string | null
  ans_en?: string | null
}

export interface QACategory {
  id: number
  name_vn: string
  name_en?: string | null
  web_id: number
  qas: QAItem[]
}

export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}
