import { z } from 'zod'

export default validatedEventHandler(async (event, { query }) => {
  const session = await requireUserSession(event)

  const db = useDrizzle()

  const sensors = await db.query.sensors.findMany({
    limit: query.limit ?? 10,
    offset: query.offset ?? 0,
    orderBy: (sensors, { desc }) => [desc(sensors.createdAt)],
    where: (sensors, { eq }) => eq(sensors.organizationId, session.user.organization.id),
  })

  return sensors
}, {
  querySchema: z.object({
    limit: z.number().optional(),
    offset: z.number().optional(),
  }),
})
