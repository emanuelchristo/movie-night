import io from "socket.io-client";
import feathers from "@feathersjs/client";

const socket = io("https://movie-night-cris.herokuapp.com/");
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());

export default ({ app }, inject) => {
  inject("client", client);
};
