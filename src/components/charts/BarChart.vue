<template>
  <div class="small" v-if="showHorizontalBarChart">
    <horizontal-bar-chart
      :chart-data="dataCollection"
      class="small"
      fill-height
      fill-width
    ></horizontal-bar-chart>
  </div>
  <div class="small" v-else>
    <bar-chart
      :chart-data="dataCollection"
      class="small"
      fill-heightw
      fill-width
    ></bar-chart>
  </div>
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
  max-width: 500px;
  min-width: 180px;
  min-height: 400px;
}
</style>
