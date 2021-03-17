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
  },
  showSignInResource(state) {
    return state.showSignInResource;
  },
  showSignInAdmin(state) {
    return state.showSignInAdmin;
  },
  showUserProfiles(state) {
    return state.showUserProfiles;
  }
};
