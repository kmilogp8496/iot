// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
  ],

  // https://devtools.nuxt.com
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://iot.kmilo.dev',
    name: 'IoT Platform',
    description: 'IoT Platform is an online tool for managing IoT devices on the internet using secure protocols for communication. Fully open source.',
    headline: 'IoT Platform',
  },

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1,
        },
      },
    },
  },

  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
  },
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-03-01',

  nitro: {
    experimental: {
      tasks: true,
      openAPI: true,
    },
  },

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    database: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  icon: {
    size: '20px',
  },
})