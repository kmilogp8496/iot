<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
</script>

<template>
  <div>
    <AppHeader />
    <UContainer>
      <UPage>
        <template #left>
          <UPageAside>
            <UContentNavigation
              highlight
              :navigation="navigation"
            />
          </UPageAside>
        </template>
        <slot />
      </UPage>
    </UContainer>
    <AppFooter />
  </div>
</template>
