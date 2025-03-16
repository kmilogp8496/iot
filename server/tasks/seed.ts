import * as seeds from '~~/seeds/seeds'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    console.log('Running DB seed task...')

    const entries = Object.entries(seeds)

    entries.forEach(([key]) => {
      if (!(key in tables)) {
        console.error(`Table ${key} not found`)
        return { result: 'error' }
      }
    })
    console.log(await useDrizzle().select().from(tables.organizations))

    for (const [key, value] of entries) {
      console.log(`Seeding table ${key} with ${value.length} rows...`)
      await useDrizzle().insert(tables[key as keyof typeof tables]).values(value)
    }

    return { result: 'success' }
  },
})
