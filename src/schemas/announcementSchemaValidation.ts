import { z, ZodType } from 'zod';

export class AnnouncementSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string(),
    description: z.string(),
  });
  static readonly UPDATE: ZodType = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    id: z.number(),
  });
}
