import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/database/schemas/*.ts',
  out: './server/database/migrations',
})
