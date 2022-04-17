import { IncidentResource, MapPoint, TrackPoint } from "@/domain/resource";

export default {
  incidentResourcesAdapter(
    getIncidentResourcesResponse,
    incidentResources = []
  ) {
    for (let incidentResourceResponse of getIncidentResourcesResponse) {
      incidentResources.push(
        new IncidentResource(
          incidentResourceResponse.resource.id,
          incidentResourceResponse.resource.user.id,
          incidentResourceResponse.resource.user.email,
          incidentResourceResponse.resource.user.username,
          incidentResourceResponse.resource.user.first_name,
          incidentResourceResponse.resource.user.last_name,
          incidentResourceResponse.resource.type.name,
          this.incident,
          incidentResourceResponse.resource.type.is_able_to_contain_resources
        )
      );
    }
    return incidentResources;
  },
  mapPointsAdapter(incidentResources, incidentMapPointsResponse) {
    for (let incidentResource of incidentResources) {
      let mapPointsFromIncidentResource = incidentMapPointsResponse.filter(
        mapPoint => mapPoint.resource.id === incidentResource.id
      );

      incidentResource.addMapPoints(
        mapPointsFromIncidentResource.map(mapPointResponse => {
          return new MapPoint(
            mapPointResponse.location.coordinates[0],
            mapPointResponse.location.coordinates[1],
            mapPointResponse.comment
          );
        })
      );
    }
  },
  trackPointsAdapter(incidentResources, trackPointsResponse) {
    for (let incidentResource of incidentResources) {
      let trackPointsFromIncidentResource = trackPointsResponse.filter(
        trackPoint => trackPoint.resource.id === incidentResource.id
      );

      incidentResource.addTrackPoints(
        trackPointsFromIncidentResource.map(trackPointResponse => {
          return new TrackPoint(
            trackPointResponse.location.coordinates[0],
            trackPointResponse.location.coordinates[1]
          );
        })
      );
    }
  }
};
