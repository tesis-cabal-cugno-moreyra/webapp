import Vue from "vue";
import Vuex from "vuex";

// import app from "./modules/app";

// import * as getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    displaySpinnerOverlay: false
  },
  mutations: {
    changeSpinnerOverlayState(state) {
      state.displaySpinnerOverlay = !state.displaySpinnerOverlay;
    }
  },
  actions: {
    changeSpinnerOverlayStateAction(context) {
      context.commit("changeSpinnerOverlayState");
    }
  },
  getters: {
    isLoading(state) {
      return state.displaySpinnerOverlay;
    }
  }
});
