export default {
  addDomainConfig(state, domainConfig) {
    state.domainConfig = domainConfig;
  },
  retrieveDomainConfig(state) {
    let domainConfig = console.log(state.domainConfig.adminAlias);
    return domainConfig;
  }
};
