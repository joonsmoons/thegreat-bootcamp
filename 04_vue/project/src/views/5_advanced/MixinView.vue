<template>
  <div></div>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {
    console.log('mixin의 created')
  },
  mounted() {
    console.log('mixin의 mounted')
    console.log(this.$convertDateFormat('20220601', 'YYYY-MM-DD'))
    console.log(this.$convertDateFormat('20220601', 'MM-DD-YYYY'))
    this.getCustomers()
  },
  unmounted() {},
  methods: {
    async getCustomers() {
      const customers = await this.$get('http://localhost:3000/customers')
      console.log(customers)
    }
  }
}
</script>
