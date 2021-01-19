<template>
  <main class="main">
    <p class="date">
      {{ publishedAt }}
    </p>
    <h1 class="title">
      {{ title }}
    </h1>
    <img
      :src="image.url"
      alt="記事トップの画像"
      class="top-image"
    >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="post" v-html="body" />
    <nuxt-link to="#" class="tag">
      #{{ tag }}
    </nuxt-link>
  </main>
</template>

<script lang="ts" scoped>
import axios from 'axios'
import Vue from 'vue'

export default Vue.extend({
  async asyncData (params :{} | {params}) {
    const { data } = await axios.get(
      `https://jam-miniblog.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers: { 'X-API-KEY': process.env.API_KEY }
      }
    )
    return data
  }
})
</script>

<style lang="scss" scoped>
  .main {
    display: grid;
    grid-template:
    "..... ..... ....." 80px
    "..... date ....."
    "..... ..... ....." 10px
    "..... title ....."
    "..... ..... ....." 30px
    "..... image ....."
    "..... ..... ....." 30px
    "..... body  ....."
    "..... ..... ....." 10px
    "..... tag  ....."
    "..... ..... ....." 80px
    / 40px 1fr   40px
    ;
    .date {
      grid-area: date;
    }
    .title {
      grid-area: title;
    }
    .top-image {
      grid-area: image;
    }
    .post {
      grid-area: body;
    }
    .tag {
      grid-area: tag;
    }
  }
</style>
