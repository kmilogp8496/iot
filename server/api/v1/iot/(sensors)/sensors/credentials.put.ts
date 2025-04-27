import { getIdParamSchema } from '~~/server/utils/request'
import { createSensorCredentialsSchema } from '~~/shared/utils/sensors'

export default validatedEventHandler(async ({ body, params, session }) => {
  const db = useDrizzle()

  const sensor = (await db.select({ id: tables.sensors.id }).from(tables.sensors).where(
    and(
      ...getDefaultSensorFilters(session.user.organization.id),
      eq(tables.sensors.id, params.sensorId),
    ),
  )).at(0)

  if (!sensor) {
    throw createNotFoundResponse('Sensor not found')
  }

  const hashedApiKey = await hashPassword(body.apiKey)

  return (await db.insert(tables.sensorCredentials).values({
    sensorId: sensor.id,
    apiKey: hashedApiKey,
  }).onConflictDoUpdate({
    target: tables.sensorCredentials.sensorId,
    set: {
      apiKey: hashedApiKey,
    },
  }).returning()).at(0)
}, {
  bodySchema: createSensorCredentialsSchema,
  paramsSchema: getIdParamSchema('sensorId'),
})
