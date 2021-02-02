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
  "main  side" calc(100vh - 60px)
  /1fr   550px;
  // grid-template:
  // ".....  main   .....  side   ....." calc(100vh - 60px)
  // / 1fr   800px  1fr    600px  0px;
  .main-contents {
    grid-area: main;
    overflow-y: scroll;
    height: (calc(100vh - 60px));
  }
  .side-menu {
    grid-area: side;
  }
}

@media(max-width: 1350px) {
  .main {
    display: grid;
    grid-template:
    ".....  main   .....  " 100vh
    ".....  .....  .....  " 100px
    ".....  side   .....  "
    / 0     auto   0;
    .main-contents {
      overflow-y: visible;
      height: 100%;
    }
  }
}
</style>
