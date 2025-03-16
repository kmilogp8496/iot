import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { organizations } from './organizations'
import { users } from './users'

export const sensors = sqliteTable('sensors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  organizationId: integer('organization_id').notNull().references(() => organizations.id, {
    onDelete: 'cascade',
  }),
  createdBy: integer('created_by').notNull().references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  location: text('location').notNull(),
  measurementUnit: text('measurement_unit').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$default(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$default(() => new Date()).$onUpdate(() => new Date()),
}, t => ([
  index('sensors_organization_id_idx').on(t.organizationId),
  index('sensors_created_by_idx').on(t.createdBy),
  index('sensors_measurement_unit_idx').on(t.measurementUnit),
]))

export type InsertSensor = typeof sensors.$inferInsert
export type Sensor = typeof sensors.$inferSelect
