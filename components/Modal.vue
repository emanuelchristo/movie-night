<template>
  <div class="modal">
    <div class="card-bg">
      <div class="top">
        <span class="mdi mdi-close" @click="$emit('close')"></span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~/assets/css/_variables.scss";

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(#000, 0.1);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-bg {
  width: 340px;
  height: 500px;
  margin: 0 auto;
  padding: 1rem 1rem 3rem 1rem;
  border-radius: 1.5rem;
  background-color: rgba(16, 13, 27, 0.9);
  border: 2px solid rgba(#fff, 0.1);
  backdrop-filter: blur(15px);
  box-shadow: 0 3rem 4rem rgba(#000, 0.4);
  display: flex;
  flex-flow: column;
}

.top {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 100px;
    transition: $trans-short;
  }
  span:hover {
    background-color: rgba(#fff, 0.2);
  }
  span:active {
    background: none;
  }
}
</style>
