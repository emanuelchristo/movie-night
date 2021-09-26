<template>
  <div class="card">
    <div class="popcorn">🍿</div>
    <div class="what">
      <h3>What is this?</h3>
      <p>Sync play local and YouTube videos with your friends</p>
    </div>
    <div class="bottom">
      <div class="support">
        <h3>Supports</h3>
        <div class="support-items-wrapper">
          <div class="support-item">
            <div class="icon youtube"></div>
            <p>YouTube</p>
          </div>
          <div class="support-item">
            <div class="icon file"></div>
            <p>Files</p>
          </div>
          <div class="support-item">
            <div class="icon link"></div>
            <p>Links</p>
          </div>
        </div>
        <div class="contribute">
          <button @click="contribute">
            <span class="mdi mdi-github"></span>Contribute
          </button>
        </div>
      </div>
      <div class="steps">
        <h3>Steps</h3>
        <ul>
          <li><span class="num">1</span>Start a room</li>
          <li><span class="num">2</span> Add name & thumbnail</li>
          <li><span class="num">3</span>Add video</li>
          <li><span class="num">4</span>Invite friends</li>
          <li><span class="num">5</span>Chill</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    contribute() {
      window.open("https://github.com/emanuelchristo/movie-night", "_blank");
    }
  }
};
</script>

<style lang="scss">
.card {
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 3rem 0 3rem;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;
  h3 {
    margin-bottom: 1rem;
  }
  p {
    margin: 0;
  }
}

.popcorn {
  font-size: 6rem;
  position: absolute;
  top: -80px;
  right: 40px;
}

.bottom {
  display: flex;
}

.what {
  align-self: flex-start;
  margin-bottom: 3rem;
}

.contribute {
  margin-top: 3rem;
  button {
    width: 150px;
    height: 50px;
    font-weight: 400;
    font-size: 1rem;
    background: rgb(42, 41, 63);
    color: #fff;
  }
}

.support {
  margin-right: 3rem;
}
.support-items-wrapper {
  display: flex;
}
.support-item {
  display: flex;
  align-items: center;
  flex-flow: column;
  width: fit-content;
  margin-right: 1.5rem;
  .icon {
    width: 58px;
    height: 58px;
    margin-bottom: 0.75rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  p {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.8);
  }
}
.support-item:last-child {
  margin: 0;
}

.youtube {
  background-image: url("~/assets/icons/youtube.svg");
}
.file {
  background-image: url("~/assets/icons/file.png");
}
.link {
  background-image: url("~/assets/icons/link.png");
}

.steps {
  min-width: 230px;
  ul {
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .num {
    margin-right: 1rem;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.1);
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
}
</style>
