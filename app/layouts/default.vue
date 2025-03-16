<script setup lang="ts">
const items = ref([
  {
    label: 'Home',
    to: '/',
    icon: 'i-heroicons-home',
  },
])
</script>

<template>
  <UApp>
    <UHeader title="IoT Platform" mode="slideover">
      <template #title>
        <div class="flex items-center gap-2">
          <UIcon name="eos-icons:iot" />
          <span>
            IoT Platform
          </span>
        </div>
      </template>

      <UNavigationMenu :items orientation="horizontal" />
      <template #body>
        <UNavigationMenu :items orientation="vertical" />
      </template>

      <template #right>
        <UColorModeButton />

        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/kmilogp8496/iot"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
        </UTooltip>

        <UUser name="John Doe" :avatar="{ src: 'https://avatars.githubusercontent.com/u/52615668?v=4' }" description="Software Engineer" />
      </template>
    </UHeader>

    <UContainer>
      <slot />
    </UContainer>
  </UApp>
</template>
