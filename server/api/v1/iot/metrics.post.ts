import { inArray } from 'drizzle-orm'
import { z } from 'zod'
import type { InsertMetric } from '~~/server/database/schemas/metrics'

export default eventHandler(async (event) => {
  const db = useDrizzle()
  const sensorId = await validateSensorSession(event)
  const sensor = (await db.query.sensors.findFirst({
    where: eq(tables.sensors.id, sensorId),
  }))!

  const body = await readValidatedBody(event, z.array(z.object({
    m: z.number().positive(),
    v: z.number(),
    t: z.number().default(Date.now()),
  })).parse)

  if (body.length === 0) {
    throw createBadRequestResponse('No measurements provided')
  }

  const measurementsIds = body.map((measurement) => {
    return measurement.m
  })

  const measurements = await db.query.measurements.findMany({
    where: inArray(tables.measurements.id, measurementsIds),
    columns: {
      id: true,
      metricName: true,
      name: true,
      unit: true,
      sensorId: true,
    },
  })

  if (measurements.length !== body.length) {
    throw createBadRequestResponse('Some measurements were not found')
  }

  const metrics = new Map<number, InsertMetric>()

  for (const measurement of measurements) {
    const receivedMeasurement = body.find(m => m.m === measurement.id)!
    metrics.set(measurement.id, {
      metricName: measurement.metricName,
      timestamp: receivedMeasurement.t,
      value: receivedMeasurement.v,
      labels: JSON.stringify({
        sensorId,
        location: sensor.location,
        label: measurement.name,
        unit: measurement.unit,
      }),
    })
  }

  await db.insert(tables.metrics).values(Array.from(metrics.values()))
})
