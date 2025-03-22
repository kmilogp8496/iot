import { createNotFoundResponse } from '~~/server/utils/response'

export default validatedEventHandler(async ({ params, session }) => {
  const db = useDrizzle()

  const sensorFilters = getDefaultSensorFilters(session.user.organization.id)

  const sensor = (await db.delete(tables.sensors).where(and(
    eq(tables.sensors.id, params.id),
    ...sensorFilters,
  )).returning()).at(0)

  if (!sensor) {
    throw createNotFoundResponse(`Sensor with id ${params.id} not found`)
  }

  return sensor
}, {
  paramsSchema: idParamSchema,
})
