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
  },
  // getIncidentAbstractions(domainConfig) {
  //   let incidentAbstractions = [];
  //   domainConfig.incidentAbstractions.forEach(incidentAbstraction => {
  //     console.log(incidentAbstraction.name);
  //     incidentAbstraction.push(incidentAbstraction.name);
  //   });
  //   return incidentAbstractions;
  // },
  getIncidentAbstractions(domainConfig) {
    console.log(domainConfig);
    let incidentsArray = [];
    domainConfig.incidentAbstractions.forEach(incidentAbstraction => {
      let incidentTypes = [];
      incidentAbstraction.types.forEach(incidentType => {
        incidentTypes.push(incidentType.name);
      });
      console.log(incidentTypes);
      console.log(incidentAbstraction.name);
      let incidentAbstractionAndTypes = {
        incidentAbstraction: incidentAbstraction.name,
        incidentTypes: incidentTypes
      };
      incidentsArray.push(incidentAbstractionAndTypes);
      // incidentAbstractions.push(incidentAbstraction.value: incidentTypes});
    });
    console.log(incidentsArray);
    return incidentsArray;
  }
};
