export class ResourceType {
  constructor(name) {
    this.name = name;
  }
}
export class SupervisorAlias {
  constructor(name) {
    this.name = name;
  }
}
export class MapPointDescription {
  constructor(text) {
    this.text = text;
  }
}
export class IncidentType {
  constructor(name, descriptions, resourceTypes) {
    this.name = name;
    this.descriptions = descriptions;
    this.resourceTypes = resourceTypes;
  }
}
export class IncidentAbstraction {
  constructor(name, types) {
    this.name = name;
    this.types = types;
  }
}
export class Domain {
  constructor(
    name,
    supervisorAliases,
    adminAlias,
    incidentAbstractions,
    resourceTypes
  ) {
    this.name = name;
    this.supervisorAliases = supervisorAliases;
    this.adminAlias = adminAlias;
    this.incidentAbstractions = incidentAbstractions;
    this.resourceTypes = resourceTypes;
  }
}
