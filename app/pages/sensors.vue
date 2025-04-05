<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { z } from 'zod'
import { SensorsForm } from '#components'

useHead({
  title: 'Sensors',
})

const { viewBinds, params } = useDataView()

const sensors = useApiFetch('/api/v1/sensors', {
  params,
})

export type Sensor = InferPaginationType<typeof sensors>

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

const createSensorState = (sensor?: Sensor) => ref<z.infer<typeof createSensorSchema | typeof updateSensorSchema>>({
  name: sensor?.name ?? '',
  description: sensor?.description ?? '',
  location: sensor?.location ?? '',
})

const deleteModal = useConfirmModal()

const createModal = useFormModal<typeof createSensorSchema>()
const onCreate = () => {
  createModal.open({
    title: 'Create sensor',
    formBuilder: () => SensorsForm,
    stateBuilder: createSensorState,
    schema: createSensorSchema,
    handler: async (e) => {
      await apiFetch('/api/v1/sensors', {
        method: 'POST',
        body: e.data,
      })

      createModal.close()
      sensors.refresh()
    },
  })
}

const editModal = useFormModal()

const rowActions = (row: Sensor): DropdownMenuItem[][] => {
  return [
    [
      {
        label: 'Edit',
        icon: editIcon,
        onSelect: () => {
          editModal.open({
            title: `Edit sensor ${row.name}`,
            schema: updateSensorSchema,
            formBuilder: () => SensorsForm,
            stateBuilder: () => createSensorState(row),
            handler: async (e) => {
              await apiFetch(`/api/v1/sensors/${row.id}`, {
                method: 'PUT',
                body: e.data,
              })

              sensors.refresh()
              editModal.close()
            },
          })
        },
      },
      {
        label: 'Delete',
        icon: deleteIcon,
        color: 'error',
        onSelect: async () => {
          const result = await deleteModal.open({
            title: 'Delete Sensor',
            description: `Are you sure you want to delete the sensor ${row.name}?`,
          })

          if (result) {
            await apiFetch(`/api/v1/sensors/${row.id}`, { method: 'DELETE' })
            sensors.refresh()
          }
        },
      },
    ],
  ]
}
</script>

<template>
  <div class="py-4">
    <UPageHeader title="Sensors" description="Manage your sensors here." />
    <DataView
      v-bind="viewBinds"
      :columns="columns"
      :data="sensors"
      :row-actions
      @create="onCreate"
    />
  </div>
</template>
