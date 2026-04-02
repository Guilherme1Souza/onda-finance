import { Eye, EyeOff, TrendingUp } from 'lucide-react'
import { useAccountStore } from '@/store/account.store'
import { formatCurrency } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'
import { Skeleton } from '@/components/ui/skeleton'

export function BalanceCard() {
  const { account, isBalanceVisible, toggleBalanceVisibility } = useAccountStore()
  const { user } = useAuthStore()

  if (!account) return <BalanceCardSkeleton />

  return (
    <div className="relative overflow-hidden rounded-2xl border border-green/20 bg-surface p-6">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-green/8 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-green/5 blur-xl" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-medium font-display text-text-muted uppercase tracking-widest mb-1">
            Saldo disponível
          </p>
          <p className="text-sm text-text-subtle">
            Ag. {user?.agency} · Cc. {user?.accountNumber}
          </p>
        </div>
        <button
          onClick={toggleBalanceVisibility}
          className="rounded-lg p-2 text-text-muted hover:bg-surface2 hover:text-text transition-all"
          aria-label={isBalanceVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
        >
          {isBalanceVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Balance */}
      <div className="mb-6">
        {isBalanceVisible ? (
          <p className="font-display text-4xl font-bold text-text green-glow-text tracking-tight">
            {formatCurrency(account.balance)}
          </p>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-8 w-48 rounded-lg bg-surface2 shimmer" />
          </div>
        )}
      </div>

      {/* Trend pill */}
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-green/20 bg-green/10 px-3 py-1">
          <TrendingUp className="h-3.5 w-3.5 text-green" />
          <span className="text-xs font-medium font-display text-green">+2.4% este mês</span>
        </div>
      </div>
    </div>
  )
}

export function BalanceCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-green/20 bg-surface p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <div className="mb-6">
        <Skeleton className="h-10 w-48" />
      </div>
      <Skeleton className="h-6 w-32 rounded-full" />
    </div>
  )
}
