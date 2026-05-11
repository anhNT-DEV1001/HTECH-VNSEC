import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"

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
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => Promise.reject(error)
)

export default axiosInstance
