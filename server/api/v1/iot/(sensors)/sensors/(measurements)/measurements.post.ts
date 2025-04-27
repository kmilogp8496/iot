export default validatedEventHandler(async ({ body }) => {
  const db = useDrizzle()

  return (await db.insert(tables.measurements).values(body).returning()).at(0)
}, {
  bodySchema: createMeasurementSchema,
})
