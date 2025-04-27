<script setup lang="ts">
import type { z } from 'zod'

const state = defineModel<z.infer<typeof createSensorSchema | typeof updateSensorSchema>>({
  required: true,
})
</script>

<template>
  <UFormField label="Name" name="name">
    <UInput v-model="state.name" class="w-full" />
  </UFormField>
  <UFormField label="Description" name="description">
    <UTextarea v-model="state.description" class="w-full" />
  </UFormField>
  <UFormField label="Location" name="location">
    <UInput v-model="state.location" class="w-full" />
  </UFormField>
</template>
