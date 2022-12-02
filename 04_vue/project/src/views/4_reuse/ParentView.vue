<template>
  <div>
    <button @click="changeValue" ref="btn">변경</button>
    <child-component
      :str="strParent"
      :num="numParent"
      :isOk="isOkParent"
      :arr="arrParent"
      :obj="objParent"
      @change-num="getData"
      ref="child1"
    />
  </div>
</template>
<script>
import ChildComponent from '@/components/fragment/ChildComponent.vue'
export default {
  components: { ChildComponent },
  data() {
    return {
      strParent: '개발자의 품격',
      numParent: 12,
      isOkParent: true,
      arrParent: [1, 2, 3, 4, 5],
      objParent: { name: 'Jeremy' }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    getData(data) {
      console.log(data)
      console.log('getData 함수 호출')
    },
    changeValue() {
      this.$refs.child1.str2 = 'Seoul'
      this.$refs.child1.callParent()
    }
  }
}
</script>
