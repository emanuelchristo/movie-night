import Cookies from "js-cookie";

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject("Cookies", Cookies);
};
