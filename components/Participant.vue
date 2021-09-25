<template>
  <div class="participant">
    <div class="image" ref="image">
      <span class="mdi mdi-jellyfish"></span>
      <!-- <div class="ready">
        <span v-if="info.ready" class="mdi mdi-check-circle green"></span>
        <span v-else class="mdi mdi-minus-circle red"></span>
      </div> -->
    </div>
    <div class="content">
      <div class="content-l">
        <p class="name">
          <span class="truncate">{{ info.nickName || "--" }}</span>
          <span
            class="mic-off mdi mdi-microphone-off"
            v-if="info.micOff"
          ></span>
        </p>
        <audio-bar />
      </div>
      <div class="content-r">
        <span class="mdi mdi-volume-off" v-if="info.volume <= 0"></span>
        <span class="mdi mdi-volume-low" v-else-if="info.volume <= 0.33"></span>
        <span
          class="mdi mdi-volume-medium"
          v-else-if="info.volume <= 0.66"
        ></span>
        <span class="mdi mdi-volume-high" v-else></span>
        <!-- <div class="volume-popup">
          <input class="volume-slider" orient="vertical" type="range" />
        </div> -->
        <span
          class="mdi mdi-dots-vertical options-icon"
          @click="optionsFunction"
          v-if="isHost"
        >
          <div class="options-popup" v-if="showOptions">
            <ul>
              <li>Kick out</li>
              <li>Mute</li>
              <li>Ping</li>
            </ul>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import AudioBar from "./AudioBar.vue";

export default {
  components: { AudioBar },
  props: ["info", "isHost"],
  data() {
    return {
      showOptions: false
    };
  },
  methods: {
    bg() {
      let colorSet = [
        ["651366", "A71A5B", "E7204E", "F76E2A", "F0C505"],
        ["11644D", "A0B046", "F2C94E", "F78145", "F24E4E"],
        ["331327", "991766", "D90F5A", "F34739", "FF6E27"],
        ["003049", "d62828", "f77f00", "fcbf49", "eae2b7"],
        ["f72585", "7209b7", "3a0ca3", "4361ee", "4cc9f0"]
      ];
      let index = Math.floor(Math.random() * colorSet.length);
      this.$refs.image.style.backgroundImage = `url('https://source.boringavatars.com/marble/70/${this.info.id}?square&colors=${colorSet[index][0]},${colorSet[index][1]},${colorSet[index][2]},${colorSet[index][3]},${colorSet[index][4]}')`;
    },
    optionsFunction() {
      this.showOptions = !this.showOptions;
    }
  },
  mounted() {
    // this.bg();
    // window.addEventListener("click", function() {
    //   if (this.showOptions) this.showOptions = false;
    // });
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/_variables.scss";

.options-popup {
  width: 150px;
  position: absolute;
  right: 0.5rem;
  bottom: 2.6rem;
  padding: 0.3rem;
  border: 1px solid rgba(#fff, 0.2);
  border-radius: 0.5rem;
  background: rgba($menu-bg-color, 0.95);
  box-shadow: 0 1rem 2rem rgba(#000, 0.4);
  transition: trans-med;

  ul {
    list-style: none;
    font-size: 0.9rem;
    li {
      padding: 0.3rem 0.4rem 0.4rem 0.4rem;
      cursor: pointer;
      transition: $trans-short;
      border-radius: 0.25rem;
    }
    li:hover {
      background: rgba(#fff, 0.1);
    }
    li:active {
      background: rgba(#fff, 0.05);
    }
  }
}

.volume-popup {
  width: 30px;
  height: 70px;
  position: absolute;
  bottom: 44px;
  background: $menu-bg-color;
  border-radius: 0.5rem;
  border: 1px solid rgba(#fff, 0.2);
}

.volume-slider {
  all: unset;
  width: 70px;
  background: red;
  transform: rotate(-90deg), translate(-50%);
}

.participant {
  display: flex;
  margin: 1.8rem 0;
  position: relative;
}

.image {
  width: 50px;
  height: 50px;
  position: relative;
  border-radius: 50rem;
  background: rgba(#fff, 0.2);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 2rem;
  }
}

.ready {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2.2rem;
  right: 0;
  span {
    font-size: 0.9rem;
    margin-left: 1px;
    margin-bottom: 0.2px;
    background-color: #fff;
    border-radius: 100%;
    padding: 0 1px;
    box-shadow: -0.2rem -0.2rem 0.8rem rgba(#000, 0.5);
  }
  .red {
    background: #fff;
    color: rgb(230, 3, 3);
  }
  .green {
    color: rgb(0, 151, 0);
  }
}

.content {
  margin-left: 0.75rem;
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.content-l {
  flex: 1;
  padding-bottom: 5px;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.name {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  .truncate {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mic-off {
    margin-top: 1px;
    margin-left: 0.4rem;
    color: rgba(#fff, 0.5);
  }
}

.content-r {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;

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
</style>
