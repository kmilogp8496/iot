import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const metrics = sqliteTable('metrics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  metricName: text('metric_name').notNull(),
  labels: text('labels'), // Store as JSON string
  value: real('value').notNull(),
  timestamp: integer('timestamp').notNull(),
})

export type InsertMetric = typeof metrics.$inferInsert
export type Metric = typeof metrics.$inferSelect
