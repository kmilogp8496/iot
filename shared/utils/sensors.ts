import { z } from 'zod'

export const createSensorSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  measurementUnit: z.string(),
})

export const updateSensorSchema = createSensorSchema
