import { sleep } from '@/lib/utils'
import { MOCK_ACCOUNT, MOCK_TRANSACTIONS } from '@/mocks/data'
import type { Account, Transaction } from '@/types'

export async function getAccountService(): Promise<Account> {
  await sleep(600)
  return MOCK_ACCOUNT
}

export async function getTransactionsService(): Promise<Transaction[]> {
  await sleep(800)
  return MOCK_TRANSACTIONS
}
