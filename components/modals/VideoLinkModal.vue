<template>
  <modal v-if="show" @close="$emit('close')">
    <form @submit="save" @reset="$emit('close')" class="modal-content-wrapper">
      <div class="content">
        <div style="height: 2rem"></div>
        <span
          :class="`mdi ${type == 'youtube' ? 'mdi-youtube' : 'mdi-link'} icon`"
        ></span>
        <h2>
          <span style="font-weight: 300">{{
            type == "youtube" ? "YouTube" : "Video"
          }}</span
          >Link
        </h2>
        <div class="inputs-wrapper flex-center-col">
          <div class="input-wrapper">
            <label>Link*</label>
            <input type="text" v-model="link" placeholder="Link*" required />
          </div>
        </div>
      </div>
      <div class="actions">
        <button type="reset" class="button-outline">Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  </modal>
</template>

<script>
export default {
  props: ["show", "type"],
  data() {
    return {
      link: null
    };
  },
  methods: {
    save(e) {
      e.preventDefault();
      this.$emit("submit", this.link);
      this.link = null;
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

form {
  margin-top: 2.5rem;
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
