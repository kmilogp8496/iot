export default validatedEventHandler(async ({ params, session }) => {
  const db = useDrizzle()

  const measurement = await validateMeasurementBelongsToOrganization(db, params.id, session.user.organization.id)

  return (await db.delete(tables.measurements).where(
    eq(tables.measurements.id, measurement.id),
  ).returning()).at(0)!
}, {
  paramsSchema: idParamSchema,
})
