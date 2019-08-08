<template>
  <div>
    <canvas ref="canvas" width="400" height="400"> </canvas>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
//Exporting this so it can be used in other components
export default {
  props: {
    visited: null
  },
  extends: Bar,
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: [],
        datasets: [
          {
            label: "일간 방문자",
            backgroundColor: "#f87979",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            //Data to be represented on y-axis
            data: []
          }
        ]
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  watch: {
    visited: function() {
      if (this.visited != null) {
        for (var i = 0; i < 8; i++) {
          var input = this.visited[i][0].replace(
            /(\d{4})(\d{2})(\d{2})/,
            "$1-$2-$3"
          );
          this.datacollection.labels.push(input);
        }
        this.datacollection.datasets[0].data = [
          this.visited[0][1],
          this.visited[1][1],
          this.visited[2][1],
          this.visited[3][1],
          this.visited[4][1],
          this.visited[5][1],
          this.visited[6][1],
          this.visited[7][1]
        ];
        this.renderChart(this.datacollection, this.options);
      }
    }
  }
};
</script>

<style></style>
