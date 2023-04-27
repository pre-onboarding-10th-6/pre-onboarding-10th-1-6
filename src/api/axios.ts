import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = 'https://www.pre-onboarding-selection-task.shop'

const defaultOptions = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const instance: AxiosInstance = axios.create(defaultOptions)

export const authInstance: AxiosInstance = axios.create(defaultOptions)

authInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)
