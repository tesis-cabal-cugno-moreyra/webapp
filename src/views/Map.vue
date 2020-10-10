<template>
  <v-app>
    <v-main>
      <h1>Autocomplete Example</h1>
      <label>
        AutoComplete
        <gmap-autocomplete
          placeholder="Ingrese el lugar del incidente aquí"
          @place_changed="addMarkerOnSearch"
        >
        </gmap-autocomplete>
        <button @click="saveMarker">Add</button>
      </label>
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
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Map",
  data: function() {
    return {
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
    },
    saveMarker() {
      // Use this function as a confirmation for the selected place
      // Alert here if No place is selected
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 90%;
}
</style>
