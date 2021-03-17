<template>
  <v-app>
    <v-container fill-height fill-width>
      <v-layout row>
        <v-row align="center" justify="center">
          <v-card>
            <line-chart></line-chart>
          </v-card>
          <v-card>
            <pie-chart></pie-chart>
          </v-card>
          <v-card>
            <line-chart></line-chart>
          </v-card>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue";
import PieChart from "@/components/charts/PieChart";

export default {
  name: "StatisticsView.vue",
  components: { PieChart, LineChart }
};
</script>

<style scoped></style>
