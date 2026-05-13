import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  <T>(response: { data: T }) => response.data as T,
  (error: AxiosError) => Promise.reject(error)
)

const api = axiosInstance as AxiosInstance & {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
}

export default api
