import { count, desc, like } from 'drizzle-orm'
import { createPaginatedResponse } from '~~/server/utils/response'

export default validatedEventHandler(async ({ query, session }) => {
  const db = useDrizzle()

  const filters = and(
    ...getDefaultSensorFilters(session.user.organization.id),
    query.search
      ? or(
          like(tables.sensors.name, `%${query.search}%`),
          like(tables.sensors.description, `%${query.search}%`),
        )
      : undefined,
  )

  const sensors = await db.select().from(tables.sensors).where(
    filters,
  )
    .limit(query.limit)
    .offset(query.offset)
    .orderBy(desc(tables.sensors.createdAt))

  const total = (await db.select({ count: count() }).from(tables.sensors).where(
    filters,
  )).at(0)!.count

  return createPaginatedResponse(sensors, total)
}, {
  querySchema: paginationQuerySchema,
})
