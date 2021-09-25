<template>
  <div class="container">
    <div class="setup-bg">
      <h3>Join Room</h3>

      <!-- Room exists -->
      <div class="content" v-if="room.started">
        <div class="room-info">
          <div
            class="thumbnail"
            :style="`background-image: url(${room.imageLink})`"
          ></div>
          <p class="room-name">{{ room.name }}</p>
          <p class="online">
            <span class="mdi mdi-access-point"></span
            >{{ room.participants.length }} online
          </p>
        </div>
        <div class="join">
          <form @submit.prevent="joinRoom(nickName)">
            <div class="input-wrapper" v-if="!loggedIn">
              <label>Nickname*</label>
              <input type="text" placeholder="Nickname*" v-model="nickName" />
            </div>
            <button class="join-button">
              <span class="mdi mdi-set-center"></span>Join
            </button>
          </form>
        </div>
      </div>

      <!-- Room doesn't exist -->
      <div class="content" v-else>
        <div class="room-not-exist">
          <span class="mdi mdi-alert alert-icon"></span>
          <p>Room hasn't started or has ended</p>
          <button @click="$router.push('/')">
            <span class="mdi mdi-home"></span>Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return { nickName: null };
  },
  computed: {
    ...mapState(["loggedIn", "room"])
  },
  methods: {
    ...mapActions(["joinRoom", "fetchRoom"])
  },
  created() {
    this.fetchRoom(this.$route.params.room);
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 100%;
  flex: 1;
  display: flex;
}
.setup-bg {
  width: 100%;
  max-width: 100%;
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 1.5rem;
  background-color: rgba(2, 1, 5, 0.2);
  border: 2px solid rgba(#fff, 0.1);
  backdrop-filter: blur(40px);
  box-shadow: 0 3rem 4rem rgba(#000, 0.4);
  overflow: hidden;
  padding: 2rem;
}

h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.room-info,
.join {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 2rem;
}
.room-info {
  border-right: 1px solid rgba(#fff, 0.1);
  .thumbnail {
    width: 200px;
    height: 200px;
    background-color: rgba(22, 25, 46, 0.2);
    background-size: cover;
    background-position: center;
    box-sizing: unset;
    border: 1px solid rgb(37, 36, 46);
    box-shadow: 0 1rem 2rem rgba(#000, 0.3);
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .room-name {
    max-width: 220px;
    text-align: center;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  .online {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: rgba(#fff, 0.07);
    border-radius: 200px;
    line-height: 1;
    span {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }
}

.join-button {
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.room-not-exist {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  .alert-icon {
    font-size: 4rem;
    color: rgb(255, 208, 1);
  }
  p {
    margin-top: 0.5rem;
    margin-bottom: 3rem;
  }
}
</style>
