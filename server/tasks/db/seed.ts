import { seed } from 'drizzle-seed'
import { users } from '../../database/schemas/users'
import { organizations } from '../../database/schemas/organizations'
import { sensors } from '../../database/schemas/sensors'

export default defineTask({
  meta: {
    description: 'Run database seed task',
  },
  async run() {
    const db = useDrizzle()

    // @ts-expect-error - D1 type not supported
    await seed(db, { organizations, users, sensors }).refine(() => ({
      users: {
        count: 3,
      },
      sensors: {
        count: 10,
      },
      organizations: {
        count: 2,
      },
    }))

    return { result: 'success' }
  },
})
