import Vue from "vue";
import Vuex from "vuex";

import uiParams from "./ui-params";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    uiParams
  }
});
