import { z, ZodType } from 'zod';

export class UserSchemaValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(2).max(100),
    email: z.string().min(2).max(100),
    password: z.string().min(2).max(100),
  });
  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(2).max(100),
    password: z.string().min(2).max(100),
  });
  static readonly UPDATE: ZodType = z.object({
    username: z.string().min(2).max(100),
    password: z.string().min(2).max(100),
  });
}
