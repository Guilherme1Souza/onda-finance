import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Transaction } from '@/types'

interface TransactionItemProps {
  transaction: Transaction
  style?: React.CSSProperties
}

const iconMap = {
  credit: { icon: ArrowDownLeft, color: 'text-green', bg: 'bg-green/10 border-green/20' },
  debit: { icon: ArrowUpRight, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  transfer: { icon: ArrowLeftRight, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
}

const statusLabel: Record<string, string> = {
  completed: 'Concluído',
  pending: 'Pendente',
  failed: 'Falhou',
}

export function TransactionItem({ transaction, style }: TransactionItemProps) {
  const { icon: Icon, color, bg } = iconMap[transaction.type]
  const isCredit = transaction.type === 'credit'

  return (
    <div
      style={style}
      className="flex items-center gap-4 py-3.5 px-4 rounded-xl hover:bg-surface2 transition-all duration-150 group animate-fade-in"
    >
      {/* Icon */}
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border', bg)}>
        <Icon className={cn('h-4 w-4', color)} />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-text truncate">{transaction.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-text-muted">{formatDate(transaction.date)}</span>
          {transaction.counterpart && (
            <>
              <span className="text-text-subtle">·</span>
              <span className="text-xs text-text-subtle truncate">{transaction.counterpart}</span>
            </>
          )}
        </div>
      </div>

      {/* Amount + status */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <p
          className={cn(
            'text-sm font-semibold font-mono',
            isCredit ? 'text-green' : 'text-text',
          )}
        >
          {isCredit ? '+' : '-'} {formatCurrency(transaction.amount)}
        </p>
        <Badge
          variant={transaction.status as 'completed' | 'pending' | 'failed'}
          className="text-[10px] px-1.5 py-0"
        >
          {statusLabel[transaction.status]}
        </Badge>
      </div>
    </div>
  )
}
