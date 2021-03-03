<template>
  <v-app id="app">
    <v-form class="form">
      <v-select
        v-model="selected"
        :items="items"
        solo
        dense
        class="select-sort"
      />
      <div class="search-wrapper">
        <v-text-field
          v-model="inputData"
          label="サイト内を検索"
          placeholder="サイト内を検索"
          solo
          prepend-inner-icon="mdi-magnify"
          dense
          clearable
          class="search"
          @click:clear="onClearClicked()"
          @keypress.prevent.enter.exact="submitInputData"
        />
        <v-btn
          rounded
          class="search-button"
          @click.native="submitInputData"
        >
          検索
        </v-btn>
      </div>
    </v-form>
  </v-app>
</template>
<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator'

@Component
export default class MenuTools extends Vue {
  inputData = ''
  public items = ['投稿が新しい順', '投稿が古い順', '更新が新しい順'];
  public selected = '投稿が新しい順'

  submitInputData () {
    if (this.inputData === null) { this.inputData = '' }
    this.$emit('submitInputData', this.inputData)
  }

  onClearClicked () {
    this.inputData = ''
    this.$emit('submitInputData', this.inputData)
  }

  @Watch('selected', { immediate: true })
  submitSelectedItem (newValue:string) {
    this.$emit('submitOrder', newValue)
  }
}
</script>

<style lang="scss">
.form {
  display: grid;
  grid-template:
    "search ..... select"
    "...... ..... ....."
    "button ..... ....."
    /auto    20px  auto;
  height: 30px;
  background: #F5F5F5;
  .select-sort {
    grid-area: select;
    width: 200px;
  }
  .search {
    grid-area: search;
    width: 200px;

  }
  .search-button {
    grid-area: button;
    width: 60px;
    margin-top: -10px;
  }
}

@media(max-width: 1024px) {
  #app {
    width: 300px;
    margin: 0 auto;
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 300px;
    .v-input__slot {
      // vuetify class
      width: 200px;
    }
    .select-sort {
      width: 100px;
    }
    .search-wrapper {
      display: flex;
      align-items: center;
      width: 280px;
      .search {
        width: 100px;
      }
      .search-button {
        // Modify button position
        position: relative;
        bottom: 10px;
      }
    }
  }
}
</style>
