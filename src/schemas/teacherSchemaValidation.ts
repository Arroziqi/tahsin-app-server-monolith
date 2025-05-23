import { z, ZodType } from 'zod';

export class TeacherSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(2).max(100),
    nip: z.string(),
    accountNumber: z.string().optional(),
    accountName: z.string().min(2).max(100).optional(),
    bankName: z.string().min(2).max(100).optional(),
    userId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    name: z.string().min(2).max(100).optional(),
    nip: z.string().optional(),
    accountNumber: z.string().optional(),
    accountName: z.string().min(2).max(100).optional(),
    bankName: z.string().min(2).max(100).optional(),
  });
}
