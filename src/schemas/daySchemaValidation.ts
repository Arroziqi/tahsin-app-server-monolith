import { z, ZodType } from 'zod';

export class DaySchemaValidation {
  static readonly CREATE: ZodType = z.object({
    day: z.string().min(2).max(100),
    isActive: z.boolean().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    day: z.string().min(2).max(100).optional(),
    isActive: z.boolean().optional(),
  });
}
