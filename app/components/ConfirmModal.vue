<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()

const emit = defineEmits<{
  close: [boolean]
}>()
</script>

<template>
  <UModal :title>
    <template #body>
      <p>{{ description }}</p>
    </template>
    <template #footer>
      <UButton class="ml-auto" variant="outline" @click="emit('close', false)">
        Cancel
      </UButton>
      <UButton @click="emit('close', true)">
        Delete
      </UButton>
    </template>
  </UModal>
</template>
