<template>
  <div class="sidemenu-wrapper">
    <!-- <ul>
      <li v-for="content in contents" :key="content.id">
        <nuxt-link :to="`${content.id}`">
          {{ content.title }}
        </nuxt-link>
      </li>
    </ul> -->
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  // async asyncData () {
  //   const { data } = await axios.get(
  //     // your-service-id部分は自分のサービスidに置き換えてください
  //     'https://jam-miniblog.microcms.io/api/v1/blog',
  //     {
  //       // your-api-key部分は自分のapi-keyに置き換えてください
  //       headers: { 'X-API-KEY': process.env.API_KEY }
  //     }
  //   )
  //   return data
  // }
}

</script>

<style lang="scss">
</style>
