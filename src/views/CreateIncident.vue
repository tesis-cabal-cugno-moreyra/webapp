<template>
  <v-app>
    <v-container fill-height fill-width>
      <v-layout row>
        <v-row align="center" justify="center">
          <v-container text-center>
            <v-form>
              <v-select
                v-model="incidentAbstractionSelected"
                :items="incidentAbstractions"
                label="Incidente"
              ></v-select>
              <v-select
                v-model="incidentTypeSelected"
                :items="incidentTypes"
                label="Tipo de Incidente"
              ></v-select>
              <v-select
                v-model="visibility"
                :items="visibilityList"
                label="Visibilidad"
              ></v-select>
              <map-modal></map-modal>
              <v-text-field
                id="reference"
                v-model="reference"
                label="Referencia"
                name="reference"
                type="text"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-row>
        <v-row align="center" justify="center">
          <v-container text-center fluid>
            <v-btn
              x-large
              fab
              color="primary"
              :loading="tryToCreateIncident"
              v-on:click="createIncident"
              style="height: 200px; width: 200px;"
              >¡Crear!</v-btn
            >
            <v-btn color="black_selected" class="ma-5 pa-3" x-large
              >Cancelar</v-btn
            >
          </v-container>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import MapModal from "@/components/MapModal";

export default {
  name: "CreateIncident",
  components: { MapModal },
  data: function() {
    return {
      incidentAbstractionSelected: "",
      incidentTypeSelected: "",
      visibilityList: ["Privado", "Publico"],
      visibility: "",
      place: "",
      reference: "",
      errorMessage: "",
      tryToCreateIncident: false
    };
  },
  methods: {
    createIncident() {
      this.tryToCreateIncident = true;
      this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      // TODO: armar módulo de incidente en Vuex para interactuar con la API
      alert("Creando incidente...");
      this.tryToCreateIncident = false;
      this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
    }
  },
  computed: {
    ...mapGetters({
      incidentConfig: "domainConfig/incidentConfig",
      incidentAbstractions: "domainConfig/incidentAbstractions"
    }),
    incidentTypes() {
      let incidentTypes = [];
      this.incidentConfig.forEach(incident => {
        if (incident.incidentAbstraction == this.incidentAbstractionSelected) {
          incidentTypes = incident.incidentTypes;
        }
      });
      return incidentTypes;
    }
  }
};
</script>

<style scoped></style>
