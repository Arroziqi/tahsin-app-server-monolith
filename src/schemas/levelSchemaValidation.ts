import { z, ZodType } from 'zod';

export class LevelSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    level: z.string().min(2).max(100),
    isActive: z.boolean().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    level: z.string().min(2).max(100).optional(),
    isActive: z.boolean().optional(),
  });
  static readonly DELETE: ZodType = z.object({
    id: z.number(),
  });
}
