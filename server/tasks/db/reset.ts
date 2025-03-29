import { reset } from 'drizzle-seed'
import { users } from '../../database/schemas/users'
import { organizations } from '../../database/schemas/organizations'
import { sensors } from '../../database/schemas/sensors'

export default defineTask({
  meta: {
    description: 'Run database reset task',
  },
  async run() {
    const db = useDrizzle()
    // @ts-expect-error - D1 type not supported
    await reset(db, { sensors, users, organizations })

    return { result: 'success' }
  },
})
