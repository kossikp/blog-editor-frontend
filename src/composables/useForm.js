import { ref } from 'vue'

export function useForm(initialValues = {}) {
  const values = ref({ ...initialValues })
  const errors = ref({})
  const isSubmitting = ref(false)

  const setFieldValue = (field, value) => {
    values.value[field] = value
  }

  const setFieldError = (field, error) => {
    errors.value[field] = error
  }

  const clearErrors = () => {
    errors.value = {}
  }

  const resetForm = () => {
    values.value = { ...initialValues }
    clearErrors()
  }

  const validateField = (field, rules) => {
    const value = values.value[field]
    let error = ''

    for (const rule of rules) {
      if (rule.required && !value) {
        error = `${field} is required`
        break
      }

      if (rule.minLength && value.length < rule.minLength) {
        error = `${field} must be at least ${rule.minLength} characters`
        break
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        error = `${field} must not exceed ${rule.maxLength} characters`
        break
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        error = rule.message || `${field} is invalid`
        break
      }

      if (rule.validate && !rule.validate(value)) {
        error = rule.message || `${field} is invalid`
        break
      }
    }

    setFieldError(field, error)
    return !error
  }

  const validateForm = (rules) => {
    clearErrors()
    let isValid = true

    for (const [field, fieldRules] of Object.entries(rules)) {
      if (!validateField(field, fieldRules)) {
        isValid = false
      }
    }

    return isValid
  }

  return {
    values,
    errors,
    isSubmitting,
    setFieldValue,
    setFieldError,
    clearErrors,
    resetForm,
    validateField,
    validateForm
  }
} 