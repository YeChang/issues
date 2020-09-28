import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";

Vue.config.productionTip = false;
import axios from "axios";
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:9527/",
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
