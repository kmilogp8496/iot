<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const { seo } = useAppConfig()

defineOgImageComponent('Nuxt', {
  title: seo?.siteName,
  description: seo?.description,
  headline: seo?.headline,
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false,
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image',
})

provide<ContentNavigationItem[]>('navigation', [
  ...(navigation.value ?? []),
  {
    path: '/sensors',
    title: 'Sensors',
    children: [
      {
        path: '/sensors',
        title: 'Sensors',
      },
    ],
  },
])
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
