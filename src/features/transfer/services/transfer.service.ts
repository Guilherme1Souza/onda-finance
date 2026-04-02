import api from '@/lib/axios'
import type { TransferPayload, Transaction } from '@/types'

export async function transferService(payload: TransferPayload): Promise<Transaction> {
  const { data } = await api.post<Transaction>('/transfers', payload)
  return data
}
