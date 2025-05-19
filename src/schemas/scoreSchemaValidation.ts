import { z, ZodType } from 'zod';

export class ScoreSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    value: z.number(),
    studentId: z.number(),
    taskId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    value: z.number().optional(),
    studentId: z.number().optional(),
    taskId: z.number().optional(),
  });
}
