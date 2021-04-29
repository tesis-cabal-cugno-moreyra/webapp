import { Pie, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Pie,
  data: () => ({
    options: {
      legend: {
        labels: {
          fontColor: "white" //set your desired color
        }
      },
      responsive: true
    }
  }),
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
