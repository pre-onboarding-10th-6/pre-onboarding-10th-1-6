import axios from 'axios'
const defaultOptions = {
  baseURL: 'https://www.pre-onboarding-selection-task.shop/',
  headers: {
    'Content-Type': 'application/json'
  }
}
const instance = axios.create(defaultOptions)

export default instance
