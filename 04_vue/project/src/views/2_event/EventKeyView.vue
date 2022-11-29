<template>
  <div>
    <!-- <input type="search" v-model="searchText" @keyup="checkEnter($event)" /> -->
    <input type="search" v-model="searchText" @keyup.enter="doSearch" />
    <button @click="doSearch">조회</button>
  </div>
</template>
<script>
// .enter .tab .delete .esc .space .up .down .left .right .ctrl.enter
// .stop - event.stopPropogration()
export default {
  components: {},
  data() {
    return {
      searchText: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    doSearch() {
      console.log(this.searchText)
    },
    checkEnter(event) {
      if (event.key === 'Enter') this.doSearch()
    }
  }
}
</script>
