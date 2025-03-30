import type { TableColumn } from '@nuxt/ui'
import type { AsyncData } from '#app'
import type { PaginatedResponse } from '~~/server/utils/response'

export type InferPaginationType<T> = T extends AsyncData<PaginatedResponse<infer U> | undefined, unknown> ? U : never

export type SortDirection = typeof SortDirectionDefinition[keyof typeof SortDirectionDefinition]['value']

export type DataTableColumn<T> = TableColumn<T> & {
  filter?: true | FilterFunction
}

export type FilterFunction = (search: string) => Promise<FilterItem[]>

export interface FilterItem {
  value: string | number
  label: string
}

export interface Pagination {
  page: number
  pageSize: number
}
