let apiResponse = [
  {
    location: {
      type: "Point",
      coordinates: [-31.425654, -62.085296]
    },
    collected_at: "2020-11-21T00:26:36+0000",
    internal_type: "TrackPoint",
    resource_id: 1
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.42580050120433, -62.08465511181211]
    },
    collected_at: "2020-11-21T00:26:37+0000",
    internal_type: "TrackPoint",
    resource_id: 1
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.426257644820797, -62.082022772727186]
    },
    collected_at: "2020-11-21T00:26:38+0000",
    internal_type: "TrackPoint",
    resource_id: 1
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.424790262364997, -62.08060739451158]
    },
    collected_at: "2020-11-21T00:26:39+0000",
    internal_type: "TrackPoint",
    resource_id: 1
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.425581, -62.085956]
    },
    collected_at: "2020-11-21T00:26:36+0000",
    internal_type: "TrackPoint",
    resource_id: 2
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.42528, -62.085035]
    },
    collected_at: "2020-11-21T00:26:37+0000",
    internal_type: "TrackPoint",
    resource_id: 2
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.425654, -62.085296]
    },
    collected_at: "2020-11-21T00:26:38+0000",
    internal_type: "TrackPoint",
    resource_id: 2
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.425654, -62.085296]
    },
    collected_at: "2020-11-21T00:26:39+0000",
    internal_type: "TrackPoint",
    resource_id: 2
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.425082, -62.085751]
    },
    collected_at: "2020-11-21T00:26:37+0000",
    internal_type: "TrackPoint",
    resource_id: 3
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.425117, -62.086124]
    },
    collected_at: "2020-11-21T00:26:38+0000",
    internal_type: "TrackPoint",
    resource_id: 3
  },
  {
    location: {
      type: "Point",
      coordinates: [-31.425654, -62.085296]
    },
    collected_at: "2020-11-21T00:26:39+0000",
    internal_type: "TrackPoint",
    resource_id: 3
  }
];
console.log(apiResponse);

export default {
  parsePoints(apiTrackPointsResponse, apiMapPointsResponse) {
    console.log(apiTrackPointsResponse);
    console.log(apiMapPointsResponse);
    // TODO: pass real API response to this function
    let parsedPoints = apiResponse;
    return parsedPoints;
  },
  getMapPoints(apiMapPointsResponse) {
    console.log(apiMapPointsResponse);
    return true;
  },
  getTrackPoints(apiTrackPointsResponse) {
    console.log(apiTrackPointsResponse);
    return true;
  },
  getCurrentPositionPoints(apiTrackPointsResponse) {
    console.log(apiTrackPointsResponse);
    return true;
  },
  getResources(apiTrackPointsResponse) {
    console.log(apiTrackPointsResponse);
    //TODO: search all the IDs, and get resources info.
    return true;
  }
};
