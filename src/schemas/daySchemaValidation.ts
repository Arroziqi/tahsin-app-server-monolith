import { z, ZodType } from 'zod';

export class DaySchemaValidation {
  static readonly CREATE: ZodType = z.object({
    day: z.string().min(2).max(100),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    day: z.string().min(2).max(100).optional(),
  });
}
