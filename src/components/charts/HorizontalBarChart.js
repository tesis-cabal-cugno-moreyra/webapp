import { HorizontalBar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: HorizontalBar,
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
    this.renderChart(this.chartData, this.options);
  }
};
