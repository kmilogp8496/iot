<script setup lang="ts">
import type { z } from 'zod'

const state = defineModel<z.infer<typeof createMeasurementSchema | typeof updateMeasurementSchema>>({
  required: true,
})
</script>

<template>
  <UFormField label="Name" name="name">
    <UInput v-model="state.name" class="w-full" />
  </UFormField>
  <UFormField label="Unit" name="unit">
    <UInput v-model="state.unit" class="w-full" />
  </UFormField>
  <UFormField label="Metric Name" name="metricName">
    <UInput v-model="state.metricName" class="w-full" />
  </UFormField>
  <UFormField label="Interval" name="interval">
    <UInputNumber v-model="state.interval" class="w-full" />
  </UFormField>
</template>
