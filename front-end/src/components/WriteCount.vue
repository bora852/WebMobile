<template>
  <CountChart :chart-data="chartData" :options="options" ref="count_chart">
  </CountChart>
</template>

<script>
import AuthService from "../services/AuthService";
import CountChart from "./CountChart";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateRotate: true
  },
  plugins: {
    labels: {
      render: "value"
    },
    datalabels: {
      color: ["white", "black"],
      weight: "bold",
      font: {
        weight: "bold",
        size: 20
      }
    }
  }
};

export default {
  name: "WriteCount",
  components: { CountChart },
  data: function() {
    return {
      options,
      chartData: {
        labels: ["Portfolio", "Post"],
        datasets: [
          {
            backgroundColor: ["rgba(255, 206, 86, 0.2)", "orange"],
            data: []
          }
        ]
      }
    };
  },
  created: async function() {
    var counts = await AuthService.getCounts();
    if (counts != null) {
      this.chartData.datasets[0].data = [
        counts.portfolioCount,
        counts.postCount
      ];
      this.$refs.count_chart.render();
    }
  }
};
</script>

<style>
.text-align {
  text-align: center;
}
.chart-label {
  font-size: 24px;
  color: orange;
}
.chart {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
