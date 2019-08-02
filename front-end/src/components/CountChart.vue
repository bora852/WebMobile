<script>
import { Doughnut } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  extends: Doughnut,
  plugins: ChartDataLabels,
  props: ["chartData", "options"],
  methods: {
    async render() {
      this.renderChart(this.chartData, this.options);
    }
  }
};
</script>
