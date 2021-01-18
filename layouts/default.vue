<template>
  <div class="wrapper">
    <TheHeader />
    <main class="main">
      <Nuxt class="main-contents" />
      <SideMenu class="side-menu" />
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
.main {
  display: grid;
  grid-template:
  ".....  main   .....  side   ....." 1fr
  / 1fr   800px  1fr    600px  0px;
  .main-contents {
    grid-area: main;
  }
  .side-menu {
    grid-area: side;
  }
}
</style>
