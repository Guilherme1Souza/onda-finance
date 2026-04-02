import { useQuery } from '@tanstack/react-query'
import { useAccountStore } from '@/store/account.store'
import { getTransactionsService } from '@/features/dashboard/services/account.service'

export function useTransactions() {
  const { transactions } = useAccountStore()

  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactionsService,
    initialData: transactions,
  })

  return {
    transactions: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  }
}
