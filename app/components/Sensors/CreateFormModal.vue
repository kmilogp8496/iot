<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { z } from 'zod'
import type { Sensor } from '~/pages/sensors.vue'

const emit = defineEmits<{
  close: [Sensor | undefined]
}>()

const state = ref<z.infer<typeof createSensorSchema>>({
  name: '',
  description: '',
  location: '',
})

const onSubmit = async (e: FormSubmitEvent<z.infer<typeof createSensorSchema>>) => {
  const response = await apiFetch('/api/v1/sensors', {
    method: 'POST',
    body: e.data,
  })

  emit('close', response)
}
</script>

<template>
  <FormModal
    title="Create Sensor"
    :schema="createSensorSchema"
    :state="state"
    :handler="onSubmit"
    @close="emit('close', undefined)"
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
