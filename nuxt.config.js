export default {
  // Global page headers
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

  // Global CSS
  css: [
    "~/assets/css/global.scss",
    "@mdi/font/css/materialdesignicons.min.css"
  ],

  env: {
    SERVER_URL: process.env.SERVER_URL || "http://localhost:5000"
  },

  // Plugins to run before rendering page
  plugins: [
    { src: "~/plugins/vue-plyr", mode: "client" },
    { src: "~/plugins/srt-webvtt", mode: "client" },
    { src: "~/plugins/socket-io", mode: "client" },
    { src: "~/plugins/ping", mode: "client" }
  ],

  components: true,

  modules: ["@nuxtjs/axios", "nuxt-clipboard"],

  axios: {
    // baseURL: "https://movie-night-cris.herokuapp.com/" // Used as fallback if no runtime config is provided
  },

  // Build Configuration
  build: {},
  server: {
    host: "0.0.0.0"
  },
  generate: {
    fallback: true
  }
};
