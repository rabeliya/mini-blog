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
      お問い合わせ
    </h1>
    <img
      src="~/assets/images/contact-img@2x.jpg"
      alt="電話の画像"
      class="top-image"
      width="700"
    >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="post">
      <p>Twitter: @sample</p>
      <p>メールアドレス: sample@gmail.com</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HomePage extends Vue {
}

</script>

<style lang="scss" scoped>
@import "~/assets/scss/style.scss";
</style>
