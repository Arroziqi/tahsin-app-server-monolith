import { z, ZodType } from 'zod';

export class EnrollmentSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    userId: z.number(),
    classId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    userId: z.number().optional(),
    classId: z.number().optional(),
  });
}
