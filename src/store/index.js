import Vue from "vue";
import Vuex from "vuex";

import uiParams from "./ui-params";
import googleLogin from "./google-login";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    uiParams,
    googleLogin
  }
});
