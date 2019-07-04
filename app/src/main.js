import Vue from "vue";
import App from "./App.vue";

import axios from "axios";
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios; // make axios available everywhere with this.axios

import router from "./Router";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#expenses");
