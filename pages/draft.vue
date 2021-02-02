<template>
  <div class="main-wrapper">
    <!-- <div class="date">
      <p class="published-date">
        <v-icon>
          mdi-calendar-blank
        </v-icon>
        {{ $dayjs(data.publishedAt).format('YYYY/MM/DD') }}
      </p>
      <p v-if="data.revisedAt !== data.publishedAt" class="revised-date">
        <v-icon>
          mdi-update
        </v-icon>
        {{ $dayjs(data.updatedAt).format('YYYY/MM/DD') }}
      </p>
    </div>
    <h1 class="title">
      {{ data.title }}
    </h1>
    <img
      :src="data.image.url"
      alt="記事トップの画像"
      class="top-image"
      max-height="436"
    >
    eslint-disable-next-line vue/no-v-html
    <div class="post" v-html="data.body" /> -->
  </div>
</template>

<script>
// import axios from 'axios'

// export default {
//   data () {
//     return {
//       data: {}
//     }
//   },
//   async created () {
//     const query = this.$route.query
//     if (query.id === undefined || query.draftKey === undefined) {
//       return
//     }
//     const { data } = await axios.get(
//       `https://your-service-id.microcms.io/api/v1/blog/${query.id}?draftKey=${query.draftKey}`,
//       {
//         headers: { 'X-API-KEY': 'this.$config.apiKey' }
//       }
//     )
//     this.data = data
//   }
// }
</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";
</style>
