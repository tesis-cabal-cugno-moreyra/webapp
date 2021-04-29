<template>
  <v-flex class="xs11 sm12 md12 lg12 xl12">
    <v-overlay absolute v-if="waitingForData">
      <v-progress-circular indeterminate size="22"></v-progress-circular>
    </v-overlay>

    <line-chart
      :chart-data="dataCollection"
      class="xs12 sm12 md12 lg12 xl12"
      fill-height
      fill-width
      v-else
    ></line-chart>
  </v-flex>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart
  },
  props: ["dataCollection"],
  computed: {
    waitingForData() {
      return this.dataCollection == null;
    }
  }
};
</script>

<style scoped>
.small {
  /*max-width: 750px;*/
  /*min-width: 180px;*/
}
</style>
