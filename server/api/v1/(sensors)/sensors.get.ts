import { count, desc } from 'drizzle-orm'
import { createPaginatedResponse } from '~~/server/utils/response'

export default validatedEventHandler(async ({ query, session }) => {
  const db = useDrizzle()

  const sensorFilters = getDefaultSensorFilters(session.user.organization.id)

  const sensors = await db.select().from(tables.sensors).where(
    ...sensorFilters,
  )
    .limit(query.limit)
    .offset(query.offset)
    .orderBy(desc(tables.sensors.createdAt))

  const total = (await db.select({ count: count() }).from(tables.sensors).where(
    ...sensorFilters,
  )).at(0)!.count

  return createPaginatedResponse(sensors, total)
}, {
  querySchema: paginationQuerySchema,
})
