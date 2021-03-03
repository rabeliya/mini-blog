<template>
  <div class="sidemenu-wrapper">
    <MenuTools
      class="tool-box"
      @submitOrder="onReceiveSelected"
      @submitInputData="onReceiveInput"
    />
    <Articles
      class="article-list"
      :articles="articles"
      @emitTagName="onReceiveTagName"
    />
    <v-pagination
      v-if="articles.totalCount > 0"
      v-model="page"
      :length="indexNum"
      :total-visible="7"
      class="pagination"
      :disabled="! isActive"
      @next="controllActive()"
      @previous="controllActive()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import axios from 'axios'
import MenuTools from '~/components/SideMenuItems/MenuTools.vue'
import Articles from '~/components/SideMenuItems/Articles.vue'

type Select = '投稿が新しい順' | '投稿が古い順' | '更新が新しい順'

@Component({
  components: {
    MenuTools,
    Articles
  }
})

export default class SideMenu extends Vue {
  articles: any | {} = {}

  order = '-publishedAt'
  getItems = 'title,image.url,updatedAt,publishedAt,tag.name,id'
  limit = 6
  offset = 0
  page = 1
  length = null
  isActive = true

  @Prop({ type: String, required: false, default: '' })
  searchName: string | undefined;

  created () {
    this.getApi()
  }

  async getApi () {
    try {
      const res = await axios.get(`${process.env.MICROCMS_API_URL}?fields=${this.getItems}&limit=${this.limit}&offset=${this.offset}&orders=${this.order}&q=${this.searchName}`, {
        headers: {
          'X-API-KEY': process.env.API_KEY
          // 'X-API-KEY': this.$nuxt.context.$config.apiKey
        }
      })
      if (res !== undefined) {
        this.articles = res.data
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  onReceiveSelected (newValue: Select) {
    if (newValue === '投稿が新しい順') { this.order = '-publishedAt'; this.page = 1 }
    if (newValue === '投稿が古い順') { this.order = 'publishedAt'; this.page = 1 }
    if (newValue === '更新が新しい順') { this.order = '-updatedAt'; this.page = 1 }
  }

  onReceiveInput (newValue: string | number) {
    this.page = 1
    this.$emit('emitSearchName', `${newValue}`)
  }

  onReceiveTagName (value :string) {
    this.$emit('emitSearchName', `${value}`)
    this.page = 1
  }

  changeActive () {
    this.isActive = !this.isActive
  }

  controllActive () {
    this.changeActive()
    setTimeout(this.changeActive, 300)
  }

  get indexNum () {
    return Math.ceil(this.articles.totalCount / this.limit)
  }

  @Watch('order' || 'getItems' || 'limit' || 'offset', { immediate: false })
  updatePage () {
    this.getApi()
  }

  @Watch('page', { immediate: false })
  updateOffset () {
    this.offset = (this.page - 1) * this.limit
    this.getApi()
  }

  @Watch('searchName', { immediate: false })
  updateSeach () {
    this.getApi()
  }
}

</script>

<style lang="scss">

.sidemenu-wrapper {
  display: grid;
  grid-template:
    "..... ..... ....." 60px
    "..... tool ....."
    "..... ..... ....." 100px
    "..... list ....."
    "..... ..... ....." 30px
    "..... page ....."
    "..... ..... ....."
    /1fr   auto  1fr;
    min-height: 100vh;
    background: $side-menu-color;
  .tool-box {
    grid-area: tool;
  }
  .article-list {
    grid-area: list;
  }
  .pagination {
    grid-area: page;
    padding-bottom: 100px;
    background: $side-menu-color;
  }
}

@media(max-width: 1024px) {
  .sidemenu-wrapper {
    // Delete white space
    min-height: 110vh;
    .article-list {
      display: flex;
      justify-content: center;
    }
    .pagination {
      padding-bottom: 50px;
      // modify v-pagination position
      margin-top: -30px;
    }
  }
}

</style>
