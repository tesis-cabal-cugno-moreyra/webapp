<template>
  <div class="small" v-if="showHorizontalBarChart">
    <horizontal-bar-chart
      :chart-data="datacollection"
      class="small"
      fill-height
      fill-width
    ></horizontal-bar-chart>
  </div>
  <div class="small" v-else>
    <bar-chart
      :chart-data="datacollection"
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
      datacollection: null,
      showHorizontalBarChart: false
    };
  },
  props: ["orientation"],
  mounted() {
    this.fillData();
    this.showHorizontalBarChart = this.orientation === "horizontal";
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Cantidad de X",
            backgroundColor: "red",
            barThickness: 25,
            maxBarThickness: 35,
            data: [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: "Cantidad de Y",
            backgroundColor: "blue",
            barThickness: 25,
            maxBarThickness: 35,
            data: [4, 9, 100, 60, 29, 10, 47]
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.small {
  max-width: 500px;
  min-width: 180px;
  min-height: 100px;
}
</style>
