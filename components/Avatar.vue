<template>
  <div class="user" v-if="loggedIn" @click="logout">
    <p>{{ nickName }}</p>
    <div class="image" ref="userImage">
      <span class="mdi mdi-jellyfish"></span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["loggedIn", "nickName"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .image {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(#fff, 0.1);
    border-radius: 100%;
    span {
      font-size: 1.5rem;
    }
  }
  p {
    margin-right: 0.5rem;
  }
}
</style>
