<template>
  <div class="wrapper">
    <div class="container">
      <button @click="createRoomLocal">
        <span class="mdi mdi-plus-circle"></span>Create Room
      </button>
      <p>or</p>
      <button class="button-outline" @click="$router.push('/joinroom')">
        <span class="mdi mdi-set-center"></span>Join Room
      </button>
    </div>
    <info />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Info from "../components/Info.vue";
export default {
  components: { Info },
  layout: "landing",
  computed: {
    ...mapState(["loggedIn"])
  },
  methods: {
    ...mapActions(["createRoom"]),
    createRoomLocal() {
      if (this.loggedIn)
        this.createRoom().then(roomId => this.$router.push(`/${roomId}`));
      else this.$router.push("/createroom");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/_variables.scss";

.wrapper {
  display: flex;
  align-items: center;
}

.container {
  padding: 0 3rem 0 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

p {
  color: rgba(#fff, 0.5);
  margin: 1.8rem 0;
  font-size: 1.3rem;
}
</style>
