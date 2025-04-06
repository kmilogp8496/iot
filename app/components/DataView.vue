<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { AsyncData } from '#app'

const {
  columns,
  data,
  pageSizes = [5, 10, 20, 50],
} = defineProps<{
  columns: DataTableColumn<T>[]
  data: AsyncData<PaginatedResponse<T> | undefined, unknown>
  pageSizes?: number[]
  rowActions?: (row: T) => DropdownMenuItem[][]
  onCreate?: () => void
}>()

const search = defineModel<string>('search', {
  default: '',
})

const orderBy = defineModel<OrderBy | null>('orderBy', {
  default: null,
})

const pagination = defineModel<{
  page: number
  pageSize: number
}>('pagination', {
  default: () => ({
    page: 1,
    pageSize: 5,
  }),
})

const columnFilters = defineModel<Record<string, string | number | boolean | undefined>>('columnFilters', {
  default: () => ({}),
})

const onSort = (column: string, direction?: SortDirection) => {
  if (direction) {
    orderBy.value = {
      column,
      direction,
    }
  }
  else {
    orderBy.value = null
  }
}
</script>

<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <div class="flex items-center gap-4">
        <UInput v-model="search" placeholder="Search..." :trailing-icon="searchIcon">
          <template v-if="search.length" #trailing>
            <ButtonClear @clear="search = ''" />
          </template>
        </UInput>
        <UButton variant="ghost" class="ml-auto" @click="data.refresh()">
          <Icon name="i-lucide-refresh-cw" />
        </UButton>
        <UButton v-if="onCreate" @click="onCreate">
          <Icon :name="createIcon" />
        </UButton>
      </div>
    </template>
    <UTable
      :loading="data.status.value === 'pending'"
      sticky
      :data="data.data.value?.results ?? []"
      :columns
    >
      <template v-for="col in columns" :key="col.accessorKey" #[`${col.accessorKey}-header`]>
        <div class="flex items-center">
          {{ col.header }}
          <TableHeaderSorting
            v-if="col.sortable"
            :column-key="col.accessorKey"
            :sort="orderBy"
            @sort="onSort(col.accessorKey, $event)"
          />
          <template v-if="col.filter">
            <TableHeaderFilterable
              v-if="col.filter === true"
              :is-active="!!columnFilters[col.accessorKey]"
              @search="columnFilters[col.accessorKey] = $event"
            />
            <TableHeaderFilter
              v-else
              :filter-function="col.filter"
              placeholder="Description..."
              @search="columnFilters[col.accessorKey] = $event"
            />
          </template>
        </div>
      </template>
      <template #actions-cell="{ row }">
        <UDropdownMenu v-if="rowActions" :items="rowActions(row.original)">
          <UButton
            :icon="actionsIcon"
            color="neutral"
            variant="ghost"
            aria-label="Actions"
          />
        </UDropdownMenu>
      </template>
    </UTable>
  </UCard>
  <div class="flex justify-end pt-4 gap-4">
    <USelect v-model="pagination.pageSize" :items="pageSizes" />
    <UPagination
      v-model:page="pagination.page"
      :items-per-page="pagination.pageSize"
      :total="data.data.value?.total ?? 0"
    />
  </div>
</template>
