/* eslint-disable nuxt/no-cjs-in-config */
require('dotenv').config({
  path: require('find-config')('config.env'),
})
const appConfig = require('./app.config')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'raspect',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  globalName: 'raspect',

  publicRuntimeConfig: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },

  styleResources: {
    scss: ['~assets/styles/_variables.scss', '~assets/styles/_mixins.scss', '~assets/styles/_functions.scss'],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/svg',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'portal-vue/nuxt',
  ],

  moment: {
    timezone: true,
  },

  svg: {
    vueSvgLoader: {
      // vue-svg-loader options
    },
    svgSpriteLoader: {
      // svg-sprite-loader options
    },
    fileLoader: {
      // file-loader options
    },
  },

  module: {
    rules: [
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L382-L411
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 1000, // 1kB
              name: 'img/[name].[contenthash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 1000, // 1kB
              name: 'fonts/[name].[contenthash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(webm|mp4|ogv)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'videos/[name].[contenthash:7].[ext]',
            },
          },
        ],
      },
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['element-ui', /^gmap-vue($|\/)/],

    extend(config, { isDev, isClient, loaders }) {
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }

      loaders.scss.additionalData = `
        @use "sass:math";
      `
    },

    extractCSS: appConfig.isDev
      ? false
      : {
          ignoreOrder: true,
        },
  },
}
