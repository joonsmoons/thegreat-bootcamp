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
          />
        </div>
      </div>
    </div>

    <button class="btn btn-secondary me-2" @click="goToList">Back</button>
    <button class="btn btn-success me-2" @click="doCreate">Save</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      customer: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        zoneCode: '',
        roadAddress: '',
        detailAddress: ''
      }
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.loadScript()
  },
  unmounted() {},
  methods: {
    goToList() {
      this.$router.push('/template/p3/list')
    },
    doCreate() {
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
        title: '신규 고객을 생성 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '생성',
        cancelButtonText: '취소'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // 저장 로직 구현
          const loader = this.$loading.show()
          this.customer.address =
            `(${this.customer.zoneCode}) ${this.customer.roadAddress} ${this.customer.detailAddress}`.trim()
          const r = await this.$post('/customers', this.customer)
          loader.hide()
          console.log(r.status)
          if (r.status === 201) {
            this.$swal(
              '생성 되었습니다!',
              '신규 고객이 생성 되었습니다.',
              'success'
            )
            this.$router.push(`/template/p3/detail/${r.data.id}`)
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
          console.log(data)
          this.customer.zoneCode = data.zonecode
          this.customer.roadAddress = data.roadAddress
        }
      }).open()
    }
  }
}
</script>
