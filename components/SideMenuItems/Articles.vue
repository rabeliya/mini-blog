<template>
  <v-app id="articles">
    <ul class="article-wrapper">
      <li
        v-for="article in articles.contents"
        :key="article.id"
        class="article-list"
      >
        <v-card class="article" hover>
          <nuxt-link :to="`${article.id}`">
            <v-img
              :src="article.image.url"
              :aspect-ratio="16/9"
              alt="記事のサムネイル"
              class="article-image img-obj-fit"
            />
          </nuxt-link>
          <h3 class="article-title">
            <nuxt-link :to="`${article.id}`" class="title">
              {{ article.title }}
            </nuxt-link>
          </h3>
          <p
            class="article-tag"
            @click="emitTagName(article.tag[0])"
          >
            #{{ article.tag[0] }}
          </p>
          <div class="article-date">
            <p class="published-date">
              <v-icon small class="date-icon">
                mdi-calendar-blank
              </v-icon>
              {{ $dayjs(article.publishedAt).format('YYYY.MM.DD') }}
            </p>
          </div>
        </v-card>
      </li>
      <li v-if="articles.contents && articles.contents.length < 1" class="no-search-message">
        お探しの検索結果はみつかりませんでした
      </li>
    </ul>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Articles extends Vue {
  @Prop({ required: true })
    articles: any;

  emitTagName (newValue :string) {
    this.$emit('emitTagName', newValue)
  }
}
</script>

<style lang="scss">

$ariticle_ratio: 45%;
$ariticle_padding_w: 10px;

.article-wrapper {
  background: $side-menu-color;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 5px;
  width: 445.5px;
  margin: 0 auto;
  .article-list {
      display: flex;
      width: $ariticle_ratio;
      margin-bottom: 15px;
    .article {
      display: grid;
      grid-template:
      " image "
      " ..... " 10px
      " title "
      " ..... " minmax(10px, 1fr)
      " tag   "
      " ..... " 10px
      " date  "
      / 100%;
      padding: $ariticle_padding_w;
      .article-image {
        grid-area: image;
      }
      .article-title {
        grid-area: title;
        font-size: 15px;
        font-weight: bold;
        // title width = card width
        width: 178.22px;
        &:hover {
          opacity: 0.7;
        }
      }
      .article-tag {
        grid-area: tag;
        font-size: 14px;
      }
      .article-date {
        grid-area: date;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .published-date {
          display: flex;
          align-items: center;
          color: $sub-text-color;
        }
        .date-icon {
          margin-right: 5px;
        }
      }
    }
  }
  .no-search-message {
    margin: 0 auto;
  }
}

@media(max-width: 1024px) {
  .article-wrapper {
    justify-content: flex-start;
    padding: 0;
    width: 690px;
    margin-right: -30px;
    .article-list {
      width: 200px;
      margin-right: 30px;
    }
  }
}
@media(max-width: 690px) {
  .article-wrapper {
    justify-content: space-between;
    width: 100%;
    margin: 0;
    .article-list {
      width: 50%;
      padding: 0 10px;
      margin: 0 0 20px;
      .article {
        .article-title {
          // title width = card width
          width: 40vw;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
