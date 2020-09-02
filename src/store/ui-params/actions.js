export default {
  turnOnSpinnerOverlay(context) {
    context.commit("changeSpinnerOverlayState", true);
  },
  turnOffSpinnerOverlay(context) {
    context.commit("changeSpinnerOverlayState", false);
  }
};
