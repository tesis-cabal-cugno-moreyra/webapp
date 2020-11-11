<template>
  <v-app>
    <v-container fill-height fill-width>
      <v-layout row>
        <v-row align="center" justify="center">
          <v-container text-center>
            <v-row align="center" justify="center">
              <v-col cols="1" xs="12" sm="12" md="3">
                <v-btn
                  rounded
                  color="primary"
                  dark
                  x-large
                  class="ma-5 pa-5"
                  v-on:click="createIncident"
                >
                  Crear Incidente
                </v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="1" xs="12" sm="12" md="3">
                <v-btn rounded color="primary" dark x-large class="ma-5 pa-5">
                  Ver Incidentes
                </v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="1" xs="12" sm="12" md="3">
                <v-btn rounded color="primary" dark x-large class="ma-5 pa-5">
                  Ver Recursos
                </v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="1" xs="12" sm="12" md="3"
                ><v-btn
                  rounded
                  color="primary"
                  dark
                  x-large
                  class="ma-5 pa-5"
                  v-on:click="goToMap"
                >
                  Ver Mapa
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig"
    })
  },
  created() {
    this.$store.dispatch("uiParams/showNavBar");
  },
  methods: {
    createIncident: function() {
      this.$router.push({ name: "CreateIncident" });
    },
    goToMap() {
      this.$router.push({ name: "IncidentMap" });
      // console.log("You must uncomment router push on Home.vue view!");
    }
  }
};
</script>
