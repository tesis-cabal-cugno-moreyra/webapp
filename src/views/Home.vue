<template>
  <v-app>
    <v-container fill-height fill-width>
      <v-layout row>
        <v-row align="center" justify="center">
          <v-container text-center>
            <v-row align="center" justify="center">
              <v-col cols="2" sm="12" md="12">
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
              <v-col cols="2" sm="12" md="12">
                <v-btn rounded color="primary" dark x-large class="ma-5 pa-5">
                  Ver Incidentes
                </v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="2" sm="12" md="12">
                <v-btn rounded color="primary" dark x-large class="ma-5 pa-5">
                  Ver Recursos
                </v-btn>
              </v-col>
              <v-col cols="1" sm="8" md="3"> </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import { domainConfigRoutes } from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig"
    })
  },
  async created() {
    await this.$store.dispatch("uiParams/showNavBar");
    await this.$store
      .dispatch("domainConfig/getDomainConfig")
      .catch(async () => {
        this.$router.addRoutes(domainConfigRoutes);
        await this.$router.push({ name: "DomainConfig" });
      });
  },
  methods: {
    createIncident: function() {
      console.log("Hi");
      this.$router.push({ name: "CreateIncident" });
    },
    beRude: function() {
      console.log("Asshole!");
    }
  }
};
</script>
