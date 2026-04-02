import { describe, it, expect } from 'vitest'
import { transferSchema } from '@/features/transfer/schemas/transfer.schema'

describe('transferSchema', () => {
  const valid = {
    recipientName: 'Carlos Silva',
    recipientAccount: '12345-6',
    amount: '250',
    description: 'Aluguel',
  }

  it('accepts valid transfer data', () => {
    expect(transferSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts without description', () => {
    const { description: _d, ...rest } = valid
    expect(transferSchema.safeParse(rest).success).toBe(true)
  })

  it('rejects short recipient name', () => {
    const result = transferSchema.safeParse({ ...valid, recipientName: 'Ab' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].path).toContain('recipientName')
  })

  it('rejects zero amount', () => {
    const result = transferSchema.safeParse({ ...valid, amount: '0' })
    expect(result.success).toBe(false)
  })

  it('rejects negative amount', () => {
    const result = transferSchema.safeParse({ ...valid, amount: '-100' })
    expect(result.success).toBe(false)
  })

  it('rejects non-numeric account with letters', () => {
    const result = transferSchema.safeParse({ ...valid, recipientAccount: 'abc' })
    expect(result.success).toBe(false)
  })

  it('accepts comma decimal amount', () => {
    const result = transferSchema.safeParse({ ...valid, amount: '150,50' })
    expect(result.success).toBe(true)
  })
})
