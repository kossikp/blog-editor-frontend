<template>
  <div
    :class="[
      'bg-white rounded-lg shadow',
      {
        'p-6': !noPadding,
        'hover:shadow-lg transition-shadow duration-200': hover
      }
    ]"
  >
    <div
      v-if="$slots.header"
      class="border-b border-gray-200 pb-4 mb-4"
    >
      <slot name="header"></slot>
    </div>
    <slot></slot>
    <div
      v-if="$slots.footer"
      class="border-t border-gray-200 pt-4 mt-4"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  noPadding: {
    type: Boolean,
    default: false
  },
  hover: {
    type: Boolean,
    default: false
  }
})
</script> 