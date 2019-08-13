<template>
  <div>
    <canvas :id="label" width="400" height="400"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: {
    originData: null,
    label: null
  },
  name: "WritePieChart",
  data: function() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          }
        ]
      }
    };
  },
  watch: {
    originData: function() {
      if (this.originData.length != 0) {
        for (var i = 0; i < this.originData.length; i++) {
          this.chartData.datasets[0].label = this.label;
          this.chartData.labels.push(this.originData[i][0]);
          this.chartData.datasets[0].data.push(this.originData[i][1]);
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          this.chartData.datasets[0].backgroundColor.push(
            "rgba(" + r + ", " + g + ", " + b + ", 0.5)"
          );
          this.chartData.datasets[0].borderColor.push(
            "rgba(" + r + ", " + g + ", " + b + ", 1)"
          );
        }
        this.createChart();
      }
    }
  },
  methods: {
    createChart() {
      var ctx = document.getElementById(this.label).getContext("2d");
      var myChart = new Chart(ctx, {
        type: "pie",
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }
};
</script>
<style></style>
