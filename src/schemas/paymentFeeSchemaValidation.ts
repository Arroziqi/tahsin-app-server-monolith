import { z } from 'zod';
import { FeeType } from '@prisma/client';

export const PaymentFeeSchemaValidation = {
  CREATE: z.object({
    academicPeriodId: z.number().min(1, 'Periode akademik harus dipilih'),
    feeType: z.nativeEnum(FeeType, {
      errorMap: () => ({ message: 'Jenis biaya tidak valid' }),
    }),
    amount: z.number().positive('Nominal harus lebih dari 0'),
    description: z.string().optional(),
    dueDate: z.union([z.date(), z.string().transform((val) => new Date(val))]),
  }),
  UPDATE: z.object({
    id: z.number(),
    academicPeriodId: z.number().optional(),
    feeType: z.nativeEnum(FeeType).optional(),
    amount: z.number().positive('Nominal harus lebih dari 0').optional(),
    description: z.string().optional(),
    dueDate: z
      .union([z.date(), z.string().transform((val) => new Date(val))])
      .optional(),
    isInvoiced: z.boolean().optional(),
  }),
};
