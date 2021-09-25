const io = require("socket.io-client");
const socket = io("http://localhost:5000", { withCredentials: false });

export default ({ app }, inject) => {
  inject("socket", socket);
};
