import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowLeftRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { useEffect } from 'react'

import { transferSchema, type TransferFormData } from '@/features/transfer/schemas/transfer.schema'
import { useTransfer } from '@/features/transfer/hooks/useTransfer'
import { useAccountStore } from '@/store/account.store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/lib/utils'
import { toast } from '@/hooks/useToast'

export function TransferPage() {
  const { transfer, isLoading, isSuccess, error, reset, balance } = useTransfer()
  const { isBalanceVisible } = useAccountStore()

  const {
    register,
    handleSubmit,
    watch,
    reset: resetForm,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  })

  const amountValue = watch('amount')
  const parsedAmount = parseFloat((amountValue ?? '0').replace(',', '.')) || 0
  const exceedsBalance = parsedAmount > balance

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: 'success',
        title: 'Transferência realizada!',
        description: `${formatCurrency(parsedAmount)} enviado com sucesso.`,
      })
    }
  }, [isSuccess, parsedAmount])

  function onSubmit(data: TransferFormData) {
    if (exceedsBalance) return
    transfer({
      recipientName: data.recipientName,
      recipientAccount: data.recipientAccount,
      amount: parseFloat(data.amount.replace(',', '.')),
      description: data.description,
    })
  }

  function handleReset() {
    resetForm()
    reset()
  }

  // ─── Success state ─────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="min-h-dvh px-8 py-8 flex items-center justify-center">
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-green/30 bg-green/10 shadow-glow">
              <CheckCircle2 className="h-10 w-10 text-green" />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-text mb-2">
            Transferência enviada!
          </h2>
          <p className="text-text-muted mb-8">
            O valor foi processado com sucesso e seu saldo foi atualizado.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={handleReset} className="w-full">
              <ArrowLeftRight className="h-4 w-4" />
              Nova transferência
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/dashboard">Ver extrato</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-dvh px-8 py-8">
      {/* Back */}
      <div className="mb-8 animate-fade-in">
        <Button variant="ghost" asChild size="sm" className="mb-4 -ml-1">
          <Link to="/dashboard" className="flex items-center gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <h1 className="font-display text-2xl font-bold text-text tracking-tight">
          Nova transferência
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Envie dinheiro via Pix ou transferência bancária
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-3xl">
        {/* Form card */}
        <div
          className="lg:col-span-2 card-surface p-6 animate-fade-in"
          style={{ animationDelay: '80ms', opacity: 0 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Recipient name */}
            <div className="space-y-1.5">
              <Label htmlFor="recipientName">Nome do destinatário</Label>
              <Input
                id="recipientName"
                placeholder="Nome completo"
                error={!!errors.recipientName}
                {...register('recipientName')}
              />
              {errors.recipientName && (
                <p className="text-xs text-red-400">{errors.recipientName.message}</p>
              )}
            </div>

            {/* Account */}
            <div className="space-y-1.5">
              <Label htmlFor="recipientAccount">Conta / Chave Pix</Label>
              <Input
                id="recipientAccount"
                placeholder="00000-0"
                error={!!errors.recipientAccount}
                {...register('recipientAccount')}
              />
              {errors.recipientAccount && (
                <p className="text-xs text-red-400">{errors.recipientAccount.message}</p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                inputMode="decimal"
                placeholder="0,00"
                error={!!errors.amount || exceedsBalance}
                {...register('amount')}
              />
              {errors.amount && (
                <p className="text-xs text-red-400">{errors.amount.message}</p>
              )}
              {exceedsBalance && !errors.amount && (
                <p className="flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  Saldo insuficiente
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description">
                Descrição{' '}
                <span className="text-text-subtle">(opcional)</span>
              </Label>
              <Input
                id="description"
                placeholder="Ex: Aluguel de janeiro"
                error={!!errors.description}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-xs text-red-400">{errors.description.message}</p>
              )}
            </div>

            {/* API error */}
            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error instanceof Error ? error.message : 'Erro ao processar transferência.'}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || exceedsBalance}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processando…
                </>
              ) : (
                <>
                  <ArrowLeftRight className="h-4 w-4" />
                  Confirmar transferência
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Balance sidebar */}
        <div
          className="card-surface p-5 h-fit animate-fade-in"
          style={{ animationDelay: '160ms', opacity: 0 }}
        >
          <p className="text-xs font-display font-medium text-text-muted uppercase tracking-widest mb-3">
            Saldo atual
          </p>
          {isBalanceVisible ? (
            <p className="font-display text-2xl font-bold text-text green-glow-text">
              {formatCurrency(balance)}
            </p>
          ) : (
            <div className="h-8 w-32 rounded-lg bg-surface2 shimmer" />
          )}

          {parsedAmount > 0 && !exceedsBalance && (
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Envio</span>
                <span className="text-red-400 font-mono">
                  − {formatCurrency(parsedAmount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Saldo restante</span>
                <span className="text-green font-mono font-semibold">
                  {formatCurrency(balance - parsedAmount)}
                </span>
              </div>
            </div>
          )}

          {exceedsBalance && parsedAmount > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                Valor excede o saldo disponível
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
