<template>
  <div class="main-wrapper">
    <div class="date">
      <p class="published-date">
        <v-icon>
          mdi-calendar-blank
        </v-icon>
        2021.1.28
      </p>
    </div>
    <h1 class="title">
      ようこそ、ミニブログへ。
    </h1>
    <img
      src="~/assets/images/home-img@2x.jpg"
      alt="ホームの画像"
      class="top-image"
      max-height="436"
    >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="post">
      <p>しがない私がささいなことを呟きました。</p>
      <p>よろしければ見ていってください。</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
}

</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";
</style>
