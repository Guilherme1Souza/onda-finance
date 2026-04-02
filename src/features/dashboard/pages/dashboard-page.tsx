import { ArrowLeftRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BalanceCard, BalanceCardSkeleton } from '../components/balance/balance-card.tsx'
import { TransactionList, TransactionListSkeleton } from '../components/transaction/transaction-list.tsx'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth.store'
import { useDashboard } from '../hooks/useTransactions'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function DashboardPage() {
  const { user } = useAuthStore()
  const firstName = user?.name?.split(' ')[0] ?? 'usuário'
  const { isLoading } = useDashboard()

  return (
    <div className="min-h-dvh px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between animate-fade-in">
        <div>
          <p className="text-sm text-text-muted mb-0.5">
            {getGreeting()},
          </p>
          <h1 className="font-display text-2xl font-bold text-text tracking-tight">
            {firstName} 👋
          </h1>
        </div>
        <Button asChild size="sm">
          <Link to="/transfer" className="flex items-center gap-2">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            Nova transferência
          </Link>
        </Button>
      </div>

      {/* Balance */}
      <div className="mb-6 animate-fade-in" style={{ animationDelay: '80ms', opacity: 0 }}>
        {isLoading ? <BalanceCardSkeleton /> : <BalanceCard />}
      </div>

      {/* Transactions */}
      <div className="animate-fade-in" style={{ animationDelay: '160ms', opacity: 0 }}>
        {isLoading ? <TransactionListSkeleton /> : <TransactionList />}
      </div>
    </div>
  )
}
