import { z, ZodType } from 'zod';

export class StudentSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    fullName: z.string(),
    motivation: z.string(),
    userId: z.number(),
    levelId: z.number(),
    classId: z.number(),
    enrollmentId: z.number(),
    studentStatusId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    fullName: z.string().optional(),
    levelId: z.number().optional(),
    classId: z.number().optional(),
    studentStatusId: z.number().optional(),
  });
}
