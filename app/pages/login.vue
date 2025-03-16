<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  requiresAuth: false,
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen cursor-pointer">
    <a href="/auth/github">
      <UButton icon="i-logos-github-icon">
        Login with Github
      </UButton>
    </a>
  </div>
</template>
