<template>
  <div class="container">
    <button class="btn btn-primary me-1 mb-2" @click="doSearch">조회</button>
    <button class="btn btn-danger mb-2" @click="doDelete">삭제</button>
    <!-- <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>제품코드</th>
          <th>제품명</th>
          <th>제품가격</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="drink.id" v-for="drink in drinkList">
          <td>{{ drink.id }}</td>
          <td>{{ drink.name }}</td>
          <td>{{ drink.price }}</td>
        </tr>
      </tbody>
    </table> -->
    <SimpleGrid
      :items="drinkList"
      :headers="headers"
      :selectType="selectType"
      checkedKey="id"
      @change-item="changeCheckedValue"
      checkedEventName="change-item"
    />
  </div>
</template>
<script>
import SimpleGrid from '@/components/fragment/SimpleGrid.vue'
export default {
  components: { SimpleGrid },
  data() {
    return {
      selectType: 'checkbox',
      drinkList: [],
      headers: [
        { title: '제품코드', key: 'id' },
        { title: '제품명', key: 'name' },
        { title: '제품가격', key: 'price' }
      ],
      checkItems: [],
      checkedItem: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    doSearch() {
      console.log('running doSearch!')
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
    changeCheckedValue(data) {
      console.log('선택된 아이템', data)
      if (this.selectType === 'checkbox') {
        this.checkedItems = data
      } else if (this.selectType === 'radio') {
        this.checkedItem = data
      }
    }

    // checkedItem() {
    //   if (this.selectType === 'checkbox') {
    //     console.log(
    //       `parent checkbox checked: ${this.$refs.checkedChild.checkedItems}`
    //     )
    //   }
    //   if (this.selectType === 'radio') {
    //     console.log(
    //       `parent radio checked: ${this.$refs.checkedChild.checkedItem}`
    //     )
    //   }
    // }
  }
}
</script>
