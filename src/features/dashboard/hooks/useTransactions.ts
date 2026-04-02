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

  const accountQuery = useQuery({
    queryKey: ['account'],
    queryFn: getAccountService,
  })

  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactionsService,
  })

  useEffect(() => {
    if (accountQuery.data) setAccount(accountQuery.data)
  }, [accountQuery.data, setAccount])

  useEffect(() => {
    if (transactionsQuery.data) setTransactions(transactionsQuery.data)
  }, [transactionsQuery.data, setTransactions])

  return {
    account,
    transactions,
    isLoading: accountQuery.isLoading || transactionsQuery.isLoading,
    error: accountQuery.error || transactionsQuery.error,
  }
}
