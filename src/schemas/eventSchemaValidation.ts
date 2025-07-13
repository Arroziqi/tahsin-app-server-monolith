import { z } from 'zod';

export const EventSchemaValidation = {
  CREATE: z.object({
    name: z.string().min(3, 'Nama event minimal 3 karakter'),
    isActive: z.boolean().optional().default(true),
  }),
  UPDATE: z.object({
    id: z.number(),
    name: z.string().min(3, 'Nama event minimal 3 karakter').optional(),
    isActive: z.boolean().optional(),
  }),
};
