import { sleep } from '@/lib/utils'
import { MOCK_CREDENTIALS, MOCK_USER } from '@/mocks/data'
import type { LoginPayload, AuthResponse } from '@/types'

export async function loginService(payload: LoginPayload): Promise<AuthResponse> {
  await sleep(1200)

  if (
    payload.email !== MOCK_CREDENTIALS.email ||
    payload.password !== MOCK_CREDENTIALS.password
  ) {
    throw new Error('E-mail ou senha incorretos.')
  }

  return {
    user: MOCK_USER,
    token: 'mock_jwt_token_onda_finance_2024',
  }
}
