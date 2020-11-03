import Vue from "vue";
import Vuex from "vuex";

import uiParams from "./ui-params";
import restAuth from "./rest-auth";
import domainConfig from "./domain-config";
import incident from "./incident";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    uiParams,
    restAuth,
    domainConfig,
    incident
  }
});
