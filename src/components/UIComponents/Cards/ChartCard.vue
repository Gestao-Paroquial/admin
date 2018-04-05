<template>
  <div class="card">
    <div class="header">
      <slot name="title" />
      <p class="category">
        <slot name="subTitle" />
      </p>
    </div>
    <div class="content">
      <div :id="chartId" class="ct-chart" />
      <div class="footer">
        <div class="chart-legend">
          <slot name="legend" />
        </div>
        <hr>
        <div class="stats">
          <slot name="footer" />
        </div>
        <div class="pull-right" />
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'ChartCard',
  props: {
    footerText: {
      type: String,
      default: '',
    },
    headerTitle: {
      type: String,
      default: 'Chart title',
    },
    chartType: {
      type: String,
      default: 'Line', // Line | Pie | Bar
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
    chartData: {
      type: Object,
      default: () => ({
        labels: [],
        series: [],
      }),
    },
  },
  data() {
    return {
      chartId: 'no-id',
    };
  },
  watch: {
    chartData() {
      this.initChart();
    },
  },
  methods: {
    /** *
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart() {
      const chartIdQuery = `#${this.chartId}`;
      this.$Chartist[this.chartType](
        chartIdQuery,
        this.chartData,
        this.chartOptions,
      );
    },
    /** *
     * Assigns a random id to the chart
     */
    updateChartId() {
      const currentTime = new Date().getTime().toString();
      const randomInt = this.getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
  mounted() {
    this.updateChartId();
    this.$nextTick(this.initChart);
  },
};
</script>
<style>

</style>
