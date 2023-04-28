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
export const todoInstance: AxiosInstance = axios.create(defaultOptions)

todoInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

todoInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.error(error)
    return Promise.reject()
  }
)
