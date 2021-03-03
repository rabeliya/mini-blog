import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
// import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import LayoutDefault from '~/layouts/default.vue'
import Articles from '~/components/SideMenuItems/Articles.vue'
import SideMenu from '~/components/SideMenu.vue'
import MenuTools from '~/components/SideMenuItems/MenuTools.vue'
Vue.use(Vuetify)
const localVue = createLocalVue()
jest.mock('axios')
// このmockに値を返してvm.setDataして欲しい
// もしかしたらaxiosが呼び出された時に値を代入すればよいのでは?

// Article
const articleContents =
  {
    id: 'first-post',
    image: { url: 'https://images.microcms-assets.io/protected/ap-northeast-1:70664876-278e-44f5-96de-9eb590966f4e/service/jam-miniblog/media/first-thumbnail%402x.jpg' },
    publishedAt: '2021-01-15T01:42:35.152Z',
    updatedAt: '2021-01-15T01:42:35.152Z',
    tag: ['初投稿'],
    title: '初めての投稿'
  }

describe('components/SideMenu.vue', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const mountFunction = (options) => {
    return shallowMount(SideMenu, {
      localVue,
      ...options
    })
  }
  it('値がselectされるとpageが1になるか', async () => {
    const wrapper = mountFunction({
      vuetify

    })
    const selectedOrder = '投稿が新しい順'
    await wrapper.vm.onReceiveSelected(selectedOrder)
    expect(wrapper.vm.page).toBe(1)
  })
  it('selectされた値によって値が新しい順になるか', async () => {
    const wrapper = mountFunction({
      vuetify

    })
    const selectedOrder = '投稿が新しい順'
    await wrapper.vm.onReceiveSelected(selectedOrder)
    expect(wrapper.vm.order).toBe('-publishedAt')
  })

  it('selectされた値によって値が古い順になるか', async () => {
    const wrapper = mountFunction({
      vuetify

    })
    const selectedOrder = '投稿が古い順'
    await wrapper.vm.onReceiveSelected(selectedOrder)
    expect(wrapper.vm.order).toBe('publishedAt')
  })

  it('selectされた値によって値が新しい更新順になるか', async () => {
    const wrapper = mountFunction({
      vuetify

    })
    const selectedOrder = '更新が新しい順'
    await wrapper.vm.onReceiveSelected(selectedOrder)
    expect(wrapper.vm.order).toBe('-updatedAt')
  })
  it('tagの名前をemitで渡した時にpage=1になっているか', async () => {
    const wrapper = mountFunction({

    })
    await wrapper.vm.onReceiveTagName('foo')
    expect(wrapper.vm.page).toBe(1)
  })

  it('tagの名前をemitで渡せているか', async () => {
    const wrapper = mountFunction({

    })
    await wrapper.vm.onReceiveTagName('foo')
    expect(wrapper.emitted('emitSearchName')).toEqual([['foo']])
  })

  it('paginationのボタンを押すとisActive=falseになるか', async () => {
    const wrapper = mountFunction({

    })
    await wrapper.vm.controllActive()
    expect(wrapper.vm.isActive).toBe(false)
  })
  it('paginationのボタンを押して0.4間後にisActive=trueに戻るか', async (done) => {
    const wrapper = mountFunction({

    })
    await wrapper.vm.controllActive()
    setTimeout(() => {
      expect(wrapper.vm.isActive).toBe(true)
      done()
    }, 400)
  })

  it('index番号が正しく出力されているか', async () => {
    const wrapper = mountFunction({

    })
    await wrapper.setData({
      articles: {
        // 全部で10記事ストックされている
        totalCount: 10
      },
      // 4件ずつ表示する
      limit: 4
    })
    // 最低3ページあると表示できる
    expect((wrapper.vm).indexNum).toEqual(3)
  })

  it('pageが変わった時にoffsetもかわるか', async () => {
    const wrapper = mountFunction({

    })
    await wrapper.setData({
      page: 2,
      limit: 4
    })
    // offsetは取得し始める要素の順番
    // limitは取得要素数
    // offset = (page - 1) * limit
    expect(wrapper.vm.offset).toBe(4)
  })
})

