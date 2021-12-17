import { shallowMount } from '@vue/test-utils'
import QListItem from '@/components/QListItem.vue'

describe('QListItem.vue', () => {
  it('renders props.msg when passed', () => {
    const id = '0'
    const text = 'remove list item'
    const callbackRemove = function () {}
    const callbackChange = function () {}
    const callbackJumpUp = function () {}
    const callbackJumpDown = function () {}
    const wrapper = shallowMount(QListItem, {
      propsData: { id, text, callbackRemove, callbackChange, callbackJumpUp, callbackJumpDown }
    })
    expect(wrapper.text()).toMatch(text)
  })
})
