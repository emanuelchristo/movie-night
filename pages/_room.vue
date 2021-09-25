<template>
  <div class="page-container">
    <div class="background">
      <div class="background-image"></div>
      <div class="background-blur"></div>
      <div class="background-grid"></div>
    </div>

    <div class="player-container">
      <div class="top-nav">
        <nuxt-link to="/">
          <h1>
            <span class="mdi mdi-jellyfish"></span>
            <span style="font-weight: 300">Movie</span>Night
          </h1>
        </nuxt-link>
        <avatar />
      </div>

      <player
        v-if="room.started && room.playing && room.joined && room.video.link"
        @stop="stop"
        @sync="sync"
      />
      <room-setup v-else-if="room.joined && isHost" />
      <video-stopped v-else-if="room.started & room.joined && !isHost" />
      <join-room v-else />

      <footer>
        Made with ❤️ by
        <a href="https://www.instagram.com/emanuel.christo/" target="_blank"
          >Cris</a
        >
      </footer>

      <invite
        :show="inviteShow"
        :info="inviteInfo"
        @close="inviteShow = false"
      />
      <edit-room
        :show="editRoomShow"
        :info="editRoomInfo"
        @close="editRoomShow = false"
      />
    </div>

    <controls
      :room="room"
      :isHost="isHost"
      @leave-room="leaveRoom"
      @editRoom="editRoomShow = true"
      @invite="inviteShow = true"
      v-if="room.started"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Avatar from "../components/Avatar.vue";
import Controls from "../components/Controls.vue";
import JoinRoom from "../components/JoinRoom.vue";
import Modal from "../components/Modal.vue";
import EditRoom from "../components/modals/EditRoom.vue";
import Invite from "../components/modals/Invite.vue";
import Player from "../components/Player.vue";
import RoomSetup from "../components/RoomSetup.vue";
import VideoStopped from "../components/VideoStopped.vue";

export default {
  components: {
    Modal,
    Controls,
    Player,
    RoomSetup,
    Avatar,
    Invite,
    EditRoom,
    JoinRoom,
    VideoStopped
  },
  data() {
    return {
      inviteShow: false,
      editRoomShow: false
    };
  },
  computed: {
    ...mapState(["room", "isHost"]),
    inviteInfo() {
      return {
        roomLink: process.browser ? window.location.href : null,
        roomId: this.room.id
      };
    },
    editRoomInfo() {
      return {
        roomName: this.room.name,
        imageLink: this.room.imageLink
      };
    }
  },
  methods: {
    ...mapActions(["stop", "sync", "login", "fetchRoom", "leaveRoom"])
  },
  created() {
    this.login().then(() => this.fetchRoom(this.$route.params.room));
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/_variables.scss";

.top-nav {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.player-container {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex: 1;
  padding: 0 2rem;
}

h1 {
  color: #fff;
  font-size: 1.7rem;
}

footer {
  width: 100%;
  height: 65px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
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

.page-container {
  display: flex;
  height: 100vh;
  min-height: 100vh;
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
