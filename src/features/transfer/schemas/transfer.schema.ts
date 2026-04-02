import { z } from 'zod'

export const transferSchema = z.object({
  recipientName: z
    .string()
    .min(3, 'Nome do destinatário deve ter ao menos 3 caracteres')
    .max(80, 'Nome muito longo'),

  recipientAccount: z
    .string()
    .min(5, 'Conta inválida')
    .regex(/^\d[\d-]*$/, 'Informe apenas números e hífen'),

  amount: z
    .string()
    .min(1, 'Informe o valor')
    .refine(
      (v) => {
        const n = parseFloat(v.replace(',', '.'))
        return !isNaN(n) && n > 0
      },
      { message: 'Valor deve ser maior que zero' },
    ),

  description: z.string().max(120, 'Descrição muito longa').optional(),
})

export type TransferFormData = z.infer<typeof transferSchema>
