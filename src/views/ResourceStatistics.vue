<template>
  <v-app>
    <v-card class="pt-5 pr-1 pl-1 pb-1 mt-5 mr-1 ml-1 mb-1" color="">
      <v-card-title> <h1>Estadísticas por recurso.</h1></v-card-title>
      <v-card-subtitle
        >A continuación se detallarán las métricas obtenidas por la aplicación
        por cada recurso. Además, se podrá visualizar el listado de incidentes
        en los que el recurso participó.</v-card-subtitle
      >
      <v-card-text>
        <v-layout row class="pa-auto ma-auto" fill-height fill-width>
          <v-row
            align="center"
            justify="center"
            class="pa-auto ma-auto"
            fill-height
            fill-width
          >
            <v-card
              class="pa-auto ma-auto pb-1 mb-1"
              color="red darken-4"
              align="center"
            >
              <v-card-title
                >Cantidad total de participaciones en incidentes.</v-card-title
              >
              <v-card-text justify="center"
                ><h1>{{ this.incidentsAttended }}</h1></v-card-text
              >
              <v-card-subtitle
                >Todas las participaciones en incidentes en las que el recurso
                estuvo presente.</v-card-subtitle
              >
            </v-card>
          </v-row>
          <v-row
            align="center"
            justify="center"
            class="pa-auto ma-auto"
            fill-height
            fill-width
          >
            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Participación en incidentes en la última semana.</v-card-title
              >
              <v-card-subtitle
                >Distribución de número de incidentes asistidos por cada recurso
                por día.</v-card-subtitle
              >
              <v-card-text fill-height fill-width>
                <line-chart :data-collection="lineChartDataWeekly"></line-chart>
              </v-card-text>
            </v-card>
            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Participación en incidentes en los últimos meses.</v-card-title
              >
              <v-card-subtitle
                >Distribución de número de incidentes asistidos por cada recurso
                por mes.</v-card-subtitle
              >
              <v-card-text fill-height fill-width>
                <line-chart
                  :data-collection="lineChartDataMonthly"
                ></line-chart>
              </v-card-text>
            </v-card>
            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Participación en incidentes en los últimos años.</v-card-title
              >
              <v-card-subtitle
                >Distribución de número de incidentes asistidos por cada recurso
                por año.</v-card-subtitle
              >
              <v-card-text fill-height fill-width>
                <line-chart
                  :data-collection="lineChartDataAnnually"
                ></line-chart>
              </v-card-text>
            </v-card>
          </v-row>
          <v-row
            align="center"
            justify="center"
            class="pa-auto ma-auto"
            fill-height
            fill-width
          >
            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Tiempo promedio de trabajo en cada tipo de
                incidente.</v-card-title
              >
              <v-card-subtitle
                ><b
                  >Distribución de horas promedio pertenecientes a cada tipo de
                  incidente por recurso.</b
                ></v-card-subtitle
              >
              <v-card-text fill-height fill-width
                ><bar-chart
                  :orientation="'vertical'"
                  :data-collection="barChartData"
                ></bar-chart
              ></v-card-text>
            </v-card>

            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Proporción de incidentes asistidos por tipo de
                incidente.</v-card-title
              >
              <v-card-subtitle
                ><b
                  >Distribución en proporción de los incidentes asistidos por
                  tipo de incidente.</b
                ></v-card-subtitle
              >
              <v-card-text fill-height fill-width
                ><pie-chart :data-collection="pieChartData"></pie-chart
              ></v-card-text>
            </v-card>

            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Comparativa de tiempo de trabajo por incidente.</v-card-title
              >
              <v-card-subtitle
                ><b
                  >Distribución de horas de trabajo llevadas a cabo por recurso
                  en cada tipo de incidente.</b
                ></v-card-subtitle
              >
              <v-card-text color="white" fill-height fill-width
                ><bar-chart
                  :orientation="'horizontal'"
                  :data-collection="barChartData"
                ></bar-chart
              ></v-card-text>
            </v-card>
          </v-row>
          <v-row
            align="center"
            justify="center"
            class="pa-auto ma-auto"
            fill-height
            fill-width
          >
            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Listado de últimos incidentes en los que
                participó.</v-card-title
              >
              <v-card-subtitle
                ><b
                  >Tabla con el listado de los últimos incidentes en los que
                  participó el recurso.</b
                ></v-card-subtitle
              >
              <v-card-text color="white" fill-height fill-width>
                <v-data-table
                  :headers="this.headerIncidentsTable"
                  :items="this.incidentsByResource"
                  :items-per-page="5"
                  class="elevation-1"
                >
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-row>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import BarChart from "@/components/charts/BarChart.vue";
import { mapGetters } from "vuex";

