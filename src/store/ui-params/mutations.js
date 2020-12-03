export default {
  changeSpinnerOverlayState(state, value) {
    state.displaySpinnerOverlay = value;
  },
  changeNavBarState(state, value) {
    state.showNavBar = value;
  },
  changeSignInSupervisorState(state, value) {
    state.showSignInSupervisor = value;
  },
  changeSignInResourceState(state, value) {
    state.showSignInResource = value;
  },
  dispatchAlert(state, payload) {
    state.snackbar.text = payload.text;

    if (payload.color) {
      state.snackbar.color = payload.color;
    }

    if (payload.timeout) {
      state.snackbar.timeout = payload.timeout;
    }

    state.snackbar.visible = true;
  },
  closeAlert(state) {
    state.snackbar.visible = false;
    state.snackbar.text = null;
  }
};
