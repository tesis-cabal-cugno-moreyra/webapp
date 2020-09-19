export class ResourceType {
  constructor(resourceTypeName) {
    this.resourceTypeName = resourceTypeName;
  }
}
export class MapPointDescription {
  constructor(text) {
    this.text = text;
  }
}
export class IncidentType {
  constructor(incidentTypeName, mapPointDescriptions) {
    this.incidentTypeName = incidentTypeName;
    this.mapPointDescriptions = mapPointDescriptions;
  }
}
export class IncidentAbstraction {
  constructor(incidentAbstractionName, incidentTypes, resourceTypes) {
    this.incidentAbstractionName = incidentAbstractionName;
    this.incidentTypes = incidentTypes;
    this.resourceTypes = resourceTypes;
  }
}
export class Domain {
  constructor(
    domainName,
    supervisorAliases,
    adminAlias,
    incidentAbstractions,
    resourceTypes
  ) {
    this.domainName = domainName;
    this.supervisorAliases = supervisorAliases;
    this.adminAlias = adminAlias;
    this.incidentAbstractions = incidentAbstractions;
    this.resourceTypes = resourceTypes;
  }
}
// NOTE: Variables in plural are lists of instances (we cannot type a variable in JS)
//const resourceType1 = new ResourceType("tipoRecurso");
//const mapPointDescription1 = new MapPointDescription("descripcion util para un map point en particular");
//const incidentType1 = new IncidentType("Tipo de incidente", [mapPointDescription1]);
//const incidentAbstraction1 = new IncidentAbstraction("Incidente1", [incidentType1], [resourceType1]);
//const myDomain = new Domain("DominioPersonalizado", ["Bombero", "Oficial", "Suboficial"], "Administrador", [incidentAbstraction1], [resourceType1]);
//console.log(myDomain);
