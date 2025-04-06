<template>
  <nav
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ from }}</span>
        to
        <span class="font-medium">{{ to }}</span>
        of
        <span class="font-medium">{{ total }}</span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <Button
        variant="outline"
        :disabled="currentPage === 1"
        @click="$emit('update:currentPage', currentPage - 1)"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        class="ml-3"
        :disabled="currentPage === lastPage"
        @click="$emit('update:currentPage', currentPage + 1)"
      >
        Next
      </Button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { Button } from '@/components'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  lastPage: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
})

defineEmits(['update:currentPage'])

const from = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const to = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.total)
})
</script> 