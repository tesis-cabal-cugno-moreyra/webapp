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
                :error="incidentAbstractionsError"
                :error-messages="incidentAbstractionsErrorMessage"
              ></v-select>
              <v-select
                v-model="incidentTypeSelected"
                :items="incidentTypes"
                :error="incidentTypesError"
                :error-messages="incidentTypesErrorMessage"
                label="Tipo de Incidente"
              ></v-select>
              <v-select
                v-model="visibility"
                :items="visibilityList"
                :error="visibilityError"
                :error-messages="visibilityErrorMessage"
                label="Visibilidad"
              ></v-select>
              <map-modal v-on:place="placeChanged"></map-modal>
              <v-text-field
                id="reference"
                v-model="reference"
                :error="referenceError"
                :error-messages="referenceErrorMessage"
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
          <v-container
            ><v-alert v-if="placeError" color="error" icon="mdi-alert">
              {{ this.placeErrorMessage }}</v-alert
            ></v-container
          >
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
      incidentAbstractionsError: false,
      incidentAbstractionsErrorMessage: "",
      incidentTypeSelected: "",
      incidentTypesError: false,
      incidentTypesErrorMessage: "",
      visibility: "",
      visibilityList: ["Privado", "Publico"],
      visibilityError: false,
      visibilityErrorMessage: "",
      place: null,
      placeError: false,
      placeErrorMessage: "",
      reference: "",
      referenceError: false,
      referenceErrorMessage: "",
      tryToCreateIncident: false
    };
  },
  methods: {
    async createIncident() {
      if (this.inputsFilled()) {
        this.tryToCreateIncident = true;
        await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
        console.log(this.domainConfig);

        console.log(this.place);
        console.log(this.place.lat);
        console.log(this.place.lng);
        // TODO: armar módulo de incidente en Vuex para interactuar con la API
        let payload = {
          domain_name: this.domainConfig.name,
          incident_type_name: this.incidentTypeSelected,
          visibility: this.visibility,
          details: { reference: this.reference },
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
      }
      this.tryToCreateIncident = false;
      this.$store.dispatch("uiParams/turnOffSpinnerOverlay");
    },
    placeChanged(place) {
      alert(JSON.stringify(place));
      this.place = place;
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
    inputsFilled() {
      /* Try to find at least one input empty. */
      let errorFound = false;
      if (
        this.incidentAbstractionSelected === null ||
        this.incidentAbstractionSelected === ""
      ) {
        errorFound = true;
        this.incidentAbstractionsError = true;
        this.incidentAbstractionsErrorMessage =
          "Debe seleccionar un incidente.";
      }
      if (
        this.incidentTypeSelected === null ||
        this.incidentTypeSelected === ""
      ) {
        errorFound = true;
        this.incidentTypesError = true;
        this.incidentTypesErrorMessage =
          "Debe seleccionar un tipo de incidente.";
      }
      if (this.visibility === null || this.visibility === "") {
        errorFound = true;
        this.visibilityError = true;
        this.visibilityErrorMessage = "Debe seleccionar la visibilidad";
      }
      if (this.reference === null || this.reference === "") {
        errorFound = true;
        this.referenceError = true;
        this.referenceErrorMessage =
          "Debe ingresar una referencia, que indentifique el incidente.";
      }
      if (this.place === null || this.place === "") {
        errorFound = true;
        this.placeError = true;
        this.placeErrorMessage =
          "Debe seleccionar un lugar real, buscando en el campo o haciendo click en el mapa.";
      }

      return !errorFound;
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
