let colors = ["blue", "red", "yellow", "green", "orange"];

export default {
  parsePoints(
    apiIncidentsResourceResponse,
    apiTrackPointsResponse,
    apiMapPointsResponse
  ) {
    let resourcesArray = this.getResources(apiIncidentsResourceResponse);
    let parsedMapPoints = this.getMapPoints(
      apiMapPointsResponse,
      resourcesArray
    );
    let parsedTrackPoints = this.getTrackPoints(
      apiTrackPointsResponse,
      resourcesArray
    );
    // TODO: Filtrar los recursos, eliminando los que no posean MapPoints ni TrackPoints. Esto modificaría dinámicamente el scrollview de los incident resources.
    let parsedCurrentPositionPoint = this.getCurrentPositionPoints(
      apiTrackPointsResponse,
      resourcesArray
    );
    return {
      mapPoints: parsedMapPoints,
      trackPoints: parsedTrackPoints,
      currentPositionPoints: parsedCurrentPositionPoint,
      resources: resourcesArray
    };
  },
  getMapPoints(apiMapPointsResponse, resourcesArray) {
    let mapPoints = [];
    apiMapPointsResponse.forEach(function(mapPoint) {
      resourcesArray.forEach(function(resource) {
        if (resource.id === mapPoint.resource_id) {
          mapPoints.push({
            resourceName: resource.name,
            resourceId: resource.id,
            position: {
              lat: mapPoint.location.coordinates[0],
              lng: mapPoint.location.coordinates[1]
            },
            description: mapPoint.comment
          });
        }
      });
    });
    return mapPoints;
  },
  getTrackPoints(apiTrackPointsResponse, resourcesArray) {
    let trackPoints = [];
    let context = this;
    resourcesArray.forEach(function(resource) {
      trackPoints.push({
        resourceName: resource.name,
        resourceId: resource.id,
        color: context.getColor(),
        route: []
      });
    });
    apiTrackPointsResponse.forEach(function(trackPoint) {
      trackPoints.forEach(function(trackPointByResource) {
        if (trackPointByResource.resourceId === trackPoint.resource_id) {
          trackPointByResource.route.push({
            lat: trackPoint.location.coordinates[0],
            lng: trackPoint.location.coordinates[1]
          });
        }
      });
    });
    return trackPoints.filter(trackPoint => trackPoint.route !== []);
  },
  getCurrentPositionPoints(apiTrackPointsResponse, resourcesArray) {
    let currentPositionPoints = [];
    resourcesArray.forEach(function(resource) {
      currentPositionPoints.push({
        resourceName: resource.name,
        resourceId: resource.id,
        resourceType: "person", // TODO: Personalizar los iconos para personas y vehículos.
        position: { lat: null, lng: null }
      });
    });
    currentPositionPoints.forEach(function(pointByResource) {
      let point = {
        coordinates: [],
        collected_at: null,
        resource_id: null
      };
      apiTrackPointsResponse.forEach(function(trackPoint) {
        if (pointByResource.resourceId === trackPoint.resource_id) {
          if (point.resource_id === null) {
            point.coordinates = trackPoint.location.coordinates;
            point.collected_at = trackPoint.collected_at;
            point.resource_id = trackPoint.resource_id;
          } else if (trackPoint.collected_at > point.collected_at) {
            point.coordinates = trackPoint.location.coordinates;
            point.collected_at = trackPoint.collected_at;
            point.resource_id = trackPoint.resource_id;
          }
        }
      });

      pointByResource.position = {
        lat: point.coordinates[0],
        lng: point.coordinates[1]
      };
    });

    return currentPositionPoints.filter(
      pointByResource =>
        pointByResource.position.lat !== undefined &&
        pointByResource.position.lng !== undefined
    );
  },
  getResources(apiIncidentsResourceResponse) {
    let resourcesArray = [];
    apiIncidentsResourceResponse.forEach(function(incidentResourceItem) {
      let name =
        incidentResourceItem.resource.user.last_name +
        " " +
        incidentResourceItem.resource.user.first_name;
      resourcesArray.push({
        id: incidentResourceItem.resource.id,
        name: name,
        show: true
      });
    });
    return resourcesArray;
  },
  getColor() {
    let colorSelected = colors[0];
    colors.shift();
    colors.push(colorSelected);
    return colorSelected.toString();
  }
};
