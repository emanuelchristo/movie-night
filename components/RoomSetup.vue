<template>
  <div class="container">
    <div class="setup-bg">
      <!-- Add video -->
      <div
        class="add-video"
        ref="addVideo"
        v-if="!(room.video.added && room.video.link)"
      >
        <h3>Add video</h3>
        <div class="file-input">
          <input
            type="file"
            id="file"
            class="file"
            accept="video/*"
            ref="fileInput"
            @change="addVideoFile"
          />
          <label for="file" class="button button-outline"
            ><span class="mdi mdi-plus-circle"></span>Add File</label
          >
        </div>
        <button class="button-outline" @click="addYoutubeLink">
          <span class="mdi mdi-youtube"></span>YouTube Link
        </button>
        <button class="button-outline" @click="addVideoLink">
          <span class="mdi mdi-link"></span>Video Link
        </button>
      </div>

      <!-- Video added -->
      <div class="video-added" v-else>
        <h3>Video added</h3>
        <div class="wrapper">
          <div
            class="thumbnail"
            :style="`background-image: url(${room.video.thumbnail})`"
          ></div>
          <a target="_blank" :href="room.video.link">
            <p>{{ room.video.title || "--" }}</p>
          </a>
        </div>

        <button class="button-outline" @click="removeVideo">
          <span class="mdi mdi-close"></span>Remove
        </button>
      </div>

      <!-- Room info -->
      <div class="room-info">
        <h3>Room info</h3>

        <div class="input-wrapper">
          <label>Room name*</label>
          <input type="text" placeholder="Room name*" v-model="roomName" />
        </div>
        <div class="input-wrapper">
          <label>Image link</label>
          <input type="text" placeholder="Image link" v-model="imageLink" />
        </div>
        <button style="margin-top: 1rem" @click="startRoomLocal">
          <span class="mdi mdi-filmstrip"></span
          >{{ room.started ? "Play" : "Start Room" }}
        </button>
      </div>
    </div>
    <!-- Modals -->
    <video-link-modal
      :show="videoLinkModalShow"
      :type="videoType"
      @submit="submitVideoLink"
      @close="videoLinkModalShow = false"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VideoLinkModal from "./modals/VideoLinkModal.vue";

export default {
  components: { VideoLinkModal },
  data() {
    return {
      roomName: null,
      imageLink: null,
      videoLinkModalShow: false,
      videoType: null
    };
  },
  computed: { ...mapState(["room"]) },
  watch: {
    room: function() {
      this.roomName = this.room.name;
      this.imageLink = this.room.imageLink;
    }
  },
  methods: {
    ...mapActions(["addVideo", "removeVideo", "startRoom"]),
    addVideoFile(e) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      this.videoType = "file";
      this.addVideo({ type: "file", fileURL, fileName: file.name });
    },
    addYoutubeLink() {
      this.videoType = "youtube";
      this.videoLinkModalShow = true;
    },
    addVideoLink() {
      this.videoType = "video";
      this.videoLinkModalShow = true;
    },
    submitVideoLink(link) {
      let data = {
        link,
        type: this.videoType
      };
      this.addVideo(data);
    },
    startRoomLocal() {
      if (this.room.video.added)
        this.startRoom({ roomName: this.roomName, imageLink: this.imageLink });
    }
  },
  mounted() {
    this.roomName = this.room.name;
    this.imageLink = this.room.imageLink;
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
  margin-bottom: 1rem;
}

.add-video,
.room-info,
.video-added {
  width: 50%;
  border-right: 1px solid rgba(#fff, 0.1);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.add-video {
  button,
  .file-input {
    margin: 0.75rem 0;
  }
}

.video-added {
  .thumbnail {
    width: 200px;
    height: 112px;
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
  a p {
    line-height: 1.8;
    font-size: 0.9rem;
    color: rgb(255, 241, 38);
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a p:hover {
    text-decoration: underline dotted;
  }
  .wrapper {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }
}

.room-info {
  border: none;
}

.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}
</style>
