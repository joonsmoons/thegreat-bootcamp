<template>
  <div>
    <img :src="imgSrc" style="width: 100px; height: auto" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1024px-Vue.js_Logo_2.svg.png?20170919082558'
    }
  }
}
</script>
