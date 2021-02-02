import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
require('dotenv').config()
const { API_KEY } = process.env

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - jamstack-miniblog',
    title: 'jamstack-miniblog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  privateRuntimeConfig: {
    apiKey: API_KEY
    // apiKey: process.env.API_KEY
  },
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined
  },
  generate: {
    async routes () {
      const pages = await axios.get('https://jam-miniblog.microcms.io/api/v1/blog?limit=100', {
        headers: { 'X-API-KEY': process.env.API_KEY }
      })
        .then(res =>
          res.data.contents.map(content => ({
            route: `/${content.id}`,
            payload: content
          }))
        )
      return pages
    }
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'normalize.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { systemvars: true }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/dayjs'
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // Optional (https://github.com/nuxt-community/dayjs-module)
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
    defaultTimeZone: 'Asia/Tokyo',
    plugins: [
      'utc',
      'timezone'
    ]
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        autoprefixer: { grid: 'autoplace' }
      }
    }
  }
}
