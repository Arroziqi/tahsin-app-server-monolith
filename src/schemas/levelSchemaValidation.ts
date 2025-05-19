import { z, ZodType } from 'zod';

export class LevelSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    level: z.string().min(2).max(100),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    level: z.string().min(2).max(100).optional(),
  });
}
