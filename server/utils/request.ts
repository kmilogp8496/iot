import type { Table, Column } from 'drizzle-orm'
import { asc, desc, getTableColumns, like } from 'drizzle-orm'
import { z } from 'zod'
import type { OrderBy } from '~~/shared/utils/types'

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().optional().default(10),
  offset: z.coerce.number().optional().default(0),
  search: z.string().optional(),
})

export const idParamSchema = z.object({
  // id comes as a string, needs to be refined and converted to a number using only zod features
  id: z.coerce.number(),
})

export const buildOrderBySchema = <const T extends Table>(
  table: T,
) => {
  return z.object({
    orderBy: z.preprocess((value) => {
      if (!value || typeof value !== 'string') {
        return undefined
      }

      const [column, direction] = value.split(' ')

      if (!column || !direction) {
        return undefined
      }

      return {
        column,
        direction,
      }
    }, z.object({
      column: z.enum(Object.keys(getTableColumns(table)) as [string, ...string[]]),
      direction: z.enum(['asc', 'desc']),
    }).optional()),
  })
}

export const buildFilters = <const T extends Table, const K extends keyof T['$inferInsert']>(
  table: T,
  filters: Record<string, unknown>,
) => {
  const appliedFilters = []
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      const column = table[key as K] as Column
      appliedFilters.push(like(column, `%${value}%`))
    }
  }

  return appliedFilters
}

export const buildOrderBy = <const T extends Table, const K extends keyof T['$inferSelect']>(
  table: T,
  orderBy?: OrderBy,
) => {
  if (!orderBy?.direction) {
    return
  }

  const directionFunction = orderBy.direction === 'asc' ? asc : desc

  if (!orderBy?.column) {
    return
  }

  return directionFunction(table[orderBy.column as K] as Column)
}
