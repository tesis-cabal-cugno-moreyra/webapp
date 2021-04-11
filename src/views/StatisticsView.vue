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
      barChartData: {
        labels: [
          "Campos",
          "Estructurales",
          "Vehículos",
          "Pastizales",
          "Rescates",
          "Accidentes",
          "Varios"
        ],
        datasets: [
          {
            label: "Cantidad de Incidentes",
            backgroundColor: "red",
            barThickness: 25,
            maxBarThickness: 35,
            data: [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: "Cantidad de Incidentes Asistidos",
            backgroundColor: "green",
            barThickness: 25,
            maxBarThickness: 35,
            data: [4, 9, 1, 30, 29, 10, 37]
          }
        ]
      },
      pieChartData: {
        labels: [
          "Campos",
          "Estructurales",
          "Vehículos",
          "Pastizales",
          "Rescates",
          "Accidentes",
          "Varios"
        ],
        datasets: [
          {
            data: [40, 39, 10, 40, 39, 80, 40],
            backgroundColor: [
              "red",
              "blue",
              "yellow",
              "green",
              "white",
              "orange",
              "purple"
            ]
          }
        ]
      },
      lineChartDataWeekly: {
        labels: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado"
        ],
        datasets: [
          {
            label: "Incidentes asistidos",
            data: [1, 2, 0, 1, 0, 0, 1],
            borderColor: "green"
          },
          {
            label: "Total incidentes por día",
            data: [4, 9, 1, 3, 9, 1, 3],
            borderColor: "red"
          }
        ]
      },
      lineChartDataMonthly: {
        labels: [
          "Noviembre",
          "Diciembre",
          "Enero",
          "Febrero",
          "Marzo",
          "Abril"
        ],
        datasets: [
          {
            label: "Incidentes asistidos",
            data: [14, 25, 22, 13, 12, 7, 10],
            borderColor: "green"
          },
          {
            label: "Total incidentes por mes",
            data: [34, 45, 102, 30, 32, 67, 12],
            borderColor: "red"
          }
        ]
      },
      lineChartDataAnnually: {
        labels: ["2019", "2020", "2021"],
        datasets: [
          {
            label: "Incidentes asistidos",
            data: [123, 234, 78],
            borderColor: "green"
          },
          {
            label: "Total incidentes por mes",
            data: [354, 420, 92],
            borderColor: "red"
          }
        ]
      }
    };
  },
  async created() {
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
      await context.$store
        .dispatch("incident/getIncident")
        .then(response => {
          console.log(response);
          this.incidentsByResource = response.data.results;
        })
        .catch(async () => {
          console.log("Error al buscar datos para llenar la tabla.");
        })
        .finally(async () => {
          console.log(
            "Búsqueda de datos para llenar la tabla finalizada con éxito."
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
