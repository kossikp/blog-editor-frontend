<template>
  <div class="mb-4">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        :class="[
          'block w-full rounded-md shadow-sm',
          'focus:ring-blue-500 focus:border-blue-500',
          'sm:text-sm',
          {
            'border-gray-300': !error,
            'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': error,
            'bg-gray-100 cursor-not-allowed': disabled
          }
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
      ></textarea>
      <div
        v-if="error"
        class="absolute top-3 right-0 pr-3 flex items-center pointer-events-none"
      >
        <svg
          class="h-5 w-5 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <p
      v-if="error"
      class="mt-2 text-sm text-red-600"
    >
      {{ error }}
    </p>
    <p
      v-else-if="help"
      class="mt-2 text-sm text-gray-500"
    >
      {{ help }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  help: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 3
  }
})

defineEmits(['update:modelValue', 'blur'])
</script> 