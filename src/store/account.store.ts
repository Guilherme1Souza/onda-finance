import { create } from 'zustand'
import type { Transaction, Account } from '@/types'
import { MOCK_ACCOUNT, MOCK_TRANSACTIONS } from '@/mocks/data'

interface AccountState {
  account: Account
  transactions: Transaction[]
  isBalanceVisible: boolean
  toggleBalanceVisibility: () => void
  deductBalance: (amount: number) => void
  addTransaction: (tx: Transaction) => void
}

export const useAccountStore = create<AccountState>((set) => ({
  account: MOCK_ACCOUNT,
  transactions: MOCK_TRANSACTIONS,
  isBalanceVisible: true,

  toggleBalanceVisibility: () =>
    set((state) => ({ isBalanceVisible: !state.isBalanceVisible })),

  deductBalance: (amount) =>
    set((state) => ({
      account: { ...state.account, balance: state.account.balance - amount },
    })),

  addTransaction: (tx) =>
    set((state) => ({ transactions: [tx, ...state.transactions] })),
}))
