<template>
  <div class="small">
    <v-overlay absolute v-if="waitingForData">
      <v-progress-circular indeterminate size="22"></v-progress-circular>
    </v-overlay>

    <line-chart
      :chart-data="dataCollection"
      class="small"
      fill-height
      fill-width
      v-else
    ></line-chart>
  </div>
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
  max-width: 750px;
  min-width: 180px;
}
</style>
