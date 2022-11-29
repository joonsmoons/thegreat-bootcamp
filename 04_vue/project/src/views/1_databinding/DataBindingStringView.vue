<template>
  <div>
    <h1>Hello {{ userName }}</h1>
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: 'John Doe',
      message: 'Welcome 개발자의 품격',
      arr: [],
      obj: {}
    }
  }
}
</script>

<style scoped>
.text-red {
  color: red;
}
</style>
