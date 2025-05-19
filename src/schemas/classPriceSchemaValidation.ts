import { z, ZodType } from 'zod';

export class ClassPriceSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    price: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    price: z.number().optional(),
  });
}
