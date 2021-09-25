<template>
  <modal v-if="show" @close="$emit('close')">
    <form
      @submit.prevent="save"
      @reset="$emit('close')"
      class="modal-content-wrapper"
    >
      <div class="content">
        <div style="height: 2rem"></div>
        <span class="mdi mdi-paperclip icon"></span>
        <h2><span style="font-weight: 300">Edit</span>Room</h2>
        <div class="inputs-wrapper flex-center-col">
          <div class="input-wrapper">
            <label for="room-name">Room name</label>
            <input
              type="text"
              name="room-name"
              placeholder="Room name*"
              v-model="info.roomName"
              required
            />
          </div>

          <div class="input-wrapper">
            <label for="image-link">Image link</label>
            <input
              type="text"
              name="image-link"
              placeholder="Image link"
              v-model="info.imageLink"
            />
          </div>
        </div>
      </div>
      <div class="actions">
        <button type="reset" class="button-outline">Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["show", "info"],
  methods: {
    ...mapActions(["setRoomInfo"]),
    save() {
      this.setRoomInfo(this.info);
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-content-wrapper {
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
}

.icon {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.25rem;
}

.content {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.inputs-wrapper {
  margin: 2rem 0;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    font-size: 1rem;
    width: 120px;
    height: 40px;
    margin: 0 0.25rem;
  }
}
</style>
