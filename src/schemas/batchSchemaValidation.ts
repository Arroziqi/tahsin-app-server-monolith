import { z, ZodType } from 'zod';

export class BatchSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    batch: z.string().min(2).max(100),
    year: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    batch: z.string().min(2).max(100).optional(),
    year: z.number().optional(),
  });
}
