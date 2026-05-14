import api from "@/lib/axios"

export interface ContactPayload {
  fullName: string
  email: string
  phone: string
  company: string
  department: string
  message: string
}

export const contactService = {
  submitContactForm: async (payload: ContactPayload) => {
    return api.post("/mails/vnsec/contact", payload)
  },
}
