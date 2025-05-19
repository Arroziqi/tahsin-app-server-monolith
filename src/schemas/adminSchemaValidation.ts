import { z, ZodType } from 'zod';

export class AdminSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    noAdmin: z.string(),
    name: z.string(),
    userId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    noAdmin: z.string().optional(),
    name: z.string().optional(),
    id: z.number(),
  });
}
