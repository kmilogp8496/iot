import { objectOmit } from '@vueuse/core'

export const useDataView = (defaultValues: {
  search?: string
  pagination?: Pagination
  columnFilters?: Record<string, string | number | boolean | undefined>
  pageSizes?: number[]
  orderBy?: OrderBy
} = {}) => {
  const search = ref(defaultValues.search ?? '')

  const debouncedSearch = debouncedRef(search, 300)

  const router = useRouter()

  const pagination = ref({
    page: useRouteQuery('page', 1, {
      transform: value => value ? Number(value) : (defaultValues.pagination?.page ?? 1),
    }),
    pageSize: useRouteQuery('pageSize', 5, {
      transform: value => value ? Number(value) : (defaultValues.pagination?.pageSize ?? 5),
    }),
  })

  const pageSizes = defaultValues.pageSizes ?? [5, 10, 20, 50]

  // @ts-expect-error To be fixed
  const columnFilters = ref<Record<string, string | undefined>>(objectOmit(router.currentRoute.value.query, ['page', 'pageSize']))

  watch(columnFilters, (value) => {
    router.replace({
      query: {
        ...router.currentRoute.value.query,
        ...value,
      },
    })
  }, { deep: true })

  const listeners = {
    'onUpdate:search': (value: string) => {
      search.value = value
    },
    'onUpdate:pagination': (value: Pagination) => {
      pagination.value = value
    },
    'onUpdate:columnFilters': (value: Record<string, string | undefined>) => {
      columnFilters.value = value
    },
    'onUpdate:orderBy': (value: OrderBy | null) => {
      orderBy.value = value
    },
  }

  const orderBy = ref<OrderBy | null>(defaultValues.orderBy ?? null)

  const viewBinds = computed(() => ({
    search: search.value,
    pagination: pagination.value,
    columnFilters: columnFilters.value,
    orderBy: orderBy.value,
    pageSizes,
    ...listeners,
  }))

  return {
    viewBinds,
    params: computed(() => ({
      offset: (pagination.value.page - 1) * pagination.value.pageSize,
      limit: pagination.value.pageSize,
      search: debouncedSearch.value,
      orderBy: orderBy.value ? `${orderBy.value.column} ${orderBy.value.direction}` : undefined,
      ...columnFilters.value,
    })),
  }
}
