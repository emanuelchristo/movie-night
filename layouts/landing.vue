<template>
  <div class="page-container">
    <div class="background">
      <div class="background-image"></div>
      <div class="background-blur"></div>
      <div class="background-grid"></div>
    </div>
    <div class="top-nav">
      <nuxt-link to="/">
        <h1>
          <span class="mdi mdi-jellyfish"></span>
          <span style="font-weight: 300">Movie</span>Night
        </h1>
      </nuxt-link>
      <avatar />
    </div>

    <div class="modal-card">
      <Nuxt />
    </div>

    <footer>
      Made with ❤️ by
      <a href="https://www.instagram.com/emanuel.christo/" target="_blank"
        >Cris</a
      >
    </footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Avatar from "../components/Avatar.vue";
export default {
  components: { Avatar },
  methods: {
    ...mapActions(["login"])
  },
  created() {
    this.login();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/_variables.scss";

.page-container {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
}

.modal-card {
  width: 340px;
  height: fit-content;
  min-height: 500px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1rem 3rem 1rem;
  margin: 0 auto;
  border-radius: 1.5rem;
  background-color: rgba(2, 1, 5, 0.2);
  border: 2px solid rgba(#fff, 0.1);
  backdrop-filter: blur(40px);
  box-shadow: 0 3rem 4rem rgba(#000, 0.4);
}

footer {
  width: 100%;
  height: 65px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  color: rgba(#fff, 0.7);
  a {
    margin-left: 0.3rem;
    color: #fff;
    text-decoration: none;
  }
  a:hover {
    border-bottom: 1px dotted #fff;
  }
  a:active {
    border: none;
  }
}

.top-nav {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

h1 {
  color: #fff;
  font-size: 1.7rem;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgb(9, 12, 53);
  background-image: url("~/assets/images/background.jpg");
  background-size: cover;
}

.background-blur {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(26, 26, 36, 0.6);
  backdrop-filter: blur(60px);
}

.background-grid {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      $grid-line-color 25%,
      $grid-line-color 26%,
      transparent 27%,
      transparent 74%,
      $grid-line-color 75%,
      $grid-line-color 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      $grid-line-color 25%,
      $grid-line-color 26%,
      transparent 27%,
      transparent 74%,
      $grid-line-color 75%,
      $grid-line-color 76%,
      transparent 77%,
      transparent
    );
  background-size: 68px 68px;
}
</style>
