<template>
  <v-app>
    <v-card class="pt-5 pr-1 pl-1 pb-1 mt-5 mr-1 ml-1 mb-1" color="">
      <v-card-title> <h1>Estadísticas</h1></v-card-title>
      <v-card-subtitle
        >Toda la expliación de las estadísticas y reportes
        necesaria.</v-card-subtitle
      >
      <v-card-text>
        <v-layout row class="pa-2 ma-2" fill-height fill-width>
          <v-row
            align="center"
            justify="center"
            class="pa-1 ma-1"
            fill-height
            fill-width
          >
            <v-card fill-height fill-width color="red darken-4">
              <v-card-title
                >Cantidad total de participaciones en incidentes</v-card-title
              >
              <v-card-text align="center" justify="center"
                ><h1>12</h1></v-card-text
              >
              <v-card-subtitle
                >Acá va la explicación de este número, explicar como leerlo y
                qué representa.</v-card-subtitle
              >
            </v-card>
          </v-row>
          <v-row
            align="center"
            justify="center"
            class="pa-1 ma-1"
            fill-height
            fill-width
          >
            <v-card
              class="pa-1 ma-1"
              fill-height
              fill-width
              color="yellow darken-4"
            >
              <v-card-title
                >Cantidad de incidentes por día (últimos 7 días)</v-card-title
              >
              <v-card-subtitle
                >Acá va la explicación de este gráfico, explicar comom leerlo y
                qué representa.</v-card-subtitle
              >
              <v-card-text>
                <line-chart></line-chart>
              </v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
            </v-card>
            <v-card
              class="pa-1 ma-1"
              fill-height
              fill-width
              color="amber darken-4"
            >
              <v-card-title
                >Cantidad de incidentes por mes (últimos 12 meses)</v-card-title
              >
              <v-card-subtitle
                >Acá va la explicación de este gráfico, explicar comom leerlo y
                qué representa.</v-card-subtitle
              >
              <v-card-text>
                <line-chart></line-chart>
              </v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
            </v-card>
            <v-card
              class="pa-1 ma-1"
              fill-height
              fill-width
              color="orange darken-4"
            >
              <v-card-title
                >Cantidad de incidentes por año (últimos 5 años)</v-card-title
              >
              <v-card-subtitle
                >Acá va la explicación de este gráfico, explicar comom leerlo y
                qué representa.</v-card-subtitle
              >
              <v-card-text>
                <line-chart></line-chart>
              </v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
            </v-card>
          </v-row>
          <v-row
            align="center"
            justify="center"
            class="pa-1 ma-1"
            fill-height
            fill-width
          >
            <v-card class="pa-1 ma-1" color="deep-orange darken-4">
              <v-card-title
                >Porcentaje de incidentes con mayor participación.</v-card-title
              >
              <v-card-subtitle
                >Acá va la explicación de este gráfico, explicar comom leerlo y
                qué representa.</v-card-subtitle
              >
              <v-card-text><pie-chart></pie-chart></v-card-text>
              <v-card-subtitle>Notas extras.</v-card-subtitle>
            </v-card>
            <v-card class="d-inline">
              <bar-chart></bar-chart>
            </v-card>
            <v-card class="d-inline">
              <doughnut-chart></doughnut-chart>
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
import DoughnutChart from "@/components/charts/DoughnutChart.vue";

export default {
  name: "StatisticsView.vue",
  components: { DoughnutChart, BarChart, PieChart, LineChart }
};
</script>

<style scoped></style>
