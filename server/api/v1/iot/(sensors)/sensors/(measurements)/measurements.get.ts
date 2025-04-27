import { count, desc, like } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { objectPick } from '@vueuse/core'

export default validatedEventHandler(async ({ query, session }) => {
  console.log('measurements', query)
  const db = useDrizzle()

  const filters = and(
    ...buildFilters(tables.measurements, objectPick(query, ['name', 'unit', 'interval'])),
    query.search
      ? or(
          like(tables.measurements.name, `%${query.search}%`),
        )
      : undefined,
  )

  const measurements = await db.select().from(tables.measurements).where(filters)
    .limit(query.limit)
    .offset(query.offset)
    .orderBy(buildOrderBy(tables.measurements, query.orderBy) ?? desc(tables.measurements.createdAt))

  const total = (await db.select({ count: count() }).from(tables.measurements).where(filters)).at(0)!.count

  console.log('measurements', measurements)
  return createPaginatedResponse(measurements, total)
}, {
  querySchema: paginationQuerySchema.merge(
    createSelectSchema(tables.measurements).partial(),
  ).merge(buildOrderBySchema(tables.measurements)),
})
