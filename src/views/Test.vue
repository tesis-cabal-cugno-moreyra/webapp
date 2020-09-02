<template>
  <v-app>
    <v-container
      ><v-btn v-on:click="trySpinner">Probar Spinner</v-btn></v-container
    >
  </v-app>
</template>

<script>
export default {
  name: "Test",
  methods: {
    trySpinner: function() {
      this.$store.dispatch("changeSpinnerOverlayStateAction");
      let context = this;
      setTimeout(function() {
        context.$store.dispatch("changeSpinnerOverlayStateAction");
      }, 3000);
    }
  }
};
</script>

<style scoped></style>
