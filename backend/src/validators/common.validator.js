import { z } from 'zod';

export const idParamSchema = (paramName) =>
  z.object({
    body: z.object({}).optional(),
    params: z.object({ [paramName]: z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid id') }),
    query: z.object({}).optional()
  });
