export default {
  domainConfig(state) {
    return state.domainConfig;
  },
  domainCode(state) {
    return state.domainCode;
  },
  aliases(state) {
    return state.aliases;
  },
  incidentConfig(state) {
    return state.incidentConfig;
  },
  incidentAbstractions(state) {
    let incidentAbstractions = [];
    if (state.incidentConfig !== null) {
      state.incidentConfig.forEach(incident => {
        incidentAbstractions.push(incident.incidentAbstraction);
      });
      return incidentAbstractions;
    } else {
      return [];
    }
  }
};
