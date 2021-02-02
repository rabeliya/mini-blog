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
        @click="submitInputData"
      >
        検索
      </v-btn>
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
    "...... select ...... search ...... button ....."
  /  1fr    200px  20px   190px  20px   64px   1fr;
  height: 30px;
  width: 500px;
  background: #F5F5F5;
  .select-sort {
    grid-area: select;
    width: 195px;
  }
  .search {
    grid-area: search;
  }
  .search-button {
    grid-area: button;
  }
}
</style>
