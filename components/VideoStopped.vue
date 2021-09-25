<template>
  <div class="container">
    <div class="setup-bg">
      <!-- Add file -->
      <div class="content" v-if="showAddFile">
        <h3>Add File</h3>
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
      </div>

      <!-- Waiting -->
      <div class="content waiting" v-else>
        <h3>Waiting</h3>
        <div class="spinner-wrapper">
          <spinner />
        </div>
        <p>Waiting for the host to start playing</p>
        <div class="file-input" v-if="showChangeFile">
          <div style="height: 3rem"></div>
          <input
            type="file"
            id="file"
            class="file"
            accept="video/*"
            ref="fileInput"
            @change="addVideoFile"
          />
          <label for="file" class="button button-outline"
            ><span class="mdi mdi-file-edit-outline"></span>Change File</label
          >
        </div>
        <p class="file-name">{{ room.video.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Spinner from "./Spinner.vue";
export default {
  components: { Spinner },
  computed: {
    ...mapState(["loggedIn", "room"]),
    showAddFile() {
      return this.room.video.type == "file" && !this.room.video.link;
    },
    showChangeFile() {
      return this.room.video.type == "file";
    }
  },
  methods: {
    ...mapActions(["addVideo"]),
    addVideoFile(e) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      this.videoType = "file";
      this.addVideo({ type: "file", fileURL, fileName: file.name });
    }
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
  flex-flow: column;
  width: 100%;
}

.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.file-name {
  margin-top: 2rem;
  font-size: 0.8rem;
  color: rgb(255, 241, 38);
  max-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.waiting {
  .spinner-wrapper {
    margin-bottom: 1rem;
  }
  p {
    margin-top: 1rem;
  }
}
</style>
