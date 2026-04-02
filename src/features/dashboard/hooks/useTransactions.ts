import { useQuery } from '@tanstack/react-query'
import { useAccountStore } from '@/store/account.store'
import {
  getAccountService,
  getTransactionsService,
} from '@/features/dashboard/services/account.service'
import { useEffect } from 'react'

export function useDashboard() {
  const { setAccount, setTransactions, account, transactions } =
    useAccountStore()

  const needsAccount = !account
  const needsTransactions = transactions.length === 0

  const accountQuery = useQuery({
    queryKey: ['account'],
    queryFn: getAccountService,
    enabled: needsAccount,
  })

  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactionsService,
    enabled: needsTransactions,
  })

  useEffect(() => {
    if (needsAccount && accountQuery.data) setAccount(accountQuery.data)
  }, [needsAccount, accountQuery.data, setAccount])

  useEffect(() => {
    if (needsTransactions && transactionsQuery.data)
      setTransactions(transactionsQuery.data)
  }, [needsTransactions, transactionsQuery.data, setTransactions])

  return {
    account,
    transactions,
    isLoading:
      (needsAccount && accountQuery.isLoading) ||
      (needsTransactions && transactionsQuery.isLoading),
    error: accountQuery.error || transactionsQuery.error,
  }
}
