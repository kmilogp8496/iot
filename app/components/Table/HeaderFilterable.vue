<script setup lang="ts">
const search = ref('')

const isOpen = defineModel<boolean>({
  default: false,
})

const emit = defineEmits<{
  search: [string]
}>()
</script>

<template>
  <UPopover v-model:open="isOpen">
    <UButton
      color="neutral"
      variant="ghost"
      :trailing-icon="filterIcon"
      class="data-[state=open]:bg-(--ui-bg-elevated)"
    />
    <template #content>
      <UCard :ui="{ body: 'p-2 sm:p-2' }">
        <div class="flex flex-col gap-4">
          <UInput v-model="search" placeholder="Search..." :trailing-icon="searchIcon">
            <template v-if="search.length" #trailing>
              <ButtonClear @clear="search = '';" />
            </template>
          </UInput>

          <div class="flex gap-2 justify-end">
            <UButton variant="soft" color="neutral" @click="isOpen = false">
              Cancel
            </UButton>
            <UButton @click="emit('search', search); isOpen = false">
              Apply
            </UButton>
          </div>
        </div>
      </UCard>
    </template>
  </UPopover>
</template>
