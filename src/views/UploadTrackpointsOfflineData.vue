<template>
  <v-app>
    <v-container style="margin-top: 54px" fill-width>
      <v-layout row>
        <v-row justify="center">
          <v-container fluid>
            <v-row dense>
              <v-col cols="12">
                <v-card color="#385F73" dark>
                  <v-card-title class="text-h5">
                    Cargar Trackpoints relevados de manera offline
                  </v-card-title>
                  <v-card-subtitle>
                    Seleccione el recurso, el incidente y cargue el archivo
                    .csv. El mismo debe contener las tablas "datetime(utc)",
                    "latitude" y "longitude"
                  </v-card-subtitle>
                  <v-card-text>
                    <v-autocomplete
                      v-model="incident"
                      :items="incidentItems"
                      :loading="isIncidentsLoading"
                      :search-input.sync="incidentsSearchTerm"
                      :item-text="getIncidentTextRepresentation"
                      color="white"
                      hide-no-data
                      hide-selected
                      label="Incidentes"
                      placeholder="Escribe para buscar"
                      prepend-icon="mdi-database-search"
                      return-object
                    ></v-autocomplete>
                  </v-card-text>
                  <v-card-text>
                    <v-autocomplete
                      v-model="resource"
                      :items="resourceItems"
                      :loading="isResourcesLoading"
                      :search-input.sync="resourcesSearchTerm"
                      :item-text="getResourceTextRepresentation"
                      color="white"
                      hide-no-data
                      hide-selected
                      label="Recursos"
                      placeholder="Escribe para buscar"
                      prepend-icon="mdi-account"
                      return-object
                    ></v-autocomplete>
                  </v-card-text>
                  <v-card-text>
                    <v-file-input
                      accept=".csv"
                      placeholder="Seleccionar archivo .csv"
                      label="CSV"
                      ref="fileInput"
                      chips
                      show-size
                      @change="handleFileChange($event)"
                    ></v-file-input>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      text
                      v-on:click="onLoadData"
                      :disabled="isLoadDataButtonDisabled()"
                    >
                      Cargar Datos
                    </v-btn>
                    <v-btn
                      text
                      v-on:click="onUploadData"
                      :disabled="isUploadButtonDisabled()"
                      :loading="isUploadBeingMade"
                    >
                      Enviar
                    </v-btn>
                    <v-btn
                      text
                      color="error"
                      v-on:click="onClearData"
                      :disabled="isClearDataButtonDisabled()"
                    >
                      Limpiar campos
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid v-if="sanitizedData">
            <v-data-table
              item-key="name"
              class="elevation-1"
              :headers="headers"
              :items="sanitizedData"
              :items-per-page="15"
            ></v-data-table>
          </v-container>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Papa from "papaparse";
import debounce from "debounce";

