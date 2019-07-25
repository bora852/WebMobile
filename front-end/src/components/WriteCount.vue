<template>
  <div class="chart text-align">
    <span class="chart-label title_font">게시글 수</span>
    <CountChart :chart-data="chartData" :options="options" ref="count_chart">
    </CountChart>
  </div>
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
        labels: ["Post", "Portfolio"],
        datasets: [
          {
            backgroundColor: ["orange", "yellow"],
            data: []
          }
        ]
      }
    };
  },
  created: async function() {
    var counts = await AuthService.getCounts();
    this.chartData.datasets[0].data = [counts.postCount, counts.portfolioCount];
    this.$refs.count_chart.render();
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
