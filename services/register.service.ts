import api from "@/lib/axios"

export type RegisterType = "visitor" | "exhibitor" | "speaker" | "sponsor"

export interface RegisterPayload {
  registerType: RegisterType
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  interest: string
  acceptedPolicy: boolean
}

export const registerService = {
  submitRegistrationForm: async (payload: RegisterPayload) => {
    return api.post("/mails/vnsec/register", payload)
  },
}
