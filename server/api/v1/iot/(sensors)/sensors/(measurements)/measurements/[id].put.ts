export default validatedEventHandler(async ({ body, params, session }) => {
  const db = useDrizzle()

  const measurement = await validateMeasurementBelongsToOrganization(db, params.id, session.user.organization.id)

  return (await db.update(tables.measurements).set(body)
    .where(
      eq(tables.measurements.id, measurement.id),
    )
    .returning()).at(0)!
}, {
  bodySchema: updateMeasurementSchema,
  paramsSchema: idParamSchema,
})
