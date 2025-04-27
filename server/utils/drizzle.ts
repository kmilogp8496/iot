import { drizzle } from 'drizzle-orm/d1'

import { organizations } from '../database/schemas/organizations'
import { sensors } from '../database/schemas/sensors'
import { users } from '../database/schemas/users'
import { measurements } from '../database/schemas/measurement'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = {
  organizations,
  users,
  sensors,
  measurements,
}

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema: tables })
}

export type DB = ReturnType<typeof useDrizzle>
