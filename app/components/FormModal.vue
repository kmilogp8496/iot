<script setup lang="ts" generic="T extends z.ZodSchema">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { z } from 'zod'

const props = defineProps<{
  schema: T
  handler: (e: FormSubmitEvent<z.infer<T>>) => Promise<unknown>
  stateBuilder: () => Ref<z.infer<T>>
  title: string
  formBuilder: () => ReturnType<typeof defineComponent>
}>()

const emit = defineEmits<{
  close: []
}>()

const state = props.stateBuilder()

const form = useTemplateRef('form')

const loading = ref(false)

const onSubmit = async (e: FormSubmitEvent<z.infer<T>>) => {
  loading.value = true

  try {
    await props.handler(e)
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
        <slot :state>
          <component :is="formBuilder()" v-model="state" />
        </slot>
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
