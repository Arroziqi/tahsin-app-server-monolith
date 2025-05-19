import { z, ZodType } from 'zod';
import { AttendanceStatus } from '@prisma/client';

export class AttendanceSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    attendance: z.nativeEnum(AttendanceStatus),
    studentId: z.number(),
    scheduleId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    attendance: z.nativeEnum(AttendanceStatus).optional(),
    studentId: z.number().optional(),
    scheduleId: z.number().optional(),
  });
}
