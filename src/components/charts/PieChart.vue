<template>
  <v-flex class="xs11 sm12 md12 lg12 xl12">
    <pie-chart
      :chart-data="dataCollection"
      fill-height
      fill-width
      class="xs12 sm12 md12 lg12 xl12"
    ></pie-chart>
  </v-flex>
</template>

<script>
import PieChart from "./PieChart.js";

export default {
  components: {
    PieChart
  },
  props: ["dataCollection"]
};
</script>

<style scoped>
.small {
  /*max-width: 550px;*/
  /*min-width: 180px;*/
}
</style>
