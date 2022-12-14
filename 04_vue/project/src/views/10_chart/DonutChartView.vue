<template>
  <apexchart
    width="380px"
    type="pie"
    :options="options"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      options: {
        labels: ['자바', '파이썬', '자바스크립트', 'Node.js', 'DB'],
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        legend: {
          show: false
        }
      },
      series: [44, 55, 41, 17, 15]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
