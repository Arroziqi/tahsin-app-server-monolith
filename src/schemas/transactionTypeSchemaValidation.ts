import { z, ZodType } from 'zod';

export class TransactionTypeSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    type: z.string().min(2).max(100),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    type: z.string().min(2).max(100).optional(),
  });
}
