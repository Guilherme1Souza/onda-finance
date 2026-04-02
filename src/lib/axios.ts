import axios from 'axios'
import { setupMockAdapter } from '@/mocks/mock-adapter'

const api = axios.create({
  baseURL: '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@onda:token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Mock adapter intercepta as requests e devolve dados simulados
setupMockAdapter(api)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Respostas do mock adapter — extrair a response simulada
    if (error.__MOCK__) {
      return error.response
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('@onda:token')
      localStorage.removeItem('@onda:user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
