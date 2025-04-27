import type { DB } from './drizzle'

export const validateMeasurementBelongsToOrganization = async (db: DB, measurementId: number, organizationId: number) => {
  const measurement = (await db.select({ id: tables.measurements.id }).from(tables.measurements).innerJoin(
    tables.sensors,
    and(
      eq(tables.measurements.sensorId, tables.sensors.id),
      eq(tables.sensors.organizationId, organizationId),
    ),
  ).where(
    eq(tables.measurements.id, measurementId),
  )).at(0)

  if (!measurement) {
    throw createNotFoundResponse(`Measurement with id ${measurementId} not found`)
  }

  return measurement
}
