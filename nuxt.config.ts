// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui-pro',
    '@nuxt/content',
  ],

  // https://devtools.nuxt.com
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  ui: {
    fonts: true,
    colorMode: true,
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

  uiPro: {
    content: true,
    mdc: true,
  },
})
