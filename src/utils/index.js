import { format } from 'date-fns'

export const formatDate = (date) => {
  return format(new Date(date), 'MMMM d, yyyy')
}

export const formatDateTime = (date) => {
  return format(new Date(date), 'MMMM d, yyyy h:mm a')
}

export const truncate = (text, length = 100) => {
  if (text.length <= length) {
    return text
  }
  return text.substring(0, length) + '...'
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export const throttle = (fn, delay) => {
  let lastCall = 0
  return (...args) => {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return fn(...args)
  }
} 