<template>
  <div>
    <input type="radio" id="ai" value="AI" v-model="favoriteField" />
    <label for="ai">인공지능</label>
    <input type="radio" id="blockchain" value="BC" v-model="favoriteField" />
    <label for="blockchain">블록체인</label>
    <input type="radio" id="iot" value="IOT" v-model="favoriteField" />
    <label for="iot">사물인터넷</label>
    <input type="radio" id="other" value="OTH" v-model="favoriteField" />
    <label for="other">기타</label>
    <div v-show="favoriteField === 'OTH'">
      <input type="text" />
    </div>
    <!-- <div v-if="favoriteField === 'OTH'">
      <input type="text" />
    </div> -->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      favoriteField: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
