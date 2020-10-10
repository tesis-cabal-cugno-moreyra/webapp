import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import api from "./services/api";
import VueAxios from "vue-axios";
import axios from "axios";
import * as GmapVue from "gmap-vue";

Vue.router = router;
Vue.use(VueAxios, axios);
Vue.use(api);

console.table(process.env);
console.log(process.env.VUE_APP_GOOGLE_API_KEY);

Vue.use(GmapVue, {
  load: {
    // This is WRONG. We should handle it differently
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    libraries: "places"
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
