import { z, ZodType } from 'zod';

export class ScheduleSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    classId: z.number(),
    teacherId: z.number(),
    dayId: z.number(),
    timeId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    classId: z.number().optional(),
    teacherId: z.number().optional(),
    dayId: z.number().optional(),
    timeId: z.number().optional(),
  });
}
