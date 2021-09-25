const roomDefault = {
  id: "abc-defg-hij",
  name: null,
  imageLink: null,
  started: false,
  joined: false,
  playing: false,

  video: {
    added: false,
    type: null,
    link: null,
    thumbnail: null,
    title: null
  },

  player: {
    loaded: "bool",
    time: "number",
    playing: "bool",
    volume: "number",
    speed: "string",
    captions: "link string"
  },

  host: {
    id: "abcd",
    nickName: "Cris",
    ready: true,
    micOff: false,
    volume: 0
  },
  participants: [
    {
      id: "jkji",
      nickName: "Jake",
      ready: false,
      micOff: true,
      volume: 0
    },
    {
      id: "jkjsfasdi",
      nickName: "Thor",
      ready: true,
      micOff: false,
      volume: 0.5
    }
  ],
  voiceChat: {
    micOff: false,
    soundOff: true
  },
  chat: [
    {
      id: null,
      userId: null,
      nickName: null,
      timestamp: null,
      message: "string"
    }
  ]
};

export const state = () => ({
  loggedIn: false,
  userId: null,
  nickName: null,
  isHost: false,
  room: roomDefault
});

export const actions = {
  login({ commit }, nickName) {
    return new Promise((resolve, reject) => {
      try {
        // Checking if userId exists
        const userId = window.localStorage.getItem("userId");
        // Loggin in
        console.log("login req:", { userId, nickName });
        this.$socket.emit("auth:login", { userId, nickName }, res => {
          if (!res) {
            commit("setLoggedIn", {
              loggedIn: false,
              userId: null,
              nickName: null
            });
          } else {
            // Setting userId
            window.localStorage.setItem("userId", res.id);
            commit("setLoggedIn", {
              loggedIn: true,
              userId: res.id,
              nickName: res.nickName
            });
          }
          resolve();
          return;
        });
      } catch (err) {
        reject();
      }
    });
  },

  logout({ commit }) {
    const userId = window.localStorage.getItem("userId");
    window.localStorage.removeItem("userId");
    this.$socket.emit("auth:logout", { userId }, () => {
      this.$router.go();
      commit("setLoggedIn", {
        loggedIn: false,
        userId: null,
        nickName: null
      });
    });
  },

  createRoom({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log("createRoom req:", { userId: state.userId });
      this.$socket.emit("room:create", state.userId, room => {
        console.log("createRoom res:", { room });
        commit("setRoom", room);
        resolve(room.id);
      });
    });
  },

  async fetchRoom({ commit }, roomId) {
    console.log("fetchRoom req:", { roomId });
    this.$socket.emit("room:get", roomId, room => {
      console.log("fetchRoom res:", { room });
      commit("setRoom", room);
    });
    // Subscribing to room changes
    this.$socket.on("room:updated", room => {
      console.log("roomUpdated: ", { room });
      commit("setRoom", room);
    });
  },

  async joinRoom({ commit, state, dispatch }, data) {
    console.log("Join Room Called");
    dispatch("login", data).then(() => {
      console.log("joinRoom req:", {
        roomId: state.room.id,
        userId: state.userId
      });
      this.$socket.emit("room:join", {
        roomId: state.room.id,
        userId: state.userId
      });
    });
  },

  addVideo({ commit, state }, data) {
    return new Promise(async (resolve, reject) => {
      console.log("addVideo");
      try {
        let video = {
          added: true,
          type: null,
          link: null,
          thumbnail: null,
          title: null
        };
        if (data.type == "youtube") {
          // YouTube video metadata server url
          const url = "https://noembed.com/embed?url=" + data.link;
          // YouTube metadata
          const res = await this.$axios.get(url);
          video = {
            added: true,
            type: "youtube",
            link: data.link,
            thumbnail: res.data.thumbnail_url,
            title: res.data.title
          };
        } else if (data.type == "file") {
          video.type = "file";
          video.title = data.fileName;
          video.link = null;
          video.thumbnail = "/file_icon.png";
        } else if (data.type == "video") {
          video.type = "video";
          video.link = data.link;
          video.thumbnail = "/video_icon.png";
          video.title = "Video from link";
        }

        // Making request to server
        if (state.isHost) {
          this.$socket.emit("room:addvideo", {
            userId: state.userId,
            roomId: state.room.id,
            video: video
          });
        }
        if (data.type == "file") {
          commit("setVideoFileName", data.fileName);
          commit("setVideoLink", data.fileURL);
        }
        resolve();
      } catch (err) {
        console.error(err);
        reject();
      }
    });
  },

  async removeVideo({ commit, state }) {
    this.$socket.emit("room:removevideo", {
      userId: state.userId,
      roomId: state.room.id,
      video: {}
    });
  },

  async startRoom({ commit, state }, data) {
    this.$socket.emit("room:startroom", {
      userId: state.userId,
      roomId: state.room.id,
      data
    });
  },

  async stop({ commit, state }) {
    this.$socket.emit("room:stop", {
      userId: state.userId,
      roomId: state.room.id
    });
  },

  async sync({ commit, state }, data) {
    this.$socket.emit("room:sync", {
      userId: state.userId,
      roomId: state.room.id,
      data
    });
  },

  async leaveRoom({ commit, state }) {
    this.$socket.emit("room:leave", {
      userId: state.userId,
      roomId: state.room.id
    });
  }
};

export const mutations = {
  setLoggedIn(state, data) {
    state.loggedIn = data.loggedIn;
    state.userId = data.userId;
    state.nickName = data.nickName;
  },
  setVideoLink(state, data) {
    state.room.video.link = data;
  },
  setVideoFileName(state, data) {
    state.room.video.title = data;
  },
  setCreateRoom(state, data) {
    state.room = data;
    state.room.id = data._id;
    delete state.room._id;
    state.room.joined = true;
    state.isHost = true;
  },
  setRoom(state, data) {
    if (!data) {
      state.room = roomDefault;
      return;
    }
    const videoLink = state.room.video.link;
    const fileName = state.room.video.title;
    state.room = data;
    state.room.id = data._id || data.id;
    delete state.room._id;
    if (state.room.host.id == state.userId) {
      state.room.joined = true;
      state.isHost = true;
    } else {
      const userInParticipants = checkParticipant(
        state.room.participants,
        state.userId
      );
      if (userInParticipants) state.room.joined = true;
    }
    if (state.room.video.type == "file") {
      state.room.video.link = videoLink;
      state.room.video.title = fileName;
    }
  }
};

function checkParticipant(participants, userId) {
  return participants.find(p => p.id == userId);
}
