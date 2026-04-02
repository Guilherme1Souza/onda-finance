// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  accountNumber: string
  agency: string
}

// ─── Transaction ──────────────────────────────────────────────────────────────
export type TransactionType = 'credit' | 'debit' | 'transfer'
export type TransactionStatus = 'completed' | 'pending' | 'failed'

export interface Transaction {
  id: string
  type: TransactionType
  status: TransactionStatus
  description: string
  amount: number
  date: string
  counterpart?: string
  category?: string
}

// ─── Account ──────────────────────────────────────────────────────────────────
export interface Account {
  id: string
  balance: number
  userId: string
}

// ─── Transfer ─────────────────────────────────────────────────────────────────
export interface TransferPayload {
  recipientName: string
  recipientAccount: string
  amount: number
  description?: string
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

// ─── API ──────────────────────────────────────────────────────────────────────
export interface ApiError {
  message: string
  code?: string
  status?: number
}
