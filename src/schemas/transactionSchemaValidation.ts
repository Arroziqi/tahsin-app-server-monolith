import { z, ZodType } from 'zod';
import { FeeType, TransactionStatusEnum } from '@prisma/client';

export class TransactionSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    billId: z.number(),
    studentId: z.number().optional(),
    bankAccountId: z.number().optional(),
    transactionType: z.nativeEnum(FeeType),
    transactionStatus: z.nativeEnum(TransactionStatusEnum),
    amount: z.number().positive(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    billId: z.number().optional(),
    studentId: z.number().optional(),
    bankAccountId: z.number().optional(),
    transactionType: z.nativeEnum(FeeType).optional(),
    transactionStatus: z.nativeEnum(TransactionStatusEnum).optional(),
    amount: z.number().positive().optional(),
  });
}
