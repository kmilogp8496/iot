import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sensors } from './sensors'

export const sensorCredentials = sqliteTable('sensor_credentials', {
  sensorId: integer('sensor_id').primaryKey().references(() => sensors.id, {
    onDelete: 'cascade',
  }),
  apiKey: text('api_key').notNull(),
})

export type InsertSensorCredentials = typeof sensorCredentials.$inferInsert
export type SensorCredentials = typeof sensorCredentials.$inferSelect
