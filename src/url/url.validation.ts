import { z, ZodType } from 'zod';

export class UrlValidation {
  static readonly CREATE: ZodType = z.object({
    url: z.string().min(1).url(),
    name: z.string().min(1),
  });
}
