<template>
  <apexchart
    type="bar"
    :width="width"
    :height="height"
    :title="title"
    :legendPosition="legendPosition"
    :options="chartOptions"
    :series="series"
    :categories="categories"
  ></apexchart>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    title: {
      type: String,
      default: ''
    },
    legendPosition: {
      type: String,
      default: 'bottom'
    },
    series: {
      type: Array,
      default: function () {
        return []
      }
    },
    categories: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {},
  data() {
    return {
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top'
            }
          }
        },
        xaxis: {
          categories: []
        },
        // stroke: {
        //   width: 3,
        //   colors: ['black']
        // },
        legend: {
          show: true,
          position: this.legendPosition
        },
        title: {
          text: this.title
        }
      }
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.chartOptions.xaxis.categories = this.categories
  },
  unmounted() {},
  methods: {}
}
</script>
