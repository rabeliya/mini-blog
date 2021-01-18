<template>
  <div class="wrapper">
    <TheHeader />
    <main class="main">
      <Nuxt />
      <SideMenu />
    </main>
  </div>
</template>

<script>

import TheHeader from '~/components/TheHeader.vue'
import SideMenu from '~/components/SideMenu.vue'

export default {
  components: {
    TheHeader,
    SideMenu
  }
}
</script>

<style lang="scss" scoped>
</style>
