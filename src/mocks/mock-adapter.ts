import type { InternalAxiosRequestConfig, AxiosHeaders } from 'axios'
import { sleep, generateId } from '@/lib/utils'
import { MOCK_CREDENTIALS, MOCK_USER, MOCK_ACCOUNT, MOCK_TRANSACTIONS } from './data'
import type { TransferPayload, Transaction } from '@/types'

function mockResponse(data: unknown, status = 200) {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  }
}

function mockError(message: string, status: number) {
  const error = {
    response: {
      data: { message },
      status,
      statusText: 'Error',
      headers: {} as AxiosHeaders,
      config: {} as InternalAxiosRequestConfig,
    },
    message,
  }
  return error
}

type RouteHandler = (config: InternalAxiosRequestConfig) => Promise<ReturnType<typeof mockResponse>>

const routes: Record<string, Record<string, RouteHandler>> = {
  POST: {
    '/api/auth/login': async (config) => {
      await sleep(1200)
      const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      if (
        body.email !== MOCK_CREDENTIALS.email ||
        body.password !== MOCK_CREDENTIALS.password
      ) {
        throw mockError('E-mail ou senha incorretos.', 401)
      }
      return mockResponse({
        user: MOCK_USER,
        token: 'mock_jwt_token_onda_finance_2024',
      })
    },
    '/api/transfers': async (config) => {
      await sleep(1500)
      const payload: TransferPayload = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      if (payload.amount <= 0) {
        throw mockError('Valor inválido para transferência.', 400)
      }
      const transaction: Transaction = {
        id: generateId(),
        type: 'transfer',
        status: 'completed',
        description: payload.description || `Pix para ${payload.recipientName}`,
        amount: payload.amount,
        date: new Date().toISOString(),
        counterpart: payload.recipientName,
        category: 'Transferência',
      }
      return mockResponse(transaction, 201)
    },
  },
  GET: {
    '/api/account': async () => {
      await sleep(600)
      return mockResponse(MOCK_ACCOUNT)
    },
    '/api/transactions': async () => {
      await sleep(800)
      return mockResponse(MOCK_TRANSACTIONS)
    },
  },
}

export function setupMockAdapter(api: { interceptors: { request: { use: (fn: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>) => void } } }) {
  api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const method = (config.method ?? 'GET').toUpperCase()
    const url = `${config.baseURL ?? ''}${config.url ?? ''}`

    const handler = routes[method]?.[url]
    if (handler) {
      const response = await handler(config)
      return Promise.reject({
        __MOCK__: true,
        response,
      })
    }

    return config
  })
}
