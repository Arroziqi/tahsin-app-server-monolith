import { z, ZodType } from 'zod';

export class ComponentSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    moduleId: z.number(),
    component: z.string(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    moduleId: z.number().optional(),
    component: z.string().optional(),
  });
}
