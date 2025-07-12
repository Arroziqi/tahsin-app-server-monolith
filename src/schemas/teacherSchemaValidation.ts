import { z, ZodType } from 'zod';
import { TeacherStatus } from '@prisma/client';

export class TeacherSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(2).max(100),
    nip: z.string().optional(),
    noTelp: z.string(),
    accountNumber: z.string().optional(),
    accountName: z.string().min(2).max(100).optional(),
    bankName: z.string().min(2).max(100).optional(),
    userId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    name: z.string().min(2).max(100).optional(),
    nip: z.string().optional(),
    status: z.nativeEnum(TeacherStatus).optional(),
    noTelp: z.string().optional(),
    accountNumber: z.string().optional(),
    accountName: z.string().min(2).max(100).optional(),
    bankName: z.string().min(2).max(100).optional(),
  });
  static readonly UPDATETEACHERSTATUS: ZodType = z.object({
    id: z.number(),
    status: z.nativeEnum(TeacherStatus),
  });
  static readonly CREATEUSERTEACHER: ZodType = z.object({
    name: z.string().min(2).max(100),
    username: z.string().min(2).max(100),
    email: z.string(),
    password: z.string(),
    noTelp: z.string(),
    nip: z.string().optional(),
    accountNumber: z.string().optional(),
    accountName: z.string().min(2).max(100).optional(),
    bankName: z.string().min(2).max(100).optional(),
    userId: z.number().optional(),
  });
}
