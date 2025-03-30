import { z } from 'zod'

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().optional().default(10),
  offset: z.coerce.number().optional().default(0),
  search: z.string().optional(),
})

export const idParamSchema = z.object({
  // id comes as a string, needs to be refined and converted to a number using only zod features
  id: z.coerce.number(),
})
