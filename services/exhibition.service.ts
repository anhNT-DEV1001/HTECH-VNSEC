import axiosInstance from "@/lib/axios";

export interface ExhibitionCategory {
  id: number;
  title_vn?: string | null;
  title_en?: string | null;
  name_vn: string;
  name_en?: string | null;
  sumary_vn: string;
  sumary_en?: string | null;
  content_vn?: string | null;
  content_en?: string | null;
  img?: string | null;
  logo?: string | null;
  display_order: number;
}

interface PublicExhibitionRef {
  id: number;
  name_vn: string;
  name_en?: string | null;
  img?: string | null;
}

export interface PublicExhibitor {
  id: number;
  name: string;
  img?: string | null;
  sumary_vn: string;
  sumary_en?: string | null;
  content_vn?: string | null;
  content_en?: string | null;
  web_id?: number;
  web?: {
    id: number;
    name: string;
  } | null;
  booth?: {
    id: number;
    name?: string | null;
  } | null;
  rank?: {
    id: number;
    name_vn: string;
    name_en?: string | null;
  } | null;
  exhibitions?: PublicExhibitionRef[];
  updated_at?: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: ExhibitionCategory[];
}

interface ExhibitorApiResponse {
  status: string;
  message: string;
  data: PublicExhibitor[];
}

export const exhibitionService = {
  getCategories: async (): Promise<ExhibitionCategory[]> => {
    const res = (await axiosInstance.get(
      "/exhibition/public/exhibitions"
    )) as { status: string; message: string; data: ExhibitionCategory[] };
    return res.data.sort((a, b) => a.display_order - b.display_order);
  },

  getCategoryById: async (id: number): Promise<ExhibitionCategory | null> => {
    const categories = await exhibitionService.getCategories();
    return categories.find((category) => category.id === id) || null;
  },

  getExhibitors: async (): Promise<PublicExhibitor[]> => {
    const res: ExhibitorApiResponse = await axiosInstance.get(
      "/exhibition/public/exhibitors"
    );
    return res.data;
  },
};
