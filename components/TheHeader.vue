<template>
  <header class="header shadow">
    <ul class="header-menu">
      <li>
        <nuxt-link to="/">
          ホーム
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/contact">
          お問い合わせ
        </nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TheHeader extends Vue {
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: $header-h;
  padding: 0 50px;
  background: #93DEFA;
  .header-menu {
    display: flex;
    justify-content: space-between;
    width: 210px;
    font-size: 20px;
  }
}
</style>
