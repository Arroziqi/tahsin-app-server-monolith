import { z, ZodType } from 'zod';

export class TeacherSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(2).max(100),
    nip: z.number(),
    accountNumber: z.number().optional(),
    accountName: z.string().min(2).max(100).optional(),
    bankName: z.string().min(2).max(100).optional(),
    userId: z.number(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    name: z.string().min(2).max(100).optional(),
    nip: z.number().optional(),
    accountNumber: z.number().optional(),
    accountName: z.string().min(2).max(100).optional(),
    bankName: z.string().min(2).max(100).optional(),
  });
}
