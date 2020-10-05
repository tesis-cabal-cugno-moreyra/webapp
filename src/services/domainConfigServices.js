export default {
  getAdminAliases(domainConfig) {
    return domainConfig.adminAlias;
  },
  getSupervisorAliases(domainConfig) {
    let supervisorAliases = [];
    domainConfig.supervisorAliases.forEach(supervisorAlias => {
      console.log(supervisorAlias.name);
      supervisorAliases.push(supervisorAlias.name);
    });
    return supervisorAliases;
  },
  getResourceAliases(domainConfig) {
    let resourceAliases = [];
    domainConfig.supervisorAliases.forEach(resourceAlias => {
      console.log(resourceAlias.name);
      resourceAliases.push(resourceAlias.name);
    });
    return resourceAliases;
  },
  getDomainConfigAlias(domainConfig) {
    let adminAlias = this.getAdminAliases(domainConfig);
    let supervisorAliases = this.getSupervisorAliases(domainConfig);
    let resourceAliases = this.getResourceAliases(domainConfig);
    console.log(adminAlias);
    return {
      adminAlias: adminAlias,
      supervisorAliases: supervisorAliases,
      resourcesAliases: resourceAliases
    };
  }
};
