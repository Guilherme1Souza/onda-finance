import { useAccountStore } from '@/store/account.store'
import { TransactionItem } from './transaction-item'
import { Skeleton } from '@/components/ui/skeleton'

export function TransactionList() {
  const { transactions } = useAccountStore()

  return (
    <div className="card-surface overflow-hidden">
      <div className="px-4 pt-5 pb-3 border-b border-border flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-text">
          Extrato
        </h2>
        <span className="text-xs text-text-muted font-mono">
          {transactions.length} transações
        </span>
      </div>

      <div className="divide-y divide-border/50 px-0">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-text-muted text-sm">Nenhuma transação encontrada</p>
          </div>
        ) : (
          transactions.map((tx, i) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}
            />
          ))
        )}
      </div>
    </div>
  )
}

export function TransactionListSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="px-4 pt-5 pb-3 border-b border-border">
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="px-4 py-2 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
