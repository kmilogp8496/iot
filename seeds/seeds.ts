import type { InsertOrganization } from '~~/server/database/schemas/organizations'
import type { InsertUser } from '~~/server/database/schemas/users'

export const organizations: InsertOrganization[] = [
  {
    name: 'Test Organization',
    description: 'Test Organization Description',
  },
  {
    name: 'Inactive Organization',
    description: 'Inactive Organization Description',
    isActive: false,
  },
]

export const users: InsertUser[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123123asdasd',
    organizationId: 1,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '123123asdasd',
    organizationId: 1,
  },
]
