<template>
  <div class="wrapper">
    <TheHeader />
    <main class="main">
      <Nuxt
        class="main-contents"
      />
      <SideMenu
        class="side-menu"
        :search-name="searchName"
        @emitSearchName="onReceiveSearchName"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TheHeader from '~/components/TheHeader.vue'
import SideMenu from '~/components/SideMenu.vue'

@Component({
  components: {
    TheHeader,
    SideMenu
  }
})
export default class LayoutDefault extends Vue {
  searchName = ''

  onReceiveSearchName (value :string) {
    this.searchName = value
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template:
  "side  main"
  /500px 1fr;
  .main-contents {
    grid-area: main;
    height: calc(100vh - 60px);
  }
  .side-menu {
    grid-area: side;
    overflow-y: scroll;
    height: 100vh;
  }
}

@media(max-width: 1024px) {
  .main {
    display: grid;
    grid-template:
    ".....  .....  .....  " 100px
    ".....  main   .....  "
    ".....  .....  .....  " 100px
    ".....  side   .....  "
    / 0     auto   0;
    .main-contents {
      overflow-y: visible;
      height: 100%;
    }
    .side-menu {
      overflow-y: visible;
    }
  }
}
</style>
