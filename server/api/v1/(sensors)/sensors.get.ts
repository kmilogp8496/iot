export default eventHandler(async (event) => {
  const session = await requireUserSession(event)

  const db = useDrizzle()

  const sensors = await db.query.sensors.findMany({
    limit: 10,
    offset: 0,
    orderBy: (sensors, { desc }) => [desc(sensors.createdAt)],
    where: (sensors, { eq }) => eq(sensors.organizationId, session.user.organization.id),
  })

  return sensors
})
