<template>
  <div class="small">
    <doughnut-chart></doughnut-chart>
  </div>
</template>

<script>
import DoughnutChart from "./DoughnutChart.js";

export default {
  components: { DoughnutChart }
};
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
