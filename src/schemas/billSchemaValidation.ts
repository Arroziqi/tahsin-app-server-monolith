import { z, ZodType } from 'zod';

export class BillSchemaValidation {
  static readonly CREATE: ZodType = z.object({
    bill: z.number(),
    studentId: z.number(),
    remainBill: z.number(),
    description: z.string().optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    bill: z.number().optional(),
    studentId: z.number().optional(),
    remainBill: z.number().optional(),
    description: z.string().optional(),
  });
}
