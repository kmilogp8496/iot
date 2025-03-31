import { count, desc, like } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { objectOmit } from '@vueuse/core'

export default validatedEventHandler(async ({ query, session }) => {
  const db = useDrizzle()

  const filters = and(
    ...getDefaultSensorFilters(session.user.organization.id),
    ...buildFilters(tables.sensors, objectOmit(query, ['limit', 'offset', 'search', 'id', 'orderBy'])),
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
    .orderBy(buildOrderBy(tables.sensors, query.orderBy) ?? desc(tables.sensors.createdAt))

  const total = (await db.select({ count: count() }).from(tables.sensors).where(
    filters,
  )).at(0)!.count

  return createPaginatedResponse(sensors, total)
}, {
  querySchema: paginationQuerySchema.merge(
    createSelectSchema(tables.sensors).partial(),
  ).merge(buildOrderBySchema(tables.sensors)),
})
