<template>
  <v-row class="fill-height">
    <v-col
      class="col-sm-5 col-md-4 col-lg-3 col-xl-2 pt-5 pb-0 mt-5 pb-0 d-flex align-center flex-column"
    >
      <v-card class="pt-3 pr-0 pb-2 pl-2 mt-3 mr-0 mb-2 ml-2">
        <v-card-title>Filtros</v-card-title>
        <v-card-subtitle
          >Vea los puntos de interés y/o recorridos realizados.</v-card-subtitle
        >
        <v-card-text>
          <v-switch v-model="switchMapPoints" label="Ver map points"></v-switch>
          <v-switch
            v-model="switchCurrentPosition"
            label="Ver posición actual"
          ></v-switch>
          <v-switch
            v-model="switchTrackPoints"
            label="Ver track points"
          ></v-switch>
        </v-card-text>
      </v-card>
      <v-card class="pt-2 pr-0 pb-2 pl-2 mt-2 mr-0 mb-2 ml-2 fill-height">
        <v-card-title>Recursos</v-card-title>
        <v-card-subtitle>
          Filtre por recurso, selecione los que desea visualizar.
        </v-card-subtitle>
        <v-card-text>
          <v-virtual-scroll
            :items="resourceListFilter"
            height="260"
            item-height="64"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item.id">
                <v-list-item-content
                  class="d-flex justify-space-between pb-0 mb-0"
                >
                  {{ item.name }}
                  <v-checkbox
                    v-model="item.show"
                    class="pa-0 ma-0"
                  ></v-checkbox>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col class="col-sm-7 col-md-8 col-lg-9 col-xl-10 pt-5 pb-0 mt-5 pb-0">
      <gmap-map
        class="map"
        :zoom="14"
        :options="{ styles: style }"
        :center="{ lat: centerLatitude, lng: centerLongitude }"
      >
        <div v-if="switchMapPoints">
          <div v-for="(mapPoint, index) in parsedPoints.mapPoints" :key="index">
            <div v-if="showResource(mapPoint.resourceId)">
              <gmap-info-window
                :options="infoOptionsMapPoint"
                :position="infoWindowPosMapPoint"
                :opened="infoWinOpenMapPoint"
              >
              </gmap-info-window>
              <gmap-marker
                :position="mapPoint.position"
                :key="index"
                :clickable="true"
                @mouseover="toggleInfoWindowMapPoint(mapPoint, index)"
                @mouseout="infoWinOpenMapPoint = false"
                :icon="{ url: require('@/assets/pins/map-pin.png') }"
              >
              </gmap-marker>
            </div>
          </div>
        </div>
        <div v-if="switchTrackPoints">
          <div
            v-for="(trackPoint, index) in parsedPoints.trackPoints"
            :key="index"
          >
            <div v-if="showResource(trackPoint.resourceId)">
              <gmap-polyline
                :path="trackPoint.route"
                ref="polyline"
                :options="{ strokeColor: trackPoint.color }"
              >
              </gmap-polyline>
            </div>
          </div>
        </div>
        <div v-if="switchCurrentPosition">
          <div
            v-for="(currentPositionPoint,
            index) in parsedPoints.currentPositionPoints"
            :key="index"
          >
            <div v-if="showResource(currentPositionPoint.resourceId)">
              <gmap-info-window
                :options="infoOptionsCurrentPosition"
                :position="infoWindowPosCurrentPosition"
                :opened="infoWinOpenCurrentPosition"
              >
              </gmap-info-window>

              <gmap-marker
                v-if="currentPositionPoint.resourceType === 'person'"
                :position="currentPositionPoint.position"
                :key="index"
                :clickable="true"
                @mouseover="
                  toggleInfoWindowCurrentPosition(currentPositionPoint, index)
                "
                @mouseout="infoWinOpenCurrentPosition = false"
                :icon="{ url: require('@/assets/pins/person-marker.png') }"
              >
              </gmap-marker>
              <gmap-marker
                v-if="currentPositionPoint.resourceType === 'vehicle'"
                :position="currentPositionPoint.position"
                :key="index"
                :clickable="true"
                @mouseover="
                  toggleInfoWindowCurrentPosition(currentPositionPoint, index)
                "
                @mouseout="infoWinOpenCurrentPosition = false"
                :icon="{ url: require('@/assets/pins/car-marker.png') }"
              >
              </gmap-marker>
            </div>
          </div>
        </div>
      </gmap-map>
    </v-col>
  </v-row>
</template>

<script>
import incidentPointsAdapter from "@/adapter/incidentPointsAdapter";

