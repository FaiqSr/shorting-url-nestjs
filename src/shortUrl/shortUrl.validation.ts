import { z, ZodType } from 'zod';

export class ShortUrlValidation {
  static readonly GET: ZodType = z.object({
    url: z.string(),
  });
}