export default {
  name: "UploadTrackpointsOfflineData",
  data() {
    return {
      headers: [
        { text: "Date Time (UTC)", value: "datetime(utc)" },
        { text: "Latitude", value: "latitude" },
        { text: "Longitude", value: "longitude" }
      ],
      file: null,
      sanitizedData: null,
      isUploadBeingMade: false,
      isIncidentsLoading: false,
      incidentsSearchTerm: "",
      incident: null,
      incidentItems: [],
      resource: null,
      resourceItems: [],
      isResourcesLoading: false,
      resourcesSearchTerm: ""
    };
  },
  watch: {
    incidentsSearchTerm(value) {
      if (!value) {
        return;
      }
      // Debounce the input and wait for a pause of at
      // least 200 milliseconds. This can be changed to
      // suit your needs.
      debounce(this.makeIncidentsSearch, 200)(value, this);
    },
    resourcesSearchTerm(value) {
      if (!value) {
        return;
      }
      // Debounce the input and wait for a pause of at
      // least 200 milliseconds. This can be changed to
      // suit your needs.
      debounce(this.makeResourcesSearch, 200)(value, this);
    }
  },
  methods: {
    isLoadDataButtonDisabled() {
      return !this.file;
    },
    isUploadButtonDisabled() {
      return !this.sanitizedData;
    },
    isClearDataButtonDisabled() {
      return !this.file;
    },
    onClearData() {
      this.sanitizedData = null;
      this.file = null;
      this.$refs.fileInput.value = null;
      this.resource = null;
      this.incident = null;
    },
    async onLoadData() {
      if (!this.file) {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "No se ha seleccionado un archivo! Intente nuevamente",
          color: "primary",
          timeout: 4000
        });
      }
      let parsedData = await this.parseFile(this.file);
      let sanitizedData = this.sanitizeParsedData(parsedData);
      if (sanitizedData.length === 0) {
        this.$store.commit("uiParams/dispatchAlert", {
          text:
            "Archivo sin valores válidos. Intente nuevamente con otro archivo",
          color: "primary",
          timeout: 4000
        });
      } else {
        this.sanitizedData = sanitizedData;
      }
    },
    async onUploadData() {
      if (!this.file) {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "No se ha seleccionado un archivo! Intente nuevamente",
          color: "primary",
          timeout: 4000
        });
        return;
      }
      if (!this.sanitizedData) {
        this.$store.commit("uiParams/dispatchAlert", {
          text:
            "No se han cargado los datos! Cargue un archivo CSV válido y haga click en el botón 'LOAD DATA'",
          color: "primary",
          timeout: 4000
        });
        return;
      }
      if (!this.incident) {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "No se ha seleccionado un incidente! Intente de nuevo",
          color: "primary",
          timeout: 4000
        });
        return;
      }
      if (!this.resource) {
        this.$store.commit("uiParams/dispatchAlert", {
          text: "No se ha seleccionado un recurso! Intente de nuevo",
          color: "primary",
          timeout: 4000
        });
        return;
      }
      let track_points = [];
      this.sanitizedData.forEach(trackPoint => {
        track_points.push({
          location: {
            type: "Point",
            coordinates: [trackPoint.latitude, trackPoint.longitude]
          },
          time_created: trackPoint["datetime(utc)"]
        });
      });

      this.isUploadBeingMade = true;
      await this.$store
        .dispatch("incident/postIncidentTrackPoints", {
          track_points,
          incident_id: this.incident.id,
          resource_id: this.resource.id
        })
        .then(response => {
          console.log({ response });
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Datos cargados exitosamente!",
            color: "success",
            timeout: 4000
          });
          this.isUploadBeingMade = false;
        })
        .catch(e => {
          console.error({ e });
          this.$store.commit("uiParams/dispatchAlert", {
            text: "Error en la carga de datos! Intente nuevamente",
            color: "primary",
            timeout: 4000
          });
          this.isUploadBeingMade = false;
        });
    },
    handleFileChange(file) {
      this.file = file;
    },
    parseFile(rawFile) {
      return new Promise(resolve => {
        Papa.parse(rawFile, {
          complete: results => {
            resolve(results.data);
          },
          dynamicTyping: true,
          header: true
        });
      });
    },
    sanitizeParsedData(parsedData) {
      const validKeys = ["datetime(utc)", "latitude", "longitude"];
      parsedData.forEach(element => {
        Object.keys(element).forEach(
          key => validKeys.includes(key) || delete element[key]
        );
      });
      let cleanedParsedData = parsedData
        .filter(
          trackPoint =>
            !!trackPoint["datetime(utc)"] &&
            trackPoint["datetime(utc)"] !== "1970-01-01 01:00:00"
        )
        .filter(
          trackPoint => !!trackPoint.latitude && trackPoint.latitude !== 0
        )
        .filter(
          trackPoint => !!trackPoint.longitude && trackPoint.longitude !== 0
        );
      return [
        ...new Map(
          cleanedParsedData.map(trackPoint => [
            trackPoint["datetime(utc)"],
            trackPoint
          ])
        ).values()
      ];
    },
    getIncidentTextRepresentation(item) {
      let location = "";
      if (item.location_as_string_reference) {
        location = `- Ubicado en ${item.location_as_string_reference}`;
      }
      return `(${item.status.toUpperCase()}) ${item.reference} ${location}`;
    },
    makeIncidentsSearch: async (reference, context) => {
      // Handle empty value
      if (!reference) {
        context.incidentItems = [];
        context.incidents = "";
      }
      // Items have already been requested
      if (context.isIncidentsLoading) {
        return;
      }

      context.isIncidentsLoading = true;
      await context.$store
        .dispatch("incident/getIncident", { reference__icontains: reference })
        .then(response => {
          context.incidentItems = response.data.results;
        })
        .finally(() => (context.isIncidentsLoading = false));
    },
    getResourceTextRepresentation(item) {
      let lastName = "";
      if (item.user.last_name) {
        lastName = ` - ${item.user.last_name}`;
      }
      let firstName = "";
      if (item.user.first_name) {
        firstName = ` , ${item.user.first_name}`;
      }

      return `(${item.user.username}) ${lastName} ${firstName}`;
    },
    makeResourcesSearch: async (username, context) => {
      // Handle empty value
      if (!username) {
        context.resourceItems = [];
        context.resource = "";
      }
      // Items have already been requested
      if (context.isResourcesLoading) {
        return;
      }

      context.isResourcesLoading = true;
      await context.$store
        .dispatch("domainConfig/getResource", {
          user__username__icontains: username
        })
        .then(response => {
          context.resourceItems = response.data.results;
        })
        .finally(() => (context.isResourcesLoading = false));
    }
  }
};
</script>

<style scoped></style>
