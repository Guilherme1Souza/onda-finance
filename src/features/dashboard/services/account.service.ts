import api from '@/lib/axios'
import type { Account, Transaction } from '@/types'

export async function getAccountService(): Promise<Account> {
  const { data } = await api.get<Account>('/account')
  return data
}

export async function getTransactionsService(): Promise<Transaction[]> {
  const { data } = await api.get<Transaction[]>('/transactions')
  return data
}
