import { z } from 'zod'

export const paginationQuerySchema = z.object({
  limit: z.number().optional().default(10),
  offset: z.number().optional().default(0),
})

export const idParamSchema = z.object({
  // id comes as a string, needs to be refined and converted to a number using only zod features
  id: z.coerce.number(),
})
