import axiosInstance from "@/lib/axios"
import type {
  Agenda,
  AgendaQueryParams,
  ApiResponse,
  PaginationResponse,
} from "@/types/agenda"

export const agendaService = {
  getPublicAgendas: async (params?: AgendaQueryParams) => {
    return axiosInstance.get<
      unknown,
      ApiResponse<PaginationResponse<Agenda>>
    >("/agenda/public", { params })
  },
}
