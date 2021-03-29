<template>
  <div class="small">
    <pie-chart
      :chart-data="dataCollection"
      fill-height
      fill-width
      class="small"
    ></pie-chart>
  </div>
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
  max-width: 550px;
  min-width: 180px;
}
</style>
