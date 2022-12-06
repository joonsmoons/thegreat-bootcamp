export default {
  created() {
    console.log('formatter의 created')
  },
  mounted() {
    console.log('formatter의 mounted')
    console.log(this.$route.path)
  },
  unmounted() {
    console.log(this.$route.path)
  }
}
