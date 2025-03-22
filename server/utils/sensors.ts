export const getDefaultSensorFilters = (organizationId: number) => ([
  eq(tables.sensors.organizationId, organizationId),
] as const)
