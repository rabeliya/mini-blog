<template>
  <div class="main-wrapper">
    <div class="date">
      <p class="published-date">
        <v-icon>
          mdi-calendar-blank
        </v-icon>
        {{ $dayjs(publishedAt).format('YYYY.MM.DD') }}
      </p>
      <p v-if="updatedAt !== publishedAt" class="revised-date">
        <v-icon>
          mdi-update
        </v-icon>
        {{ $dayjs(updatedAt).format('YYYY.MM.DD') }}
      </p>
    </div>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import { Context } from '@nuxt/types'

@Component
export default class DetailPage extends Vue {
  posts = [];
  async asyncData ({ params }: Context) {
    const { data } = await axios.get(
      `https://jam-miniblog.microcms.io/api/v1/blog/${params.slug}?fields=title,image.url,updatedAt,publishedAt,tag.name,id,body`,
      {
        headers: { 'X-API-KEY': process.env.API_KEY }
      }
    )
    return data
  }
}

</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";
</style>
