<script setup lang="ts" generic="T">
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { AsyncData } from '#app'

const {
  columns,
  data,
  pageSizes = [5, 10, 20, 50],
} = defineProps<{
  columns: TableColumn<T>[]
  data: AsyncData<PaginatedResponse<T> | undefined, unknown>
  pageSizes?: number[]
}>()

const search = defineModel<string>('search', {
  default: '',
})

const orderBy = defineModel<{
  column: string
  direction: SortDirection
} | undefined>('orderBy', {
  default: () => ({
    column: 'createdAt',
    direction: SortDirectionDefinition.desc.value,
  }),
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

const dropdownActions = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Edit',
      icon: 'i-lucide-edit',
    },
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'error',
    },
  ],
])

watch(() => pagination.value.page, (value) => {
  console.log('pagination', value)
}, {
  deep: true,
})
</script>

<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <UInput v-model="search" placeholder="Search..." :trailing-icon="searchIcon">
        <template v-if="search.length" #trailing>
          <ButtonClear @clear="search = ''" />
        </template>
      </UInput>
    </template>
    <UTable
      sticky
      :data="data.data.value?.results ?? []"
      :columns
    >
      <!-- <template #description-header="{ column }">
        <div class="flex items-center">
          Description
          <TableHeaderSorting
            :column="column"
            :sort="column.getIsSorted()"
          />
          <TableHeaderFilterable @search="columnFilters.description = $event" />
          <TableHeaderFilter :filter-function="optionsFinder" placeholder="Description..." @search="columnFilters.description = $event" />
        </div>
      </template> -->
      <template #actions-cell="">
        <UDropdownMenu :items="dropdownActions">
          <UButton
            icon="i-lucide-ellipsis-vertical"
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
