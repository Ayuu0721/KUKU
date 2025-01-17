import colors from 'vuetify/es5/util/colors'
require('dotenv').config()
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'KUKU',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=n',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Educational web application to visually memorize the times tables.',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: '@/assets/css/style.scss',
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/firebase.js', '@/plugins/vuelidate.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // '@nuxtjs/dotenv'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      mobileApp: true,
      mobileAppIOS: true,
    },
    manifest: {
      name: 'KUKU',
      lang: 'jp',
      short_name: 'KUKU',
      title: 'KUKU',
      'og:title': 'KUKU',
      description: 'KUKUを視覚的に覚えることができるwebアプリです。',
      'og:description': 'KUKUを視覚的に覚えることができるwebアプリです。',
      theme_color: '#fff',
      background_color: '#fff',
      display: 'standalone',
      icons: [
        {
          src: '/icon.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
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
          success: colors.green.accent3,
        },
        light: {
          primary: '#00bcd4',
          pLight: '#62efff',
          pDark: '#008ba3',
          secondary: '#ffc107',
          sLight: '#fff350',
          sDark: '#c79100',
          content: '#b2ebf2',
          cLight: '#e0f7fa',
          sentence: '#212121',
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
      options: { customProperties: true },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { hardSource: true },

  watchers: {
    webpack: {
      poll: true,
    },
  },

  env: {
    apiKey: process.env.apiKey || '',
    authDomain: process.env.authDomain || '',
    projectId: process.env.projectId || '',
    storageBucket: process.env.storageBucket || '',
    messagingSenderId: process.env.messagingSenderId || '',
    appId: process.env.appId || '',
    measurementId: process.env.measurementId || '',
  },

  dotenv: {
    path: process.cwd(),
  },

  workbox: {
    dev: false,
  },

  loading: '~/components/Loading.vue',
  loadingIndicator: {
    name: '~/static/loadingIndicator.html',
  },
}
