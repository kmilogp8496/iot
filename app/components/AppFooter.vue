<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <UFooter>
    <template #left>
      {{ config.footer?.credits }}
    </template>

    <template #right>
      <UColorModeButton v-if="config.footer?.colorMode" />

      <template v-if="config.footer?.links">
        <UButton
          v-for="(link, index) of config.footer?.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