export default {
  name: "IncidentMap",
  data() {
    return {
      id: null,
      centerLatitude: null,
      centerLongitude: null,
      switchMapPoints: false,
      switchTrackPoints: false,
      switchCurrentPosition: true,
      resourceListFilter: [
        { name: "Name LastName 1", id: 1, show: true },
        { name: "Name LastName 2", id: 2, show: false },
        { name: "Name LastName 3", id: 3, show: false },
        { name: "Name LastName 4", id: 4, show: true },
        { name: "Name LastName 5", id: 5, show: false }
      ],
      style: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#212121"
            }
          ]
        },
        {
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#212121"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#bdbdbd"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#181818"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1b1b1b"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#2c2c2c"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#8a8a8a"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#373737"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#3c3c3c"
            }
          ]
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [
            {
              color: "#4e4e4e"
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#000000"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#3d3d3d"
            }
          ]
        }
      ],
      parsedPoints: {
        mapPoints: [
          {
            resourceName: "Name Lastname 2",
            resourceId: 2,
            position: { lat: -31.42528, lng: -62.085035 },
            description: "Bla bla bla 2"
          },
          {
            resourceName: "Name Lastname 3",
            resourceId: 3,
            position: { lat: -31.425117, lng: -62.086124 },
            description: "Bla bla bla 3"
          }
        ],
        trackPoints: [
          {
            resourceName: "Name Lastname 1",
            resourceId: 1,
            color: "blue",
            route: [
              { lat: -31.425654, lng: -62.085296 },
              { lat: -31.42580050120433, lng: -62.08465511181211 },
              { lat: -31.426257644820797, lng: -62.082022772727186 },
              { lat: -31.424790262364997, lng: -62.08060739451158 }
            ]
          },
          {
            resourceName: "Name Lastname 2",
            resourceId: 2,
            color: "red",
            route: [
              { lat: -31.425581, lng: -62.085956 },
              { lat: -31.42528, lng: -62.085035 },
              { lat: -31.425654, lng: -62.085296 },
              { lat: -31.425654, lng: -62.085296 }
            ]
          },
          {
            resourceName: "Name Lastname 3",
            resourceId: 3,
            color: "yellow",
            route: [
              { lat: -31.425082, lng: -62.085751 },
              { lat: -31.425117, lng: -62.086124 },
              { lat: -31.425654, lng: -62.085296 }
            ]
          },
          {
            resourceName: "Name Lastname 4",
            resourceId: 4,
            color: "green",
            route: [
              { lat: -31.425461874873964, lng: -62.08076612851433 },
              { lat: -31.4237517932081, lng: -62.08058093883543 },
              { lat: -31.423114031993038, lng: -62.083405081308435 },
              { lat: -31.422814903555892, lng: -62.085772863629735 },
              { lat: -31.423413159466918, lng: -62.08591836979892 },
              { lat: -31.42453628997294, lng: -62.08608371771845 },
              { lat: -31.424732, lng: -62.08566 }
            ]
          },
          {
            resourceName: "Name Lastname 5",
            resourceId: 5,
            color: "orange",
            route: [
              { lat: -31.425178, lng: -62.085526 },
              { lat: -31.424732, lng: -62.08566 }
            ]
          }
        ],
        currentPositionPoints: [
          {
            resourceName: "Name Lastname 1",
            resourceId: 1,
            resourceType: "vehicle",
            position: { lat: -31.425654, lng: -62.085296 }
          },
          {
            resourceName: "Name Lastname 2",
            resourceId: 2,
            resourceType: "person",
            position: { lat: -31.425581, lng: -62.085956 }
          },
          {
            resourceName: "Name Lastname 3",
            resourceId: 3,
            resourceType: "person",
            position: { lat: -31.425082, lng: -62.085751 }
          },
          {
            resourceName: "Name Lastname 4",
            resourceId: 4,
            resourceType: "vehicle",
            position: { lat: -31.424732, lng: -62.08566 }
          },
          {
            resourceName: "Name Lastname 5",
            resourceId: 5,
            resourceType: "person",
            position: { lat: -31.425178, lng: -62.085526 }
          }
        ]
      },
      infoWindowPosMapPoint: null,
      infoWinOpenMapPoint: false,
      currentMidxMapPoint: null,
      infoOptionsMapPoint: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPosCurrentPosition: null,
      infoWinOpenCurrentPosition: false,
      currentMidxCurrentPosition: null,
      infoOptionsCurrentPosition: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }
    // TODO: GET /api/v1/incidents/{id}/
    // let getIncidentResponse = {
    //   id: 23,
    //   domain_name: "DominioPersonalizado",
    //   incident_type_name: "Capacitaicón",
    //   external_assistance: "Without external support",
    //   data_status: "Incomplete",
    //   status: "Started",
    //   location_as_string_reference: "",
    //   location_point: {
    //     type: "Point",
    //     coordinates: [-31.42258864467819, -62.1098611960261]
    //   },
    //   reference: "",
    //   created_at: "2020-10-25T21:52:33.993407Z",
    //   updated_at: "2020-10-25T21:52:33.993452Z",
    //   cancelled_at: null,
    //   finalized_at: null
    // };
    // TODO: GET /api/v1/incidents/{indicent_id}/resources/
    let getIncidentResourcesResponse = [
      {
        id: 74,
        created_at: "2020-11-17T14:44:24+0000",
        updated_at: "2020-11-17T14:44:24+0000",
        incident: {
          id: 23,
          created_at: "2020-10-25T21:52:33+0000",
          updated_at: "2020-10-25T21:52:33+0000",
          external_assistance: "Without external support",
          details: {},
          status: "Started",
          data_status: "Incomplete",
          location_as_string_reference: "",
          reference: "",
          location_point: {
            type: "Point",
            coordinates: [-31.42258864467819, -62.1098611960261]
          },
          finalized_at: null,
          cancelled_at: null,
          domain_config: 1,
          incident_type: 3
        },
        resource: {
          id: 9,
          user: "98fc6d81-30f1-4860-9a21-d9240f72e160",
          type: 2,
          domain: 1
        }
      },
      {
        id: 102,
        created_at: "2020-11-21T19:14:28+0000",
        updated_at: "2020-11-21T19:14:28+0000",
        incident: {
          id: 23,
          created_at: "2020-10-25T21:52:33+0000",
          updated_at: "2020-10-25T21:52:33+0000",
          external_assistance: "Without external support",
          details: {},
          status: "Started",
          data_status: "Incomplete",
          location_as_string_reference: "",
          reference: "",
          location_point: {
            type: "Point",
            coordinates: [-31.42258864467819, -62.1098611960261]
          },
          finalized_at: null,
          cancelled_at: null,
          domain_config: 1,
          incident_type: 3
        },
        resource: {
          id: 2,
          user: "a4c50701-1a2d-4960-be64-4966a88f8077",
          type: 1,
          domain: 1
        }
      },
      {
        id: 118,
        created_at: "2020-11-21T19:27:51+0000",
        updated_at: "2020-11-21T19:27:51+0000",
        incident: {
          id: 23,
          created_at: "2020-10-25T21:52:33+0000",
          updated_at: "2020-10-25T21:52:33+0000",
          external_assistance: "Without external support",
          details: {},
          status: "Started",
          data_status: "Incomplete",
          location_as_string_reference: "",
          reference: "",
          location_point: {
            type: "Point",
            coordinates: [-31.42258864467819, -62.1098611960261]
          },
          finalized_at: null,
          cancelled_at: null,
          domain_config: 1,
          incident_type: 3
        },
        resource: {
          id: 11,
          user: "f196f272-c272-4def-b149-6d0fac71ea14",
          type: 1,
          domain: 1
        }
      }
    ];
    // TODO: GET TrackPoints
    let getIncidentTrackPointsResponse = [
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
    // TODO: GET MapPoints
    let getIncidentMapPointsResponse = [];

    let parsedPoints = incidentPointsAdapter.parsePoints(
      getIncidentResourcesResponse,
      getIncidentTrackPointsResponse,
      getIncidentMapPointsResponse
    );
    console.log(parsedPoints);
    // this.parsedPoints = parsedPoints;

    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }
    this.gettingLocation = true;
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.gettingLocation = true;
        this.location = pos;
        this.centerLatitude = this.location.coords.latitude;
        this.centerLongitude = this.location.coords.longitude;
      },
      err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
  computed: {
    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1);
    },
    length() {
      return 15;
    }
  },
  methods: {
    toggleInfoWindowMapPoint: function(marker, idx) {
      this.infoWindowPosMapPoint = marker.position;
      this.infoOptionsMapPoint.content =
        "<strong style='color: black !important'>" +
        marker.description +
        "</strong>";

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidxMapPoint === idx) {
        this.infoWinOpenMapPoint = !this.infoWinOpenMapPoint;
      }

      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpenMapPoint = true;
        this.currentMidxMapPoint = idx;
      }
    },
    toggleInfoWindowCurrentPosition: function(marker, idx) {
      this.infoWindowPosCurrentPosition = marker.position;
      this.infoOptionsCurrentPosition.content =
        "<strong style='color: black !important'>" +
        marker.resourceName +
        "</strong>";

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidxCurrentPosition === idx) {
        this.infoWinOpenCurrentPosition = !this.infoWinOpenCurrentPosition;
      }

      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpenCurrentPosition = true;
        this.currentMidxCurrentPosition = idx;
      }
    },
    showResource: function(resourceId) {
      let listedResource = false;
      let showResource = false;
      this.resourceListFilter.forEach(function(resource) {
        if (resource.id === resourceId) {
          listedResource = true;
          showResource = resource.show;
        }
      });
      if (listedResource === false) {
        return false;
      } else {
        return showResource;
      }
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
