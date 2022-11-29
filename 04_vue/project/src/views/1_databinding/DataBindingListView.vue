<template>
  <div>
    <div>
      <select name="" id="">
        <option value=""></option>
        <option value="" :key="city.code" v-for="city in cities">
          {{ city.title }}
        </option>
      </select>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>제품번호</th>
            <th>제품이름</th>
            <th>가격</th>
            <th>주문수량</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="drink.id" v-for="drink in drinkList">
            <th>{{ drink.id }}</th>
            <th>{{ drink.name }}</th>
            <th>{{ drink.price }}</th>
            <th><input type="number" v-model="drink.quantity" /></th>
            <th>{{ drink.price * drink.quantity }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      cities: [
        { title: '서울', code: '02' },
        { title: '부산', code: '051' },
        { title: '제주', code: '064' }
      ],
      drinkList: [
        { id: 1, name: '코카콜라', price: 700, quantity: 5, status: 500 },
        { id: 2, name: '오렌지 주스', price: 1200, quantity: 5, status: 500 },
        { id: 3, name: '커피', price: 500, quantity: 5, status: 500 },
        { id: 4, name: '물', price: 700, quantity: 5, status: 500 },
        { id: 5, name: '옥수수수염차', price: 1200, quantity: 5, status: 500 },
        { id: 6, name: '밀키스', price: 700, quantity: 5, status: 500 },
        { id: 7, name: '트래비', price: 1000, quantity: 5, status: 500 }
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
