import { z, ZodType } from 'zod';

export class BankAccountSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    accountName: z.string().min(2).max(100),
    accountNumber: z.string(),
    bankName: z.string().min(2).max(100),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    accountName: z.string().min(2).max(100).optional(),
    accountNumber: z.string().optional(),
    bankName: z.string().min(2).max(100).optional(),
    isActive: z.boolean().optional(),
  });
}
