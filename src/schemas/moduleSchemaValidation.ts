import { z, ZodType } from 'zod';

export class ModuleSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    classId: z.number(),
    module: z.string(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    classId: z.number().optional(),
    module: z.string().optional(),
  });
}
