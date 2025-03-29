<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { InferPaginationType } from '~~/shared/utils/types'

const sensors = useFetch('/api/v1/sensors')

const UButton = resolveComponent('UButton')

type Sensor = InferPaginationType<typeof sensors>

const search = ref('')

const columns: TableColumn<Sensor>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return new Date(row.getValue('createdAt')).toLocaleString()
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      return new Date(row.getValue('updatedAt')).toLocaleString()
    },
  },
  {
    accessorKey: 'actions',
    header: '',
  },
]

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
</script>

<template>
  <div class="py-4">
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <UInput v-model="search" placeholder="Search..." />
      </template>
      <UTable
        sticky
        :data="sensors.data.value?.results ?? []"
        :columns
      >
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
  </div>
</template>
