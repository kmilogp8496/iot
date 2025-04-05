import { z } from 'zod'

export const createSensorSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
})

export const updateSensorSchema = createSensorSchema
