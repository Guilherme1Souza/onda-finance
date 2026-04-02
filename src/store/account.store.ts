import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Transaction, Account } from '@/types'

interface AccountState {
  account: Account | null
  transactions: Transaction[]
  isBalanceVisible: boolean
  setAccount: (account: Account) => void
  setTransactions: (transactions: Transaction[]) => void
  toggleBalanceVisibility: () => void
  deductBalance: (amount: number) => void
  addTransaction: (tx: Transaction) => void
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      account: null,
      transactions: [],
      isBalanceVisible: true,

      setAccount: (account) => set({ account }),

      setTransactions: (transactions) => set({ transactions }),

      toggleBalanceVisibility: () =>
        set((state) => ({ isBalanceVisible: !state.isBalanceVisible })),

      deductBalance: (amount) =>
        set((state) => ({
          account: state.account
            ? { ...state.account, balance: state.account.balance - amount }
            : state.account,
        })),

      addTransaction: (tx) =>
        set((state) => ({ transactions: [tx, ...state.transactions] })),
    }),
    {
      name: '@onda:account',
    },
  ),
)
