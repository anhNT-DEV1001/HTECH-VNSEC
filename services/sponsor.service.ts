import axiosInstance from "@/lib/axios"
import type {Exhibitor} from "@/types/sponsor"

export const sponsorService = {
    getPublicExhibitors: async (): Promise<Exhibitor[]> => {
        const res = (await axiosInstance.get(
            "/exhibition/public/exhibitors"
        )) as { status: string; message: string; data: Exhibitor[] };
        return res.data
    },
}