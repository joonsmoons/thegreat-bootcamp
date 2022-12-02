<template>
  <div class="container">
    <button class="btn btn-primary me-1 mb-2" @click="doSearch">조회</button>
    <button class="btn btn-danger mb-2" @click="doDelete">삭제</button>
    <SimpleGrid2
      :items="drinkList"
      :headers="headers"
      :checkedKey="checkedKey"
      @select-checkbox="changeEvent"
    />
  </div>
</template>

<script>
import SimpleGrid2 from '@/components/fragment/SimpleGrid2.vue'
export default {
  components: { SimpleGrid2 },
  data() {
    return {
      sampleData: '',
      drinkList: [],
      headers: [
        { title: '제품코드', key: 'id' },
        { title: '제품명', key: 'name' },
        { title: '제품가격', key: 'price' }
      ],
      checkedKey: 'id',
      checkedItems: []
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    doSearch() {
      console.log('clicked doSearch()!')
      this.drinkList = [
        { id: 1, name: '코카콜라', price: 700, quantity: 5, status: 500 },
        { id: 2, name: '오렌지 주스', price: 1200, quantity: 5, status: 500 },
        { id: 3, name: '커피', price: 500, quantity: 5, status: 500 },
        { id: 4, name: '물', price: 700, quantity: 5, status: 500 },
        { id: 5, name: '옥수수수염차', price: 1200, quantity: 5, status: 500 },
        { id: 6, name: '밀키스', price: 700, quantity: 5, status: 500 },
        { id: 7, name: '트래비', price: 1000, quantity: 5, status: 500 }
      ]
    },
    doDelete() {
      this.drinkList = this.drinkList.filter(
        (drink) => !this.checkedItems.includes(drink.id)
      )
    },
    changeEvent(data) {
      this.checkedItems = data
      console.log(this.checkedItems)
    }
  }
}
</script>
