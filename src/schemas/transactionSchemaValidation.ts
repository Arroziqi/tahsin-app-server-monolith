import { z, ZodType } from 'zod';

export class TransactionSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    billId: z.number(),
    bankAccountId: z.number(),
    transactionTypeId: z.number(),
    transactionStatusId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    billId: z.number().optional(),
    bankAccountId: z.number().optional(),
    transactionTypeId: z.number().optional(),
    transactionStatusId: z.number().optional(),
  });
}
