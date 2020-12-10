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
            :items="this.parsedPoints.resources"
            height="210"
            item-height="55"
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
  props: ["incidentData"],
  data() {
    return {
      id: null,
      centerLatitude: null,
      centerLongitude: null,
      switchMapPoints: false,
      switchTrackPoints: false,
      switchCurrentPosition: true,
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
        mapPoints: [],
        trackPoints: [],
        currentPositionPoints: [],
        resources: []
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
  async created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }
    let getIncidentResourcesResponse;
    let payload = {
      incident_id: this.id,
      resource__user__first_name: "",
      resource__user__last_name: "",
      resource__type: "",
      page: 1,
      page_size: 10000
    };
    await this.$store
      .dispatch("incident/getIncidentResources", payload)
      .then(response => {
        getIncidentResourcesResponse = response.data.results;
      })
      .catch(async () => {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "Hubo problemas en la busqueda de recursos relacionados",
          color: "primary",
          timeout: 4000
        });
      })
      .finally(async () => {
        this.loadingTable = false;
      });

    let getIncidentTrackPointsResponse;
    await this.$store
      .dispatch("incident/getIncidentTrackPoints", { incident_id: this.id })
      .then(response => {
        getIncidentTrackPointsResponse = response.data;
      })
      .catch(async () => {
        this.$store.commit("uiParams/dispatchAlert", {
          text:
            "Hubo problemas en la busqueda de los trackpoints de recursos relacionados",
          color: "primary",
          timeout: 4000
        });
      })
      .finally(async () => {
        this.loadingTable = false;
      });

    let getIncidentMapPointsResponse;
    await this.$store
      .dispatch("incident/getIncidentMapPoints", { incident_id: this.id })
      .then(response => {
        getIncidentMapPointsResponse = response.data;
      })
      .catch(async () => {
        this.$store.commit("uiParams/dispatchAlert", {
          text:
            "Hubo problemas en la busqueda de los mappoints de recursos relacionados",
          color: "primary",
          timeout: 4000
        });
      })
      .finally(async () => {
        this.loadingTable = false;
      });
    this.parsedPoints = incidentPointsAdapter.parsePoints(
      getIncidentResourcesResponse,
      getIncidentTrackPointsResponse,
      getIncidentMapPointsResponse
    );
    // TODO: Pasar por prop los datos del incidente para centrar el mapa en la geolocalización del mismo.
    if (this.incidentData) {
      // this.gettingLocation = true;
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.gettingLocation = true;
          this.location = pos;
          this.centerLatitude = this.incidentData.location_point.coordinates[0];
          this.centerLongitude = this.incidentData.location_point.coordinates[1];
        },
        err => {
          this.errorStr = err.message;
        }
      );
    } else {
      let geolocationIsAllowed = false;
      await navigator.permissions
        .query({ name: "geolocation" })
        .then(function(result) {
          if (result.state === "granted") {
            geolocationIsAllowed = true;
          } else {
            geolocationIsAllowed = false;
          }
        });
      if (geolocationIsAllowed) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            this.location = pos;
            this.centerLatitude = this.location.coords.latitude;
            this.centerLongitude = this.location.coords.longitude;
          },
          err => {
            this.errorStr = err.message;
          }
        );
      } else {
        this.$store.commit("uiParams/dispatchAlert", {
          text:
            "El sitio necesita acceder a su ubicación para poder visualizar el mapa. Luego de habilitar su ubicación, recargue la página por favor.",
          color: "primary",
          timeout: 25000
        });
      }
    }
  },
  methods: {
    toggleInfoWindowMapPoint: function(marker, idx) {
      this.infoWindowPosMapPoint = marker.position;
      this.infoOptionsMapPoint.content =
        "<strong style='color: black !important'>" +
        marker.resourceName +
        ": " +
        marker.description +
        "</strong>";
      if (this.currentMidxMapPoint === idx) {
        this.infoWinOpenMapPoint = !this.infoWinOpenMapPoint;
      } else {
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

      if (this.currentMidxCurrentPosition === idx) {
        this.infoWinOpenCurrentPosition = !this.infoWinOpenCurrentPosition;
      } else {
        this.infoWinOpenCurrentPosition = true;
        this.currentMidxCurrentPosition = idx;
      }
    },
    showResource: function(resourceId) {
      let listedResource = false;
      let showResource = false;
      if (this.parsedPoints.resources) {
        this.parsedPoints.resources.forEach(function(resource) {
          if (resource.id === resourceId) {
            listedResource = true;
            showResource = resource.show;
          }
        });
      }
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
