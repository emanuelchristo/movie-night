<template>
  <div class="audio-bar">
    <div class="audio-level"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~/assets/css/_variables.scss";

.audio-bar {
  width: 100%;
  height: 4px;
  border-radius: 100px;
  background-color: rgba(#fff, 0.15);
}

.audio-level {
  width: 50%;
  height: 100%;
  border-radius: 100px;
  @include audio-gradient;
}
</style>
