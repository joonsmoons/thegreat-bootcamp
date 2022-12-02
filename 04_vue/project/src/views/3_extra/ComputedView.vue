<template>
  <div>
    <input type="text" v-model="firstName" />
    <input type="text" v-model="lastName" />
    <h1>{{ fullName }}</h1>
    <div>
      <label for="age">당신의 나이는?</label>
      <input type="number" id="age" v-model="age" />
    </div>
    <p>{{ isAdult }}</p>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      title: 'Mr.',
      age: 0
    }
  },
  computed: {
    fullName() {
      return `${this.title} ${this.firstName}, ${this.lastName}`
    },
    isAdult() {
      return this.age >= 20 ? '성인' : '미성년자'
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
