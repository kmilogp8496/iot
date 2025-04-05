<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { z } from 'zod'
import type { Sensor } from '~/pages/sensors.vue'

const { sensor } = defineProps<{
  sensor: Sensor
}>()

const emit = defineEmits<{
  close: [Sensor | undefined]
}>()

const state = ref<z.infer<typeof updateSensorSchema>>({
  name: sensor.name,
  description: sensor.description ?? '',
  location: sensor.location,
})

const onSubmit = async (e: FormSubmitEvent<z.infer<typeof updateSensorSchema>>) => {
  const response = await apiFetch(`/api/v1/sensors/${sensor.id}`, {
    method: 'PUT',
    body: e.data,
  })

  emit('close', response)
}
</script>

<template>
  <FormModal
    :title="`Edit sensor ${sensor.name}`"
    :schema="updateSensorSchema"
    :state="state"
    :handler="onSubmit"
    @close="emit('close', $event)"
  >
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" class="w-full" />
    </UFormField>
    <UFormField label="Description" name="description">
      <UTextarea v-model="state.description" class="w-full" />
    </UFormField>
    <UFormField label="Location" name="location">
      <UInput v-model="state.location" class="w-full" />
    </UFormField>
  </FormModal>
</template>
