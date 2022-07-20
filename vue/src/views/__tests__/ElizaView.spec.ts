import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ElizaView from '../ElizaView.vue'

describe('ElizaView', () => {
    it('renders properly', () => {
        const wrapper = mount(ElizaView)
        expect(wrapper.text()).toContain('What is your name?')
    })
})
