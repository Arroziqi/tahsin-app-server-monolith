import { z } from 'zod';

// Helper function untuk transform string ke Date
export const stringToDate = (val: unknown): Date => {
  if (val instanceof Date) return val;
  if (typeof val === 'string' || typeof val === 'number') {
    const date = new Date(val);
    if (!isNaN(date.getTime())) return date;
  }
  throw new Error('Invalid date format');
};

export const AcademicPeriodSchemaValidation = {
  CREATE: z
    .object({
      name: z.string().min(3, 'Nama periode akademik minimal 3 karakter'),
      startDate: z.union([
        z.date(),
        z.string().transform(stringToDate),
        z.number().transform(stringToDate),
      ]),
      endDate: z.union([
        z.date(),
        z.string().transform(stringToDate),
        z.number().transform(stringToDate),
      ]),
      description: z.string().optional(),
      isActive: z.boolean().optional().default(true),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: 'Tanggal berakhir harus setelah tanggal mulai',
      path: ['endDate'],
    }),

  UPDATE: z
    .object({
      id: z.number(),
      name: z
        .string()
        .min(3, 'Nama periode akademik minimal 3 karakter')
        .optional(),
      startDate: z
        .union([
          z.date(),
          z.string().transform(stringToDate),
          z.number().transform(stringToDate),
        ])
        .optional(),
      endDate: z
        .union([
          z.date(),
          z.string().transform(stringToDate),
          z.number().transform(stringToDate),
        ])
        .optional(),
      description: z.string().optional(),
      isActive: z.boolean().optional(),
    })
    .refine(
      (data) => {
        if (data.startDate && data.endDate) {
          return data.endDate > data.startDate;
        }
        return true;
      },
      {
        message: 'Tanggal berakhir harus setelah tanggal mulai',
        path: ['endDate'],
      },
    ),
};
