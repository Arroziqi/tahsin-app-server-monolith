import { z } from 'zod';

const stringToDate = (val: unknown): Date => {
  if (val instanceof Date) return val;
  if (typeof val === 'string' || typeof val === 'number') {
    const date = new Date(val);
    if (!isNaN(date.getTime())) return date;
  }
  throw new Error('Invalid date format');
};

export const AcademicCalendarSchemaValidation = {
  CREATE: z
    .object({
      academicPeriodId: z.number().min(1, 'Periode akademik harus dipilih'),
      eventId: z.number().min(1, 'Event harus dipilih'),
      startDate: z.union([z.date(), z.string().transform(stringToDate)]),
      endDate: z.union([z.date(), z.string().transform(stringToDate)]),
      isActive: z.boolean().optional().default(true),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: 'Tanggal berakhir harus setelah tanggal mulai',
      path: ['endDate'],
    }),

  UPDATE: z
    .object({
      id: z.number(),
      academicPeriodId: z
        .number()
        .min(1, 'Periode akademik harus dipilih')
        .optional(),
      eventId: z.number().min(1, 'Event harus dipilih').optional(),
      startDate: z
        .union([z.date(), z.string().transform(stringToDate)])
        .optional(),
      endDate: z
        .union([z.date(), z.string().transform(stringToDate)])
        .optional(),
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
