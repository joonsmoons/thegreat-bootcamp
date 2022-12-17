<template>
  <div class="mt-3">
    <div class="row mb-3">
      <label for="customerName" class="col-sm-2">Name</label>
      <div class="col-sm-10">
        {{ customer.name }}
      </div>
    </div>

    <div class="row mb-3">
      <label for="customerCompany" class="col-sm-2">Company</label>
      <div class="col-sm-10">
        {{ customer.company }}
      </div>
    </div>

    <div class="row mb-3">
      <label for="customerEmail" class="col-sm-2">Email</label>
      <div class="col-sm-10">
        {{ customer.email }}
      </div>
    </div>

    <div class="row mb-3">
      <label for="customerPhone" class="col-sm-2">Phone</label>
      <div class="col-sm-10">
        {{ customer.phone }}
      </div>
    </div>

    <div class="row mb-3">
      <label for="customerAddress" class="col-sm-2">Address</label>
      <div class="col-sm-10">
        {{ customer.address }}
      </div>
    </div>

    <button class="btn btn-secondary me-2" @click="doList">List</button>
    <button class="btn btn-primary" @click="doEdit">Edit</button>
  </div>
</template>
<script>
export default {
  components: {},
  props: ['id'],
  data() {
    return {
      customer: {}
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.getCustomer()
  },
  unmounted() {},
  methods: {
    async getCustomer() {
      this.customer = await this.$get(`/customers/${this.id}`)
    },
    doList() {
      this.$router.push('/template/p3/list')
    },
    doEdit() {
      this.$router.push(`/template/p3/edit/${this.id}`)
    }
  }
}
</script>
