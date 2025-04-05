<script setup lang="ts" generic="T extends z.ZodSchema">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { z } from 'zod'

const { schema, state, handler, title } = defineProps<{
  schema: T
  state: z.infer<T>
  handler: (e: FormSubmitEvent<z.infer<T>>) => Promise<unknown>
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

const form = useTemplateRef('form')

const loading = ref(false)

const onSubmit = async (e: FormSubmitEvent<z.infer<T>>) => {
  loading.value = true

  try {
    await handler(e)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UModal :title>
    <template #body>
      <UForm
        ref="form"
        :schema
        :state
        class="space-y-4"
        @submit="onSubmit"
      >
        <slot :state />
      </UForm>
    </template>
    <template #footer>
      <UButton
        class="ml-auto"
        type="button"
        variant="outline"
        :disabled="loading"
        @click="emit('close')"
      >
        Cancel
      </UButton>
      <UButton type="submit" :loading @click="form?.submit()">
        Save
      </UButton>
    </template>
  </UModal>
</template>
