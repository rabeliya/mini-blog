<template>
  <v-app id="articles">
    <ul class="article-list">
      <li
        v-for="article in articles.contents"
        :key="article.id"
      >
        <v-card class="article" hover>
          <nuxt-link :to="`${article.id}`">
            <v-img
              :src="article.image.url"
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
            <p v-if="article.revisedAt !== article.publishedAt" class="revised-date">
              <v-icon small class="date-icon">
                mdi-update
              </v-icon>
              {{ $dayjs(article.updatedAt).format('YYYY.MM.DD') }}
            </p>
          </div>
        </v-card>
      </li>
      <li v-if="articles.contents && articles.contents.length < 1">
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

.article-list {
  background: $side-menu-color;
  .article {
    display: grid;
    grid-template:
    "image ...... ..... ......" 12px
    "image ...... title ......"
    "image ...... ..... ......" min(10px)
    "image ...... tag   ......"
    "image ...... ..... ......" 5px
    "image ...... date  ......"
    "image ...... ..... ......" 12px
    / 120px 20px  1fr   20px ;
     width: 500px;
     height: 120px;
     margin-bottom: 20px;
    .article-image {
      grid-area: image;
      width: 120px;
      height: 120px;
    }
    .article-title {
      grid-area: title;
      font-size: 16px;
    }
    .article-tag {
      grid-area: tag;
      font-size: 16px;
    }
    .article-date {
      grid-area: date;
      font-size: 14px;
      .date-icon {
        margin-right: 5px;
      }
    }
  }
}

.article-title:hover {
  opacity: 0.7;
}

.article-date {
  display: flex;
  align-items: center;
  .published-date {
    margin-right: 16px;
  }
  .published-date, .revised-date {
    display: flex;
    align-items: center;
    color: $sub-text-color;
    a {
      color: $sub-text-color;
    }
  }
}

@media(max-width:500px) {
  .article-list {
    .article {
      width: 100vw;
      grid-template:
      "image ...... ..... ...... ..... ......" 12px
      "image ...... title title  title ......"
      "image ...... ..... ...... ..... ......" min(10px)
      "image ...... date  ...... tag   ......" 22px
      "image ...... ..... ...... ..... ......" 12px
      / 80px 20px   90px  20px   auto   20px;
      .article-date {
        .revised-date {
          display: none;
        }
      }
    }
  }
}
</style>
