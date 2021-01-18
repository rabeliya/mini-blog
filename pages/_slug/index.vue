<template>
  <main class="main">
    <h1 class="title">
      {{ title }}
    </h1>
    <p class="publishedAt">
      {{ publishedAt }}
    </p>
    // eslint-disable-next-line vue/no-v-html
    <div class="post" v-html="body" />
  </main>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(
      `https://jam-miniblog.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers: { 'X-API-KEY': process.env.API_KEY }
      }
    )
    return data
  }
}
</script>
