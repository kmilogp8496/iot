import type { TableColumn } from '@nuxt/ui'
import type { AsyncData } from '#app'

export type InferPaginationType<T> = T extends AsyncData<PaginatedResponse<infer U> | undefined, unknown> ? U : never

export type SortDirection = typeof SortDirectionDefinition[keyof typeof SortDirectionDefinition]['value']

export type DataTableColumn<T> = TableColumn<T> & {
  filter?: true | FilterFunction
  sortable?: true
  accessorKey: (keyof T & string) | (string & {})
  header: string
}

export type FilterFunction = (search: string) => Promise<FilterItem[]> | FilterItem[]

export interface FilterItem {
  value: string
  label: string
}

export interface Pagination {
  page: number
  pageSize: number
}

export interface OrderBy {
  column: string
  direction: SortDirection
}
