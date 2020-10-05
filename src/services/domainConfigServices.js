export default {
  getAdminAliases(domainConfig) {
    return domainConfig.domainConfig.adminAlias;
  },
  getSupervisorAliases() {
    return "Supervisor";
  },
  getResourceAliases() {
    return "Bombero";
  }
};
