import { z, ZodType } from 'zod';
import { ClassType, Education, Program, TimeOfStudy } from '@prisma/client';

export class EnrollmentSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    username: z.string(),
    email: z.string(),
    fullName: z.string(),
    dateOfBirth: z.preprocess((val) => {
      if (typeof val === 'string' || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date()),
    noTelp: z.string(),
    lastEducation: z.nativeEnum(Education),
    program: z.nativeEnum(Program),
    classType: z.nativeEnum(ClassType),
    timeOfStudy: z.nativeEnum(TimeOfStudy),
    motivation: z.string(),
    voiceRecording: z.string().optional(),
    dateOfReservation: z
      .preprocess((val) => {
        if (typeof val === 'string' || val instanceof Date) {
          const parsed = new Date(val);
          return isNaN(parsed.getTime()) ? undefined : parsed;
        }
        return undefined;
      }, z.date())
      .optional(),
    academicPeriodId: z.number(),
    userId: z.number().optional(),
    studentId: z.number().optional(),
    classId: z.number().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    fullName: z.string().optional(),
    dateOfBirth: z
      .preprocess((val) => {
        if (typeof val === 'string' || val instanceof Date) {
          return new Date(val);
        }
        return val;
      }, z.date())
      .optional(),
    noTelp: z.string().optional(),
    email: z.string().optional(),
    lastEducation: z.nativeEnum(Education).optional(),
    program: z.nativeEnum(Program).optional(),
    classType: z.nativeEnum(ClassType).optional(),
    timeOfStudy: z.nativeEnum(TimeOfStudy).optional(),
    motivation: z.string().optional(),
    voiceRecording: z.string().optional(),
    dateOfReservation: z
      .preprocess((val) => {
        if (typeof val === 'string' || val instanceof Date) {
          const parsed = new Date(val);
          return isNaN(parsed.getTime()) ? undefined : parsed;
        }
        return undefined;
      }, z.date())
      .optional(),
    userId: z.number().optional(),
    classId: z.number().optional(),
  });
}
