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
        :zoom="15"
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
                :options="{ strokeColor: '#999999' }"
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
                @mouseover="toggleInfoWindowCurrentPosition(marker, index)"
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
      checkbox: false,
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
            resourceName: "Name Lastname 1",
            resourceId: 1,
            position: { lat: -31.429363, lng: -62.105353 },
            description: "Bla bla bla 1"
          },
          {
            resourceName: "Name Lastname 1",
            resourceId: 1,
            position: { lat: -31.430845, lng: -62.103329 },
            description: "Bla bla bla 1"
          },
          {
            resourceName: "Name Lastname 2",
            resourceId: 2,
            position: { lat: -31.4293, lng: -62.105353 },
            description: "Bla bla bla 2"
          },
          {
            resourceName: "Name Lastname 3",
            resourceId: 3,
            position: { lat: -31.429363, lng: -62.105353 },
            description: "Bla bla bla 3"
          }
        ],
        trackPoints: [
          {
            resourceName: "Name Lastname 1",
            resourceId: 1,
            route: [
              { lat: -31.444926, lng: -62.081311 },
              { lat: -31.430845, lng: -62.103329 },
              { lat: -31.428031, lng: -62.0999 }
            ]
          },
          {
            resourceName: "Name Lastname 2",
            resourceId: 2,
            route: [
              { lat: -31.444933, lng: -62.0813 },
              { lat: -31.430398, lng: -62.1033 },
              { lat: -31.429872, lng: -62.09999 }
            ]
          }
        ],
        currentPositionPoints: [
          {
            resourceName: "Name Lastname 1",
            resourceId: 1,
            resourceType: "vehicle",
            position: { lat: -31.429363, lng: -62.105353 }
          },
          {
            resourceName: "Name Lastname 2",
            resourceId: 2,
            resourceType: "person",
            position: { lat: -31.428031, lng: -62.0999 }
          }
        ]
      },
      markersMapPoint: [
        {
          position: { lat: -31.429363, lng: -62.105353 },
          text: "Bla bla bla Bla bla bla Bla bla bla Bla bla bla"
        },
        { position: { lat: -31.430845, lng: -62.103329 }, text: "Ble ble ble" }
      ],
      resources: [
        [
          { lat: -31.444926, lng: -62.081311 },
          { lat: -31.430845, lng: -62.103329 },
          { lat: -31.428031, lng: -62.0999 }
        ],
        [
          { lat: -31.444933, lng: -62.0813 },
          { lat: -31.430398, lng: -62.1033 },
          { lat: -31.429872, lng: -62.09999 }
        ]
      ],
      markersCurrentPosition: [
        {
          resource: "person",
          position: { lat: -31.429872, lng: -62.09999 },
          text: "Name Lastname"
        },
        {
          resource: "vehicle",
          position: { lat: -31.428031, lng: -62.0999 },
          text: "Car 15"
        }
      ],
      statusText: "",
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
      },
      resourceListFilter: [
        { name: "Name LastName 1", id: 1, show: true },
        { name: "Name LastName 2", id: 2, show: false },
        { name: "Name LastName 3", id: 3, show: false },
        { name: "Name LastName 4", id: 4, show: true },
        { name: "Name LastName 5", id: 5, show: false },
        { name: "Name LastName 6", id: 6, show: false },
        { name: "Name LastName 7", id: 7, show: true },
        { name: "Name LastName 8", id: 8, show: true }
      ]
    };
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }
    // TODO: Call get incident endpoint. We need resources (with IDs) for scroll checkboxes
    // TODO: Call get incident trak-points endpoint, using incident id.
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
