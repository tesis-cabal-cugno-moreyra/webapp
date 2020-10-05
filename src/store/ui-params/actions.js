export default {
  turnOnSpinnerOverlay(context) {
    context.commit("changeSpinnerOverlayState", true);
  },
  turnOffSpinnerOverlay(context) {
    context.commit("changeSpinnerOverlayState", false);
  },
  showNavBar(context) {
    context.commit("changeNavBarState", true);
  },
  hideNavBar(context) {
    context.commit("changeNavBarState", false);
  }
};
