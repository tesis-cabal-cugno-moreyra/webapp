export default {
  dispatchResourceSelected(state, payload) {
    console.log(payload.incidentId);
    state.resourceSelectedInfo.state = payload.state;
    state.resourceSelectedInfo.incidentId = payload.incidentId;
  },
  closeResource(state) {
    state.resourceSelectedInfo.incidentId = [];
    state.resourceSelectedInfo.state = false;
  }
};
