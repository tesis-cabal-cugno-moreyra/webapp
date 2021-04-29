<template>
  <v-flex class="xs11 sm12 md12 lg12 xl12">
    <doughnut-chart class="xs12 sm12 md12 lg12 xl12"></doughnut-chart>
  </v-flex>
</template>

<script>
import DoughnutChart from "./DoughnutChart.js";

export default {
  components: { DoughnutChart }
};
</script>

<style scoped>
.small {
  /*max-width: 600px;*/
  /*margin: 150px auto;*/
}
</style>
