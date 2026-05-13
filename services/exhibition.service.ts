import axiosInstance from "@/lib/axios";

export interface ExhibitionCategory {
  id: number;
  name_vn: string;
  sumary_vn: string;
  logo: string;
  display_order: number;
}

interface ApiResponse {
  status: string;
  message: string;
  data: ExhibitionCategory[];
}

export const exhibitionService = {
  getCategories: async (): Promise<ExhibitionCategory[]> => {
    const res: ApiResponse = await axiosInstance.get(
      "/exhibition/public/exhibitions"
    );
    return res.data.sort((a, b) => a.display_order - b.display_order);
  },
};
