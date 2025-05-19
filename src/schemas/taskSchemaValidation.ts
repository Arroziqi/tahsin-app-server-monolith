import { z, ZodType } from 'zod';

export class TaskSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    moduleId: z.number(),
    teacherId: z.number(),
    task: z.string(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    moduleId: z.number().optional(),
    teacherId: z.number().optional(),
    task: z.string().optional(),
  });
}
