<template>
  <div class="mt-3">
    <div class="row mb-3">
      <label for="selectCustomer" class="col-sm-2 col-form-label"
        >Customer</label
      >
      <div class="col-sm-10">
        <select
          class="form-select"
          id="selectCustomer"
          v-model="selectedCustomerId"
          @change="getCustomer"
        >
          <option value="">==Select Customer==</option>
          <option
            :value="customer.id"
            :key="customer.id"
            v-for="customer in customers"
          >
            {{ customer.name }}
          </option>
        </select>
      </div>
    </div>

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
          type="tel"
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
        <!-- <input
          type="text"
          class="form-control"
          id="customerAddress"
          v-model="customer.address"
          :disabled="!editMode"
        /> -->
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            v-model="customer.zoneCode"
            placeholder="????????????"
            aria-label="????????????"
            aria-describedby="postcode"
            disabled
          />
          <button
            class="btn btn-outline-secondary"
            id="postcode"
            @click="openPostCode"
            :disabled="!editMode"
          >
            ??????
          </button>
        </div>
        <div class="col-12">
          <input
            type="text"
            class="form-control"
            placeholder="??????"
            v-model="customer.roadAddress"
            disabled
          />
          <input
            type="text"
            class="form-control"
            placeholder="????????????"
            v-model="customer.detailAddress"
            :disabled="!editMode"
          />
        </div>
      </div>
    </div>

    <button
      class="btn btn-primary me-1"
      @click="editMode = true"
      v-show="!editMode"
      :disabled="selectedCustomerId === ''"
    >
      Edit
    </button>
    <button
      class="btn btn-secondary me-1"
      @click="editMode = false"
      v-show="editMode"
    >
      Cancel
    </button>
    <button class="btn btn-danger me-1" @click="editCustomer" v-show="editMode">
      Save
    </button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      customers: [],
      selectedCustomerId: '',
      customer: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        zoneCode: '',
        roadAddress: '',
        detailAddress: ''
      },
      editMode: false
    }
  },
  setup() {},
  created() {
    this.getCustomerList()
    if (!window.daum) {
      this.loadScript()
    }
  },
  mounted() {},
  unmounted() {},
  methods: {
    async getCustomerList() {
      this.customers = await this.$get('/customers')
    },
    async getCustomer() {
      this.editMode = false
      if (this.selectedCustomerId === '') {
        this.customer = {
          name: '',
          company: '',
          email: '',
          phone: '',
          address: ''
        }
      } else {
        const loader = this.$loading.show()
        this.customer = await this.$get(`/customers/${this.selectedCustomerId}`)
        loader.hide()
      }
    },
    async editCustomer() {
      if (this.customer.name === '') {
        return this.$swal(
          'Name??? ???????????????.',
          'Name??? ?????? ?????? ????????????.',
          'info'
        )
      }
      if (this.customer.company === '') {
        return this.$swal(
          'Company??? ???????????????.',
          'Company??? ?????? ?????? ????????????.',
          'info'
        )
      }
      if (this.customer.email === '') {
        return this.$swal(
          'Email??? ???????????????.',
          'Email??? ?????? ?????? ????????????.',
          'info'
        )
      }
      if (this.customer.phone === '') {
        return this.$swal(
          'Phone??? ???????????????.',
          'Phone??? ?????? ?????? ????????????.',
          'info'
        )
      }
      if (this.customer.zoneCode === '') {
        return this.$swal(
          'Address??? ???????????????.',
          'Address??? ?????? ?????? ????????????.',
          'info'
        )
      }
      // ????????? - ?????????, ???????????? ?????? ?????? ??????

      const regexpEmail =
        /^([a-z]+\d*)+(\.?[a-z]+\d*)+@([a-z]+\d*)+(\.[a-z]{2,3})+$/
      const regexpTel = /^010-\d{4}-\d{4}$/

      if (!regexpTel.test(this.customer.phone)) {
        return this.$swal(
          'Phone??? ????????? ???????????? ???????????????.',
          '010-0000-0000 ??? ?????? ???????????????',
          'info'
        )
      }
      if (!regexpEmail.test(this.customer.email)) {
        return this.$swal(
          'Email??? ????????? ???????????? ???????????????.',
          '???????????? @??? ?????????????????????.',
          'info'
        )
      }

      this.$swal({
        title: '?????? ????????? ?????? ???????????????????',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '??????',
        cancelButtonText: '??????'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // ?????? ?????? ??????
          const loader = this.$loading.show()
          this.customerAddress =
            `(${this.customer.zoneCode}) ${this.customer.roadAddress} ${this.detailAddress}`.trim()

          const r = await this.$put(
            `/customers/${this.selectedCustomerId}`,
            this.customer
          )
          loader.hide()
          if (r.status === 200) {
            this.$swal(
              '?????? ???????????????!',
              '????????? ???????????? ??????????????? ?????????????????????.',
              'success'
            )
            this.editMode = false
          }
        }
      })
    },
    toggleEdit() {
      this.editMode = true
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
          // ???????????? ???????????? ????????? ??????????????? ????????? ????????? ???????????? ???????????????.
          // ????????? ???????????? ????????? ???????????? ????????? ?????????.
          console.log(data)
          this.customer.zoneCode = data.zonecode
          this.customer.roadAddress = data.roadAddress
        }
      }).open()
    }
  }
}
</script>
