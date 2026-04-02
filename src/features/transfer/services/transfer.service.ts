import { sleep, generateId } from '@/lib/utils'
import type { TransferPayload, Transaction } from '@/types'

export async function transferService(payload: TransferPayload): Promise<Transaction> {
  await sleep(1500)

  if (payload.amount <= 0) {
    throw new Error('Valor inválido para transferência.')
  }

  const transaction: Transaction = {
    id: generateId(),
    type: 'transfer',
    status: 'completed',
    description: payload.description || `Pix para ${payload.recipientName}`,
    amount: payload.amount,
    date: new Date().toISOString(),
    counterpart: payload.recipientName,
    category: 'Transferência',
  }

  return transaction
}
