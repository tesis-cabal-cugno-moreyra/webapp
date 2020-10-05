export default {
  addDomainConfig(state, domainConfig) {
    state.domainConfig = domainConfig;
  },
  retrieveDomainConfig(state) {
    return state.domainConfig;
  }
};
