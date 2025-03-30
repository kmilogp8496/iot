<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const props = defineProps<{
  column: {
    id: string
    clearSorting: () => void
    toggleSorting: (direction: boolean) => void
  }
  sort: SortDirection | false
}>()

const emit = defineEmits<{
  sort: [direction?: SortDirection]
}>()

const onSelect = (direction: SortDirection) => {
  if (props.sort === direction) {
    emit('sort')
    props.column.clearSorting()
  }
  else {
    emit('sort', direction)
    props.column.toggleSorting(direction === SortDirectionDefinition.desc.value)
  }
}

const items = computed<DropdownMenuItem[]>(() => [
  {
    label: SortDirectionDefinition.asc.label,
    icon: SortDirectionDefinition.asc.icon,
    type: 'checkbox',
    checked: props.sort === SortDirectionDefinition.asc.value,
    onSelect: () => onSelect(SortDirectionDefinition.asc.value),
  },
  {
    label: SortDirectionDefinition.desc.label,
    icon: SortDirectionDefinition.desc.icon,
    type: 'checkbox',
    checked: props.sort === SortDirectionDefinition.desc.value,
    onSelect: () => onSelect(SortDirectionDefinition.desc.value),
  },
])

const trailingIcon = computed(() => {
  return props.sort
    ? props.sort === SortDirectionDefinition.asc.value
      ? SortDirectionDefinition.asc.icon
      : SortDirectionDefinition.desc.icon
    : sortAscDescIcon
})

const ariaLabel = computed(() =>
  `Sort by ${props.sort === SortDirectionDefinition.desc.value
    ? SortDirectionDefinition.desc.label
    : SortDirectionDefinition.asc.label
  }`,
)
</script>

<template>
  <UDropdownMenu :items>
    <UButton
      color="neutral"
      variant="ghost"
      :trailing-icon="trailingIcon"
      class="data-[state=open]:bg-(--ui-bg-elevated)"
      :aria-label
    />
  </UDropdownMenu>
</template>
