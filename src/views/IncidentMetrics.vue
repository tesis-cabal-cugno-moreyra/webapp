<template>
  <v-app>
    <v-card class="pt-5 pr-1 pl-1 pb-1 mt-5 mr-1 ml-1 mb-1" color="">
      <v-card-title> <h1>Métricas del Incidente.</h1></v-card-title>
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
                  {{ this.incidentMetrics.incidentAbstraction }} -
                  {{ this.incidentMetrics.incidentType }} ({{
                    this.incidentMetrics.reference
                  }})
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
              color="red darken-4"
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
            <!--            </v-row>-->
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
        incidentAbstraction: "",
        incidentType: "",
        externalAssistance: "",
        point: "Somewhere", // Acá devolvé lo que puedas, tengo que ver como pasarle las coordenadas al mapa.
        reference: "",

        startDatetime: "", // Estos campos, si podés mandamelos como texto ya que no voy a hacer ningún calculo.
        endDatetime: "",
        workTime: "2h 16m",
        resourcesList: [
          // Esta lista la vamos a usar para armar la tabla de recursos vinculados al incidente.
          {}
        ],
        headerResourcesTable: [
          // TODO: Definir el encabezado de la tabla en base a lo que envíe backend.
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
        averageWorkTime: "1h 50m" // Este dato, lo vamos a usar para armar un grafico de barra comparando con el "workTime".
      }
    };
  },
  created() {
    this.incidentMetrics.incidentAbstraction = "Rescate";
    this.incidentMetrics.incidentType = "Rescate de Animales";
    this.incidentMetrics.externalAssistance = "Sí";
    this.incidentMetrics.point = "Somewhere";
    this.incidentMetrics.reference = "Cerca de la Plaza Cívica";
    this.incidentMetrics.startDatetime = "20/Mayo/2021 a las 17:34";
    this.incidentMetrics.endDatetime = "20/Mayo/2021 a las 19:54";
    this.incidentMetrics.workTime = "2h 20m";
    this.incidentMetrics.averageWorkTime = "2h 5m";
  }
};
</script>

<style scoped></style>
