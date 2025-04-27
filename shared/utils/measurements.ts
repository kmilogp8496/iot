import { z } from 'zod'

export const createMeasurementSchema = z.object({
  sensorId: z.coerce.number().min(1, { message: 'Sensor is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  unit: z.string().min(1, { message: 'Unit is required' }),
  metricName: z.string().min(1, { message: 'Metric name is required' }),
  interval: z.coerce.number().min(1, { message: 'Interval is required' }),
})

export const updateMeasurementSchema = createMeasurementSchema.omit({
  sensorId: true,
})
