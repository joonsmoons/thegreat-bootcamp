<template>
  <div>
    <input type="text" v-bind:value="userId" readonly />
    <br />
    <input type="text" :value="userId" readonly />
    <br />
    <img :src="imgSrc" style="width: 100px; height: auto" />
    <br />
    <input type="text" v-model="txt1" />
    <button :disabled="txt1 === ''">조회</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userId: 'joonsmoons',
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1024px-Vue.js_Logo_2.svg.png?20170919082558',
      txt1: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
