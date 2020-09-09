import Vue from "vue";
import Vuex from "vuex";

import uiParams from "./ui-params";
import restAuth from "./rest-auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    uiParams,
    restAuth
  }
});
