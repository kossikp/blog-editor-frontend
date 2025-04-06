<template>
  <Modal
    :show="show"
    :title="title"
    :icon="icon"
    :variant="variant"
    @update:show="$emit('update:show', $event)"
    @confirm="confirm"
  >
    <p class="text-sm text-gray-500">
      {{ message }}
    </p>
  </Modal>
</template>

<script setup>
import { Modal } from '@/components'

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => {
      return ['primary', 'success', 'danger', 'warning'].includes(value)
    }
  }
})

const emit = defineEmits(['update:show', 'confirm'])

const confirm = () => {
  emit('confirm')
  emit('update:show', false)
}
</script> 