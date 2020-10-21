<template>
  <div>
    <v-row justify="center">
      <div
        class="v-input theme--dark v-text-field v-text-field--is-booted ma-1 pa-2"
      >
        <div class="v-input__control">
          <div class="v-input__slot">
            <div class="v-text-field__slot">
              <gmap-autocomplete
                class="v-input v-text-field theme--dark"
                name="place"
                id="place1"
                placeholder="Lugar"
                ref="place1"
                @place_changed="addMarkerOnSearch"
              >
              </gmap-autocomplete>
            </div>
          </div>
          <div class="v-text-field__details">
            <div class="v-messages theme--dark">
              <div class="v-messages__wrapper"></div>
            </div>
          </div>
        </div>
      </div>
      <v-btn color="primary" class="ma-2" dark @click="dialog = true">
        Ver mapa
      </v-btn>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar dark color="primary" style="flex: 0 0 auto;">
            <v-toolbar-title>Buscar el lugar del incidente</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialog = false">
                Volver
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <gmap-map
              class="map"
              :zoom="15"
              :options="{ styles: style }"
              @click="addMarkerOnClick($event)"
              :center="{ lat: centerLatitude, lng: centerLongitude }"
            >
              <gmap-marker
                v-if="this.searchedPlace"
                label="Lugar de incidente"
                :position="{
                  lat: this.searchedPlace.geometry.location.lat(),
                  lng: this.searchedPlace.geometry.location.lng()
                }"
              ></gmap-marker>
              <gmap-marker
                v-if="this.clickedPlace"
                label="Lugar de incidente"
                :position="{
                  lat: this.clickedPlace.lat(),
                  lng: this.clickedPlace.lng()
                }"
              ></gmap-marker>
            </gmap-map>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "MapModal",
  data() {
    return {
      place: "",
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      centerLatitude: null,
      centerLongitude: null,
      markers: [],
      searchedPlace: null,
      clickedPlace: null,
      location: null,
      gettingLocation: false,
      errorStr: null,
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
      ]
    };
  },
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }
    this.gettingLocation = true;
    // get position
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
  methods: {
    addMarkerOnClick(event) {
      this.clickedPlace = event.latLng;
      // SearchedPlace is no useful here
      this.searchedPlace = null;

      let input1 = document.getElementById("place1");
      input1.value = "Punto seleccionado en el mapa.";

      let eventStrigified = JSON.stringify(event);
      let place = JSON.parse(eventStrigified);

      let myPlace = {
        text: "",
        lat: place.latLng.lat,
        lng: place.latLng.lng
      };
      this.$emit("place", myPlace);
    },
    setDescription(description) {
      this.description = description;
    },
    addMarkerOnSearch(place) {
      this.searchedPlace = place;
      this.centerLatitude = place.geometry.location.lat();
      this.centerLongitude = place.geometry.location.lng();
      // ClickedPlace is no useful here
      this.clickedPlace = null;
      let myPlace = {
        text: document.getElementById("place1").value,
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng()
      };
      this.$emit("place", myPlace);
    },
    saveMarker() {
      alert(this.searchedPlace);
    },
    cualquieraNoSe(cosa) {
      console.log(cosa);
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 85%;
}
</style>
