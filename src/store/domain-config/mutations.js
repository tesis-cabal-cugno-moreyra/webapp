export default {
  addDomainConfig(state, domainConfig) {
    state.domainConfig = domainConfig;
  },
  addDomainConfigAliases(state, aliases) {
    state.aliases = aliases;
  },
  retrieveDomainConfig(state) {
    let domainConfig = console.log(state.domainConfig.adminAlias);
    return domainConfig;
  }
};
