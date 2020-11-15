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
                v-on:change="resetIncidentAbstractionsError"
              ></v-select>
              <v-select
                v-model="incidentTypeSelected"
                :items="incidentTypes"
                :error="incidentTypesError"
                :error-messages="incidentTypesErrorMessage"
                v-on:change="resetIncidentTypesError"
                label="Tipo de Incidente"
              ></v-select>
              <v-select
                v-model="external_assistance"
                :items="external_assistanceList"
                :error="external_assistanceError"
                :error-messages="external_assistanceErrorMessage"
                v-on:change="resetVisibilityError"
                label="Visibilidad"
              ></v-select>
              <map-modal v-on:place="placeChanged"></map-modal>
              <v-text-field
                id="reference"
                v-model="reference"
                :error="referenceError"
                :error-messages="referenceErrorMessage"
                v-on:keyup="resetReferenceError"
                label="Referencia"
                name="reference"
                type="text"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-row>
        <v-row align="center" justify="center">
          <v-container text-center fluid>
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
              <v-row align="center" justify="center">
                <v-alert
                  v-if="placeError"
                  color="error"
                  icon="mdi-alert"
                  max-width="350px"
                  class="pa-2 ma-2"
                >
                  {{ this.placeErrorMessage }}</v-alert
                >
              </v-row>
            </v-container>
            <v-btn
              color="black_selected"
              class="ma-5 pa-3"
              x-large
              v-on:click="goIncidentView"
              >Cancelar</v-btn
            >
          </v-container>
        </v-row>
        <incident-resource-list
          :show="showIncidentResourceList"
          :incidentId="incidentId"
          v-on:closeModal="closeModal"
        ></incident-resource-list>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import MapModal from "@/components/MapModal";
import IncidentResourceList from "@/components/IncidentResourceList";

export default {
  name: "CreateIncident",
  components: { IncidentResourceList, MapModal },
  data: function() {
    return {
      incidentAbstractionSelected: "",
      incidentAbstractionsError: false,
      incidentAbstractionsErrorMessage: "",
      incidentTypeSelected: "",
      incidentTypesError: false,
      incidentTypesErrorMessage: "",
      external_assistance: "",
      external_assistanceList: [
        "Sin asistencia externa",
        "Con asistencia externa"
      ],
      external_assistanceError: false,
      external_assistanceErrorMessage: "",
      place: null,
      placeError: false,
      placeErrorMessage: "",
      reference: "",
      referenceError: false,
      referenceErrorMessage: "",
      tryToCreateIncident: false,
      showIncidentResourceList: false,
      incidentId: 0
    };
  },
  methods: {
    async createIncident() {
      if (this.inputsFilled()) {
        this.tryToCreateIncident = true;
        await this.$store.dispatch("uiParams/turnOnSpinnerOverlay");
        let external_assistance;
        if (this.external_assistance === "Sin asistencia externa") {
          external_assistance = "Without external support";
        } else if (this.external_assistance === "Con asistencia externa") {
          external_assistance = "With external support";
        }
        let payload = {
          domain_name: this.domainConfig.name,
          incident_type_name: this.incidentTypeSelected,
          external_assistance: external_assistance,
          reference: this.reference,
          location_as_string_reference: this.place.text,
          location_point: {
            type: "Point",
            coordinates: [this.place.lat, this.place.lng]
          }
        };
        await this.$store
          .dispatch("incident/createIncident", payload)
          .then(response => {
            if (response.status === 201) {
              this.showIncidentResourceList = true;
              this.incidentId = response.data.id;
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
      this.placeError = false;
      this.place = place;
    },
    goIncidentView() {
      this.$router.push({ name: "incidentsView" });
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
      if (
        this.external_assistance === null ||
        this.external_assistance === ""
      ) {
        errorFound = true;
        this.external_assistanceError = true;
        this.external_assistanceErrorMessage =
          "Debe seleccionar la visibilidad.";
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
    },
    resetIncidentAbstractionsError() {
      this.incidentAbstractionsError = false;
      this.incidentAbstractionsErrorMessage = "";
    },
    resetIncidentTypesError() {
      this.incidentTypesError = false;
      this.incidentTypesErrorMessage = "";
    },
    resetVisibilityError() {
      this.external_assistanceError = false;
      this.external_assistanceErrorMessage = "";
    },
    resetReferenceError() {
      this.referenceError = false;
      this.referenceErrorMessage = "";
    },
    closeModal() {
      this.showIncidentResourceList = false;
      this.$router.push({ name: "incidentsView" });
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
