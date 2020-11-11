<template>
  <v-row class="fill-height">
    <v-col class="col-sm-3 col-md-4 col-lg-2 fill-height">
      <!--      <v-row align="center" justify="center" class="ma-auto pa-auto col-sm-12 col-md-12 col-lg-12">-->
      <!--        <v-container>-->
      <!--          Aquí va si querés ver track points y/o map points.-->
      <!--        </v-container>-->
      <!--      </v-row>-->
      <!--      <v-divider></v-divider>-->
      <!--      <v-row align="center" justify="center" class="ma-auto pa-auto col-sm-12 col-md-12 col-lg-12">-->
      <!--        <v-col class="col-sm-12 col-md-12 col-lg-12">-->
      <!--        <v-container>-->
      <!--          Aquí va para filtrar por recurso (ver trackpoints y/o mappoints de uno-->
      <!--          o varios recursos)-->
      <!--        </v-container>-->
      <!--        </v-col>-->
      <!--      </v-row>-->
      <v-container class="ma-auto pa-auto" style="flex-direction: column;">
        <v-row>
          Aquí va si querés ver track points y/o map points.
        </v-row>
        <v-row>
          Aquí va para filtrar por recurso (ver trackpoints y/o mappoints de uno
          o varios recursos)</v-row
        >
      </v-container>
    </v-col>
    <v-col class="col-sm-9 col-md-8 col-lg-10">
      <gmap-map
        class="map"
        :zoom="15"
        :options="{ styles: style }"
        :center="{ lat: centerLatitude, lng: centerLongitude }"
      >
        <!--        <gmap-marker-->
        <!--          v-if="this.searchedPlace"-->
        <!--          label="Lugar de incidente"-->
        <!--          :position="{-->
        <!--            lat: this.searchedPlace.geometry.location.lat(),-->
        <!--            lng: this.searchedPlace.geometry.location.lng()-->
        <!--          }"-->
        <!--        ></gmap-marker>-->
        <!--        <gmap-marker-->
        <!--          v-if="this.clickedPlace"-->
        <!--          label="Lugar de incidente"-->
        <!--          :position="{-->
        <!--            lat: this.clickedPlace.lat(),-->
        <!--            lng: this.clickedPlace.lng()-->
        <!--          }"-->
        <!--        ></gmap-marker>-->
      </gmap-map>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IncidentMap",
  data() {
    return {
      centerLatitude: null,
      centerLongitude: null,
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
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
