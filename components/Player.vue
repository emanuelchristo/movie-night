<template>
  <div class="container">
    <div class="player-bg">
      <div class="player-wrapper" ref="playerWrapper">
        <vue-plyr :options="playerOptions" ref="player">
          <video controls crossorigin playsinline></video>
        </vue-plyr>
      </div>
    </div>
    <div class="controls-bar">
      <button
        class="control-button red-button"
        @click="$emit('stop')"
        v-if="isHost"
      >
        <span class="mdi mdi-stop-circle-outline"></span>Stop
      </button>
      <button class="control-button" @click="syncLocal('manual')">
        <span class="mdi mdi-sync"></span>Sync
      </button>
      <div class="file-input" v-if="showChangeFile">
        <input
          type="file"
          id="file"
          class="file"
          accept="video/*"
          ref="fileInput"
          @change="addVideoFile"
        />
        <label for="file" class="button control-button"
          ><span class="mdi mdi-file-edit-outline"></span>Change File</label
        >
      </div>
      <div class="file-input" v-if="showChangeFile">
        <input
          type="file"
          id="subtitle"
          class="file"
          accept=".vtt, .srt"
          ref="subtitleInput"
          @change="addSubtitle"
        />
        <label for="subtitle" class="button control-button"
          ><span class="mdi mdi-subtitles-outline"></span>Add Subtitle</label
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      playerOptions: {
        invertTime: false
      },
      temp: null
    };
  },
  computed: {
    ...mapState(["room", "isHost"]),
    showChangeFile() {
      return this.room.video.type == "file";
    },
    roomString() {
      return JSON.stringify(this.room);
    }
  },
  watch: {
    room: function() {
      this.setPlayer();
    }
  },
  methods: {
    ...mapActions(["sync", "addVideo"]),
    addSource(subtitleUrl) {
      const player = this.$refs.player.player;
      let source = {
        type: "video",
        sources: [
          {
            src: this.room.video.link
          }
        ]
      };
      if (subtitleUrl) {
        source.tracks = [
          {
            kind: "captions",
            label: "Subtitles",
            srclang: "SUB",
            src: subtitleUrl,
            default: true
          }
        ];
      }
      if (this.room.video.type == "youtube")
        source.sources[0].provider = "youtube";
      player.source = source;
    },
    syncLocal(event) {
      // if (!this.isHost) return;
      const p = this.$refs.player.player;
      let player = {
        loaded: true,
        playing: p.playing,
        time: p.currentTime,
        speed: p.speed,
        volume: p.volume,
        captions: null
      };
      this.sync(player);
    },
    setPlayer() {
      if (!this.isHost) {
        console.log(this.room.player.playing);
        const p = this.$refs.player.player;
        p.currentTime = this.room.player.time;
        if (this.room.player.playing) {
          console.log("called play()");
          p.play();
        } else {
          console.log("called pause()");
          p.pause();
        }
        p.speed = this.room.player.speed;
      }
    },
    addVideoFile(e) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      this.videoType = "file";
      this.addVideo({ type: "file", fileURL, fileName: file.name }).then(() =>
        this.addSource()
      );
    },
    addSubtitle(e) {
      const file = e.target.files[0];
      const vttConverter = new this.$VTTConverter(file);
      const that = this;
      vttConverter.getURL().then(function(url) {
        console.log("here");
        that.addSource(url);
      });
      // const fileURL = URL.createObjectURL(file);
      // this.addSource(fileURL);
    }
  },
  mounted() {
    this.addSource();
    // Initializing player events
    if (this.isHost) {
      const p = this.$refs.player.player;
      p.on("play", () => this.syncLocal("play"));
      p.on("pause", () => this.syncLocal("pause"));
      p.on("seeked", () => this.syncLocal("seeked"));
      p.on("ratechange", () => this.syncLocal("ratechange"));
      p.on("ended", () => this.syncLocal("ended"));
    }

    this.$socket.on("room:syncrequest", () => {
      this.syncLocal("syncrequest");
    });
  }
};
</script>

<style lang="scss" scoped>
.controls-bar {
  padding: 1rem 2rem;
  padding-bottom: 0;
  display: flex;
}
.control-button {
  width: fit-content;
  height: 42px;
  padding: 0 1.25rem;
  margin-right: 0.75rem;
  font-size: 1rem;
  background: rgba(#fff, 0.1);
  border: 1px solid rgba(#fff, 0.5);
  span {
    font-size: 1.5rem;
  }
}
.control-button:hover {
  box-shadow: none;
  background-color: rgba(#fff, 0.2);
}
.control-button:active {
  box-shadow: none;
  background-color: rgba(#fff, 0.1);
}
.red-button {
  background: rgba(#f00, 0.5);
  border: 1px solid rgba(#f00, 0.7);
}
.red-button:hover {
  background: rgba(#f00, 0.6);
}
.red-button:active {
  background: rgba(#f00, 0.5);
}

.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.container {
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
}
.player-bg {
  width: 100%;
  max-width: 100%;
  flex: 1;
  margin: 0 auto;
  border-radius: 1.5rem;
  background-color: rgba(2, 1, 5, 0.2);
  border: 2px solid rgba(#fff, 0.1);
  backdrop-filter: blur(40px);
  box-shadow: 0 3rem 4rem rgba(#000, 0.4);
  overflow: hidden;
}

.player-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
