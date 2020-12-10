<template>
  <v-app>
    <v-container fill-height fluid>
      <v-layout row>
        <v-row align="center" justify="center">
          <v-container text-center>
            <h1 style="font-size: 102px">{{ this.errorCode }}</h1>
            <h2>{{ this.errorMessage }}</h2>
            <v-btn v-on:click="goIncidentView">Ir a la página principal</v-btn>
          </v-container>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("uiParams/hideNavBar");
  },
  name: "Error",
  props: {
    errorCode: {
      type: Number,
      default: 404
    },
    errorMessage: {
      type: String,
      default: "No encontramos la página buscada."
    }
  },
  data() {
    return {
      code: this.errorCode,
      message: this.errorMessage
    };
  },
  methods: {
    goIncidentView() {
      this.$router.push({ name: "IncidentsView" });
    }
  }
};
</script>

<style scoped></style>
