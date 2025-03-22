export default validatedEventHandler(async ({ body, session }) => {
  const db = useDrizzle()

  return (await db.insert(tables.sensors).values({
    ...body,
    organizationId: session.user.organization.id,
    createdBy: session.user.id,
  }).returning()).at(0)
}, {
  bodySchema: createSensorSchema,
})
