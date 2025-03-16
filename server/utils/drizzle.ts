import { drizzle } from 'drizzle-orm/d1'

import { organizations } from '../database/schemas/organizations'
import { users } from '../database/schemas/users'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = {
  organizations,
  users,
}

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema: tables })
}
