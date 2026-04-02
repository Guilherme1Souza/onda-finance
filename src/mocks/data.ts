import type { User, Account, Transaction } from '@/types'

export const MOCK_USER: User = {
  id: 'usr_01',
  name: 'Ana Beatriz',
  email: 'ana@ondafinance.io',
  accountNumber: '00123-4',
  agency: '0001',
}

export const MOCK_ACCOUNT: Account = {
  id: 'acc_01',
  balance: 12_840.5,
  userId: 'usr_01',
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn_001',
    type: 'credit',
    status: 'completed',
    description: 'Salário',
    amount: 8500,
    date: '2024-01-31T10:00:00Z',
    counterpart: 'Empresa LTDA',
    category: 'Renda',
  },
  {
    id: 'txn_002',
    type: 'debit',
    status: 'completed',
    description: 'Supermercado Extra',
    amount: 342.8,
    date: '2024-01-30T14:22:00Z',
    counterpart: 'Extra Supermercados',
    category: 'Alimentação',
  },
  {
    id: 'txn_003',
    type: 'transfer',
    status: 'completed',
    description: 'Pix para Carlos',
    amount: 250,
    date: '2024-01-29T09:15:00Z',
    counterpart: 'Carlos Mendes',
    category: 'Transferência',
  },
  {
    id: 'txn_004',
    type: 'debit',
    status: 'completed',
    description: 'Netflix',
    amount: 55.9,
    date: '2024-01-28T00:00:00Z',
    counterpart: 'Netflix Brasil',
    category: 'Assinatura',
  },
  {
    id: 'txn_005',
    type: 'credit',
    status: 'completed',
    description: 'Reembolso Uber',
    amount: 87.3,
    date: '2024-01-27T18:40:00Z',
    counterpart: 'Uber',
    category: 'Transporte',
  },
  {
    id: 'txn_006',
    type: 'debit',
    status: 'completed',
    description: 'Academia Smart Fit',
    amount: 119.9,
    date: '2024-01-26T08:00:00Z',
    counterpart: 'SmartFit',
    category: 'Saúde',
  },
  {
    id: 'txn_007',
    type: 'transfer',
    status: 'pending',
    description: 'Transferência para Maria',
    amount: 500,
    date: '2024-01-25T12:30:00Z',
    counterpart: 'Maria Silva',
    category: 'Transferência',
  },
  {
    id: 'txn_008',
    type: 'debit',
    status: 'completed',
    description: 'Conta de luz',
    amount: 198.45,
    date: '2024-01-24T10:00:00Z',
    counterpart: 'Enel',
    category: 'Utilidades',
  },
]

export const MOCK_CREDENTIALS = {
  email: 'ana@ondafinance.io',
  password: 'senha123',
}
