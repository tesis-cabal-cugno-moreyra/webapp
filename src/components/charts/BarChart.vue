<template>
  <v-flex class="xs11 sm12 md12 lg12 xl12">
    <horizontal-bar-chart
      :chart-data="dataCollection"
      class="xs12 sm12 md12 lg12 xl12"
      fill-height
      fill-width
      v-if="showHorizontalBarChart"
    ></horizontal-bar-chart>
    <bar-chart
      :chart-data="dataCollection"
      class="xs12 sm12 md12 lg12 xl12"
      fill-height
      fill-width
      v-else
    ></bar-chart>
  </v-flex>
</template>

<script>
import BarChart from "@/components/charts/BarChart.js";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";

export default {
  components: { BarChart, HorizontalBarChart },
  data() {
    return {
      showHorizontalBarChart: false
    };
  },
  props: ["orientation", "dataCollection"],
  mounted() {
    // this.fillData();
    this.showHorizontalBarChart = this.orientation === "horizontal";
  },
  methods: {
    fillData() {
      this.dataCollection = this.data;
    }
  }
};
</script>

<style scoped>
.small {
  /*max-width: 500px;*/
  /*min-width: 180px;*/
  /*min-height: 400px;*/
}
</style>
