import { describe, it, expect, beforeEach } from 'vitest'
import { useAccountStore } from '@/store/account.store'
import { MOCK_ACCOUNT } from '@/mocks/data'
import type { Transaction } from '@/types'

describe('useAccountStore', () => {
  beforeEach(() => {
    useAccountStore.setState({
      account: { ...MOCK_ACCOUNT },
      transactions: [],
      isBalanceVisible: true,
    })
  })

  it('initializes with mock account', () => {
    const { account } = useAccountStore.getState()
    expect(account?.balance).toBe(MOCK_ACCOUNT.balance)
  })

  it('toggles balance visibility', () => {
    const { toggleBalanceVisibility } = useAccountStore.getState()
    expect(useAccountStore.getState().isBalanceVisible).toBe(true)
    toggleBalanceVisibility()
    expect(useAccountStore.getState().isBalanceVisible).toBe(false)
    toggleBalanceVisibility()
    expect(useAccountStore.getState().isBalanceVisible).toBe(true)
  })

  it('deducts balance correctly', () => {
    const { deductBalance } = useAccountStore.getState()
    const initial = useAccountStore.getState().account!.balance
    deductBalance(500)
    expect(useAccountStore.getState().account!.balance).toBe(initial - 500)
  })

  it('adds transaction to the beginning of the list', () => {
    const { addTransaction } = useAccountStore.getState()
    const tx: Transaction = {
      id: 'test_txn',
      type: 'transfer',
      status: 'completed',
      description: 'Test',
      amount: 100,
      date: new Date().toISOString(),
    }
    addTransaction(tx)
    const { transactions } = useAccountStore.getState()
    expect(transactions[0].id).toBe('test_txn')
  })
})
