// let apiResponse = [
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.425654, -62.085296]
//     },
//     collected_at: "2020-11-21T00:26:36+0000",
//     internal_type: "TrackPoint",
//     resource_id: 1
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.42580050120433, -62.08465511181211]
//     },
//     collected_at: "2020-11-21T00:26:37+0000",
//     internal_type: "TrackPoint",
//     resource_id: 1
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.426257644820797, -62.082022772727186]
//     },
//     collected_at: "2020-11-21T00:26:38+0000",
//     internal_type: "TrackPoint",
//     resource_id: 1
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.424790262364997, -62.08060739451158]
//     },
//     collected_at: "2020-11-21T00:26:39+0000",
//     internal_type: "TrackPoint",
//     resource_id: 1
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.425581, -62.085956]
//     },
//     collected_at: "2020-11-21T00:26:36+0000",
//     internal_type: "TrackPoint",
//     resource_id: 2
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.42528, -62.085035]
//     },
//     collected_at: "2020-11-21T00:26:37+0000",
//     internal_type: "TrackPoint",
//     resource_id: 2
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.425654, -62.085296]
//     },
//     collected_at: "2020-11-21T00:26:38+0000",
//     internal_type: "TrackPoint",
//     resource_id: 2
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.425654, -62.085296]
//     },
//     collected_at: "2020-11-21T00:26:39+0000",
//     internal_type: "TrackPoint",
//     resource_id: 2
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.425082, -62.085751]
//     },
//     collected_at: "2020-11-21T00:26:39+0000",
//     internal_type: "TrackPoint",
//     resource_id: 3
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.425117, -62.086124]
//     },
//     collected_at: "2020-11-21T00:26:38+0000",
//     internal_type: "TrackPoint",
//     resource_id: 3
//   },
//   {
//     location: {
//       type: "Point",
//       coordinates: [-31.425654, -62.085296]
//     },
//     collected_at: "2020-11-21T00:26:37+0000",
//     internal_type: "TrackPoint",
//     resource_id: 3
//   }
// ];
//
// apiResponse = {
//   mapPoints: [
//     {
//       resourceName: "Name Lastname 2",
//       resourceId: 2,
//       position: { lat: -31.42528, lng: -62.085035 },
//       description: "Bla bla bla 2"
//     },
//     {
//       resourceName: "Name Lastname 3",
//       resourceId: 3,
//       position: { lat: -31.425117, lng: -62.086124 },
//       description: "Bla bla bla 3"
//     }
//   ],
//   trackPoints: [
//     {
//       resourceName: "Name Lastname 1",
//       resourceId: 1,
//       color: "blue",
//       route: [
//         { lat: -31.425654, lng: -62.085296 },
//         { lat: -31.42580050120433, lng: -62.08465511181211 },
//         { lat: -31.426257644820797, lng: -62.082022772727186 },
//         { lat: -31.424790262364997, lng: -62.08060739451158 }
//       ]
//     },
//     {
//       resourceName: "Name Lastname 2",
//       resourceId: 2,
//       color: "red",
//       route: [
//         { lat: -31.425581, lng: -62.085956 },
//         { lat: -31.42528, lng: -62.085035 },
//         { lat: -31.425654, lng: -62.085296 },
//         { lat: -31.425654, lng: -62.085296 }
//       ]
//     },
//     {
//       resourceName: "Name Lastname 3",
//       resourceId: 3,
//       color: "yellow",
//       route: [
//         { lat: -31.425082, lng: -62.085751 },
//         { lat: -31.425117, lng: -62.086124 },
//         { lat: -31.425654, lng: -62.085296 }
//       ]
//     },
//     {
//       resourceName: "Name Lastname 4",
//       resourceId: 4,
//       color: "green",
//       route: [
//         { lat: -31.425461874873964, lng: -62.08076612851433 },
//         { lat: -31.4237517932081, lng: -62.08058093883543 },
//         { lat: -31.423114031993038, lng: -62.083405081308435 },
//         { lat: -31.422814903555892, lng: -62.085772863629735 },
//         { lat: -31.423413159466918, lng: -62.08591836979892 },
//         { lat: -31.42453628997294, lng: -62.08608371771845 },
//         { lat: -31.424732, lng: -62.08566 }
//       ]
//     },
//     {
//       resourceName: "Name Lastname 5",
//       resourceId: 5,
//       color: "orange",
//       route: [
//         { lat: -31.425178, lng: -62.085526 },
//         { lat: -31.424732, lng: -62.08566 }
//       ]
//     }
//   ],
//   currentPositionPoints: [
//     {
//       resourceName: "Name Lastname 1",
//       resourceId: 1,
//       resourceType: "vehicle",
//       position: { lat: -31.425654, lng: -62.085296 }
//     },
//     {
//       resourceName: "Name Lastname 2",
//       resourceId: 2,
//       resourceType: "person",
//       position: { lat: -31.425581, lng: -62.085956 }
//     },
//     {
//       resourceName: "Name Lastname 3",
//       resourceId: 3,
//       resourceType: "person",
//       position: { lat: -31.425082, lng: -62.085751 }
//     },
//     {
//       resourceName: "Name Lastname 4",
//       resourceId: 4,
//       resourceType: "vehicle",
//       position: { lat: -31.424732, lng: -62.08566 }
//     },
//     {
//       resourceName: "Name Lastname 5",
//       resourceId: 5,
//       resourceType: "person",
//       position: { lat: -31.425178, lng: -62.085526 }
//     }
//   ]
// };
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
    return trackPoints;
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
    return currentPositionPoints;
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
