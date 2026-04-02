import api from '@/lib/axios'
import type { LoginPayload, AuthResponse } from '@/types'

export async function loginService(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', payload)
  return data
}
