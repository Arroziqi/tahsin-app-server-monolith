import { z, ZodType } from 'zod';

export class UserSchemaValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z
      .string()
      .min(5, 'Username harus terdiri dari 5 - 10 karakter')
      .max(10, 'Username harus terdiri dari 5 - 10 karakter'),
    email: z.string().min(2).max(100).email(),
    password: z
      .string()
      .min(8, { message: 'Password harus tepat 8 karakter' })
      .max(8, { message: 'Password harus tepat 8 karakter' })
      .regex(/^[a-zA-Z0-9]*$/, {
        message: 'Password hanya boleh terdiri dari kombinasi angka dan huruf',
      })
      .refine((value) => /[a-zA-Z]/.test(value) && /[0-9]/.test(value), {
        message: 'Password harus terdiri dari kombinasi angka dan huruf',
      }),
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
