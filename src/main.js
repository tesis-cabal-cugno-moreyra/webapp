import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import * as GmapVue from "gmap-vue";

import api from "./services/api";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.router = router;
Vue.use(VueAxios, axios);
Vue.use(api);
Vue.use(GmapVue, {
  load: {
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
