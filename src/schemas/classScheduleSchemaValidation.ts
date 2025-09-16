import { z } from 'zod';

const stringToDate = (val: unknown): Date => {
  if (val instanceof Date) return val;
  if (typeof val === 'string' || typeof val === 'number') {
    const date = new Date(val);
    if (!isNaN(date.getTime())) return date;
  }
  throw new Error('Invalid date format');
};

export const ClassScheduleSchemaValidation = {
  CREATE: z
    .object({
      name: z.string().min(1, 'Nama jadwal harus diisi'),
      levelId: z.number().min(1, 'Level harus dipilih'),
      scheduleId: z.number().min(1, 'Jadwal harus dipilih'),
      startDate: z.union([z.date(), z.string().transform(stringToDate)]),
      endDate: z.union([z.date(), z.string().transform(stringToDate)]),
      teacherId: z.number().min(1, 'Pengajar harus dipilih'),
      capacity: z
        .number()
        .int()
        .positive('Kapasitas harus lebih dari 0')
        .optional(),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: 'Tanggal berakhir harus setelah tanggal mulai',
      path: ['endDate'],
    }),

  UPDATE: z
    .object({
      id: z.number(),
      name: z.string().min(1, 'Nama jadwal harus diisi').optional(),
      levelId: z.number().min(1, 'Level harus dipilih').optional(),
      scheduleId: z.number().min(1, 'Jadwal harus dipilih').optional(),
      startDate: z
        .union([z.date(), z.string().transform(stringToDate)])
        .optional(),
      endDate: z
        .union([z.date(), z.string().transform(stringToDate)])
        .optional(),
      teacherId: z.number().min(1, 'Pengajar harus dipilih').optional(),
      capacity: z
        .number()
        .int()
        .positive('Kapasitas harus lebih dari 0')
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
