export default {
  dispatchResourceSelected(state, payload) {
    state.resourceSelectedInfo.state = payload.state;
    state.resourceSelectedInfo.incidentId = payload.incidentId;
    state.resourceSelectedInfo.statusSelected = payload.statusSelected;
  },
  closeResource(state) {
    state.resourceSelectedInfo.incidentId = [];
    state.resourceSelectedInfo.state = false;
    state.statusSelected = "";
  }
};
