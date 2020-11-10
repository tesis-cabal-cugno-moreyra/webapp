<template>
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
</template>

<script>
export default {
  name: "Map"
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
