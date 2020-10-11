export default {
  getAdminAliases(domainConfig) {
    return domainConfig.adminAlias;
  },
  getSupervisorAliases(domainConfig) {
    let supervisorAliases = [];
    domainConfig.supervisorAliases.forEach(supervisorAlias => {
      supervisorAliases.push(supervisorAlias.name);
    });
    return supervisorAliases;
  },
  getResourceAliases(domainConfig) {
    let resourceAliases = [];
    domainConfig.incidentAbstractions.forEach(incidentAbstraction => {
      incidentAbstraction.types.forEach(incidentType => {
        incidentType.resourceTypes.forEach(resourceType => {
          resourceAliases.push(resourceType.name);
        });
      });
    });
    return resourceAliases;
  },
  getDomainConfigAlias(domainConfig) {
    let adminAlias = this.getAdminAliases(domainConfig);
    let supervisorAliases = this.getSupervisorAliases(domainConfig);
    let resourceAliases = this.getResourceAliases(domainConfig);
    return {
      adminAlias: adminAlias,
      supervisorAliases: supervisorAliases,
      resourcesAliases: resourceAliases
    };
  }
};
