<template>
  <v-app>
    <v-container>
      <br />
      <br />
      <h1>StatisticsView</h1>
      <random-chart></random-chart>
    </v-container>
  </v-app>
</template>

<script>
import RandomChart from "@/components/RandomChart";

export default {
  name: "StatisticsView.vue",
  components: { RandomChart }
};
</script>

<style scoped></style>
