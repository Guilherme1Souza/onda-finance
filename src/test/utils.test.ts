import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  maskAccountNumber,
  generateId,
  cn,
} from '@/lib/utils'

describe('formatCurrency', () => {
  it('formats BRL correctly', () => {
    expect(formatCurrency(1000)).toContain('1.000')
    expect(formatCurrency(1000)).toContain('R$')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toContain('0,00')
  })

  it('handles decimals', () => {
    expect(formatCurrency(1234.56)).toContain('1.234,56')
  })
})

describe('maskAccountNumber', () => {
  it('masks long account numbers', () => {
    expect(maskAccountNumber('00123-4')).toBe('••••23-4')
  })

  it('returns short numbers as-is', () => {
    expect(maskAccountNumber('123')).toBe('123')
  })
})

describe('generateId', () => {
  it('generates unique IDs', () => {
    const a = generateId()
    const b = generateId()
    expect(a).not.toBe(b)
  })

  it('starts with txn_', () => {
    expect(generateId()).toMatch(/^txn_/)
  })
})

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('handles conditional classes', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c')
  })
})
