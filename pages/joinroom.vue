<template>
  <div class="container">
    <span class="mdi mdi-set-center icon"></span>
    <h2><span style="font-weight: 300">Join</span>Room</h2>
    <form @submit="joinRoomLocal">
      <div :class="`inputs-wrapper ${loggedIn ? 'margin-adjust' : ''}`">
        <div class="input-wrapper">
          <label>Room code or link*</label>
          <input
            type="text"
            v-model="roomCode"
            placeholder="Room code or link*"
          />
        </div>
        <div class="input-wrapper" v-if="!loggedIn">
          <label>Nickname*</label>
          <input type="text" v-model="nickName" placeholder="Nickname*" />
        </div>
      </div>
      <button type="submit">Join</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "landing"
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/_variables.scss";

button {
  margin: 0 auto;
}

.inputs-wrapper {
  margin: 2.5rem 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.margin-adjust {
  margin: 3rem 0;
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
