<template>
  <div class="mt-3">
    <div class="row gy-2 gx-3 align-items-center">
      <div class="col-auto">
        <label class="visually-hidden" for="customerName">Name</label>
        <input
          type="text"
          class="form-control"
          id="customerName"
          placeholder="Customer Name"
          v-model="searchName"
          @keyup.enter="doSearch"
        />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary me-1" @click="doSearch">조회</button>
        <button
          class="btn btn-success me-1"
          :disabled="selectedCustomers.length === 0"
          @click="doSave"
        >
          저장
        </button>
        <button
          class="btn btn-danger"
          :disabled="selectedCustomers.length === 0"
          @click="doDelete"
        >
          삭제
        </button>
      </div>
    </div>
    <table class="table table-striped table-bordered mt-3">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="customer.id" v-for="customer in customers">
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              v-model="selectedCustomers"
              :value="customer.id"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="customer.name"
              class="form-control"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              v-model="customer.company"
              class="form-control"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              v-model="customer.email"
              class="form-control"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              v-model="customer.phone"
              class="form-control"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              v-model="customer.address"
              class="form-control"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchName: '',
      customers: [],
      selectedCustomers: []
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  watch: {
    // selectedCustomers(newVal, oldVal) {
    //   console.log(newVal, oldVal)
    // }
  },
  methods: {
    async doSearch() {
      //   if (this.customerName.trim() === '') {
      //     return ''
      //   }
      console.log('Customer Name', this.customerName)
      const loader = this.$loading.show()
      this.customers = await this.$get(
        `/customers?name_like=${this.searchName}`
      )
      loader.hide()
    },
    async doSave() {
      const selectedCustomerData = this.customers.filter(
        (customer) => this.selectedCustomers.indexOf(customer.id) > -1
      )
      // console.log(selectedCustomerData)
      let isEmptyName = false
      let isEmptyCompany = false
      let isEmptyEmail = false
      let isEmptyPhone = false
      let isEmptyAddress = false
      const isWrongEmails = []
      const regexpEmail =
        /^([a-z]+\d*)+(\.?[a-z]+\d*)+@([a-z]+\d*)+(\.[a-z]{2,3})+$/
      selectedCustomerData.forEach((customer) => {
        isEmptyName = customer.name === ''
        isEmptyCompany = customer.company === ''

        isEmptyPhone = customer.phone === ''
        isEmptyAddress = customer.address === ''
        isEmptyEmail = customer.email === ''
        if (customer.email === '') {
          isEmptyEmail = true
        } else {
          if (!regexpEmail.test(customer.email)) {
            isWrongEmails.push(customer.email)
          }
        }
      })

      console.log(selectedCustomerData)

      if (isEmptyName) {
        return this.$swal('입력되지 않은 Name이 있습니다', '', 'info')
      }
      if (isEmptyCompany) {
        return this.$swal('입력되지 않은 Company이 있습니다', '', 'info')
      }
      if (isEmptyPhone) {
        return this.$swal('입력되지 않은 Phone이 있습니다', '', 'info')
      }
      if (isEmptyAddress) {
        return this.$swal('입력되지 않은 Address이 있습니다', '', 'info')
      }
      if (isEmptyEmail) {
        return this.$swal('입력되지 않은 Email이 있습니다', '', 'info')
      }
      if (isWrongEmails.length > 0) {
        return this.$swal(
          '올바르지 않은 Email이 있습니다.',
          `${isWrongEmails.join(', ')}는 올바른 형식의 이메일이 아닙니다.`,
          'info'
        )
      }
      this.$swal({
        title: '고객 정보를 저장 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '저장',
        cancelButtonText: '취소'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // 저장 로직 구현
          const loader = this.$loading.show()

          let isSuccess = true
          selectedCustomerData.forEach(async (customer) => {
            const r = await this.$put(`/customers/${customer.id}`, customer)
            if (r.status !== 200) {
              isSuccess = false
            }
          })

          loader.hide()
          if (isSuccess) {
            this.$swal(
              '저장 되었습니다!',
              '선택한 데이터가 정상적으로 저장되었습니다.',
              'success'
            )
          } else {
            this.$swal(
              '저장에 실패한 데이터가 있습니다.',
              '재시도 하세요.',
              'error'
            )
          }
          this.selectedCustomers = []
          this.doSearch()
        }
      })
    },
    async doDelete() {
      this.$swal({
        title: '정말로 고객 정보를 삭제 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then(async (result) => {
        const loader = this.$loading.show()

        let isSuccess = true
        this.selectedCustomers.forEach(async (customer) => {
          const r = await this.$delete(`/customers/${customer.id}`)
          if (r.status !== 200) {
            isSuccess = false
          }
        })

        loader.hide()

        if (isSuccess) {
          this.$swal(
            '삭제 되었습니다!',
            '선택한 데이터가 정상적으로 삭제되었습니다.',
            'success'
          )
        } else {
          this.$swal(
            '삭제에 실패한 데이터가 있습니다.',
            '재시도 하세요.',
            'error'
          )
        }
        this.selectedCustomers = []
        this.doSearch()
      })
    }
  }
}
</script>
