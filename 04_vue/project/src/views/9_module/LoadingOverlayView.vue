<template>
  <div>
    <button @click="doSearch">조회</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullPage: false
    }
  },
  methods: {
    doSearch() {
      const loader = this.$loading.show({})
      // simulate AJAX
      setTimeout(() => {
        loader.hide()
      }, 5000)
    }
  }
}
</script>
