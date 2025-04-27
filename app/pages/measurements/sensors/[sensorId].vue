<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { z } from 'zod'
import { MeasurementsForm } from '#components'

useHead({
  title: 'Measurements',
})

const route = useRoute()

const sensorId = computed(() => route.params.sensorId)

const { viewBinds, params } = useDataView()

const measurements = useApiFetch('/api/v1/iot/sensors/measurements', {
  params,
})

export type Measurement = InferPaginationType<typeof measurements>

const columns: DataTableColumn<Measurement>[] = [
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
    accessorKey: 'unit',
    header: 'Unit',
    filter: true,
  },
  {
    accessorKey: 'metricName',
    header: 'Metric Name',
    filter: true,
  },
  {
    accessorKey: 'interval',
    header: 'Interval',
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

const createMeasurementState = (measurement?: Measurement) => ref<z.infer<typeof updateMeasurementSchema>>({
  name: measurement?.name ?? '',
  unit: measurement?.unit ?? '',
  metricName: measurement?.metricName ?? '',
  interval: measurement?.interval ?? 0,
})

const deleteModal = useConfirmModal()

const createModal = useFormModal<typeof updateMeasurementSchema>()
const onCreate = () => {
  createModal.open({
    title: 'Create measurement',
    formBuilder: () => MeasurementsForm,
    stateBuilder: createMeasurementState,
    schema: updateMeasurementSchema,
    handler: async (e) => {
      await apiFetch('/api/v1/iot/sensors/measurements', {
        method: 'POST',
        body: { ...e.data, sensorId: sensorId.value },
      })

      createModal.close()
      measurements.refresh()
    },
  })
}

const editModal = useFormModal()

const rowActions = (row: Measurement): DropdownMenuItem[][] => {
  return [
    [
      {
        label: 'Edit',
        icon: editIcon,
        onSelect: () => {
          editModal.open({
            title: `Edit measurement ${row.name}`,
            schema: updateMeasurementSchema,
            formBuilder: () => MeasurementsForm,
            stateBuilder: () => createMeasurementState(row),
            handler: async (e) => {
              await apiFetch(`/api/v1/iot/sensors/measurements/${row.id}`, {
                method: 'PUT',
                body: e.data,
              })

              measurements.refresh()
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
            title: 'Delete Measurement',
            description: `Are you sure you want to delete the measurement ${row.name}?`,
          }).result

          if (result) {
            await apiFetch(`/api/v1/iot/sensors/measurements/${row.id}`, { method: 'DELETE' })
            measurements.refresh()
          }
        },
      },
    ],
  ]
}
</script>

<template>
  <div class="py-4">
    <UPageHeader title="Measurements" description="Manage your measurements here." />
    <DataView
      v-bind="viewBinds"
      :columns="columns"
      :data="measurements"
      :row-actions
      @create="onCreate"
    />
  </div>
</template>
