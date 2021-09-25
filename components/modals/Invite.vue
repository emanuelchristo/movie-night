<template>
  <!-- Invite modal -->
  <modal v-if="show" @close="$emit('close')">
    <div class="modal-content-wrapper">
      <div class="content">
        <div style="height: 2rem"></div>
        <span class="mdi mdi-party-popper icon"></span>
        <h2><span style="font-weight: 300"></span>Invite</h2>
        <div class="inputs-wrapper flex-center-col">
          <div class="input-wrapper">
            <label>Room link</label>
            <input
              id="room-link"
              type="text"
              placeholder="Room link"
              v-model="info.roomLink"
              readonly
            />
          </div>

          <div class="input-wrapper">
            <label>Room code</label>
            <input
              type="text"
              placeholder="Room code"
              v-model="info.roomId"
              readonly
            />
          </div>

          <button style="margin-top: 1rem" @click="$copyText(info.roomLink)">
            <span class="mdi mdi-link"></span>Copy link
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default { props: ["show", "info"] };
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
  margin-top: 1rem;
  margin-bottom: 2rem;
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