describe('components/SideMenuItems/MenuTools.vue', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const mountFunction = (options) => {
    return shallowMount(MenuTools, {
      localVue,
      ...options
    })
  }

  it('inputDataがnullの時に""に変換されるか', async () => {
    const wrapper = mountFunction({
      vuetify
    })
    await wrapper.setData({
      inputData: null
    })
    const searchButton = wrapper.find('.search-button')
    await searchButton.trigger('click')
    expect(wrapper.vm.inputData).toBe('')
  })

  it('inputDataがnullの時に""がemitで渡されるか', async () => {
    const wrapper = mountFunction({ vuetify })
    await wrapper.setData({
      inputData: null
    })
    const searchButton = wrapper.find('.search-button')
    await searchButton.trigger('click')
    expect(wrapper.emitted('submitInputData')).toEqual([['']])
  })

  it('inputに値を入力してenterを押すとemitで値が渡されるか', async () => {
    // componentをスタブしないためにmountを使用する
    const wrapper = mount(MenuTools, {
      localVue,
      vuetify
    })
    const inputForm = wrapper.find('.v-text-field__slot > input')
    const expectedWord = 'foo'
    await inputForm.setValue(expectedWord)
    // await inputForm.trigger('keydown.enter')
    // enterの代わりに直接submitInputDataを呼び出す
    wrapper.vm.submitInputData()
    expect(wrapper.emitted('submitInputData')).toEqual([[expectedWord]])
  })

  it('inputに値を入力して検索をクリックするとemitで値が渡されるか', async () => {
    // componentをスタブしないためにmountを使用する
    const wrapper = mount(MenuTools, {
      localVue,
      vuetify
    })
    const expectedWord = 'foo'
    const inputForm = wrapper.find('.v-text-field__slot > input')
    const searchButton = wrapper.find('.search-button')
    await inputForm.setValue(expectedWord)
    await searchButton.trigger('click')
    expect(wrapper.emitted('submitInputData')).toEqual([[expectedWord]])
  })

  it('Xを押すとinputしたデータが消えるか', async () => {
    const wrapper = mount(MenuTools, {
      localVue,
      vuetify
    })
    const expectedWord = 'foo'
    const inputForm = wrapper.find('.v-text-field__slot > input')
    await inputForm.setValue(expectedWord)
    // setValueした後でもXボタンの出現を検出できないので処理を直接実行
    wrapper.vm.onClearClicked()
    expect(wrapper.vm.inputData).toBe('')
  })
  it('watchがはじめ実行されているか', () => {
    const wrapper = mountFunction({ vuetify })
    const firstOreder = '投稿が新しい順'
    expect(wrapper.emitted('submitOrder')).toEqual([[firstOreder]])
  })

  it('selectedの変更でwatchが機能するか', async () => {
    const wrapper = mountFunction({ vuetify })
    const firstOreder = '投稿が新しい順'
    const secondOrder = '更新が新しい順'
    await wrapper.setData({
      selected: '更新が新しい順'
    })
    expect(wrapper.emitted('submitOrder')).toEqual([[firstOreder], [secondOrder]])
  })
  // v-selectについてのテストはvuetify側に委ねる
})

describe('components/SideMenuItems/Articles.vue', () => {
  const wrapper = shallowMount(Articles, {
    localVue,
    stubs: [
      'NuxtLink'
    ],
    propsData: {
      articles: {
        contents: [
          articleContents
        ],
        limit: 1,
        offset: 1,
        totalCount: 1
      }
    }
  })

  it('タグを押したときにタグ名がemitで値が渡されるか', async () => {
    const tag = wrapper.find('.article-tag')
    await tag.trigger('click')

    expect(wrapper.emitted('emitTagName')[0][0]).toBe('初投稿')
  })
})

describe('Layouts', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const wrapper = shallowMount(LayoutDefault, {
    localVue,
    vuetify,
    // NuxtをstubしないとUnknown custom elementになる
    stubs: ['Nuxt']
  })
  it('検索名を受け取れるか', async () => {
    await wrapper.setData({
      searchName: ''
    })
    wrapper.vm.onReceiveSearchName('foo')
    expect(wrapper.vm.searchName).toBe('foo')
  })
})
