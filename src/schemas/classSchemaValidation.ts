import { z, ZodType } from 'zod';

export class ClassSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    class: z.string().min(2).max(100),
    classPriceId: z.number(),
    batchId: z.number().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    class: z.string().min(2).max(100).optional(),
    classPriceId: z.number().optional(),
    batchId: z.number().optional(),
  });
}
