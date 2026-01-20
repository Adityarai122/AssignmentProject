import axios from 'axios'
import API_BASE_URL from './apiConfig'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')

  // Fallback: look inside the 'user' object if 'token' is missing
  if (!token) {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      token = user?.token
    } catch (e) {
      // Ignore parse errors
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient

