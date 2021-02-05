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
            :items="this.incidentResources"
            height="210"
            item-height="55"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item.id">
                <v-list-item-content
                  class="d-flex justify-space-between pb-0 mb-0"
                >
                  {{ item.name() }}
                  <v-checkbox
                    v-model="item.showOnMap"
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
          <div
            v-for="(incidentResource, index) in incidentResources"
            :key="index"
          >
            <div v-if="incidentResource.showOnMap">
              <div
                v-for="(mapPoint, index) in incidentResource.mapPoints"
                :key="index"
              >
                <gmap-info-window
                  :options="infoOptionsMapPoint"
                  :position="infoWindowPosMapPoint"
                  :opened="infoWinOpenMapPoint"
                >
                </gmap-info-window>
                <gmap-marker
                  :position="{ lat: mapPoint.lat, lng: mapPoint.long }"
                  :key="index"
                  :clickable="true"
                  @mouseover="
                    toggleInfoWindowMapPoint(incidentResource, mapPoint, index)
                  "
                  @mouseout="infoWinOpenMapPoint = false"
                  :icon="{ url: require('@/assets/pins/map-pin.png') }"
                >
                </gmap-marker>
              </div>
            </div>
          </div>
        </div>
        <div v-if="switchTrackPoints">
          <div
            v-for="(incidentResource, index) in incidentResources"
            :key="index"
          >
            <div v-if="incidentResource.showOnMap">
              <gmap-polyline
                :path="incidentResource.getTrackPointsRoute()"
                ref="polyline"
                :options="{
                  strokeColor: incidentResource.getTrackPointsRouteColor()
                }"
              >
              </gmap-polyline>
            </div>
          </div>
        </div>
        <div v-if="switchCurrentPosition">
          <div
            v-for="(incidentResource, index) in incidentResources"
            :key="index"
          >
            <div v-if="incidentResource.showOnMap">
              <gmap-info-window
                :options="infoOptionsCurrentPosition"
                :position="infoWindowPosCurrentPosition"
                :opened="infoWinOpenCurrentPosition"
              >
              </gmap-info-window>

              <gmap-marker
                v-if="incidentResource.resourceTypeName === 'person'"
                :position="incidentResource.currentPosition()"
                :key="index"
                :clickable="true"
                @mouseover="
                  toggleInfoWindowCurrentPosition(incidentResource, index)
                "
                @mouseout="infoWinOpenCurrentPosition = false"
                :icon="{ url: require('@/assets/pins/person-marker.png') }"
              >
              </gmap-marker>
              <gmap-marker
                v-if="incidentResource.resourceTypeName === 'vehicle'"
                :position="incidentResource.currentPosition()"
                :key="index"
                :clickable="true"
                @mouseover="
                  toggleInfoWindowCurrentPosition(incidentResource, index)
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
import { Incident, MapPoint, TrackPoint } from "@/domain/resource";
import incidentPointsAdapter from "@/adapter/incidentPointsAdapter";
import googleMapsDefaultStyle from "@/utils/googleMapsDefaultStyle";
import WsApi from "@/services/wsApi";

export default {
  name: "IncidentMap",
  props: ["incidentData"],
  data() {
    return {
      centerLatitude: null,
      centerLongitude: null,
      switchMapPoints: false,
      switchTrackPoints: false,
      switchCurrentPosition: true,
      style: googleMapsDefaultStyle,
      incidentResources: [],
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
    await this.getIncidentResources();
    await this.getTrackPointsAlreadyLoaded();
    await this.getMapPointsAlreadyLoaded();
    await this.mapInitialConfiguration();
    await this.connectAndRetrieveRealTimeData();
  },
  computed: {
    incident() {
      if (!this.$route.params.id) {
        console.error("not defined id for incident");
      }
      return new Incident(this.$route.params.id);
    }
  },
  methods: {
    async getIncidentResources() {
      let getIncidentResourcesResponse = [];
      let payload = {
        incident_id: this.incident.id,
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

      if (getIncidentResourcesResponse.length) {
        this.incidentResources = incidentPointsAdapter.incidentResourcesAdapter(
          getIncidentResourcesResponse
        );
      }
    },
    async getTrackPointsAlreadyLoaded() {
      let trackPointsResponse = [];
      await this.$store
        .dispatch("incident/getIncidentTrackPoints", {
          incident_id: this.incident.id
        })
        .then(response => {
          trackPointsResponse = response.data;
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

      if (trackPointsResponse.length) {
        incidentPointsAdapter.trackPointsAdapter(
          this.incidentResources,
          trackPointsResponse
        );
      }
    },
    async getMapPointsAlreadyLoaded() {
      let incidentMapPointsResponse = [];
      await this.$store
        .dispatch("incident/getIncidentMapPoints", {
          incident_id: this.incident.id
        })
        .then(response => {
          incidentMapPointsResponse = response.data;
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

      if (incidentMapPointsResponse.length) {
        incidentPointsAdapter.mapPointsAdapter(
          this.incidentResources,
          incidentMapPointsResponse
        );
      }
    },
    async mapInitialConfiguration() {
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
            geolocationIsAllowed = result.state === "granted";
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
    toggleInfoWindowMapPoint: function(incidentResource, mapPoint, idx) {
      this.infoWindowPosMapPoint = mapPoint.position;
      this.infoOptionsMapPoint.content =
        "<strong style='color: black !important'>" +
        incidentResource.name() +
        ": " +
        mapPoint.comment +
        "</strong>";
      if (this.currentMidxMapPoint === idx) {
        this.infoWinOpenMapPoint = !this.infoWinOpenMapPoint;
      } else {
        this.infoWinOpenMapPoint = true;
        this.currentMidxMapPoint = idx;
      }
    },
    toggleInfoWindowCurrentPosition: function(incidentResource, idx) {
      this.infoWindowPosCurrentPosition = incidentResource.currentPosition();
      this.infoOptionsCurrentPosition.content =
        "<strong style='color: black !important'>" +
        incidentResource.name() +
        "</strong>";

      if (this.currentMidxCurrentPosition === idx) {
        this.infoWinOpenCurrentPosition = !this.infoWinOpenCurrentPosition;
      } else {
        this.infoWinOpenCurrentPosition = true;
        this.currentMidxCurrentPosition = idx;
      }
    },
    connectAndRetrieveRealTimeData() {
      const incidentSocket = new WsApi().getWebsocketConnection(
        `incident/${this.incident.id}/`
      );

      incidentSocket.onmessage = event => {
        const wsEventData = JSON.parse(event.data);
        console.log(event.data);
        const incidentResource = this.incidentResources.find(
          incidentResource =>
            incidentResource.id === wsEventData.data.resource.id
        );
        if (!incidentResource) {
          console.error("id not present here! We should register this user");
          return;
        }
        if (wsEventData.type === "map_point") {
          incidentResource.addMapPoint(
            new MapPoint(
              wsEventData.data.location.coordinates[0],
              wsEventData.data.location.coordinates[1],
              wsEventData.data.comment
            )
          );
        } else if (wsEventData.type === "track_point") {
          incidentResource.addTrackPoint(
            new TrackPoint(
              wsEventData.data.location.coordinates[0],
              wsEventData.data.location.coordinates[1]
            )
          );
        } else {
          throw new Error("Type not allowed for Point: " + wsEventData.type);
        }
      };
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
