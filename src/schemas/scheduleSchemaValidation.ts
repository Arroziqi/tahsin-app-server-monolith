import { z, ZodType } from 'zod';
import { ClassType } from '@prisma/client';

export class ScheduleSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    dayId: z.number(),
    timeId: z.number(),
    classType: z.nativeEnum(ClassType),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    dayId: z.number().optional(),
    timeId: z.number().optional(),
    classType: z.nativeEnum(ClassType).optional(),
    isActive: z.boolean().optional(),
  });
}
