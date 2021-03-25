<template>
  <div class="small">
    <pie-chart
      :chart-data="dataCollection"
      fill-height
      fill-width
      class="small"
    ></pie-chart>
    <!--    <v-btn @click="fillData()">Randomize</v-btn>-->
  </div>
</template>

<script>
import PieChart from "./PieChart.js";

export default {
  components: {
    PieChart
  },
  data() {
    return {
      dataCollection: {
        datasets: [
          {
            data: [10, 20, 30]
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["Red", "Yellow", "Blue"]
      }
    };
  }
  // mounted() {
  //   this.fillData();
  // },
  // methods: {
  //   fillData() {
  //     this.datacollection = {
  //       datasets: [
  //         {
  //           data: [10, 20, 30]
  //         }
  //       ],
  //
  //       // These labels appear in the legend and in the tooltips when hovering different arcs
  //       labels: ["Red", "Yellow", "Blue"]
  //     };
  //   }
  // }
};
</script>

<style scoped>
.small {
  max-width: 550px;
  min-width: 180px;
}
</style>
