<template>
  <div class="container">
    <span class="mdi mdi-set-center icon"></span>
    <h2><span style="font-weight: 300">Join</span>Room</h2>
    <form @submit.prevent="joinRoomLocal">
      <div class="inputs-wrapper" style="margin: 3rem 0">
        <div class="new-user-image" ref="newUserImage">
          <span class="mdi mdi-jellyfish"></span>
        </div>
        <div class="input-wrapper">
          <label>Room code*</label>
          <input
            type="text"
            placeholder="Room code*"
            v-model="roomCode"
            minlength="6"
            maxlength="6"
            required
          />
        </div>
      </div>
      <button>Join</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: "landing",
  data() {
    return {
      roomCode: null
    };
  },
  methods: {
    joinRoomLocal() {
      this.$router.push(`/${this.roomCode}`);
    }
  }
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
