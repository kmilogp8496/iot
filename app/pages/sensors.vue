<script setup lang="ts">
const { viewBinds, params } = useDataView()

const sensors = useFetch('/api/v1/sensors', {
  params,
})

type Sensor = InferPaginationType<typeof sensors>

const columns: DataTableColumn<Sensor>[] = [
  {
    accessorKey: 'id',
    header: '#',
    sortable: true,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    filter: true,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    filter: true,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    filter: true,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    sortable: true,
    cell: ({ row }) => {
      return formatToDateString(row.getValue('createdAt'))
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    sortable: true,
    cell: ({ row }) => {
      return formatToDateString(row.getValue('updatedAt'))
    },
  },
  {
    accessorKey: 'actions',
    header: '',
  },
]
</script>

<template>
  <div class="py-4">
    <DataView :columns="columns" :data="sensors" v-bind="viewBinds" />
  </div>
</template>
