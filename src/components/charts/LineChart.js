import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  data: () => ({
    options: {
      responsive: true,
      legend: {
        labels: {
          fontColor: "white"
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "white",
              beginAtZero: true
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "white",
              beginAtZero: true
            }
          }
        ]
      }
    }
  }),
  mixins: [reactiveProp],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  }
};
