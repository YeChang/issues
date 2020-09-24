import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";

Vue.config.productionTip = false;
const token = "0fe91a85dab951c8d52b5f514097988920e72cca";

import axios from "axios";
Vue.prototype.$http = axios.create({
  baseURL: "https://localhost:9527/",
});

Vue.prototype.$fetchGit = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `token  ${token}`,
    accept: "application/json",
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
