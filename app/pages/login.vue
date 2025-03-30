<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  requiresAuth: false,
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <a href="/auth/github" class="cursor-pointer">
      <UButton :icon="githubIcon" class="cursor-pointer">
        Login with Github
      </UButton>
    </a>
  </div>
</template>
