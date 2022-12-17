<template>
  <div class="mt-3">
    <div class="row gy-2 gx-2 align-items-center mb-3">
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
      </div>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="customers"
      :sort-options="{ enabled: true }"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        perPage: 5,
        perPageDropdownEnabled: true
      }"
      v-on:cell-click="onCellClick"
    >
    </vue-good-table>

    <div class="mt-3 customer-form" v-show="selectedId !== ''">
      <div class="row mb-3">
        <label for="customerName" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="customerName"
            v-model="customer.name"
            :disabled="!editMode"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="customerCompany" class="col-sm-2 col-form-label"
          >Company</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="customerCompany"
            v-model="customer.company"
            :disabled="!editMode"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="customerEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control"
            id="customerEmail"
            v-model="customer.email"
            :disabled="!editMode"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="customerPhone" class="col-sm-2 col-form-label">Phone</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="customerPhone"
            v-model="customer.phone"
            :disabled="!editMode"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="customerAddress" class="col-sm-2 col-form-label"
          >Address</label
        >
        <div class="col-sm-10">
          <div class="input-group mb-1">
            <input
              type="text"
              class="form-control"
              placeholder="우편번호"
              :disabled="true"
              v-model="customer.zoneCode"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="postcode"
              @click="openPostCode"
            >
              검색
            </button>
          </div>
          <div class="mb-1">
            <input
              type="text"
              class="form-control"
              :disabled="true"
              placeholder="도로명주소"
              v-model="customer.roadAddress"
            />
          </div>
          <div>
            <input
              type="text"
              class="form-control"
              placeholder="상세주소"
              v-model="customer.detailAddress"
              :disabled="!editMode"
            />
          </div>
        </div>
      </div>

      <button
        class="btn btn-primary me-2"
        @click="toggleEdit"
        v-show="!editMode"
      >
        Edit
      </button>
      <button
        class="btn btn-secondary me-2"
        @click="toggleEdit"
        v-show="editMode"
      >
        Cancel
      </button>
      <button class="btn btn-success me-2" @click="doSave" v-show="editMode">
        Save
      </button>
      <button class="btn btn-danger me-2" @click="doDelete" v-show="editMode">
        Delete
      </button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchName: '',
      customers: [],
      columns: [
        { label: 'Name', field: 'name', tdClass: 'link-primary' },
        { label: 'Company', field: 'company' },
        { label: 'Email', field: 'email' },
        { label: 'Phone', field: 'phone' },
        { label: 'Address', field: 'address' }
      ],
      customer: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        zoneCode: '',
        roadAddress: '',
        detailAddress: ' '
      },
      selectedId: '',
      editMode: false
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.doSearch()
    this.loadScript()
  },
  unmounted() {},
  methods: {
    async doSearch() {
      const loader = this.$loading.show()
      this.customers = await this.$get(
        `/customers?name_like=${this.searchName}`
      )
      loader.hide()
    },
    onCellClick(params) {
      if (params.column.field === 'name') {
        this.selectedId = params.row.id
        this.editMode = false
        this.getCustomer()
      }
    },
    async getCustomer() {
      this.customer = await this.$get(`/customers/${this.selectedId}`)
    },
    toggleEdit() {
      this.editMode = !this.editMode
    },
    doSave() {
      if (this.customer.name === '') {
        return this.$swal(
          'Name을 입력하세요.',
          'Name은 필수 입력 값입니다.',
          'info'
        )
      }
      if (this.customer.company === '') {
        return this.$swal(
          'Company를 입력하세요.',
          'Company는 필수 입력 값입니다.',
          'info'
        )
      }
      if (this.customer.email === '') {
        return this.$swal(
          'Email을 입력하세요.',
          'Email은 필수 입력 값입니다.',
          'info'
        )
      }
      if (this.customer.phone === '') {
        return this.$swal(
          'Phone을 입력하세요.',
          'Phone은 필수 입력 값입니다.',
          'info'
        )
      }
      if (this.customer.zoneCode === '') {
        return this.$swal(
          'Address를 입력하세요.',
          'Address는 필수 입력 값입니다.',
          'info'
        )
      }
      // 정규식 - 이메일, 전화번호 체크 로직 추가

      const regexpEmail =
        /^([a-z]+\d*)+(\.?[a-z]+\d*)+@([a-z]+\d*)+(\.[a-z]{2,3})+$/
      const regexpTel = /^010-\d{4}-\d{4}$/

      if (!regexpTel.test(this.customer.phone)) {
        return this.$swal(
          'Phone을 올바른 형식으로 입력하세요.',
          '010-0000-0000 과 같은 형식입니다',
          'info'
        )
      }
      if (!regexpEmail.test(this.customer.email)) {
        return this.$swal(
          'Email을 올바른 형식으로 입력하세요.',
          '이메일은 @을 포함해야합니다.',
          'info'
        )
      }

      this.$swal({
        title: '고객 정보를 저장 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'grey',
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        closeOnCancel: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          // console.log(result)
          const loader = this.$loading.show()
          this.customer.address = `(${this.customer.zoneCode}) ${
            this.customer.roadAddress
          } ${
            this.customer.detailAddress ? this.customer.detailAddress : ''
          }`.trim()
          const r = await this.$put(
            `/customers/${this.selectedId}`,
            this.customer
          )
          loader.hide()
          if (r.status === 200) {
            this.$swal(
              '수정 되었습니다!',
              '선택한 데이터가 정상적으로 수정되었습니다.',
              'success'
            )
            this.editMode = false
            this.doSearch()
          } else {
            this.$swal(
              '수정에 실패한 데이터가 있습니다.',
              '재시도 하세요.',
              'error'
            )
          }
        }
      })
    },
    loadScript() {
      const script = document.createElement('script')
      script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      document.head.appendChild(script)
    },
    openPostCode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
          // 예제를 참고하여 다양한 활용법을 확인해 보세요.
          // console.log(data)
          this.customer.zoneCode = data.zonecode
          this.customer.roadAddress = data.roadAddress
        }
      }).open()
    }
  }
}
</script>
<style>
.link-primary {
  text-decoration: underline;
  cursor: pointer;
}

.customer-form {
  border: 1px solid #dcdfe6;
  padding: 10px;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
</style>
