<template>
  <div class="small">
    <pie-chart :chart-data="dataCollection"></pie-chart>
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

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
