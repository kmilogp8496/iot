<script setup lang="ts">
const route = useRoute()
const items = ref([
  {
    label: 'Docs',
    value: '/docs/getting-started/setup',
    icon: docsIcon,
  },
  {
    label: 'Sensors',
    value: '/sensors',
    icon: sensorIcon,
  },
])
const modelValue = computed(() => route.path.startsWith('/docs') ? items.value[0]! : items.value[1]!)
</script>

<template>
  <USelectMenu
    :model-value="modelValue"
    :items
    :icon="modelValue.icon"
    @update:model-value="navigateTo($event.value)"
  />
</template>
