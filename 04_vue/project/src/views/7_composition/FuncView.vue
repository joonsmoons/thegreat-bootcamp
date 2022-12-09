<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" />
      <span>+</span>
      <input type="text" v-model.number="num2" />
      <span>=</span>
      <span>{{ result }}</span>
    </div>
  </div>
</template>
<script>
import { plusNumber2 } from '@/api/common.js'

export default {
  components: {},
  data() {},
  computed: {},
  setup() {
    const { num1, num2, result } = plusNumber2()
    return { num1, num2, result }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    // plusNumber() {
    //   this.result = this.num1 + this.num2
    // }
  }
}
</script>
