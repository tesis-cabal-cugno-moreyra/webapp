<template>
  <v-app>
    <v-card class="pt-5 pr-1 pl-1 pb-1 mt-5 mr-1 ml-1 mb-1" color="">
      <v-card-title> <h1>Métricas del Incidente</h1></v-card-title>
      <v-card-subtitle
        >En este reporte se podrán observar las métricas obtenidas
        correspondientes al incidente.</v-card-subtitle
      >
      <v-card-text>
        <v-layout row class="pa-auto ma-auto" fill-height fill-width>
          <v-col align="center" justify="center">
            <v-card
              class="pa-auto ma-auto pb-1 mb-1 xs12 sm12 md12 lg12 xl12"
              color="red darken-4"
              align="center"
            >
              <v-card-title>Incidente</v-card-title>
              <v-card-text justify="center"
                ><h1>
                  {{ this.incidentMetrics.incidentType }} -
                  {{ this.incidentMetrics.reference }}
                </h1>
              </v-card-text>
            </v-card>
            <v-card
              class="pa-auto ma-auto pb-1 mb-1 xs12 sm12 md12 lg12 xl12"
              color="#999999"
            >
              <v-card-title>Cronología</v-card-title>
              <v-card-subtitle
                >Los datos cronológicos se obtienen al momento de crear y cerrar
                el incidente.</v-card-subtitle
              >
              <v-card-text
                ><h3>
                  Inicio del incidente:
                </h3>
                <h1>{{ this.incidentMetrics.startDatetime }}</h1></v-card-text
              >
              <v-card-text
                ><h3>
                  Fin del incidente:
                </h3>
                <h1>{{ this.incidentMetrics.endDatetime }}</h1></v-card-text
              >
              <v-card-text
                ><h3>
                  Tiempo de trabajo:
                </h3>
                <h1>{{ this.incidentMetrics.workTime }}</h1></v-card-text
              >
              <v-card-text
                ><h3>
                  Tiempo de trabajo promedio en este tipo de incidente:
                </h3>
                <h1>
                  {{ this.incidentMetrics.averageWorkTime }}
                </h1></v-card-text
              >
            </v-card>
            <v-card
              class="pa-auto ma-auto pb-1 mb-1 xs12 sm12 md12 lg12 xl12"
              color="#999999"
              align="center"
            >
              <v-card-title>Geolocalización del Incidente</v-card-title>
              <v-card-text class="justify-center">
                <v-btn v-on:click="goToMap">Ir al mapa</v-btn>
              </v-card-text>
            </v-card>
            <v-card
              class="pa-auto ma-auto pb-1 mb-1 xs12 sm12 md12 lg12 xl12"
              color="#999999"
              align="center"
            >
              <v-card-title
                >¿Con colaboración de recursos externos a la
                organización?</v-card-title
              >
              <v-card-subtitle
                >Los recursos pueden ser humanos y/o
                materiales.</v-card-subtitle
              >
              <v-card-text class="justify-center">
                <h1 class="justify-center">
                  {{ this.incidentMetrics.externalAssistance }}
                </h1></v-card-text
              >
            </v-card>
            <v-card
              class="pa-auto ma-auto pb-1 mb-1 xs12 sm12 md12 lg12 xl12"
              color="#999999"
            >
              <v-card-title
                >Listado de recursos participantes del incidente.</v-card-title
              >
              <v-card-subtitle
                ><b
                  >Tabla con el listado de todos los recursos que participaron
                  en el incidente.</b
                ></v-card-subtitle
              >
              <v-card-text color="white" fill-height fill-width>
                <v-data-table
                  :headers="this.incidentMetrics.headerResourcesTable"
                  :items="this.incidentMetrics.resourcesList"
                  :items-per-page="5"
                  class="elevation-1"
                >
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "IncidentMetrics",
  data() {
    return {
      incidentMetrics: {
        id: null,
        incidentType: "",
        externalAssistance: "",
        point: "",
        reference: "",
        startDatetime: "",
        endDatetime: "Aún no finalizó.",
        workTime: "Aún no finalizó.",
        resourcesList: [{}],
        headerResourcesTable: [
          { text: "Tipo de recurso", sortable: false, value: "type_name" },
          {
            text: "Nombre",
            sortable: false,
            value: "full_name"
          },
          {
            text: "Horario de vinculación al incidente",
            sortable: false,
            value: "created_at"
          },
          {
            text: "Horario de desvinculación del incidente",
            sortable: false,
            value: "exited_from_incident_at"
          }
        ],
        averageWorkTime: "0h"
      }
    };
  },
  async created() {
    if (!this.$route.params.id) {
      console.error("Not defined id for incident.");
      this.$route.push({ name: "Error" });
    } else {
      this.incidentMetrics.id = this.$route.params.id;
    }
    await this.$store
      .dispatch("incident/getIncidentById", this.incidentMetrics.id)
      .then(response => {
        this.incidentMetrics.incidentType = response.data.incident_type_name;
        this.incidentMetrics.externalAssistance =
          response.data.external_assistance;
        this.incidentMetrics.point = response.data.location_point;
        this.incidentMetrics.reference = response.data.reference;
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        let timeDifference = null;
        if (response.data.created_at) {
          let startDate = new Date(response.data.created_at);
          startDate = startDate.toLocaleTimeString("es-AR", options) + ".";
          startDate = startDate.charAt(0).toUpperCase() + startDate.slice(1);
          this.incidentMetrics.startDatetime = startDate;
        }
        if (response.data.finalized_at) {
          let endDate = new Date(response.data.finalized_at);
          endDate = endDate.toLocaleTimeString("es-AR", options) + ".";
          endDate = endDate.charAt(0).toUpperCase() + endDate.slice(1);
          this.incidentMetrics.endDatetime = endDate;
          timeDifference = this.dateDifference(
            new Date(response.data.finalized_at),
            new Date(response.data.created_at)
          );
        } else if (response.data.cancelled_at) {
          let endDate = new Date(response.data.cancelled_at);
          endDate = endDate.toLocaleTimeString("es-AR", options) + ".";
          this.incidentMetrics.endDatetime =
            "Incidente cancelado el día " + endDate;
          timeDifference = this.dateDifference(
            new Date(response.data.finalized_at),
            new Date(response.data.created_at)
          );
        }
        if (timeDifference) {
          this.incidentMetrics.workTime = "";
          if (timeDifference.days > 0) {
            this.incidentMetrics.workTime =
              timeDifference.days.toString() + "d ";
          }
          if (timeDifference.hours > 0) {
            this.incidentMetrics.workTime =
              this.incidentMetrics.workTime +
              timeDifference.hours.toString() +
              "h ";
          }
          if (timeDifference.minutes > 0) {
            this.incidentMetrics.workTime =
              this.incidentMetrics.workTime +
              timeDifference.minutes.toString() +
              "m ";
          }
          if (timeDifference.seconds > 0) {
            this.incidentMetrics.workTime =
              this.incidentMetrics.workTime +
              timeDifference.seconds.toString() +
              "s ";
          }
        }
      })
      .catch(async e => {
        console.error(e);
        this.$store.commit("uiParams/dispatchAlert", {
          text: "Hubo problemas en la busqueda del incidente.",
          color: "primary",
          timeout: 4000
        });
      });
    await this.$store
      .dispatch("incident/getIncidentResources", {
        incident_id: this.incidentMetrics.id,
        page_size: 100,
        page: 1
      })
      .then(response => {
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        this.incidentMetrics.resourcesList = [];
        response.data.results.forEach(item => {
          let resource = {
            created_at: null,
            exited_from_incident_at: null,
            full_name: null,
            type_name: null
          };
          if (item.created_at) {
            let createdAt = new Date(item.created_at);
            createdAt = createdAt.toLocaleTimeString("es-AR", options) + ".";
            createdAt = createdAt.charAt(0).toUpperCase() + createdAt.slice(1);
            resource.created_at = createdAt;
          } else {
            resource.created_at = "-";
          }
          if (item.exited_from_incident_at) {
            let exitedFromIncidentAt = new Date(item.exited_from_incident_at);
            exitedFromIncidentAt =
              exitedFromIncidentAt.toLocaleTimeString("es-AR", options) + ".";
            exitedFromIncidentAt =
              exitedFromIncidentAt.charAt(0).toUpperCase() +
              exitedFromIncidentAt.slice(1);
            resource.exited_from_incident_at = exitedFromIncidentAt;
          } else {
            resource.exited_from_incident_at = "-";
          }
          if (item.resource.user.last_name) {
            resource.full_name =
              item.resource.user.first_name +
              " " +
              item.resource.user.last_name;
          } else {
            resource.full_name = "-";
          }
          if (item.resource.type.name) {
            resource.type_name = item.resource.type.name;
          } else {
            resource.type_name = "-";
          }
          this.incidentMetrics.resourcesList.push(resource);
        });
      })
      .catch(async e => {
        console.error(e);
        this.$store.commit("uiParams/dispatchAlert", {
          text:
            "Hubo problemas en la busqueda de los recursos pertenecientes al incidente.",
          color: "primary",
          timeout: 4000
        });
      });
  },
  methods: {
    goToMap() {
      let incidentData = {
        location_point: {
          coordinates: []
        }
      };
      incidentData.location_point.coordinates = this.incidentMetrics.point.coordinates;
      this.$router.push({
        name: "IncidentMap",
        params: { id: this.incidentMetrics.id, incident: incidentData }
      });
    },
    dateDifference(date1, date2) {
      let difference;
      if (date1 > date2) {
        difference = date1 - date2;
      } else if (date1 < date2) {
        difference = date2 - date1;
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      let days, hours, minutes, seconds;
      seconds = Math.floor(difference / 1000);
      minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      days = Math.floor(hours / 24);
      hours = hours % 24;
      return { days: days, hours: hours, minutes: minutes, seconds: seconds };
    }
  }
};
</script>

<style scoped></style>
