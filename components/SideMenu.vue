<template>
  <div class="sidemenu-wrapper">
    <div class="tool-box">
      <v-select
        :items="items"
        label="新しい順"
        solo
        class="select-sort"
      />
      <input type="text" placeholder="サイト内を検索">
    </div>
    <ul class="article-list">
      <li
        v-for="article in articles.contents"
        :key="article.id"
      >
        <v-card class="article" hover>
          <nuxt-link :to="`${article.id}`">
            <img
              :src="article.image.url"
              alt="記事のサムネイル"
              class="article-image img-obj-fit"
            >
          </nuxt-link>
          <h3 class="article-title">
            <nuxt-link :to="`${article.id}`">
              {{ article.title }}
            </nuxt-link>
          </h3>
          <p class="article-tag">
            <nuxt-link :to="`${article.id}`">
              #{{ article.tag }}
            </nuxt-link>
          </p>
          <p class="article-date">
            <nuxt-link :to="`${article.id}`">
              2021.1.1 - 2021.1.5
            </nuxt-link>
          </p>
        </v-card>
      </li>
    </ul>
    <div class="pagenation" />
  </div>
</template>

<script>
// <script lang="ts">
import axios from 'axios'

export default {
  data () {
    return {
      articles: {},
      items: ['投稿が新しい順', '投稿が古い順', '更新が新しい順']
    }
  },
  async created () {
    try {
      const res = await axios.get('https://jam-miniblog.microcms.io/api/v1/blog', {
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

}

</script>

<style lang="scss">

.article-list {
    display: flex;
    --gap: 40px;
    flex-wrap: wrap;
    margin: 0 0 calc(-1 * var(--gap)) 0;
    width: calc(100% + var(--gap));
      & > * {
      margin: 0 0 var(--gap) 0;
      }
  .article {
    display: grid;
    grid-template:
    "image ...... ..... ......" 20px
    "image ...... title ......"
    "image ...... ..... ......" 1fr
    "image ...... tag   ......"
    "image ...... ..... ......" 10px
    "image ...... date  ......"
    "image ...... ..... ......" 20px
    / 162px 20px  1fr   20px ;
     width: 500px;
     height: 162px;
    .article-image {
      grid-area: image;
      width: 162px;
      height: 162px;
    }
    .article-title {
      grid-area: title;
      font-size: 21px;
    }
    .article-tag {
      grid-area: tag;
      font-size: 16px;
    }
    .article-date {
      grid-area:date;
      font-size: 16px;
    }
  }
}

.pagenation {
  background: #fff;
}
</style>
