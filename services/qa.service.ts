import axiosInstance from "@/lib/axios"
import type { ApiResponse, QACategory } from "@/types/qa"

export const qaService = {
  getPublicQAsByWebId: async (webId: number): Promise<QACategory[]> => {
    const res = (await axiosInstance.get("/qa/public", {
      params: { web_id: webId },
    })) as ApiResponse<QACategory[]>

    return res.data
  },
}
