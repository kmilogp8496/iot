<script setup lang="ts">
const emit = defineEmits<{
  clear: []
}>()
</script>

<template>
  <UButton
    color="neutral"
    variant="link"
    :icon="circleCrossIcon"
    aria-label="Clear input"
    @click="emit('clear')"
  />
</template>
