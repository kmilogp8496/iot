<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const props = defineProps<{
  columnKey: string
  sort: OrderBy | null
}>()

const emit = defineEmits<{
  sort: [direction?: SortDirection]
}>()

const onSelect = (direction: SortDirection) => {
  if (props.sort?.direction === direction && props.sort?.column === props.columnKey) {
    emit('sort')
  }
  else {
    emit('sort', direction)
  }
}

const items = computed<DropdownMenuItem[]>(() => [
  {
    label: SortDirectionDefinition.asc.label,
    icon: SortDirectionDefinition.asc.icon,
    type: 'checkbox',
    checked: (props.sort?.direction === SortDirectionDefinition.asc.value) && (props.sort?.column === props.columnKey),
    onSelect: () => onSelect(SortDirectionDefinition.asc.value),
  },
  {
    label: SortDirectionDefinition.desc.label,
    icon: SortDirectionDefinition.desc.icon,
    type: 'checkbox',
    checked: (props.sort?.direction === SortDirectionDefinition.desc.value) && (props.sort?.column === props.columnKey),
    onSelect: () => onSelect(SortDirectionDefinition.desc.value),
  },
])

const trailingIcon = computed(() => {
  return props.columnKey === props.sort?.column
    ? props.sort.direction === SortDirectionDefinition.asc.value
      ? SortDirectionDefinition.asc.icon
      : SortDirectionDefinition.desc.icon
    : sortAscDescIcon
})

const ariaLabel = computed(() =>
  `Sort by ${props.sort?.direction === SortDirectionDefinition.desc.value
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
      class="p-0.5 ml-1"
      :aria-label
    />
  </UDropdownMenu>
</template>
