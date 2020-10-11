export default {
  isLoading(state) {
    return state.displaySpinnerOverlay;
  },
  showNavBar(state) {
    return state.showNavBar;
  },
  snackbar(state) {
    return state.snackbar;
  },
  showSignInSupervisor(state) {
    return state.showSignInSupervisor;
  }
};
