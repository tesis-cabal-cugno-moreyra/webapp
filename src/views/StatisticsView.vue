<template>
  <v-app>
    <v-card class="pt-5 pr-1 pl-1 pb-1 mt-5 mr-1 ml-1 mb-1" color="">
      <v-card-title> <h1>Estadísticas por recurso.</h1></v-card-title>
      <v-card-subtitle
        >Toda la expliación de las estadísticas y reportes
        necesaria.</v-card-subtitle
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
                >Cantidad total de participaciones en incidentes</v-card-title
              >
              <v-card-text justify="center"><h1>12</h1></v-card-text>
              <v-card-subtitle
                >Acá va la explicación de este número, explicar como leerlo y
                qué representa.</v-card-subtitle
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
                >Acá va la explicación de este gráfico, explicar comom leerlo y
                qué representa.</v-card-subtitle
              >
              <v-card-text fill-height fill-width>
                <line-chart :data-collection="lineChartDataWeekly"></line-chart>
              </v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
            </v-card>
            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Participación en incidentes en los últimos meses.</v-card-title
              >
              <v-card-subtitle
                >Acá va la explicación de este gráfico, explicar comom leerlo y
                qué representa.</v-card-subtitle
              >
              <v-card-text>
                <line-chart
                  :data-collection="lineChartDataMonthly"
                ></line-chart>
              </v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
            </v-card>
            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Participación en incidentes en los últimos años.</v-card-title
              >
              <v-card-subtitle
                >Acá va la explicación de este gráfico, explicar comom leerlo y
                qué representa.</v-card-subtitle
              >
              <v-card-text>
                <line-chart
                  :data-collection="lineChartDataAnnually"
                ></line-chart>
              </v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
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
                  >Acá va la explicación de este gráfico, explicar comom leerlo
                  y qué representa.</b
                ></v-card-subtitle
              >
              <v-card-text
                ><bar-chart
                  :orientation="'vertical'"
                  :data-collection="barChartData"
                ></bar-chart
              ></v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
            </v-card>

            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >3 tipos de incidente más frecuente a los que
                asistió.</v-card-title
              >
              <v-card-subtitle
                ><b
                  >Acá va la explicación de este gráfico, explicar comom leerlo
                  y qué representa.</b
                ></v-card-subtitle
              >
              <v-card-text
                ><pie-chart :data-collection="pieChartData"></pie-chart
              ></v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
            </v-card>

            <v-card class="pa-auto ma-auto pb-1 mb-1" color="#999999">
              <v-card-title
                >Comparativa de tiempo de trabajo por incidente.</v-card-title
              >
              <v-card-subtitle
                ><b
                  >Acá va la explicación de este gráfico, explicar comom leerlo
                  y qué representa.</b
                ></v-card-subtitle
              >
              <v-card-text color="white"
                ><bar-chart
                  :orientation="'horizontal'"
                  :data-collection="barChartData"
                ></bar-chart
              ></v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
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
                  >Acá va la explicación de este gráfico, explicar comom leerlo
                  y qué representa.</b
                ></v-card-subtitle
              >
              <v-card-text color="white">
                <v-data-table
                  :headers="this.headerIncidentsTable"
                  :items="this.incidentsByResource"
                  :items-per-page="5"
                  class="elevation-1"
                >
                </v-data-table>
              </v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
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
  name: "StatisticsView.vue",
  components: { BarChart, PieChart, LineChart },
  data() {
    return {
      resourceId: null,
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
    async loadIncidentsDataByUser() {
      this.loadingTable = true;

      // let searchInfo = {
      //   incident_type__name: "",
      //   status: "Finalized",
      //   page: 1
      // };

      let context = this;
      // TODO: obtener todos los incidentes en los que participó un recurso en particular, pasandole la id del recurso en la request.
      await context.$store
        .dispatch("incident/getIncident")
        .then(response => {
          this.incidentsByResource = response.data.results;
        })
        .catch(async () => {
          console.error("Error al buscar datos para llenar la tabla.");
        })
        .finally(async () => {
          console.log(
            "Búsqueda de datos para llenar la tabla finalizada con éxito."
          );
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
        })
        .finally(async () => {
          console.log("Estadística por recurso obtenida con éxito.");
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
