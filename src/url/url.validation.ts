import { z, ZodType } from 'zod';

export class UrlValidation {
  static readonly CREATE: ZodType = z.object({
    url: z.string().min(1).url(),
    name: z.string().min(1),
  });

  static readonly GET: ZodType = z.object({
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });

  static readonly DELETE: ZodType = z.object({
    urlId: z.number().min(1).positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().min(1).positive(),
    url: z.string().min(1).url().optional(),
    name: z.string().min(1).optional(),
  });
}
