<template>
  <v-app>
    <v-container class="pt-4 mt-4" fill-height>
      <v-layout row>
        <v-row align="center" justify="start">
          <v-card class="d-inline xs-1 sm-1 md-1 lg-1 xl-1">
            <v-card-title
              >Cantidad total de participaciones en incidentes</v-card-title
            >
            <v-card-text align="center" justify="center"
              ><h1>12</h1></v-card-text
            >
          </v-card>
          <v-card class="d-inline">
            <v-card-title
              >Cantidad de incidentes por mes, por día y por año.</v-card-title
            >
            <v-card-text>
              <line-chart></line-chart>
            </v-card-text>
          </v-card>
          <v-card class="d-inline">
            <pie-chart></pie-chart>
          </v-card>
          <v-card class="d-inline">
            <bar-chart></bar-chart>
          </v-card>
          <v-card class="d-inline">
            <doughnut-chart></doughnut-chart>
          </v-card>
        </v-row>
      </v-layout>
    </v-container>
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
