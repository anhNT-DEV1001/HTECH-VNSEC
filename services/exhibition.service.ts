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
  document_pdf?: string | null;
  logo?: string | null;
  display_order: number;
  web_id?: number;
}

export interface ExhibitionZone {
  id: number;
  name_vn: string;
  name_en?: string | null;
  field_vn?: string | null;
  field_en?: string | null;
  web_id: number;
  exhibitions?: ExhibitionCategory[];
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

export interface PublicConference {
  id: number;
  name: string;
  img?: string | null;
  sumary_vn: string;
  sumary_en?: string | null;
  content_vn?: string | null;
  content_en?: string | null;
  display_order: number;
  web_id?: number;
  web?: {
    id: number;
    name: string;
  } | null;
  exhibitions?: PublicExhibitionRef[];
  updated_at?: string;
}

interface ZoneApiResponse {
  status: string;
  message: string;
  data: ExhibitionZone[];
}

interface ExhibitorApiResponse {
  status: string;
  message: string;
  data: PublicExhibitor[];
}

interface ConferenceApiResponse {
  status: string;
  message: string;
  data: PublicConference[];
}

const DEFAULT_EXHIBITION_WEB_ID = 2;

const getExhibitionWebId = () => {
  const webId = Number(process.env.NEXT_PUBLIC_EXHIBITION_WEB_ID);
  return Number.isFinite(webId) && webId > 0 ? webId : DEFAULT_EXHIBITION_WEB_ID;
};

const getUniqueCategoriesFromZones = (zones: ExhibitionZone[]) => {
  const categoryMap = new Map<number, ExhibitionCategory>();

  zones.forEach((zone) => {
    zone.exhibitions?.forEach((category) => {
      if (!categoryMap.has(category.id)) {
        categoryMap.set(category.id, category);
      }
    });
  });

  return Array.from(categoryMap.values()).sort((a, b) => {
    const orderResult = (a.display_order || 0) - (b.display_order || 0);
    return orderResult || a.id - b.id;
  });
};

export const getLocalizedZoneField = (zone: ExhibitionZone, locale: string) => {
  const field = locale === "vi" ? zone.field_vn : zone.field_en || zone.field_vn;
  const fallbackName = locale === "vi" ? zone.name_vn : zone.name_en || zone.name_vn;
  return field?.trim() || fallbackName;
};

export interface ExhibitionCategoryWithZones {
  category: ExhibitionCategory;
  zones: ExhibitionZone[];
}

export const exhibitionService = {
  getZonesWithExhibitions: async (
    webId = getExhibitionWebId()
  ): Promise<ExhibitionZone[]> => {
    const res: ZoneApiResponse = await axiosInstance.get(
      `/exhibition/public/zones/web/${webId}`
    );
    return res.data;
  },

  getCategories: async (): Promise<ExhibitionCategory[]> => {
    const zones = await exhibitionService.getZonesWithExhibitions();
    return getUniqueCategoriesFromZones(zones);
  },

  getCategoryById: async (id: number): Promise<ExhibitionCategory | null> => {
    const categories = await exhibitionService.getCategories();
    return categories.find((category) => category.id === id) || null;
  },

  getCategoryWithZonesById: async (
    id: number
  ): Promise<ExhibitionCategoryWithZones | null> => {
    const zones = await exhibitionService.getZonesWithExhibitions();
    let category: ExhibitionCategory | null = null;
    const matchedZones: ExhibitionZone[] = [];

    zones.forEach((zone) => {
      const matchedCategory = zone.exhibitions?.find((item) => item.id === id);

      if (matchedCategory) {
        category = category || matchedCategory;
        matchedZones.push({
          ...zone,
          exhibitions: zone.exhibitions?.filter(Boolean) || [],
        });
      }
    });

    return category ? { category, zones: matchedZones } : null;
  },

  getExhibitors: async (): Promise<PublicExhibitor[]> => {
    const res: ExhibitorApiResponse = await axiosInstance.get(
      "/exhibition/public/exhibitors"
    );
    return res.data;
  },

  getExhibitorsByCategoryId: async (id: number): Promise<PublicExhibitor[]> => {
    const res: ExhibitorApiResponse = await axiosInstance.get(
      `/exhibition/public/exhibitions/${id}/exhibitors`
    );
    return res.data;
  },

  getConferencesByCategoryId: async (id: number): Promise<PublicConference[]> => {
    const res: ConferenceApiResponse = await axiosInstance.get(
      `/exhibition/public/exhibitions/${id}/conferences`
    );
    return res.data;
  },
};
