//const pkg = require('./package');
const bodyParser = require('body-parser');
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-first-nuxt-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Play&display=swap' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  //loading bar
  loading: {
    color: '#3B8070'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/core-components.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['@nuxtjs/firebase',
     {
    config: {
      apiKey: 'AIzaSyDxUBwqE7iz4yGNAlEznCRryLxj6cjsqro',
      authDomain: "nuxt-app-b21f5.firebaseapp.com",
      databaseURL: "https://nuxt-app-b21f5-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "nuxt-app-b21f5",
      storageBucket: "nuxt-app-b21f5.appspot.com",
      messagingSenderId: "225158855721",
      appId: "1:225158855721:web:031b4be3069db4e6bc3038"
    },
    services: {
      auth: true, 
      firestore: true,
      database: true,
    },
    auth: {
      initialize: {
      onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      onAuthStateChangedAction: 'onAuthStateChangedAction',
      subscribeManually: false
      },
      ssr: false, 
      emulatorPort: 9099,
      emulatorHost: 'http://localhost',
    }
  }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL || 'https://nuxt-app-b21f5-default-rtdb.europe-west1.firebasedatabase.app',
    credential:false
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-app-b21f5-default-rtdb.europe-west1.firebasedatabase.app',
    fbAPI_KEY: 'AIzaSyDxUBwqE7iz4yGNAlEznCRryLxj6cjsqro'
  },

  serverMiddleware: [
    bodyParser.json(),
    "~/api"
  ]
  // router:{
  //   middleware:'log',
  // }
}
