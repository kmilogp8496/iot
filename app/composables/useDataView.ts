import type { Pagination } from '~~/shared/utils/types'

export const useDataView = (defaultValues: {
  search?: string
  pagination?: Pagination
  columnFilters?: Record<string, string | number | boolean | undefined>
  pageSizes?: number[]
} = {}) => {
  const search = ref(defaultValues.search ?? '')
  const debouncedSearch = debouncedRef(search, 300)
  const pagination = ref<Pagination>(defaultValues.pagination ?? {
    page: 1,
    pageSize: 5,
  })
  const pageSizes = defaultValues.pageSizes ?? [5, 10, 20, 50]
  const columnFilters = ref<Record<string, string | number | boolean | undefined>>(defaultValues.columnFilters ?? {})

  const listeners = {
    'onUpdate:search': (value: string) => {
      search.value = value
    },
    'onUpdate:pagination': (value: Pagination) => {
      pagination.value = value
    },
    'onUpdate:columnFilters': (value: Record<string, string | number | boolean | undefined>) => {
      columnFilters.value = value
    },
  }

  const viewBinds = computed(() => ({
    search: search.value,
    pagination: pagination.value,
    columnFilters: columnFilters.value,
    pageSizes,
    ...listeners,
  }))

  return {
    viewBinds,
    params: computed(() => ({
      offset: (pagination.value.page - 1) * pagination.value.pageSize,
      limit: pagination.value.pageSize,
      search: debouncedSearch.value,
      columnFilters: columnFilters.value,
    })),
  }
}
