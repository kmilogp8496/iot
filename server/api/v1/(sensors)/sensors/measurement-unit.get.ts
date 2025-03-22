export default validatedEventHandler(async ({ query, session }) => {
  const db = useDrizzle()

  const measurementUnits = await db.selectDistinct({
    unit: tables.sensors.measurementUnit,
  })
    .from(tables.sensors)
    .where(eq(tables.sensors.organizationId, session.user.organization.id))
    .limit(query.limit)
    .offset(query.offset)

  return measurementUnits
}, {
  querySchema: paginationQuerySchema,
})
