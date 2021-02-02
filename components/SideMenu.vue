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
      :length="IndexNum"
      :total-visible="7"
      class="pagination"
      :disabled="isActive"
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

interface Content {
  id: string;
  image: { url:string };
  publishedAt: string;
  tag: {name: string};
  title: string;
  updatedAt: string;
}

  interface Article {
    contents: [{
      id: string;
      image: { url:string };
      publishedAt: string;
      tag: { name: string };
      title: string;
      updatedAt: string;
    }];
    limit: number;
    offset: number;
    totalCount: number;
  }

Component.registerHooks(['fetchOnServer'])

@Component({
  components: {
    MenuTools,
    Articles
  }
})
// SideMenu
export default class SideMenu extends Vue {
  articles: any | {} = {}
  // articles: {
  //   contents: {
  //     id: string;
  //     image: {url: string};
  //     publishedAt: string;
  //     tag: {name: string};
  //     title: string;
  //     updatedAt: string;
  //   }[];
  //   limit: number;
  //   offset: number;
  //   totalCount: number;
  //   } | {} = {}

  order = '-publishedAt'
  getItems = 'title,image.url,updatedAt,publishedAt,tag.name,id'
  limit = 3
  offset = 0
  page = 1
  length = null
  isActive = false
  // nuxt fetch options

  @Prop({ type: String, required: true, default: '' })
  searchName: string | undefined;

  async fetch () {
    try {
      const res = await axios.get(`https://jam-miniblog.microcms.io/api/v1/blog?fields=${this.getItems}&limit=${this.limit}&offset=${this.offset}&orders=${this.order}&q=${this.searchName}`, {
        headers: {
          'X-API-KEY': process.env.API_KEY
        }
      })
      this.articles = res.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  async getApi () {
    try {
      const res = await axios.get(`https://jam-miniblog.microcms.io/api/v1/blog?fields=${this.getItems}&limit=${this.limit}&offset=${this.offset}&orders=${this.order}&q=${this.searchName}`, {
        headers: {
          'X-API-KEY': process.env.API_KEY
        }
      })
      this.articles = res.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  // fetchOnServer () { return false };

  // getApiData () {
  //   const promise = new Promise((resolve)=> {
  //     const res = axios.get(`https://jam-miniblog.microcms.io/api/v1/blog?fields=${this.getItems}&limit=${this.limit}&offset=${this.offset}&orders=${this.order}&q=${this.searchName}`, {
  //       headers: {
  //         'X-API-KEY': process.env.API_KEY
  //       }
  //     })
  //     resolve(res)
  //   })

  //   promise.then((value: AxiosResponse<any>) => {
  //     console.log(value)
  //     this.articles = value.data
  //   })
  // }

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

  get IndexNum () {
    return Math.ceil(this.articles.totalCount / this.limit)
  }

  @Watch('order' || 'getItems' || 'limit' || 'offset', { immediate: false })
  updatePage () {
    this.$fetch()
  }

  @Watch('page', { immediate: false })
  updateOffset () {
    this.offset = (this.page - 1) * this.limit
    this.$fetch()
  }

  @Watch('searchName', { immediate: false })
  updateSeach () {
    this.$fetch()
  }
}

</script>

<style lang="scss">

.sidemenu-wrapper {
  display: grid;
  grid-template:
    "..... ..... ....." 60px
    "..... tool ....."  50px
    "..... ..... ....." 40px
    "..... list ....." 420px
    "..... ..... ....." 30px
    "..... page ....."
    "..... ..... ....." 30px
    / 1fr  500px  1fr;
  .tool-box {
    grid-area: tool;
  }
  .article-list {
    grid-area: list;
    width: 500px;
  }
  .pagination {
    grid-area: page;
  }
}

.sidemenu-wrapper {
  background: $side-menu-color;
}

</style>
