export interface Exhibition {
    id: number
    logo: string
    name_vn: string
    name_en: string
    title_vn: string
    title_en: string
    sumary_vn: string
    sumary_en: string
    content_vn: string
    content_en: string
    display_order: number
    web_id: number
    created_at: string
    updated_at: string
    created_by: string | null
    updated_by: string | null
    zones: Zone[]
}

export interface Zone {
    id: number
    name_vn: string
    name_en: string
    web_id: number
    created_at: string
    updated_at: string
    created_by: string | null
    updated_by: string | null
}

export interface Rank {
    id: number
    name_vn: string
    name_en: string
    display_order: number
    web_id: number
    created_at: string
    updated_at: string
    created_by: string | null
    updated_by: string | null
}

export interface Booth {
    id: number
    name: string
    web_id: number
    created_at: string
    updated_at: string
    created_by: string | null
    updated_by: string | null
}

export interface Exhibitor {
  id: number
  name: string           // ← tên nhà tài trợ
  img?: string | null
  sumary_vn: string
  sumary_en: string
  content_vn: string
  content_en: string
  rankId: number
  boothId: number
  web_id: number
  created_at: string
  updated_at: string
  created_by: string | null
  updated_by: string | null
  web: { id: number; name: string; alias: string; url: string }
  rank: Rank             // ← object phân hạng
  booth: Booth
  exhibitions: Exhibition[]  // ← array chứa logo
}

export interface SponsorTier {
  key: string             
  label: string           
  display_order: number   
  sponsors: Exhibitor[]
}

export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}
