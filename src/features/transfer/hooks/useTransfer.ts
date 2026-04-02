import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccountStore } from '@/store/account.store'
import { transferService } from '@/features/transfer/services/transfer.service'
import type { TransferPayload } from '@/types'

export function useTransfer() {
  const queryClient = useQueryClient()
  const { deductBalance, addTransaction, account } = useAccountStore()

  const mutation = useMutation({
    mutationFn: (payload: TransferPayload) => transferService(payload),
    onSuccess: (transaction, variables) => {
      deductBalance(variables.amount)
      addTransaction(transaction)
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return {
    transfer: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
    balance: account.balance,
  }
}
