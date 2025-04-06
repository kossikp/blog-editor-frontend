<template>
  <Transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="close"
    >
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <Transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="show"
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  v-if="icon"
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                  :class="[
                    {
                      'bg-red-100': variant === 'danger',
                      'bg-blue-100': variant === 'primary',
                      'bg-green-100': variant === 'success',
                      'bg-yellow-100': variant === 'warning'
                    }
                  ]"
                >
                  <component
                    :is="icon"
                    class="h-6 w-6"
                    :class="[
                      {
                        'text-red-600': variant === 'danger',
                        'text-blue-600': variant === 'primary',
                        'text-green-600': variant === 'success',
                        'text-yellow-600': variant === 'warning'
                      }
                    ]"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3
                    v-if="title"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    {{ title }}
                  </h3>
                  <div class="mt-2">
                    <slot></slot>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <slot name="footer">
                <Button
                  variant="primary"
                  class="w-full sm:w-auto sm:ml-3"
                  @click="$emit('confirm')"
                >
                  Confirm
                </Button>
                <Button
                  variant="outline"
                  class="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
                  @click="close"
                >
                  Cancel
                </Button>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { Button } from '@/components'

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
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

const close = () => {
  emit('update:show', false)
}
</script> 