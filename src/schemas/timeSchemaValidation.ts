import { z, ZodType } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export class TimeSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    session: z.string(),
    startTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)'),
    endTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)'),
    isActive: z.boolean().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    session: z.string().optional(),
    startTime: z
      .string()
      .regex(timeRegex, 'Invalid time format (HH:mm)')
      .optional(),
    endTime: z
      .string()
      .regex(timeRegex, 'Invalid time format (HH:mm)')
      .optional(),
    isActive: z.boolean().optional(),
  });
}
