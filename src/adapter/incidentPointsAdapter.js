let apiResponse = [
  {
    point: {
      type: "Point",
      coordinates: [-31.427001, -62.088908]
    },
    collected_at: "datetime",
    internal_type: "TrackPoint",
    resource_id: 1
  },
  {
    point: {
      type: "Point",
      coordinates: [-31.426605, -62.091314]
    },
    collected_at: "datetime",
    internal_type: "TrackPoint",
    resource_id: 1
  },
  {
    point: {
      type: "Point",
      coordinates: [-31.425306, -62.091026]
    },
    collected_at: "datetime",
    internal_type: "TrackPoint",
    resource_id: 1
  }
];
console.log(apiResponse);

export default {
  parsePoints(apiResponse) {
    // TODO: pass real API response to this function
    let parsedPoints = apiResponse;
    return parsedPoints;
  }
};
