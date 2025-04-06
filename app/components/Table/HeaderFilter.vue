<script setup lang="ts">
const emit = defineEmits<{
  search: [string | undefined]
}>()

const { debounceTime = 300, ...props } = defineProps<{
  filterFunction: FilterFunction
  debounceTime?: number
  placeholder?: string
}>()

const search = ref('')
const isOpen = ref(false)

const fetchOptions = async () => {
  options.value = await props.filterFunction(search.value)
}

const debouncedFetchOptions = useDebounceFn(fetchOptions, debounceTime)

const selectedOption = ref<string | undefined>(undefined)
const options = ref<{ value: string, label: string }[]>([])

onMounted(() => {
  debouncedFetchOptions()
})

watch(search, debouncedFetchOptions)
watch(selectedOption, () => {
  emit('search', selectedOption.value)
})
</script>

<template>
  <UPopover v-model:open="isOpen">
    <UButton
      color="neutral"
      variant="ghost"
      :trailing-icon="filterIcon"
      class="p-0.5 ml-1"
    />
    <template #content>
      <UCard :ui="{ body: 'p-2 sm:p-2' }">
        <div class="flex flex-col gap-4">
          <USelectMenu
            v-model="selectedOption"
            v-model:search-term="search"
            :items="options"
            value-key="value"
            class="w-60"
            :placeholder
          />
        </div>
      </UCard>
    </template>
  </UPopover>
</template>
