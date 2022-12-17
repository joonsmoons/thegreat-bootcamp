<template>
  <div class="mt-3">
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
            v-model="this.customer.zoneCode"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="postcode"
            :disabled="!editMode"
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
            :disabled="!editMode"
          />
        </div>
      </div>
    </div>

    <button class="btn btn-primary me-2" @click="toggleEdit" v-show="!editMode">
      Edit
    </button>
    <button
      class="btn btn-secondary me-2"
      @click="returnList"
      v-show="!editMode"
    >
      Back
    </button>
    <button class="btn btn-success me-2" @click="doEdit" v-show="editMode">
      Save
    </button>
    <button
      class="btn btn-secondary me-2"
      @click="toggleEdit"
      v-show="editMode"
    >
      Cancel
    </button>
    <button class="btn btn-danger me-2" @click="doDelete" v-show="editMode">
      Delete
    </button>
  </div>
</template>
<script>
export default {
  components: {},
  props: ['id'],
  data() {
    return {
      customer: {},
      editMode: false
    }
  },
  setup() {},
  created() {
    this.getData()
    this.loadScript()
  },
  mounted() {},
  unmounted() {},
  methods: {
    async getData() {
      this.customer = await this.$get(`/customers/${this.id}`)
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
    },
    toggleEdit() {
      this.editMode = !this.editMode
    },
    returnList() {
      this.$router.push('/template/p3/list')
    },
    doEdit() {
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
          const r = await this.$put(`/customers/${this.id}`, this.customer)
          loader.hide()
          if (r.status === 200) {
            this.$swal(
              '수정 되었습니다!',
              '선택한 데이터가 정상적으로 수정되었습니다.',
              'success'
            )
            this.editMode = false
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
    doDelete() {
      this.$swal({
        title: '정말로 고객 정보를 삭제 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'grey',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        closeOnCancel: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          // console.log(result)
          const loader = this.$loading.show()
          const r = await this.$delete(`/customers/${this.id}`)
          loader.hide()
          if (r.status === 200) {
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
          this.returnList()
        }
      })
    }
  }
}
</script>
