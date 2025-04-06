import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('bg-indigo-600')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('renders with secondary variant', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'secondary'
      },
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.classes()).toContain('bg-white')
    expect(wrapper.classes()).toContain('text-gray-700')
  })

  it('renders with danger variant', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'danger'
      },
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.classes()).toContain('bg-red-600')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('renders with outline variant', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'outline'
      },
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('border-gray-300')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('is disabled when loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('opacity-25')
  })
}) 