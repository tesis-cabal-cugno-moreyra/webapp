export default {
  addDomainConfig(state, domainConfig) {
    state.domainConfig = domainConfig;
  },
  addDomainConfigAliases(state, aliases) {
    state.aliases = aliases;
  },
  addDomainConfigIncidents(state, incidents) {
    /*
    Store IncidentAbstractions and IncidentTypes in an array, where the first of these is the key and the second is an
    array with the possible values.
    */
    state.incidentConfig = incidents;
  }
};
