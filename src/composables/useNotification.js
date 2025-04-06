import { ref } from 'vue'

export function useNotification() {
  const notifications = ref([])

  const addNotification = (notification) => {
    const id = Date.now()
    notifications.value.push({
      id,
      ...notification,
      show: true
    })

    if (notification.timeout !== false) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.timeout || 5000)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value[index].show = false
      setTimeout(() => {
        notifications.value.splice(index, 1)
      }, 300)
    }
  }

  const success = (message, options = {}) => {
    return addNotification({
      type: 'success',
      message,
      ...options
    })
  }

  const error = (message, options = {}) => {
    return addNotification({
      type: 'error',
      message,
      ...options
    })
  }

  const info = (message, options = {}) => {
    return addNotification({
      type: 'info',
      message,
      ...options
    })
  }

  const warning = (message, options = {}) => {
    return addNotification({
      type: 'warning',
      message,
      ...options
    })
  }

  return {
    notifications,
    success,
    error,
    info,
    warning,
    removeNotification
  }
} 