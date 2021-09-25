export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Movie Night",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/global.scss",
    "@mdi/font/css/materialdesignicons.min.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-plyr", mode: "client" },
    { src: "~/plugins/js-cookie", mode: "client" },
    { src: "~/plugins/srt-webvtt", mode: "client" },
    { src: "~/plugins/socket-io", mode: "client" },
    { src: "~/plugins/ping", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "nuxt-clipboard"],

  axios: {
    baseURL: "https://movie-night-cris.herokuapp.com/" // Used as fallback if no runtime config is provided
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    host: "0.0.0.0"
  },
  generate: {
    fallback: true
  }
};
