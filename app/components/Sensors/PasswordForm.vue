<script setup lang="ts">
import type { z } from 'zod'

const state = defineModel<z.infer<typeof createSensorCredentialsSchema>>({
  required: true,
})

const generateApiKey = () => {
  state.value.apiKey = Array.from({ length: 16 }, () => Math.floor(Math.random() * 36).toString(36)).join('')
}

const showApiKey = ref(false)
</script>

<template>
  <UFormField label="API Key" name="apiKey">
    <UInput v-model="state.apiKey" :type="showApiKey ? 'text' : 'password'" class="w-full">
      <template #trailing>
        <UTooltip text="Generate API key">
          <UButton
            :icon="randomIcon"
            variant="ghost"
            size="sm"
            @click="generateApiKey"
          />
        </UTooltip>
        <UButton
          :icon="showApiKey ? eyeOffIcon : eyeIcon"
          variant="ghost"
          size="sm"
          @click="showApiKey = !showApiKey"
        />
      </template>
    </UInput>
  </UFormField>
</template>
