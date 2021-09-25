<template>
  <div class="controls-container">
    <div class="room">
      <h3>
        ROOM
        <span
          class="mdi mdi-cog room-settings"
          v-if="isHost"
          @click="$emit('editRoom')"
        ></span>
      </h3>
      <div class="room-wrapper">
        <div
          class="room-image"
          :style="`background-image: url(${room.imageLink})`"
        ></div>
        <div class="room-text">
          <p class="room-name">
            {{ room.name || "--" }}
          </p>
          <button @click="$emit('invite')">
            <span class="mdi mdi-party-popper"></span>Invite
          </button>
        </div>
      </div>
      <!-- <p class="room-code">
        <span class="code-text">ID</span> {{ room.id || "--" }}
      </p> -->
    </div>

    <div class="participants">
      <h3>HOST</h3>
      <participant :info="room.host" :isHost="isHost" />
      <div style="height: 1rem"></div>
      <h3>
        PARTICIPANTS
        <span class="participants-count">{{ room.participants.length }}</span>
      </h3>
      <participant
        v-for="(p, index) of participants"
        :info="p"
        :isHost="isHost"
        :key="index"
      />
    </div>

    <div class="controls">
      <h3>CONTROLS</h3>
      <div class="controls-wrapper">
        <audio-bar />
        <div class="controls-b">
          <button @click="$emit('leave-room')">
            {{ isHost ? "End room" : "Leave" }}
          </button>
          <div class="controls-br">
            <!-- <span
              class="mdi mdi-microphone-off"
              v-if="room.voiceChat.micOff"
            ></span> -->
            <span class="mdi mdi-microphone"></span>
            <!-- <span
              class="mdi mdi-headphones-off"
              v-if="room.voiceChat.soundOff"
            ></span> -->
            <span class="mdi mdi-headphones"></span>
            <span class="mdi mdi-cog"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["room", "isHost"],
  computed: {
    participants() {
      return this.room.participants.filter(p => p.id !== this.room.host.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/_variables.scss";

.controls-container {
  width: 340px;
  height: 100%;
  display: flex;
  flex-flow: column;
  border-left: 1.5px solid rgba(#fff, 0.1);
  background: rgba(14, 13, 27, 0.15);
  backdrop-filter: blur(50px);
}

h3 {
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.participants {
  flex: 1;
  padding: 2.5rem 1.25rem 2.5rem 2rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
.participants-count {
  font-weight: 400;
  margin-left: 1rem;
}

.controls {
  border-top: 2px solid rgba(#fff, 0.1);
  width: 100%;
  padding: 2rem 2rem;
}
.controls-b {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    min-width: 80px;
    width: fit-content;
    height: 35px;
    padding: 0 1rem;
    padding-bottom: 2px;
    font-size: 0.9rem;
    background: none;
    background: rgba(#f00, 0.2);
    border: 1px solid rgba(#f00, 0.3);
  }
  button:hover {
    box-shadow: none;
    background: rgba(#f00, 0.5);
  }
  button:active {
    background: rgba(#f00, 0.2);
  }
}
.controls-br {
  span {
    font-size: 1.3rem;
    color: rgba(#fff, 0.8);
    margin: 0 0.25rem;
    cursor: pointer;
    transition: $trans-short;
    user-select: none;
  }
  span:hover {
    color: #fff;
  }
  span:active {
    color: rgba(#fff, 0.8);
  }
}

.room {
  padding: 2.5rem 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(#fff, 0.1);
}
.room-code {
  margin-top: 1.5rem;
  color: rgba(#fff, 0.8);
  span {
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }
}
.room-settings {
  font-size: 1rem;
  margin-left: 1rem;
  color: rgba(#fff, 0.8);
  cursor: pointer;
  transition: $trans-short;
}
.room-settings:hover {
  color: #fff;
}
.room-settings:active {
  color: rgba(#fff, 0.8);
}
.room-wrapper {
  display: flex;
  align-items: center;
}
.room-image {
  width: 100px;
  height: 100px;
  min-width: 100px;
  min-height: 100px;
  background-color: rgba(22, 25, 46, 0.2);
  background-size: cover;
  background-position: center;
  box-sizing: unset;
  border: 1px solid rgb(37, 36, 46);
  box-shadow: 0 1rem 2rem rgba(#000, 0.3);
  border-radius: 1rem;
  margin-right: 1rem;
}
.room-name {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.room-text button {
  width: 100px;
  height: 36px;
  padding-bottom: 2px;
  font-size: 0.9rem;
  span {
    font-size: 1.1rem;
  }
}
</style>
