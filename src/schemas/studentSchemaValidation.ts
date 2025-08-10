import { z, ZodType } from 'zod';
import { Education, StudentStatusEnum } from '@prisma/client';
import { stringToDate } from './academicPeriodSchemaValidation';

export class StudentSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    fullName: z.string(),
    dateOfBirth: z
      .union([
        z.date(),
        z.string().transform(stringToDate),
        z.number().transform(stringToDate),
      ])
      .optional(),
    noTelp: z.string().optional(),
    lastEducation: z.nativeEnum(Education).optional(),
    motivation: z.string(),
    userId: z.number(),
    levelId: z.number().optional(),
    classId: z.number().optional(),
    enrollmentId: z.number(),
    studentStatus: z.nativeEnum(StudentStatusEnum).optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    fullName: z.string().optional(),
    dateOfBirth: z
      .union([
        z.date(),
        z.string().transform(stringToDate),
        z.number().transform(stringToDate),
      ])
      .optional(),
    noTelp: z.string().optional(),
    lastEducation: z.nativeEnum(Education).optional(),
    levelId: z.number().optional(),
    classId: z.number().optional(),
    enrollmentId: z.number().optional(),
    studentStatus: z.nativeEnum(StudentStatusEnum).optional(),
  });
}
