import { z } from 'zod';

export const PaymentFeeSchemaValidation = {
  CREATE: z.object({
    academicPeriodId: z.number().min(1, 'Periode akademik harus dipilih'),
    feeType: z.enum(['full_tuition_fee', 'down_payment', 'final_installment'], {
      errorMap: () => ({ message: 'Jenis biaya tidak valid' }),
    }),
    amount: z.number().positive('Nominal harus lebih dari 0'),
    description: z.string().optional(),
    dueDate: z.union([z.date(), z.string().transform((val) => new Date(val))]),
  }),
  UPDATE: z.object({
    id: z.number(),
    feeType: z
      .enum(['full_tuition_fee', 'down_payment', 'final_installment'])
      .optional(),
    amount: z.number().positive('Nominal harus lebih dari 0').optional(),
    description: z.string().optional(),
    dueDate: z
      .union([z.date(), z.string().transform((val) => new Date(val))])
      .optional(),
  }),
};
