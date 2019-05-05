import { mount } from '@vue/test-utils'
import VnSelectable from './selectable'

describe('VnSelectable', () => {
  it('renders only slot', () => {
    const testComp = {
      template: `<vn-selectable><p>test</p></vn-selectable>`,
      components: { VnSelectable }
    }
    const wrapper = mount(testComp)
    expect(wrapper.html()).toBe('<p>test</p>')
  })

  it('provides items in slot scope', () => {
    const testComp = {
      template: `
        <vn-selectable :items="items">
          <div slot-scope="{ items }">
            <p v-for="item in items" :key="item.key"></p>
          </div>
        </vn-selectable>
      `,
      data() {
        return {
          items: [ 'foo', 'bar' ]
        }
      },
      components: { VnSelectable }
    }
    const wrapper = mount(testComp)
    const items = wrapper.findAll('p')
    expect(items.length).toBe(2)
  })

  it('selects an item', () => {
    const testComp = {
      template: `
        <vn-selectable :items="items" v-model="value">
          <div slot-scope="{ items, select }">
            <p v-for="item in items" @click="select(item)" :key="item.key">
              {{ item.value }}
            </p>
          </div>
        </vn-selectable>
      `,
      data() {
        return {
          items: [ 'foo', 'bar' ],
          value: 'foo'
        }
      },
      components: { VnSelectable }
    }
    const wrapper = mount(testComp)
    const secondItem = wrapper.findAll('p').at(1)
    secondItem.trigger('click')
    expect(wrapper.vm.$data.value).toBe('bar')
  })
});
