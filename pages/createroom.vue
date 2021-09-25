<template>
  <div class="container">
    <span class="mdi mdi-plus-circle icon"></span>
    <h2><span style="font-weight: 300">Create</span>Room</h2>

    <!-- Creating room -->
    <!-- <div v-if="loggedIn">
      <form @submit="createRoom">
        <div class="inputs-wrapper">
          <div class="input-wrapper">
            <label>Room name*</label>
            <input
              type="text"
              placeholder="Room name*"
              ref="roomNameInput"
              required
            />
          </div>
          <div class="input-wrapper">
            <label>Image link</label>
            <input type="text" placeholder="Image link" ref="imageLinkInput" />
          </div>
        </div>
        <button>Create</button>
      </form>
    </div> -->
    <!-- New user -->
    <!-- <div v-else> -->
    <form @submit="loginLocal">
      <div class="inputs-wrapper" style="margin: 3rem 0">
        <div class="new-user-image" ref="newUserImage">
          <span class="mdi mdi-jellyfish"></span>
        </div>
        <div class="input-wrapper">
          <label>Nickname*</label>
          <input
            type="text"
            placeholder="Nickname*"
            ref="nickNameInput"
            v-model="newNickName"
            minlength="3"
            required
          />
        </div>
      </div>
      <button>Next</button>
    </form>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: "landing",
  data() {
    return {
      newNickName: null
    };
  },
  computed: {
    ...mapState(["loggedIn"])
  },
  methods: {
    ...mapActions(["login", "createRoom"]),

    loginLocal(e) {
      e.preventDefault();
      this.login(this.newNickName)
        .then(() =>
          this.createRoom().then(roomId => this.$router.push(`/${roomId}`))
        )
        .catch(err => console.error(err));
      this.newNickName = null;
    },

    // Validating nickname input and changing user image according to new nickname
    handleNickNameInput() {
      this.newNickName = this.newNickName.replace(/[^a-z0-9_]/gi, "");
      this.newNickName = this.newNickName.substring(0, 15);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/_variables.scss";

button {
  margin: 0 auto;
}

.new-user-image {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: rgba(#fff, 0.1);
  margin-bottom: 1rem;
  span {
    font-size: 2rem;
  }
}

.inputs-wrapper {
  margin: 2rem 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.25rem;
}

.container {
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