export default {
  name: "ResourceStatistics",
  components: { BarChart, PieChart, LineChart },
  data() {
    return {
      resourceId: null,
      incidentsAttended: 0,
      headerIncidentsTable: [
        { text: "Estado", sortable: false, value: "status" },
        {
          text: "Completitud de detalles",
          sortable: false,
          value: "data_status"
        },
        {
          text: "Participación de recursos externos",
          sortable: false,
          value: "external_assistance"
        },
        {
          text: "Referencia de Ubicación",
          sortable: false,
          value: "location_as_string_reference"
        }
      ],
      incidentsByResource: [],
      barChartData: {},
      pieChartData: {},
      lineChartDataWeekly: {},
      lineChartDataMonthly: {},
      lineChartDataAnnually: {}
    };
  },
  async created() {
    if (!this.$route.params.id) {
      console.error("not defined id for incident");
    } else {
      this.resourceId = this.$route.params.id;
    }
    await this.getStatisticsByResource();
    await this.loadIncidentsDataByUser();
  },
  methods: {
    translateStatus(status) {
      switch (status) {
        case "Started":
          status = "Inicializado";
          break;
        case "Finalized":
          status = "Finalizado";
          break;
        case "Canceled":
          status = "Cancelado";
          break;
      }
      return status;
    },
    translateDataStatus(dataStatus) {
      switch (dataStatus) {
        case "Incomplete":
          dataStatus = "Incompleto";
          break;
        case "Complete":
          dataStatus = "Completo";
      }
      return dataStatus;
    },
    translateExternalAssistance(externalAssistance) {
      switch (externalAssistance) {
        case "With external support":
          externalAssistance = "Con asistencia externa.";
          break;
        case "Without external support":
          externalAssistance = "Sin asistencia externa.";
          break;
      }
      return externalAssistance;
    },
    translateLocationString(locationAsStringReference) {
      if (locationAsStringReference === "") {
        return "-";
      } else {
        return locationAsStringReference;
      }
    },
    async loadIncidentsDataByUser() {
      this.loadingTable = true;

      let context = this;
      await context.$store
        .dispatch("domainConfig/getIncidentsByResourceId", context.resourceId)
        .then(response => {
          let incidents = [];
          this.incidentsAttended = response.data.results.length;
          if (response.data.results !== []) {
            response.data.results.forEach(item => {
              item = {
                status: this.translateStatus(item.incident.status),
                data_status: this.translateDataStatus(
                  item.incident.data_status
                ),
                external_assistance: this.translateExternalAssistance(
                  item.incident.external_assistance
                ),
                location_as_string_reference: this.translateLocationString(
                  item.incident.location_as_string_reference
                )
              };
              incidents.push(item);
            });
            this.incidentsByResource = incidents;
          }
        })
        .catch(async () => {
          console.error("Error al buscar datos para llenar la tabla.");
        });
    },
    async getStatisticsByResource() {
      let context = this;
      await context.$store
        .dispatch("domainConfig/getStatisticsByResourceId", context.resourceId)
        .then(response => {
          context.barChartData = response.data.barChartData;
          context.lineChartDataAnnually = response.data.lineChartDataAnnually;
          context.lineChartDataMonthly = response.data.lineChartDataMonthly;
          context.lineChartDataWeekly = response.data.lineChartDataWeekly;
          context.pieChartData = response.data.pieChartData;
        })
        .catch(async () => {
          console.error(
            "Error al intentar obtener las estadísticas por recurso."
          );
        });
    },
    goToMap(incident) {
      this.$router.push({
        name: "IncidentMap",
        params: { id: incident.id, incidentData: incident }
      });
    }
  },
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig",
      incidentConfig: "domainConfig/incidentConfig"
    })
  }
};
</script>

<style scoped></style>
