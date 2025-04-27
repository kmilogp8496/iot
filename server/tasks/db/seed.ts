import { seed } from 'drizzle-seed'
import { users } from '../../database/schemas/users'
import { organizations } from '../../database/schemas/organizations'
import { sensors } from '../../database/schemas/sensors'
import { measurements } from '../../database/schemas/measurement'

export default defineTask({
  meta: {
    description: 'Run database seed task',
  },
  async run() {
    const db = useDrizzle()

    // @ts-expect-error - D1 type not supported
    await seed(db, { organizations, users, sensors, measurements }, {
      seed: Math.floor(Math.random() * 1000000),
    }).refine(() => ({
      users: {
        count: 3,
      },
      sensors: {
        count: 10,
      },
      organizations: {
        count: 2,
      },
      measurements: {
        count: 10,
      },
    }))

    return { result: 'success' }
  },
})
