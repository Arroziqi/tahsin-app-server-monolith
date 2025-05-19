import { z, ZodType } from 'zod';

export class StudentStatusSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    status: z.string().min(2).max(100),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    status: z.string().min(2).max(100).optional(),
  });
}
