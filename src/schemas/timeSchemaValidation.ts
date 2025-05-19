import { z, ZodType } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export class TimeSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    startTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)'),
    endTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)'),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    startTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)'),
    endTime: z.string().regex(timeRegex, 'Invalid time format (HH:mm)'),
  });
}
