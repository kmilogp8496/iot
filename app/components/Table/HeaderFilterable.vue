<script setup lang="ts">
const search = ref('')
const { placeholder = 'Search...' } = defineProps<{
  isActive?: boolean
  placeholder?: string
}>()

const isOpen = defineModel<boolean>({
  default: false,
})

const emit = defineEmits<{
  search: [string]
}>()

const onClear = () => {
  search.value = ''
  emit('search', search.value)
  isOpen.value = false
}

const onSearch = () => {
  emit('search', search.value)
  isOpen.value = false
}
</script>

<template>
  <UPopover v-model:open="isOpen">
    <UButton
      :color="isActive ? 'primary' : 'neutral'"
      variant="ghost"
      :trailing-icon="filterIcon"
      class="p-0.5 ml-1"
    />
    <template #content>
      <UCard :ui="{ body: 'p-2 sm:p-2' }">
        <div class="flex flex-col gap-4">
          <UInput
            v-model="search"
            :placeholder
            :trailing-icon="searchIcon"
            @keyup.enter="onSearch"
          >
            <template v-if="search.length" #trailing>
              <ButtonClear @clear="onClear" />
            </template>
          </UInput>

          <div class="flex gap-2">
            <UButton
              size="sm"
              class="mr-auto"
              variant="soft"
              label="Clear"
              @click="onClear"
            />
            <UButton
              variant="soft"
              size="sm"
              color="neutral"
              @click="isOpen = false"
            >
              Cancel
            </UButton>
            <UButton size="sm" @click="onSearch">
              Apply
            </UButton>
          </div>
        </div>
      </UCard>
    </template>
  </UPopover>
</template>
