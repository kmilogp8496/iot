import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { sensors } from './sensors'

export const measurements = sqliteTable('measurements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sensorId: integer('sensor_id').notNull().references(() => sensors.id, {
    onDelete: 'cascade',
  }),
  name: text('name').notNull(),
  unit: text('unit').notNull(),
  metricName: text('metric_name').notNull(),
  interval: integer('interval').notNull(), // Interval in seconds
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`).$onUpdate(() => sql`(unixepoch())`),
}, t => ([
  index('measurements_sensor_id_idx').on(t.sensorId),
  index('measurements_created_at_idx').on(t.createdAt),
]))

export type InsertMeasurement = typeof measurements.$inferInsert
export type Measurement = typeof measurements.$inferSelect
