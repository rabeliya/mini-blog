import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import LayoutDefault from '~/layouts/default.vue'
import SideMenu from '~/components/SideMenu.vue'

Vue.use(Vuetify)
const localVue = createLocalVue()
jest.mock('axios')

describe('components/SideMenu.vue', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const mountFunction = (options) => {
    return mount(LayoutDefault, {
      localVue,
      vuetify,
      stubs: [
        'NuxtLink',
        'Nuxt'
      ],
      ...options
    })
  }
  it('inputに検索名を入れて検索を押すとSidemenuで入力値を受け取れているか', async () => {
    const wrapper = mountFunction({})
    const inputForm = wrapper.find('.v-text-field__slot > input')
    const expectedValue = 'foo'
    const searchButton = wrapper.find('.search-button')
    await inputForm.setValue(expectedValue)
    await searchButton.trigger('click')
    expect(wrapper.vm.searchName).toBe(expectedValue)
  })

  it('inputに何も入れずに検索を押すとLayoutsで""を受け取れているか', async () => {
    const wrapper = mountFunction({})
    const searchButton = wrapper.find('.search-button')
    await searchButton.trigger('click')
    expect(wrapper.vm.searchName).toBe('')
  })
  // enterのテストはなし
})
describe('SideMenu', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const mountFunction = (options) => {
    return mount(SideMenu, {
      localVue,
      ...options,
      vuetify
    })
  }
  it('MenuToolsでselectedを変更するとSidemenuのorderが変わるか', async () => {
    const wrapper = mountFunction({})
    const selectedOrder = '投稿が新しい順'
    await wrapper.vm.onReceiveSelected(selectedOrder)
    expect(wrapper.vm.order).toBe('-publishedAt')
  })

  it('inputに値をいれて×を押すと検索名も変更されるか', async () => {
    const wrapper = mountFunction({})
    const inputForm = wrapper.find('.v-text-field__slot > input')
    const unexpectedValue = 'foo'
    await inputForm.setValue(unexpectedValue)
    const clearButton = wrapper.find('.v-input__icon--clear > button')
    await clearButton.trigger('click')
    expect(wrapper.vm.searchName).toBe('')
  })
})
