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
              <map-modal v-on:place="placeChanged"></map-modal>
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
            <v-btn
              color="black_selected"
              class="ma-5 pa-3"
              x-large
              v-on:click="goHome"
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
      visibilityList: ["Private", "Public"],
      visibility: "",
      place: null,
      reference: "",
      errorMessage: "",
      tryToCreateIncident: false
    };
  },
  methods: {
    async createIncident() {
      this.tryToCreateIncident = true;
      await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
      console.log(this.domainConfig);

      console.log(this.place.lat);
      // TODO: armar módulo de incidente en Vuex para interactuar con la API
      let payload = {
        domain_name: this.domainConfig.name,
        incident_type_name: this.incidentTypeSelected,
        visibility: this.visibility,
        details: {},
        location_as_string_reference: this.place.text,
        location_point: {
          type: "Point",
          coordinates: [this.place.lat, this.place.lng]
        }
      };
      await this.$store
        .dispatch("incident/createIncident", payload)
        .then(response => {
          if (response.status === 200) {
            this.$router.push({ name: "Home" });
          }
        })
        .catch(e => {
          console.log(e);
        });

      this.tryToCreateIncident = false;
      this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
    },
    placeChanged(place) {
      alert(JSON.stringify(place));
      this.place = place;
    },
    goHome() {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    ...mapGetters({
      incidentConfig: "domainConfig/incidentConfig",
      incidentAbstractions: "domainConfig/incidentAbstractions",
      domainConfig: "domainConfig/domainConfig"
    }),
    incidentTypes() {
      let incidentTypes = [];
      if (this.incidentConfig !== null) {
        this.incidentConfig.forEach(incident => {
          if (
            incident.incidentAbstraction == this.incidentAbstractionSelected
          ) {
            incidentTypes = incident.incidentTypes;
          }
        });
      }
      return incidentTypes;
    }
  }
};
</script>

<style scoped></style>
