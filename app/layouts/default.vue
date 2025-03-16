<script setup lang="ts">
const items = ref([
  {
    label: 'Home',
    to: '/',
    icon: 'i-heroicons-home',
  },
  {
    label: 'Sensors',
    to: '/sensors',
    icon: 'i-cbi:outdoor-motion-sensor-temperature',
  },
])

const { user } = useUserSession()
</script>

<template>
  <UApp>
    <UHeader title="IoT Platform" mode="slideover">
      <template #title>
        <div class="flex items-center gap-2">
          <UIcon name="eos-icons:iot" />
          <span class="sm:block hidden">
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

        <UUser
          v-if="user"
          :name="user.name"
          :avatar="{ src: user.avatar ?? undefined }"
          :description="user.email"
        />
      </template>
    </UHeader>

    <UContainer>
      <slot />
    </UContainer>
  </UApp>
</template>
